import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default function AboutUs() {
    return (
        <div>
            <div className="header">
                <Logo />
                {/* <div className="uplink">
                    <Link to="/registration"> Register</Link>
                </div> */}
            </div>
            <div className="about-part">
                <h2>
                    How does <span className="app">NeedyMap</span> work?
                </h2>
                <p>
                    It can be surprising how many things are needed, or just
                    downright practical, when you have a little one in your
                    life. It’s not easy to provide for the range of items a baby
                    needs, particularly all at once. Donate gently used baby
                    items to help and support families with tight budgets,
                    families or individuals. To see the products which are
                    needed please click the pins on the map. If you want, you
                    may send by cargo to the required address or deliver it
                    yourself. You can also contact with person in need through
                    our application. Our map works bilaterally. As a donator,
                    you are also able to pin your address on the map and upload
                    the product you will donate to the system by filling out our
                    form.
                </p>
            </div>
            <div className="copyright-icons-about">
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
