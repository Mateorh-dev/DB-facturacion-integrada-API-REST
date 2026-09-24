import axios from "axios";

const host = "http://127.0.0.1:8000/";
const api = axios.create({
    baseURL: host,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});

export default api;