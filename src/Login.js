import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/api/login", this.state)
            .then(() => {
                location.replace("/");
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
        return (
            <React.Fragment>
                <Logo />
                <h2 className="register">Login</h2>
                {this.state.error && (
                    <p>
                        Ooopss! Your password and e-mail address does not match,
                        please try again.
                    </p>
                )}
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        placeholder="E-mail"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        placeholder="Password"
                    />
                    <button type="submit" className="login">
                        Login
                    </button>
                </form>
                <Link to="/registration">
                    <p>Not registered yet?</p>
                </Link>
                <Link to="/resetpassword">
                    <p>Bad Memory?</p>
                </Link>
                <div className="copyright-icons">
                    <div className="copyright">
                        Copyright 2020 <span className="app">NeedyMap</span>.
                        <span className="space">|</span>Terms &amp; Conditions
                        <span className="space">|</span> Privacy
                        <span className="space">|</span>
                        <Link to="/contact"> Contact Us</Link>
                    </div>
                    <div className="icons">
                        <img src="/facebook.png"></img>
                        <img src="/instagram.png"></img>
                        <img src="/twitter.png"></img>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
