import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getMovieById} from "../../store/slices/movies.slice";
import {baseImgURL, imgSize} from "../../constants/urls/urls";
import './MovieDetailsFull.css';

const MovieDetailsFull = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {movie} = useSelector(state => state['movieReducer']);

    // console.log(movie)
    useEffect(() => {
        dispatch(getMovieById({id}))
    }, [id]);


//     adult: false
// backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg"
// belongs_to_collection: Object { id: 531241, name: "Spider-Man (Avengers) Collection", poster_path: "/nogV4th2P5QWYvQIMiWHj4CFLU9.jpg", … }
// budget: 200000000
// genres: Array(3) [ {…}, {…}, {…} ]
// homepage: "https://www.spidermannowayhome.movie"
// id: 634649
// imdb_id: "tt10872600"
// original_language: "en"
// original_title: "Spider-Man: No Way Home"
// overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
// popularity: 12335.96
// poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
// production_companies: Array(3) [ {…}, {…}, {…} ]
// production_countries: Array [ {…} ]
// release_date: "2021-12-15"
//      revenue: 1775000000
// runtime: 148

// spoken_languages: Array [ {…}, {…} ]

//      status: "Released"
//      tagline: "The Multiverse unleashed."

// title: "Spider-Man: No Way Home"

//      video: false

// vote_average: 8.4
// vote_count: 7369

    return (
        <div className={'movie-details-full'}>
            <div>

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
                    <div className={'movie-details-full-back_button'}>
                        <button>
                            Back to the list!
                        </button>
                    </div>
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

export default MovieDetailsFull;