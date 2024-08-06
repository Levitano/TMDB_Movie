import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from 'react-icons/bs';
import MovieCard from "../components/MovieCard";
import './Movie.css';

const searchMoviesURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }
            const data = await res.json();
            setMovie(data);
            console.log(data)
        } catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    useEffect(() => {
        const movieURL = `${searchMoviesURL}${id}?api_key=${apiKey}`;
        getMovie(movieURL);

    }, [id]);

    const formatCurrency = (number) => {
        return number.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Orçamento:
                            <p>{formatCurrency(movie.budget)}</p>
                        </h3>
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Receita:
                            <p>{formatCurrency(movie.revenue)}</p>
                        </h3>
                    </div>
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Duração:
                            <p>{movie.runtime} minutos</p>
                        </h3>
                    </div>
                    <div className="info-description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                            <p>{movie.overview}</p>
                        </h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default Movie;
