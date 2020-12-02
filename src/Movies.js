import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Movies() {
    const [movies, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        let stale = false;

        axios
            .get(
                `https://api.themoviedb.org/3/movie/550?api_key=f3a41199ffcda690d90444803cd4f886`
            )
            .then(({ data }) => {
                console.log("DATA RECEIVED FOR query", data);
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
