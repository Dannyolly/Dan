import axios ,{AxiosRequestConfig} from 'axios'
import { ElMessage } from 'element-plus'
import {LocalStorageManager} from "@/utils/localStorage";
const localHost = 'http://127.0.0.1:8000/'

const origin = "http://danny.free.svipss.top/"
const baseUrl = origin + "api/"
const normalUrl = origin
// 请求
const http = axios.create({
    baseURL: baseUrl,
    timeout: 6000
})

// 请求拦截
http.interceptors.request.use(config => {
    //请求头设置
    const token = LocalStorageManager.getLocalStorageInfo('token')
    //@ts-ignore
    config.headers.Authorization = token
    return config
}, err => {
    console.log(err);
})
// 响应拦截
http.interceptors.response.use(arr => {
    // 对响应码的处理
    //console.log(arr)
    /*switch (arr.status) {
        case 200:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'success',
            })
            break;
        case 201:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'success',
            })
            break;
        case 204:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'success',
            })
            break;
        case 400:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 401:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 403:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 404:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 422:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 500:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'error',
            })
            break;
    }*/
    return arr
}, err => {
    console.log(err);
})

export {
    http,
    baseUrl,
    normalUrl,
}
