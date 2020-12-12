import React, { useState } from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default function NeedyForm() {
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
        <div className="contact-part">
            <Logo />
            <div className="uplink">
                <Link to="/about-us"> About Us</Link>
                <Link to="/registration"> Register</Link>
            </div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    onChange={handleChange}
                    value={form.firstname}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    onChange={handleChange}
                    value={form.lastname}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    value={form.phone}
                />
                <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    onChange={handleChange}
                    value={form.message}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
