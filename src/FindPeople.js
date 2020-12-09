import React, { useState, useEffect } from "react";

import axios from "./axios.js";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect for query", query);

        let stale = false;

        console.log("START AXIOS REQUEST FOR query", query);
        axios.get(`/api/users/${query}`).then(({ data }) => {
            console.log("DATA RECEIVED FOR query", query);
            console.log("Is it stale?", stale);
            if (!stale) {
                console.log("Save new countries for query", query, data);
                setUsers(data);
            }
        });
        return () => {
            console.log("CLEANUP for query", query);

            stale = true;
        };
    }, [query]);

    useEffect(() => {
        console.log("useEffect for latest users");

        let stale = false;

        console.log("START AXIOS REQUEST FOR latest users");
        axios.get(`/api/users`).then(({ data }) => {
            console.log("latests users");
            console.log("Is it stale?", stale);
            if (!stale) {
                console.log("Save latest users for query", data);
                setUsers(data);
            }
        });
        return () => {
            console.log("CLEANUP for query", query);

            stale = true;
        };
    }, []);

    return (
        <React.Fragment>
            <div className="find">
                <p>Are you looking for someone?</p>
                <input
                    type="text"
                    name="query"
                    value={query}
                    placeholder="Please type a name.."
                    onChange={(e) => setQuery(e.target.value)}
                />
                {!query ? (
                    <p className="search">
                        Take a look who joined to Netflix and Chat!
                    </p>
                ) : (
                    <p className="search">Find people</p>
                )}

                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img className="people-pic" src={user.image} />
                            </Link>
                            <h2 className="people-name">
                                {user.firstname} {user.lastname}
                            </h2>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}
