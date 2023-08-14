import axios, { type AxiosInstance } from 'axios';
// import { app } from '@/main';

const baseURL = import.meta.env.VITE_BASE_URL || '';

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $http: AxiosInstance;
    }
}

// app.config.globalProperties.$http = axios;

export const api = axios.create({
  baseURL,
});
