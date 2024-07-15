import axios from "axios";

const defaultAxios = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    }
})

defaultAxios.interceptors.request.use(
    function (config) {
        console.log('Request Config',config);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
defaultAxios.interceptors.response.use(
    function (response) {
        console.log('response = ',response);
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
)

export { defaultAxios }