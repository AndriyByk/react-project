import {Route, Routes} from "react-router-dom";

import './App.css';
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieDetailsFull from "./pages/MovieDetailsFull/MovieDetailsFull";
import Layout from "./components/Layout/Layout";

function App() {
    return (
        <div className="App">
            <Routes>
                {/*<Route path={'/'} element={<Layout/>}>*/}
                    <Route path={'/'} element={<MoviesPage/>}>
                        <Route path={'/:id'} element={<MovieDetailsPage/>}/>
                    </Route>
                    <Route path={':id/details'} element={<MovieDetailsFull/>}/>
                {/*</Route>*/}
            </Routes>
        </div>
    );
}

export default App;
