import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Logo from "./Logo.js";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import Uploader from "./Uploader.js";
// import Profile from "./Profile.js";
import Chat from "./Chat";
import PrivateChat from "./PrivateChat";
import BigMap from "./BigMap";
import NeedyForm from "./NeedyForm";
import DonateForm from "./DonateForm";
import AboutUs from "./AboutUs";

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

    handleNeedClick() {
        axios.get("/api/numberofneeds").then((data) => {
            console.log(data.data[0]);
            this.setState({
                needynumber: data.data[0].count,
            });
        });
    }

    handleDonateClick() {
        axios.get("/api/numberofdonation").then((data) => {
            this.setState({
                donationnumber: data.data[0].count,
            });
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
                            <Link to="/about-us"> About Us</Link>
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
                        <div className="welcoming">
                            Happiness is contagious, and we can touch other
                            people’s lives by our small acts of kindness.{" "}
                        </div>
                        <div className="form-buttons">
                            <Link to="/needs">
                                {" "}
                                <div className="needy">
                                    <img src="/needy.png" className="needy" />
                                    Enter Needs
                                </div>
                            </Link>
                            <Link to="/donation">
                                {" "}
                                <div className="donation">
                                    <img
                                        src="/donation.png"
                                        className="donation"
                                    />
                                    Enter Donation
                                </div>
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
                                component={BigMap}
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
                            <Route path="/about-us" component={AboutUs} />
                        </React.Fragment>
                        <div className="numbers">
                            <div
                                className="need-number"
                                onClick={this.handleNeedClick}
                            >
                                Number of Needs: {this.state.needynumber}
                            </div>
                            <div
                                className="donate-number"
                                onClick={this.handleDonateClick}
                            >
                                Number of Donations: {this.state.donationnumber}
                            </div>
                        </div>
                    </div>
                    <div className="downlink">
                        <Link to="/contact"> Contact Us</Link>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
