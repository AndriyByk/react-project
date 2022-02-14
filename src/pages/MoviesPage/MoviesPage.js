import React from 'react';

import './MoviesPage.css';
import {Header} from "../../components/Header";
import {MovieList} from "../../components/MoviesList";
import {Footer} from "../../components/Footer";

const MoviesPage = () => {

    return (
        <div className={'movies-page'}>
            <Header/>
            <MovieList/>
            <Footer/>
        </div>
    );
};

export {MoviesPage};