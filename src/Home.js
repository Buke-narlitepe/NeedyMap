import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default function Home() {
    return (
        <React.Fragment>
            <header>
                <Logo />
                <div className="uplink">
                    <Link to="/about-us"> About Us</Link>
                    <Link to="/registration"> Register</Link>
                </div>
            </header>
            <div className="slogan">
                Wondering where to donate gently used baby items?{" "}
                <span className="app">NeedyMap</span> is the perfect place to
                begin! Your baby item donations can help parents make a safer,
                easier and more comfortable welcome to their precious little
                one.
            </div>
            <div className="register-link"></div>
            <footer>
                <div className="downlink">
                    <Link to="/contact"> Contact Us</Link>
                </div>
            </footer>
        </React.Fragment>
    );
}
