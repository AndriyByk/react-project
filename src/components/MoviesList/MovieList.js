import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies} from "../../store/slices/movies.slice";
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import './MovieList.css';
import MoviesPage from "../../pages/MoviesPage/MoviesPage";

const MovieList = () => {
    const {movies, status, error, genres} = useSelector(state => state['movieReducer']);
    const dispatch = useDispatch();

    const changeGenres = (movie) => {
        const movieWithGenres = {...movie, genre_ids: []};
        for (let genre of genres) {
            for (let genreId of movie.genre_ids) {
                if (genre.id === genreId) {
                    movieWithGenres.genre_ids.push(genre.name);
                }
            }
        }
        return movieWithGenres;
    }

    useEffect(()=>{
        dispatch(getMovies())
    },[])

    return (
        <div className={'movie-list'}>
            {status === 'pending' && <h2>Трішки зачекайте..</h2>}
            {error && <h2>{error}</h2>}
            {movies.map(movie => <MoviesListCard key={movie.id} movie={changeGenres(movie)}/>)}
        </div>
    );
};

export const Memory = React.memo(MovieList);
export default MovieList;