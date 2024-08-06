import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import './MovieGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        try {
            const res = await fetch(url);
            console.log('Response status:', res.status); // Log do status da resposta
            if (!res.ok) {
                throw new Error(`Network response was not ok ${res.statusText}`);
            }
            const data = await res.json();
            console.log('Fetched data:', data); // Log dos dados recebidos
            // Supondo que a resposta da API tenha uma propriedade 'results'
            setMovies(data.results);
        } catch (error) {
            setError(error.message);
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?api_key=${apiKey}&query=${query}`;
        console.log(`Fetching data from URL: ${searchWithQueryURL}`); // Debug: Verifique se a URL está correta
        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    return (
        <div className="container">
            <h2 className="title">Resultados para: <span className="query-text">{query}</span>
            </h2>
            <ul className="movies-container">
                {error && <p className="error">There was a problem with your fetch operation: {error}</p>}
                {movies.length === 0 && !error && <h1 className="loading">CARREGANDO....</h1>}
                {movies && movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default Search;
