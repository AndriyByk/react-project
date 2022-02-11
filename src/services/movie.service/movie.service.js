import axiosService from "../axios.service/axios.service";
import {movieUrl} from "../../constants/urls/urls";

export const movieService = {
    getAll:(queries)=> axiosService.get(movieUrl.filteredMovies + queries).then(value => value.data),
    getById:(id)=> axiosService.get(`${movieUrl.definedMovie}/${id}?`).then(value => value.data),
    getByQuery:(query)=> axiosService.get(`${movieUrl.searchedMovies}${query}`).then(value => value.data)
}