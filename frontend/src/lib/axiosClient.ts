// src/lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

api.interceptors.request.use(config => {
    const token = useAuthStore().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


const axiosClient = {
    get: <T>(url: string, config?: InternalAxiosRequestConfig) =>
        api.get<T>(url, config),

    post: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
        api.post<T>(url, data, config),

    put: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
        api.put<T>(url, data, config),

    patch: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
        api.patch<T>(url, data, config),

    delete: <T>(url: string, config?: InternalAxiosRequestConfig) =>
        api.delete<T>(url, config),

    upload: (url: string, file: File, fieldName = 'file') => {
        const formData = new FormData();
        formData.append(fieldName, file);
        return api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default axiosClient;