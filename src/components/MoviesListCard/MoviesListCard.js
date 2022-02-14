import React, {useEffect, useRef} from 'react';
import {Link, Outlet, useParams} from "react-router-dom";

import {baseImgURL, imgSize} from "../../constants/urls/urls";
import './MovieListCard.css';

const MoviesListCard = ({movie}) => {

//  { id: 28, name: "Action" }
//  { id: 12, name: "Adventure" }
//  { id: 16, name: "Animation" }
//  { id: 35, name: "Comedy" }
//  { id: 80, name: "Crime" }
//  { id: 99, name: "Documentary" }
//  { id: 18, name: "Drama" }
//  { id: 10751, name: "Family" }
//  { id: 14, name: "Fantasy" }
//  { id: 36, name: "History" }
//  { id: 27, name: "Horror" }
//  { id: 10402, name: "Music" }
//  { id: 9648, name: "Mystery" }
//  { id: 10749, name: "Romance" }
//  { id: 878, name: "Science Fiction" }
//  { id: 10770, name: "TV Movie" }
//  { id: 53, name: "Thriller" }
//  { id: 10752, name: "War" }
//  { id: 37, name: "Western" }
//     adult: false
//     backdrop_path: "/jlQJDD0L5ZojjlS0KYnApdO0n19.jpg"
//     genre_ids: Array(4) [ 28, 12, 14, … ]
//          0: 28
//          1: 12
//          2: 14
//          3: 878
//     id: 19995
//     original_language: "en"
//     original_title: "Avatar"
//     overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization."
//     popularity: 447.244
//     poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg"
//     release_date: "2009-12-10"
//     title: "Avatar"
//     video: false
//     vote_average: 7.5
//     vote_count: 24847

    const {id} = useParams();


    return (
        <div className={'movie'}>
            <Link to={`/${movie.id}`} state={{movie}}>
                {movie.id !== +id &&
                <div className={'movie-wrapper'}>
                    <div className={'movie-image'}>{(movie.backdrop_path &&<img src={baseImgURL + imgSize.logo_w300 + movie.backdrop_path} alt=""/>) || <div>No picture</div>}</div>
                    <div className={'movie-title'}>{movie.title}</div>
                    <div className={'movie-body'}>
                        <div className={'movie-release-year'}>Release: {movie.release_date}</div>
                        <div className={'movie-vote'}>
                            <div className={'movie-vote-average'}>{movie.vote_average}</div>
                            <div className={'movie-vote-count'}>/{movie.vote_count}</div>
                        </div>
                    </div>
                    <div className={'movie-genres'}>
                        {movie.genre_ids.map(genre => <div className={'movie-genre'} key={genre}>{genre}</div>)}
                    </div>
                </div>}
            </Link>
            {movie.id === +id &&
            <div className={'movie-details-page'}><Outlet/></div>
            }
        </div>
    );
};

export default MoviesListCard;