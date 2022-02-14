import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import './FilterForm.css';
import {
    clearActualPage,
    getFilteredMovies,
    getGenres, getNextFilteredMovies,
    getPreviousFilteredMovies, saveDataFromInput, saveKeyWords
} from "../../../store/slices/movies.slice";
import {keywordsService} from "../../../services/keywords.service/keywords.service";

const FilterForm = () => {

    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {genres, actual_page, searched_query, movies_results, keywords} = useSelector(state => state['movieReducer']);
    const [keyW, setKeyW] = useState([]);

    const takeFilterInfo = (data) => {
        dispatch(clearActualPage(undefined))
        dispatch(saveDataFromInput({data}))
        dispatch(saveKeyWords({keyW}))
        dispatch(getFilteredMovies({data, keywords: keyW, actual_page}));
    }

    const mediate = (e) => {
        const input_data = e.target.value;
        if (input_data) {
            const data = async () => {
                return await keywordsService.getAll(input_data);
            }
            data().then(value => {
                const {results} = value;
                setKeyW(results)
            });
        } else {
            setKeyW([]);
        }
    }

    const goNextPage = () => {
        if (actual_page < movies_results.pages)
            dispatch(getNextFilteredMovies({data: searched_query, keywords, actual_page}))
    }

    const goBackPage = () => {
        if (actual_page > 1)
            dispatch(getPreviousFilteredMovies({data: searched_query, keywords, actual_page}))
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [])

    return (
        <div className={'filter-form'}>
            <div className={'filter-form-wrapper'}>
                <form>
                    <div className={'filter-form-body'}>
                        <div className={'filter-form-inputs'}>
                            <div className={'filter-form-input-keywords'}>
                                <div className={'filter-form-input-keywords-warning'}>
                                    {(keyW.length === 0) && <div>No such keyword. Enter appropriate.</div>}
                                </div>
                                <div className={'filter-form-input-keywords-input'}>
                                    <input list="keywords" onChange={mediate} placeholder={'Enter keyword'} type="text"
                                           name={'keywords'}/>
                                    <datalist id="keywords">
                                        {keyW.length && keyW.map(w => <option key={w.id}
                                                                              value={w.name}>{w.name}</option>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className={'filter-form-input-genres'}>
                                <div>Genre:</div>
                                <select {...register('genre')}>
                                    <option>All genres</option>
                                    {genres.map(genre =>
                                        <option className={'filter-form-input-genre'} key={genre.id}
                                                value={genre.id}>
                                            {genre.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className={'filter-form-input-date_release_after'}>
                                <div>Release after:</div>
                                <input type="date" {...register('release_after')}/>
                            </div>
                            <div className={'filter-form-input-date_release_before'}>
                                <div>Release before:</div>
                                <input type="date" {...register('release_before')}/>
                            </div>
                        </div>
                        <div className={'button'}>
                            <button onClick={handleSubmit(takeFilterInfo)}>Filter</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={'pages-wrapper'}>
                <div className={'pages'}>
                    <div className={'pages-buttons'}>
                        <div className={'pages-previous_page_button'}>
                            <button onClick={goBackPage}>{`${'<<'}`} Previous page</button>
                        </div>
                        <div className={'pages-actual-page'}>{actual_page}</div>
                        <div className={'pages-next_page_button'}>
                            <button onClick={goNextPage}>Next page {`${'>>'}`}</button>
                        </div>
                    </div>
                    <div className={'pages-total_info'}>
                        <div className={'pages-total_pages'}>Total pages: {movies_results.pages}</div>
                        <div className={'pages-total_results'}>Total results: {movies_results.results}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {FilterForm};