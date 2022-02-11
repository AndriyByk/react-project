import React from 'react';
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.css';

const Layout = () => {
    return (
        <div className={'layout'}>
            <Header/>
            <MoviesPage/>
            <Footer/>
        </div>
    );
};

export default Layout;