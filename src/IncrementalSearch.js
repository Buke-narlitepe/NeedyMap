import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function IncrementalSearch() {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log("useEffect for query", query);

        let stale = false;

        console.log("START AXIOS REQUEST FOR query", query);

        axios
            .get(`https://spicedworld.herokuapp.com/?q=${query}`)
            .then(({ data }) => {
                console.log("DATA RECEIVED FOR query", query);
                console.log("Is it stale?", stale);
                if (!stale) {
                    console.log("Save new countries for query", query, data);
                    setCountries(data);
                    setLoading(false);
                }
            });

        //cleanup
        return () => {
            console.log("CLEANUP for query", query);

            stale = true;
        };
    }, [query]);
    return (
        <React.Fragment>
            <input
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <div>LOADING....</div>}
            <ul>
                {countries.map((country) => (
                    <li key={country}>{country}</li>
                ))}
            </ul>
        </React.Fragment>
    );
}
