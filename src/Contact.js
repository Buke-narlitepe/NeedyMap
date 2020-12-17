import React, { useState } from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default function Contact() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
    });

    // const [error, setError] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        axios
            .post("/api/contact", form)
            .then(() => {
                location.replace("/");
            })
            .catch(() => {
                console.log(e);
                // setError(true);
            });
    };

    return (
        <div>
            <div className="header">
                <Logo />
                <div className="uplink">
                    <Link to="/about-us"> About Us</Link>
                </div>
            </div>
            <div className="contact-part">
                <h2 className="contact">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Firstname*"
                        onChange={handleChange}
                        value={form.firstname}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Lastname*"
                        onChange={handleChange}
                        value={form.lastname}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        onChange={handleChange}
                        value={form.email}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone(optional)"
                        onChange={handleChange}
                        value={form.phone}
                    />
                    <textarea
                        value={form.message}
                        className="contact"
                        name="message"
                        onChange={handleChange}
                        placeholder="Message*"
                    />
                    <button type="submit" className="contact">
                        Submit
                    </button>
                </form>
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
        </div>
    );
}
