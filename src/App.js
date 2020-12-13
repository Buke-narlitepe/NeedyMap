import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Logo from "./Logo.js";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import Uploader from "./Uploader.js";
// import Profile from "./Profile.js";
import Chat from "./Chat";
import PrivateChat from "./PrivateChat";
import Map from "./Map";
import NeedyForm from "./NeedyForm";
import DonateForm from "./DonateForm";

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
            latitude: "",
            longitude: "",
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
        axios.get("api/needsform").then((data) => {
            console.log(data, "needsform");
            this.setState({
                category: data.data.category,
                description: data.data.description,
                latitude: data.data.latitude,
                longitude: data.data.longitude,
            });
        });
        axios.get("api/donationform").then((data) => {
            console.log(data, "donationform");
            this.setState({
                category: data.data.category,
                description: data.data.description,
                latitude: data.data.latitude,
                longitude: data.data.longitude,
            });
        });
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
                            <Link to="/"> Your Profile</Link>
                            <span className="space">|</span>
                            <Link to="/chat"> Chat</Link>
                            <span className="space">|</span>
                            <a id="nav-link" onClick={this.handleClick}>
                                Log out
                            </a>
                        </div>
                        <ProfilePic
                            profilePic={this.state.profilePic}
                            toggleUploader={this.toggleUploader}
                        />
                    </header>
                    <div className="main">
                        <div className="form-buttons">
                            <Link to="/needs">
                                {" "}
                                <button className="needy">Enter Needs</button>
                            </Link>
                            <Link to="/donation">
                                {" "}
                                <button className="needy">
                                    Enter Donation
                                </button>
                            </Link>
                        </div>

                        <Uploader
                            closeComponent={this.closeComponent}
                            setImage={this.setImage}
                            uploaderVisible={this.state.uploaderVisible}
                        />
                        <React.Fragment>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Map
                                        category={this.state.category}
                                        description={this.state.category}
                                        latitude={this.state.category}
                                        longitude={this.state.category}
                                    />
                                )}
                                // render={() => (
                                //     <Profile
                                //         firstname={this.state.firstname}
                                //         lastname={this.state.lastname}
                                //         bio={this.state.bio}
                                //         profilePic={this.state.profilePic}
                                //         toggleUploader={this.toggleUploader}
                                //         setBio={this.setBio}
                                //     />
                                // )}
                            />
                            <Route exact path="/chat" component={Chat} />
                            <Route path="/chat/:id" component={PrivateChat} />
                            <Route path="/needs" component={NeedyForm} />
                            <Route path="/donation" component={DonateForm} />
                        </React.Fragment>
                        <div>
                            <p>Number of Needs</p>
                            <p>Number of Donations</p>
                        </div>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
