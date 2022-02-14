import React from 'react';

import './Header.css';

const Header = () => {

    return (
        <div className={'header'}>
            <div className={'site-logo'}>
                MovieCO
            </div>
            <div className={'user'}>
                User
            </div>
        </div>
    );
};

export {Header};