import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../../services/movie.service/movie.service";
import {genreService} from "../../services/genre.service/genre.service";
import {keywordsService} from "../../services/keywords.service/keywords.service";

const initialState = {
    movies: [],
    genres: [],
    movie: {},
    status: null,
    error: null,
    movies_results: {pages: 0, results: 0},
    page_counter: 1,
    // keywords: []
}

export const getMovies = createAsyncThunk(
    'movieSlice/getMovies',
    async (queries, {rejectWithValue, dispatch}) => {
        try {
            const movies = movieService.getAll(queries);
            // const {payload} = movies;

            // dispatch(addMoviesResults(movies));
            return movies;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getMovieById = createAsyncThunk(
    'movieSlice/getMovieById',
    async ({id}, {rejectWithValue}) => {
        try {
            return movieService.getById(id);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getFilteredMovies = createAsyncThunk(
    'movieSlice/getFilteredMovies',
    async ({data, keywords}, {rejectWithValue, dispatch}) => {
        try {
            let queries = '';

            // include_adult
            // if (data.adults === true) {
            //     queries = queries.concat(`include_adult=${true}`);
            // } else {
            //     queries = queries.concat(`include_adult=${false}`);
            // }
            queries = queries.concat(`include_adult=${false}`)

            // keywords
            if (keywords.length !== 0) {
                queries = queries.concat(`&with_keywords=${keywords[0].id}`);

                // for (let i = 0; i < keywords.length; i++) {
                //     queries = queries.concat(keywords[i].id);
                //     if (i !== keywords.length-1) {
                //         queries = queries.concat(',');
                //     }
                // }
            }

            // genres
            if (data.genre !== '' && data.genre !== null) {
                queries = queries.concat(`&with_genres=${data.genre}`);
            }

            // release date greater then
            if (data.release_after !== '')
                queries = queries.concat(`&release_date.gte=${data.release_after}`);
            // release date less then
            if (data.release_before !== '')
                queries = queries.concat(`&release_date.lte=${data.release_before}`);


            // console.log(queries);
            const movies = movieService.getAll(queries);
            // dispatch(addMoviesResults(movies))

            return movies;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);


export const getGenres = createAsyncThunk(
    'movieSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            return genreService.getAll();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getKeywords = createAsyncThunk(
    'movieSlice/getKeywords',
    async ({word}, {rejectWithValue}) => {
        try {
            console.log(word);
            return keywordsService.getAll(word);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)


export const getSearchedMovies = createAsyncThunk(
    'movieSlice/getSearchedMovies',
    async ({data, counter}, {rejectWithValue, dispatch}) => {
        try {
            let query = '';
            query = query.concat(`query=${data.name}`)

            //page
            query = query.concat(`&page=${counter}`)

            console.log('ooooooooooooooo')



            const movies = movieService.getByQuery(query);
            // dispatch(addMoviesResults(movies))

            return movies;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        clearKeywords: ((state) => {

            state.keywords.length = 0;
            console.log(state.keywords);
        }),

        addMoviesResults: ((state, action) => {
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
        })
        // takeShortInfoFromState: (state => {
        //     for (let i = 0; i < state.movies.length; i++) {
        //
        //     }
        // })

    },
    extraReducers: {
        [getMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
            // console.log(state.movies);
        },
        [getMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
//--------------------------------------------------------
        [getGenres.pending]: (state) => {
            state.status = 'pending';
        },
        [getGenres.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            // console.log(action);
            state.genres = action.payload.genres;
        },
        [getGenres.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
//--------------------------------------------------------
        [getMovieById.pending]: (state) => {
            state.status = 'pending';
        },
        [getMovieById.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            // console.log(action.payload);
            state.movie = action.payload;
            // console.log(state.movie);
        },
        [getMovieById.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
//--------------------------------------------------------
        [getFilteredMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getFilteredMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            // console.log(action.payload);
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
            // console.log(state.movies);
        },
        [getFilteredMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
//--------------------------------------------------------
        [getSearchedMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getSearchedMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            // console.log(action.payload.results);
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }

            // console.log(state.movies);
        },
        [getSearchedMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
//--------------------------------------------------------
        [getKeywords.pending]: (state) => {
            state.status = 'pending';
        },
        [getKeywords.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.keywords = action.payload.results;
            console.log(state.keywords);
        },
        [getKeywords.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
    }
});

export const {clearKeywords,addMoviesResults} = movieSlice.actions;

const movieReducer = movieSlice.reducer;
export {movieReducer};