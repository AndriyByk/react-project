import React, {useEffect, useRef, useState} from 'react';
import {Link, Outlet, useLocation, useParams} from "react-router-dom";

import {baseImgURL, imgSize} from "../../constants/urls/urls";
import './MovieDetailsPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getMovieById} from "../../store/slices/movies.slice";

const MovieDetailsPage = () => {

//     adult: false
// backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg"
// genre_ids: Array(3) [ "Action", "Adventure", "Science Fiction" ]
// id: 634649
// original_language: "en"
// original_title: "Spider-Man: No Way Home"
// overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
// popularity: 12335.96
// poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
// release_date: "2021-12-15"
// title: "Spider-Man: No Way Home"
// video: false
// vote_average: 8.4
// vote_count: 7356

    ////////////////////////////////////////////////////////////

    const {id} = useParams();
    const {movies} = useSelector(state => state['movieReducer']);

    const [state1, setState1] = useState({});

    const {state} = useLocation();

    const focus = useRef(null);
    const executeScroll = () => focus.current.scrollIntoView()

    useEffect(() => {
        if (!state) {
            for (let i = 0; i < movies.length; i++) {
                if (id === movies[i].id) {
                    setState1(movies[i])
                    break;
                }
            }
        } else {
            const {movie} = state;
            setState1(movie)
        }
        executeScroll();
    }, [state1])

    return (
        <div className={'movie-details-short'}>
            <div ref={focus} className={'movie-details-short-image'}><img
                src={baseImgURL + imgSize.backdrop_w780 + state1.backdrop_path} alt=""/></div>
            <div className={'movie-details-short-title'}>{state1.title}</div>
            <div className={'movie-details-short-body'}>
                <div className={'movie-details-short-release_year'}>Release date: {state1.release_date}</div>
                <div className={'movie-details-short-vote'}>
                    <div className={'movie-details-short-vote_average'}>Vote
                        average: {state1.vote_average}</div>
                    <div className={'movie-details-short-vote_count'}>Vote count: {state1.vote_count}</div>
                </div>
            </div>
            <div className={'movie-details-short-genres'}>Genres:
                {state1.genre_ids?.map(genre => <div key={genre}>{genre}</div>)}
            </div>
            <div className={'movie-details-short-overview'}>
                {state1.overview}
            </div>
            <div>
                <Link to={'details'}>Details</Link>
                <Outlet/>
            </div>
        </div>
    );
};

export default MovieDetailsPage;