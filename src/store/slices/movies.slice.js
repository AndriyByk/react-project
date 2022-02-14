import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {movieService} from "../../services/movie.service/movie.service";
import {genreService} from "../../services/genre.service/genre.service";
import {keywordsService} from "../../services/keywords.service/keywords.service";

const initialState = {
    genres: [],
    movie: {},
    movie_short: {},
    status: null,
    error: null,
    movies: [],
    movies_results: {pages: 0, results: 0},
    actual_page: 1,
    searched_query: {},
    keywords: [],

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
    async ({data, keywords, actual_page}, {rejectWithValue, dispatch}) => {
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
    async ({data, keywords, actual_page}, {rejectWithValue, dispatch}) => {
        try {
            let queries = '';
            queries = queries.concat(`include_adult=${false}`)

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
)


export const getSearchedMovies = createAsyncThunk(
    'movieSlice/getSearchedMovies',
    async ({data, actual_page}, {rejectWithValue, dispatch}) => {
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
    async ({data, actual_page}, {rejectWithValue, dispatch}) => {
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
    async ({data, actual_page}, {rejectWithValue, dispatch}) => {
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
        clearKeywords: ((state) => {
            state.keywords.length = 0;
            console.log(state.keywords);
        }),

        clearActualPage: (state => {
            state.actual_page = 1;
        }),

        addMoviesResults: ((state, action) => {
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
        }),

        saveDataFromInput: ((state, action) => {
            state.searched_query = action.payload.data;
        }),

        saveKeyWords: ((state, action) => {
            state.keywords = action.payload.keyW;
        }),

        incrementPage: ((state) => {
            if (state.actual_page <= state.movies_results.pages) {
                state.actual_page += 1;
            }
        }),

        decrementPage: (state => {
            if (state.actual_page > 1)
                state.actual_page -= 1;
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
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
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
            state.movies = action.payload.results;
            state.movies_results = {
                pages: action.payload.total_pages,
                results: action.payload.total_results
            }
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
        },
        [getKeywords.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
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
        [getNextSearchedMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
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
        [getPreviousSearchedMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
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
        [getNextFilteredMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
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
        [getPreviousFilteredMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload;
        },
    }
});

export const {
    clearKeywords,
    addMoviesResults,
    saveDataFromInput,
    decrementPage,
    incrementPage,
    clearActualPage,
    saveKeyWords,
    saveMovieShort,
} = movieSlice.actions;

const movieReducer = movieSlice.reducer;
export {movieReducer};