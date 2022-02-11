import React from 'react';
import Header from "../../components/Header/Header";
import MovieList, {Memory} from "../../components/MoviesList/MovieList";
import Footer from "../../components/Footer/Footer";

import './MoviesPage.css';
const MoviesPage = () => {
    return (
        <div className={'movies-page'}>
            <Header/>
            <Memory/>
            {/*<MovieList/>*/}
            <Footer/>
        </div>
    );
};


export default MoviesPage;