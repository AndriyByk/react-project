import React from 'react';
import FilterForm from "./FilterForm/FilterForm";
import SearchForm from "./SearchForm/SearchForm";

const Header = () => {
    return (
        <div className={'header'}>
            <SearchForm/>
            {/*<FilterForm/>*/}
        </div>
    );
};

export default Header;