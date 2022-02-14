import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import './SearchForm.css';
import {
    getNextSearchedMovies, getPreviousSearchedMovies,
    getSearchedMovies, saveDataFromInput,
} from "../../../store/slices/movies.slice";

const SearchForm = () => {
    const {movies_results, actual_page, searched_query} = useSelector(state => state['movieReducer']);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const takeSearchInfo = (data) => {
        dispatch(saveDataFromInput({data}));
        dispatch(getSearchedMovies({data, actual_page}));
    }

    const goNext = () => {
        if (actual_page < movies_results.pages)
            dispatch(getNextSearchedMovies({data: searched_query, actual_page}))
    }

    const goBack = () => {
        if (actual_page > 1)
            dispatch(getPreviousSearchedMovies({data: searched_query, actual_page}))
    }

    return (
        <div className={'search-form-wrapper'}>
            <div className={'search-form'}>
                <form>
                    <div className={'search-form-body'}>
                        <div className={'search-form-inputs'}>
                            <div className={'search-form-input-text'}>
                                <input placeholder={'Enter movie title'} type="text"
                                       defaultValue={''} {...register("name")}/>
                                <button onClick={handleSubmit(takeSearchInfo)}>Search</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={'pages'}>
                <button onClick={goBack}>Previous page</button>
                <div>{actual_page}</div>
                <button onClick={goNext}>Next page</button>
                <div>
                    Total pages: {movies_results.pages}
                </div>
                <div>
                    Total results: {movies_results.results}
                </div>
                {errors && <div>{errors[0]}
                </div>}
            </div>
        </div>
    );
};

export default SearchForm;