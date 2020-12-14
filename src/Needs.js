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
        <div className="needs-table">
            <p>{needs.length}</p>
            {needs.map((need) => (
                <div key={need.id}>
                    <p>{need.category}</p>
                    <p>{need.description}</p>
                    <Link to={`/chat/${need.needer_id}`}>
                        <h2 className="contact">Contact</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}
