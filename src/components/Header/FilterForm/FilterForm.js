import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {clearKeywords, getFilteredMovies, getGenres, getKeywords} from "../../../store/slices/movies.slice";
import './FilterForm.css';
import {keywordsService} from "../../../services/keywords.service/keywords.service";

const FilterForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const {genres, keywords} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        dispatch(getGenres());
    }, [])
//---------------------------------------------------
    const takeFilterInfo = (data) => {
        dispatch(getFilteredMovies({data, keywords: keyW}));
    }

//---------------------------------------------------
    // const keywordsRequest = (e) => {
    //     // console.log(e.target.value);
    //     setWord(e.target.value);
    //
    //     if (e.target.value !== "") {
    //         dispatch(getKeywords({word: e.target.value}));
    //     } else {
    //         dispatch(clearKeywords(undefined))
    //         // console.log(keywords);
    //     }
    // }
    // const [word, setWord] = useState('');

    const [keyW, setKeyW] = useState([]);

    const mediate = (e) => {
        if (e.target.value) {
            const data = async () => {
                return await keywordsService.getAll(e.target.value);
            }
            data().then(value => {
                const {results} = value;
                setKeyW(results)
            });
        } else {
            setKeyW([]);
        }
    }

    return (
        <div className={'filter-form'}>
            <form>
                <div className={'filter-form-body'}>
                    <div className={'filter-form-inputs'}>
                        <div className={'filter-form-input-keywords'}>
                            <div>
                                {(keyW.length === 0) && <div>No such word. Enter appropriate.</div>}
                            </div>
                            <div>
                                <input list="browsers" onChange={mediate} placeholder={'Enter keyword'} type="text"
                                       name={'keywords'}/>
                                <datalist id="browsers">
                                    {keyW.length && keyW.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
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
                        {/*<div className={'filter-form-input-adults'}>*/}
                        {/*    <div>For Adults:</div>*/}
                        {/*    <input type="checkbox" defaultChecked={false} {...register("adults")}/>*/}
                        {/*</div>*/}
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
    );
};

export default FilterForm;