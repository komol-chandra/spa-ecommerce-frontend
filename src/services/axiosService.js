import axios from "axios";
import {useAuth} from "@/stores";
import {storeToRefs} from "pinia";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "api/v1/",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const {user} = storeToRefs(useAuth());
    const AUTH_TOKEN = user.data ? `Bearer ${user.meta.token}`:"";
// Alter defaults after instance has been created
    config.headers.common['Authorization'] = AUTH_TOKEN;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axiosInstance;
