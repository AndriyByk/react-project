import React, {useEffect, useRef} from 'react';
import {Link, Outlet, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {baseImgURL, imgSize} from "../../constants/urls/urls";
import './MovieDetailsPage.css';
import {saveMovieShort} from "../../store/slices/movies.slice";

const MovieDetailsPage = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {movies, movie_short} = useSelector(state => state['movieReducer']);
    const {state} = useLocation();

    const focus = useRef(null);
    const executeScroll = () => focus.current.scrollIntoView()

    useEffect(() => {
        if (!state) {
            for (let i = 0; i < movies.length; i++) {
                if (id === movies[i].id) {
                    dispatch(saveMovieShort({movie_short: movies[i]}))
                    break;
                }
            }
        } else {
            const {movie} = state;
            dispatch(saveMovieShort({movie_short: movie}))
        }
        executeScroll();
    }, [movie_short])

    return (
        <div className={'movie-details-short'}>
            <div className={'movie-details-short-text-picture'}>
                <div ref={focus} className={'movie-details-short-image'}><img
                    src={baseImgURL + imgSize.backdrop_original + movie_short.backdrop_path} alt=""/></div>
            </div>
            <div className={'movie-details-short-text'}>
                <div className={'movie-details-short-title'}>{movie_short.title}</div>
                <div className={'movie-details-short-body'}>
                    <div className={'movie-details-short-release_year'}>Release
                        date: <span>{movie_short.release_date}</span></div>
                    <div className={'movie-details-short-vote'}>
                        <div className={'movie-details-short-vote_average'}>
                            {movie_short.vote_average}</div>
                        <div className={'movie-details-short-vote_count'}>/{movie_short.vote_count}</div>
                    </div>
                </div>
                <div className={'movie-details-short-genres'}>Genres:
                    {movie_short.genre_ids?.map(genre => <div className={'movie-details-short-genre'}
                                                              key={genre}>{genre.toUpperCase()}</div>)}
                </div>
                <div className={'movie-details-short-overview'}>
                    {movie_short.overview}
                </div>
                <Link to={'details'}>
                    <div className={'movie-details-short-link'}>
                        DETAILS
                        <Outlet/>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export {MovieDetailsPage};