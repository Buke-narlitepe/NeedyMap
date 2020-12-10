import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();

        this.state = {
            step: 0,
            email: "",
            password: "",
            code: "",
            error: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAnotherSubmit = this.handleAnotherSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/api/resetpassword", this.state)
            .then(() => {
                this.setState({
                    step: 1,
                });
            })
            .catch(() => {
                this.setState({
                    error: true,
                });
            });
    }

    handleAnotherSubmit(e) {
        e.preventDefault();

        axios
            .post("/api/newpassword", this.state)
            .then(() => {
                this.setState({
                    step: 2,
                });
            })
            .catch(() => {
                this.setState({
                    error: true,
                });
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        if (this.state.step === 0) {
            return (
                <React.Fragment>
                    <h1>Give us your E-Mail to refresh your memory</h1>
                    {this.state.error && (
                        <p>Ooopss! Something missing, please try again.</p>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            placeholder="Email"
                        />
                        <button className="reset" type="submit">
                            Submit
                        </button>
                    </form>
                </React.Fragment>
            );
        } else if (this.state.step === 1) {
            return (
                <React.Fragment>
                    <h1>
                        Give us your code that weve sent to your email and also
                        your new password.
                    </h1>
                    <form onSubmit={this.handleAnotherSubmit}>
                        <p>Please enter the code you recieved</p>
                        <input
                            type="text"
                            name="code"
                            onChange={this.handleChange}
                            value={this.state.code}
                            placeholder="Code"
                        />
                        <p>Please enter your new top secret password</p>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            placeholder="Password"
                        />
                        <button className="reset" type="submit">
                            Submit
                        </button>
                    </form>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <img src="logo-netflix.png" />
                    <h1>Successful!</h1>
                    <Link to="/login">
                        <p>Now you can log in again</p>
                    </Link>
                </React.Fragment>
            );
        }
    }
}
