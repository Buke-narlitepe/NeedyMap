import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=f3a41199ffcda690d90444803cd4f886`
            )
            .then((data) => {
                setMovies(data.data.results);
                setLoading(false);
            });
    }, []);
    const url = "http://image.tmdb.org/t/p/original";
    return (
        <React.Fragment>
            {loading && <img className="loading" src="/loading.jpg"></img>}
            <ul>
                {movies.map((movie) => (
                    <li key={movie}>
                        <img
                            src={url + movie.poster_path}
                            className="poster"
                        ></img>
                        {movie.original_title}
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
}
