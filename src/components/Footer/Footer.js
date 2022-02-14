import React from 'react';

import './Footer.css';
import {FilterForm} from "../Header/FilterForm";

const Footer = () => {
    return (
        <div className={'footer'}>
            <FilterForm/>
        </div>
    );
};

export {Footer};