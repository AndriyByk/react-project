import axiosService from "../axios.service/axios.service";
import {movieUrl} from "../../constants/urls/urls";

export const keywordsService = {
    getAll:(query)=> axiosService.get(`${movieUrl.searchedKeywords}${query}`).then(value => value.data)
}