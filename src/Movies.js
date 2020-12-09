import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://imdb-api.com/en/API/Top250Movies/k_dqqxhvuq
                `
            )
            .then((data) => {
                setMovies(data.data.items);
                setLoading(false);
            });
    }, []);
    return (
        <React.Fragment>
            {loading && <img className="loading" src="/loading.jpg"></img>}
            <ul className="movielist">
                {movies.map((movie) => (
                    <li className="movieslist" key={movie.id}>
                        <span>{movie.rank}.</span>
                        <img src={movie.image} className="poster"></img>
                        <div>
                            <p className="title">{movie.fullTitle}</p>
                            <p className="score">Score: {movie.imDbRating}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
}
