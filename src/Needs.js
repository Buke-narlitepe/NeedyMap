import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default function Needs() {
    const [needs, setNeeds] = useState([]);

    useEffect(() => {
        axios.get("/api/needsform").then((data) => {
            console.log(data.data);
            setNeeds(data.data);
        });
    }, []);

    return (
        <div>
            <h2 className="length">Needs entered so far: {needs.length}</h2>
            <div className="needs-table">
                {needs.map((need) => (
                    <div className="need-item" key={need.id}>
                        <p>
                            <span className="label">Product:</span>
                            {need.category}
                        </p>
                        <p>
                            <span className="label">Description:</span>
                            {need.description}
                        </p>
                        <p>
                            <span className="label">City:</span>
                            {need.city}
                        </p>
                        <p>
                            <span className="label">Address:</span>
                            {need.address}
                        </p>
                        <Link to={`/chat/${need.needer_id}`}>
                            <img
                                src="/chat.png"
                                className="chat"
                                alt="Connect"
                                title="Connect"
                            ></img>
                        </Link>
                    </div>
                ))}
            </div>
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
