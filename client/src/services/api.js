import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:${process.env.NODE_ENV === 'development' ? '8000' : '3000'}`,
});

export default api;
