import axios from "axios";

export const baseURL = 'http://localhost:5000/api/';

const $api = axios.create({baseURL});
$api.interceptors.request.use((config) => {
    if (!config.headers) return;
    config.headers.authorization = `${localStorage.getItem('token')}`;
    return config;
});

export default $api;
