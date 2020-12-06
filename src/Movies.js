import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    /*const options = {
        method: "GET",
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
        params: { t: "loadvideo", q: "60029591" },
        headers: {
            "x-rapidapi-key":
                "6b108ba6dfmsh1161a623babf1bcp1883c3jsn8018e861585b",
            "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
        },
    };*/

    useEffect(() => {
        setLoading(true);
        /*axios
            .request(options)
            .then(function (response) {
                setMovies(response.data.results);
                setLoading(false);
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
        */
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
                    <li key={movie.id}>
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
