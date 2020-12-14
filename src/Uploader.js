import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnotherClick = this.handleAnotherClick.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.image);
        axios
            .post("/api/upload", formData)
            .then((res) => {
                console.log(res);
                this.props.setImage(res.data);
            })
            .catch((err) => {
                console.log("error on uploading image", err);
            });
    }

    handleChange(e) {
        this.setState({
            image: e.target.files[0],
        });
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
                    <Link to="/user"> Your Profile</Link>
                    <a id="nav-link" onClick={this.handleClick}>
                        Log out
                    </a>
                    <a id="nav-link" onClick={this.handleAnotherClick}>
                        Delete your Account
                    </a>
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="change">
                            Do you want to
                            <label className="change" htmlFor="upload">
                                change
                            </label>
                            your profile picture?
                        </h3>
                        <input
                            type="file"
                            name="file"
                            id="upload"
                            accept="image/*"
                            onChange={this.handleChange}
                        />
                        <button className="upload" type="submit">
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
