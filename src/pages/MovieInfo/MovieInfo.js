import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getMovieById} from "../../store/slices/movies.slice";
import {baseImgURL, imgSize} from "../../constants/urls/urls";
import './MovieInfo.css';

const MovieInfo = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {movie} = useSelector(state => state['movieReducer']);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMovieById({id}))
    }, [id]);

    return (
        <div className={'movie-details-full'}>
            <div className={'movie-details-full-back_button'}>
                <button onClick={() => {
                    navigate(`/`)
                }}>
                    {`${'<<'}`}
                </button>
            </div>
            <div className={'movie-details-full-info'}>
                <div className={'movie-details-full-title'}>
                    {movie.title}
                </div>
                <div className={'movie-details-full-original_title'}>
                    Original title: {movie.original_title}
                </div>
                <div className={'movie-details-full-release_runtime'}>
                    <div className={'movie-details-full-release'}>
                        Release: {movie.release_date}
                    </div>
                    <div className={'movie-details-full-runtime'}>
                        Runtime: {movie.runtime} min
                    </div>
                </div>
                <div className={'movie-details-full-genres'}>
                    {movie.genres?.map(genre => <div key={genre.name}
                                                     className={'movie-details-full-genre'}>{genre.name}</div>)}
                </div>
                <div className={'movie-details-full-overview'}>
                    {movie.overview}
                </div>
                <div className={'movie-details-full-homepage'}>
                    <a href={movie.homepage}>Site</a>
                </div>
                <div className={'movie-details-full-companies_countries'}>
                    <div className={'movie-details-full-companies'}>
                        <div className={'movie-details-full-companies-title'}>Production:</div>
                        <div className={'movie-details-full-companies-list'}>
                            {movie.production_companies?.map(company => <div
                                key={company.name} className={'movie-details-full-company'}>{company.name}</div>)}
                        </div>
                    </div>
                    <div className={'movie-details-full-countries'}>
                        <div className={'movie-details-full-countries-title'}>
                            Countries:
                        </div>
                        <div className={'movie-details-full-countries-list'}>
                            {movie.production_countries?.map(country => <div
                                key={country.name} className={'movie-details-full-country'}>{country.name}</div>)}
                        </div>
                    </div>
                </div>
                <div className={'movie-details-full-language_budget'}>
                    <div className={'movie-details-full-language'}>
                        Original language: {movie.original_language}
                    </div>
                    <div className={'movie-details-full-budget'}>Budget: {movie.budget}</div>
                </div>
                <div className={'movie-details-full-end'}>
                    <div className={'movie-details-full-vote'}>
                        <div className={'movie-details-full-vote_average'}>{movie.vote_average}</div>
                        <div className={'movie-details-full-vote_count'}>/{movie.vote_count}</div>
                    </div>
                </div>
            </div>
            <div className={'movie-details-full-image'}>
                <img src={baseImgURL + imgSize.backdrop_w1280 + movie.poster_path} alt=""/>
            </div>
        </div>
    );
};

export {MovieInfo};