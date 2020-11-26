import React from "react";
import Logo from "./Logo.js";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import Uploader from "./Uploader.js";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            profilePic: undefined,
            uploaderVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setImage = this.setImage.bind(this);
        this.closeComponent = this.closeComponent.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then((data) => {
            console.log(data, "kekwef");
            this.setState({
                profilePic: data.data.image,
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

    closeComponent() {
        this.setState({
            uploaderVisible: false,
        });
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <Logo />
                    <ProfilePic
                        profilePic={this.state.profilePic}
                        toggleUploader={this.toggleUploader}
                    />
                </header>
                {this.state.uploaderVisible && (
                    <Uploader
                        closeComponent={this.closeComponent}
                        setImage={this.setImage}
                    />
                )}
            </React.Fragment>
        );
    }
}
