import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Logo from "./Logo.js";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import Uploader from "./Uploader.js";
import Profile from "./Profile.js";
import Chat from "./Chat";
import PrivateChat from "./PrivateChat";
import BigMap from "./BigMap";
import NeedyForm from "./NeedyForm";
import DonateForm from "./DonateForm";
import AboutUs from "./AboutUs";
import Needs from "./Needs";
import Donations from "./Donations";
import Contact from "./Contact";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            bio: "",
            category: "",
            description: "",
            needynumber: "",
            donationnumber: "",
            profilePic: undefined,
            uploaderVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.setBio = this.setBio.bind(this);
        this.setImage = this.setImage.bind(this);
        this.closeComponent = this.closeComponent.bind(this);
    }

    componentDidMount() {
        axios.get("/api/user").then((data) => {
            console.log(data, "kekwef");
            this.setState({
                profilePic: data.data.image,
                firstname: data.data.firstname,
                lastname: data.data.lastname,
                bio: data.data.bio,
                email: data.data.email,
            });
        });
        console.log("FORM SUBMITTED", this.state);
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    setImage(data) {
        this.setState({
            profilePic: data,
        });
    }

    setBio(data) {
        this.setState({ bio: data });
    }

    closeComponent() {
        this.setState({
            uploaderVisible: false,
        });
    }

    handleClick() {
        axios.post("/logout").then(() => {
            location.replace("/welcome");
        });
    }

    render() {
        if (!this.state.email) return null;
        console.log(this.state);
        return (
            <React.Fragment>
                <BrowserRouter>
                    <header>
                        <Logo />
                        <div className="links">
                            <Link to="/about-us"> About Us</Link>
                            <span className="space"></span>
                            <Link to="/numberofneeds"> Needs</Link>
                            <span className="space"></span>
                            <Link to="/numberofdonations"> Donations</Link>
                        </div>
                        <ProfilePic
                            profilePic={this.state.profilePic}
                            toggleUploader={this.toggleUploader}
                            firstname={this.state.firstname}
                        />
                    </header>
                    <div className="main">
                        <Uploader
                            closeComponent={this.closeComponent}
                            setImage={this.setImage}
                            uploaderVisible={this.state.uploaderVisible}
                        />
                        <React.Fragment>
                            <Route exact path="/" component={BigMap} />
                            <Route
                                exact
                                path="/user"
                                render={() => (
                                    <Profile
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        email={this.state.email}
                                        bio={this.state.bio}
                                        profilePic={this.state.profilePic}
                                        toggleUploader={this.toggleUploader}
                                        setBio={this.setBio}
                                    />
                                )}
                            />
                            <Route exact path="/chat" component={Chat} />
                            <Route path="/chat/:id" component={PrivateChat} />
                            <Route path="/needs" component={NeedyForm} />
                            <Route path="/donation" component={DonateForm} />
                            <Route path="/about-us" component={AboutUs} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/numberofneeds" component={Needs} />
                            <Route
                                path="/numberofdonations"
                                component={Donations}
                            />
                        </React.Fragment>
                        <ToastContainer autoClose={7000} />
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
