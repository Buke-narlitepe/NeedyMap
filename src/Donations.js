import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default function Needs() {
    const [donations, setNeeds] = useState([]);

    useEffect(() => {
        axios.get("/api/donationform").then((data) => {
            console.log(data.data);
            setNeeds(data.data);
        });
    }, []);

    return (
        <div>
            <h2 className="length">Donations made so far:{donations.length}</h2>
            <div className="donations-table">
                {donations.map((donation) => (
                    <div className="donation-item" key={donation.id}>
                        <p>
                            <span className="label">Product:</span>
                            {donation.category}
                        </p>
                        <p>
                            <span className="label">Description:</span>
                            {donation.description}
                        </p>
                        <p>
                            <span className="label">City:</span>
                            {donation.city}
                        </p>
                        <p>
                            <span className="label">Address:</span>
                            {donation.address}
                        </p>
                        <Link to={`/chat/${donation.donator_id}`}>
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
