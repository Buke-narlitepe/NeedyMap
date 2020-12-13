import React from "react";
import { Link } from "react-router-dom";
// import Home from "./Home.js";

export default function Logo() {
    return (
        <div className="logo-part">
            <div className="actual-logo">
                <Link to="/">
                    <img className="logo" src="/logo.png" />
                </Link>
                <p className="app-name">NeedyMap</p>
            </div>
        </div>
    );
}
