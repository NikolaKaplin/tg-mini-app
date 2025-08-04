// src/lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const authedAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

authedAxios.interceptors.request.use(config => {
    const token = useAuthStore().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})



export default authedAxios;