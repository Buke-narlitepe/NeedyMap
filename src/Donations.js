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
            <h2 className="length">Number of Donations:{donations.length}</h2>
            <div className="donations-table">
                {donations.map((donation) => (
                    <div className="donation-item" key={donation.id}>
                        <p>{donation.category}</p>
                        <p>{donation.description}</p>
                        <Link to={`/chat/${donation.donator_id}`}>
                            <img src="/chat.png" className="chat"></img>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
