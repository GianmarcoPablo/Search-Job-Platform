import axios from "axios";
import { useAuthStore } from "../store/auth-store";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    } else {
        delete config.headers["Authorization"];
    }
    return config;
})

export default instance;