import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import './MovieGrid.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;



const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Network response was not ok ${res.statusText}`);
            }
            const data = await res.json();
            setTopMovies(data.results);
        } catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?api_key=${apiKey}`;
        getTopRatedMovies(topRatedURL);

    }, []);

    return (
        <div className="container" >
            <h2 className="title">Melhores filmes:</h2>

            <ul className="movies-container">
                {topMovies.length === 0 && <h1 className="loading">CARREGANDO....</h1>}
                {topMovies &&
                    topMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} showLink />
                    ))}
            </ul>
        </div>
    );
};

export default Home;
