import axios from "axios";

const Api = axios;

Api.defaults.baseURL = "http://localhost:5500/";

Api.interceptors.request.use(async (config) => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
        config.headers["Authorization"] = `Barer ${token}`;
    }
    return config;
});
export { Api };
