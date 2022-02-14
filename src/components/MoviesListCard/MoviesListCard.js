import React from 'react';
import {Link, Outlet, useParams} from "react-router-dom";

import {baseImgURL, imgSize} from "../../constants/urls/urls";
import './MovieListCard.css';

const MoviesListCard = ({movie}) => {

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

export {MoviesListCard};