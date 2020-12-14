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
            <h2 className="length">Number of Needs: {needs.length}</h2>
            <div className="needs-table">
                {needs.map((need) => (
                    <div className="need-item" key={need.id}>
                        <p>{need.category}</p>
                        <p>{need.description}</p>
                        <Link to={`/chat/${need.needer_id}`}>
                            <img src="/chat.png" className="chat"></img>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
