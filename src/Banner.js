import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css"
const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetchMovie() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      ); // using prettier
    }
    fetchMovie();
  }, []);
  console.log(movie);

  function truncate(str, n) {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${base_url}${movie?.backdrop_path}')`, //optional chaining: no need to check if movie is undefined '?' saw this neat trick on stackoverflow
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name || movie?.title || movie?.orginal_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadedBottom"></div>
    </header>
  );
}

export default Banner;
