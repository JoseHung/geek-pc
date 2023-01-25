import axios from 'axios'
import { getToken } from './token'

const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
    // if not login add token
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 2xx 范围内的状态码会触发该函数
    // 对响应数据做一些处理
    return response;
}, (error) => {
    // 超出 2xx 范围的状态码会触发该函数
    // 对响应错误做一些处理
    return Promise.reject(error);
})

export{ http }