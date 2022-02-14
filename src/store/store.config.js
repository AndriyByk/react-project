import {configureStore} from "@reduxjs/toolkit";

import {movieReducer} from "./slices/movies.slice";

let store = configureStore({
    reducer: {
        movieReducer
    }
});

export {store};