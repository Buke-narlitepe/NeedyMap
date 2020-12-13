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
                <h2 className="welcome">Please create your account</h2>
                {this.state.error && (
                    <p>Ooopss! Something missing, please try agin.</p>
                )}
                <form onSubmit={this.handleSubmit}>
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
                <div className="downlink">
                    <Link to="/contact"> Contact Us</Link>
                </div>
            </div>
        );
    }
}
