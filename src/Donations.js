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
        <div className="donations-table">
            <p>{donations.length}</p>
            {donations.map((donation) => (
                <div key={donation.id}>
                    <p>{donation.category}</p>
                    <p>{donation.description}</p>
                    <Link to={`/chat/${donation.donator_id}`}>
                        <h2 className="contact">Contact</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}
