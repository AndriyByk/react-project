import axios from "axios";

import baseURL from "../../constants/urls/urls";

const axiosService = axios.create({
    baseURL, headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTI5YmEwZmU4ZGM1NWJiMDJlMDcwM2Q1ZmIyYjRkOS' +
            'IsInN1YiI6IjYyMDAwNmFjZDM0ZWIzMDAxYzNmYWQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ' +
            '.qgFjFzXMD9a0gcfNFmdJUxbSHW6stbz2gpDOQO1cKmc'
    }
});

export default axiosService;