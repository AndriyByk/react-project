import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {movieService} from "../../services/movie.service/movie.service";
import {genreService} from "../../services/genre.service/genre.service";
import {keywordsService} from "../../services/keywords.service/keywords.service";

const initialState = {
    genres: [],
    movie: {},
    movie_short: {},
    status: null,
    movies: [],
    movies_results: {pages: 0, results: 0},
    actual_page: 1,
    searched_query: {},
    keywords: []
}

export const getMovies = createAsyncThunk(
    'movieSlice/getMovies',
    async (queries, {rejectWithValue}) => {
        try {
            return movieService.getAll(queries);
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
    async ({data, keywords, actual_page}, {rejectWithValue}) => {
        try {
            if (!data && (!keywords || keywords.length === 0))
               return movieService.getAll();

            let queries = '';
            queries = queries.concat(`include_adult=${false}`)

            // keywords
            if (keywords.length !== 0) {
                queries = queries.concat(`&with_keywords=${keywords[0].id}`);
            }

            // genres
            if (data.genre !== '' && data.genre !== null && data.genre !== undefined) {
                queries = queries.concat(`&with_genres=${data.genre}`);
            }

            // release date greater then
            if (data.release_after !== '' && data.release_after !== undefined)
                queries = queries.concat(`&release_date.gte=${data.release_after}`);

            // release date less then
            if (data.release_before !== ''&& data.release_before !== undefined)
                queries = queries.concat(`&release_date.lte=${data.release_before}`);

            // page
            if (actual_page && actual_page!==1) {
                queries = queries.concat(`&page=${actual_page}`)
            }

            return movieService.getAll(queries);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getNextFilteredMovies = createAsyncThunk(
    'movieSlice/getNextFilteredMovies',
    async ({data, keywords, actual_page}, {rejectWithValue}) => {
        try {
            let queries = '';
            queries = queries.concat(`include_adult=${false}`)

            // keywords
            if (keywords && keywords.length>0)
                queries = queries.concat(`&with_keywords=${keywords[0].id}`);

            // genres
            if (data.genre !== '' && data.genre !== null && data.genre !== undefined)
                queries = queries.concat(`&with_genres=${data.genre}`);

            // release date greater then
            if (data.release_after !== '' && data.release_after !== undefined)
                queries = queries.concat(`&release_date.gte=${data.release_after}`);

            // release date less then
            if (data.release_before !== '' && data.release_before !== undefined)
                queries = queries.concat(`&release_date.lte=${data.release_before}`);

            queries = queries.concat(`&page=${actual_page + 1}`)

            return movieService.getAll(queries);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getPreviousFilteredMovies = createAsyncThunk(
    'movieSlice/getPreviousFilteredMovies',
    async ({data, keywords, actual_page}, {rejectWithValue}) => {
        try {
            let queries = '';
            queries = queries.concat(`include_adult=${false}`);

            // keywords
            if (keywords && keywords.length>0) {
                queries = queries.concat(`&with_keywords=${keywords[0].id}`);
            }

            // genres
            if (data.genre !== '' && data.genre !== null && data.genre !== undefined) {
                queries = queries.concat(`&with_genres=${data.genre}`);
            }

            // release date greater then
            if (data.release_after !== '' && data.release_after !== undefined)
                queries = queries.concat(`&release_date.gte=${data.release_after}`);

            // release date less then
            if (data.release_before !== '' && data.release_before !== undefined)
                queries = queries.concat(`&release_date.lte=${data.release_before}`);

            queries = queries.concat(`&page=${actual_page-1}`)

            return movieService.getAll(queries);
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
            return keywordsService.getAll(word);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getSearchedMovies = createAsyncThunk(
    'movieSlice/getSearchedMovies',
    async ({data, actual_page}, {rejectWithValue}) => {
        try {
            const query_const = `query=${data.name}&page=${actual_page}`
            return movieService.getByQuery(query_const)
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getNextSearchedMovies = createAsyncThunk(
    'movieSlice/getNextSearchedMovies',
    async ({data, actual_page}, {rejectWithValue}) => {
        try {
            const query_const = `query=${data.name}&page=${actual_page+1}`
            return movieService.getByQuery(query_const)
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getPreviousSearchedMovies = createAsyncThunk(
    'movieSlice/getPreviousSearchedMovies',
    async ({data, actual_page}, {rejectWithValue}) => {
        try {
            const query_const = `query=${data.name}&page=${actual_page-1}`
            return movieService.getByQuery(query_const)
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {

        clearActualPage: (state => {
            state.actual_page = 1;
        }),

        saveDataFromInput: ((state, action) => {
            state.searched_query = action.payload.data;
        }),

        saveKeyWords: ((state, action) => {
            state.keywords = action.payload.keyW;
        }),

        saveMovieShort: ((state, action) => {
             state.movie_short = action.payload.movie_short
        })

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
        },
//--------------------------------------------------------
        [getGenres.pending]: (state) => {
            state.status = 'pending';
        },
        [getGenres.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.genres = action.payload.genres;
        },
//--------------------------------------------------------
        [getMovieById.pending]: (state) => {
            state.status = 'pending';
        },
        [getMovieById.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movie = action.payload;
        },
//--------------------------------------------------------
        [getFilteredMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getFilteredMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
        },
//--------------------------------------------------------
        [getSearchedMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getSearchedMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
        },
//--------------------------------------------------------
        [getKeywords.pending]: (state) => {
            state.status = 'pending';
        },
        [getKeywords.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.keywords = action.payload.results;
        },
//--------------------------------------------------------
        [getNextSearchedMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getNextSearchedMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.actual_page = state.actual_page+1
        },
//--------------------------------------------------------
        [getPreviousSearchedMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getPreviousSearchedMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.actual_page = state.actual_page-1
        },
//--------------------------------------------------------
        [getNextFilteredMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getNextFilteredMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.actual_page = state.actual_page+1
        },
//--------------------------------------------------------
        [getPreviousFilteredMovies.pending]: (state) => {
            state.status = 'pending';
        },
        [getPreviousFilteredMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload.results;
            state.actual_page = state.actual_page-1
        },
    }
});

export const {
    saveDataFromInput,
    clearActualPage,
    saveKeyWords,
    saveMovieShort,
} = movieSlice.actions;

const movieReducer = movieSlice.reducer;
export {movieReducer};