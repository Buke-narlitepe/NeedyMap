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
            <div className="copyright-icons-home">
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
