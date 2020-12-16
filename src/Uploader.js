import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleAnotherClick = this.handleAnotherClick.bind(this);
    }

    handleClick() {
        axios.post("/logout").then(() => {
            location.replace("/welcome");
        });
    }

    handleAnotherClick() {
        axios.post("/api/deleteuser").then(() => {
            location.replace("/welcome");
        });
    }

    render() {
        let modal = this.props.uploaderVisible ? "modal" : "slide";
        console.log(this.props.uploaderVisible);
        return (
            <div className="component">
                <div className={modal}>
                    <p className="x" onClick={this.props.closeComponent}>
                        X
                    </p>
                    <Link to="/user"> Profile</Link>
                    <a id="nav-link" onClick={this.handleClick}>
                        Log out
                    </a>
                    <a id="nav-link" onClick={this.handleAnotherClick}>
                        Delete Account
                    </a>
                </div>
            </div>
        );
    }
}
