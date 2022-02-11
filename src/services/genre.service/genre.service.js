import axiosService from "../axios.service/axios.service";
import {movieUrl} from "../../constants/urls/urls";

export const genreService = {
    getAll:()=> axiosService.get(movieUrl.allGenres).then(value => value.data),
}