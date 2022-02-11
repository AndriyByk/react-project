import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {getSearchedMovies} from "../../../store/slices/movies.slice";
import './SearchForm.css';

const SearchForm = () => {
const {movies_results, page_counter} = useSelector(state => state['movieReducer']);
    const {register, handleSubmit, getValues, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const takeSearchInfo = (data) => {


        console.log(data);
        const state = getValues()
        const value = {name: state}
        console.log(value);
        if (!data) {
            dispatch(getSearchedMovies({data: value, page_counter}));
        } else {
            dispatch(getSearchedMovies({data, counter}));
        }
    }

   //////////////////
    const [counter, setCounter] = useState(1);

    // const goFirstPage = () => {
    //     setCounter(1);
    // }
    //
    // const goAhead = () => {
    //     setCounter(counter+1);
    // }
    //
    // const goBack = () => {
    //     setCounter(counter-1);
    // }
    console.log(movies_results);
    /////////////////////

    return (
        <div className={'search-form-wrapper'}>
            <div className={'search-form'}>
                <form>
                    <div className={'search-form-body'}>
                        {/*<div className={'search-form-label'}>Label</div>*/}
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
                <button onClick={takeSearchInfo}>1</button>
                <button onClick={takeSearchInfo}>{counter-1}</button>
                <div>{counter}</div>
                <button onClick={takeSearchInfo}>{counter+1}</button>    {}

                {/*<div>*/}
                {/*    Total pages: {movies_results.pages}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Total results: {movies_results.results}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default SearchForm;