import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home.js";

export default function Logo() {
    return (
        <div className="logo-part">
        <Link to="/">
            <img className="logo" src="/logo-netflix.png" />
        </Link>
        </div>
    );
}
