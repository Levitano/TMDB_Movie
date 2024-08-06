import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

import { FaStar } from "react-icons/fa"
import '../pages/MovieGrid.css'
import '../pages/Movie.css';


const imgURL = import.meta.env.VITE_IMG

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-card">

            <img src={imgURL + movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <FaStar />{movie.vote_average}
            </p>

            {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    showLink: PropTypes.bool,
};


export default MovieCard