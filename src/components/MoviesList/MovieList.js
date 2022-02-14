import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getFilteredMovies} from "../../store/slices/movies.slice";
import './MovieList.css';
import {MoviesListCard} from "../MoviesListCard";

const MovieList = () => {
    const {movies, keywords, searched_query, status, actual_page, genres} = useSelector(state => state['movieReducer']);
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
        dispatch(getFilteredMovies({data: searched_query, keywords, actual_page}))
    },[])

    return (
        <div className={'movie-list'}>
            {(status === 'pending' && <h2>Loading...</h2>) ||
            movies.map(movie => <MoviesListCard key={movie.id} movie={changeGenres(movie)}/>)}
        </div>
    );
};

export {MovieList};