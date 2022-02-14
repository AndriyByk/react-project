import {Route, Routes} from "react-router-dom";

import './App.css';
import {MoviesPage} from "./pages/MoviesPage";
import {MovieDetailsPage} from "./pages/MovieDetailsPage";
import {MovieInfo} from "./pages/MovieInfo";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MoviesPage/>}>
                    <Route path={'/:id'} element={<MovieDetailsPage/>}/>
                </Route>
                <Route path={':id/details'} element={<MovieInfo/>}/>
            </Routes>
        </div>
    );
}

export default App;
