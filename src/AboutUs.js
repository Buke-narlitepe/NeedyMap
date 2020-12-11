import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default function AboutUs () {

 return (
        <div className="about-part">
                <Logo />
                <div className="uplink">
                    <Link to="/registration"> Register</Link>
                </div>
            <h2>About Us</h2>
            <p>History behind this project</p>

        </div>
    );
}

