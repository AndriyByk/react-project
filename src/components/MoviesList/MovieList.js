import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getFilteredMovies, getMovies} from "../../store/slices/movies.slice";
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import './MovieList.css';
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import {useParams} from "react-router-dom";

const MovieList = () => {
    const {movies, keywords, searched_query, status, actual_page, error, genres} = useSelector(state => state['movieReducer']);
    const dispatch = useDispatch();
const {id} = useParams();

    console.log(movies);
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
        console.log('getFM')
        console.log(searched_query);
        console.log(keywords);
        console.log(actual_page);
        // if (keywords!==undefined || searched_query)
        dispatch(getFilteredMovies({data: searched_query, keywords, actual_page}))
    },[])

    return (
        <div className={'movie-list'}>
            {status === 'pending' && <h2>Трішки зачекайте..</h2>}
            {/*{error && <h2>{error}</h2>}*/}
            {movies.map(movie => <MoviesListCard key={movie.id} movie={changeGenres(movie)}/>)}
        </div>
    );
};

// export const Memory = React.memo(MovieList);
export default MovieList;