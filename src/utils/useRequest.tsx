//  /utils/useRequest.tsx
import { useState, useRef, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
//defalut request data
const defalutRequestConfig = {
    url: '/', method: 'GET', data: {}, params: {}
}

// 2. T 就变成了传递进来的 ResponseType
function useRequest<T>(options: AxiosRequestConfig = defalutRequestConfig) {
    const navigate = useNavigate()

    // 3. data 的类型定义为 ResponseType ｜ null
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    //创建一个结束请求的实例
    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    }

    const request = useCallback((requestOptions?: AxiosRequestConfig) => {
        // 清空之前的请求状态和数据
        setData(null);
        setError('');
        setLoaded(false);
        //发送请求时,携带登陆token给后端
        const loginToken = localStorage.getItem('token')
        const headers = loginToken ? {
            token: loginToken
        } : {}
        // 发送请求
        return axios.request<T>({
            url: requestOptions?.url || options.url,
            method: requestOptions?.method || options.method,
            signal: controllerRef.current.signal,
            data: requestOptions?.data || options.data,
            params: requestOptions?.params || options.params, headers
        }).then(response => {
            setData(response.data);
            return response.data
        }).catch((e: any) => {
            if (e?.response.status === 403) {
                localStorage.removeItem('token')
                navigate('/login')
            }
            setError(e.message || 'unknown request error.');
            throw new Error(e)
        }).finally(() => {
            setLoaded(true);
        })
    }, [navigate, options])
    return { data, error, loaded, request, cancel }
}


export default useRequest;