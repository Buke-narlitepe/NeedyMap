import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default class Registration extends React.Component {
    constructor() {
        super();

        this.state = {
            firstname: "",
            lastname: "",
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
            .post("/api/register", this.state)
            .then(() => {
                location.replace("/");
            })
            .catch(() => {
                this.setState({
                    error: true,
                });
            });

        console.log("FORM SUBMITTED", this.state);
    }

    handleChange(e) {
        console.log("handleChange", e.target.name, e.target.value);

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <div>
                <Logo />
                {this.state.error && (
                    <p>Ooopss! Something missing, please try agin.</p>
                )}
                <p>Please create your account</p>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        onChange={this.handleChange}
                        value={this.state.firstname}
                        placeholder="Firstname"
                    />
                    <input
                        type="text"
                        name="lastname"
                        onChange={this.handleChange}
                        value={this.state.lastname}
                        placeholder="Lastname"
                    />
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
                    <button className="create" type="submit">
                        Create Account
                    </button>
                </form>
                <Link to="/login">
                    <p>You have already have an account?</p>
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
            </div>
        );
    }
}
