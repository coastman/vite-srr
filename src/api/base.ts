import axios, { 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, 
  type AxiosResponse 
} from 'axios';

const http: AxiosInstance = axios.create({
  // todo pro 环境下客户请求存在问题
  baseURL: import.meta.env.SSR ? 'http://localhost:3008/api' : '/api',
  withCredentials: true
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,

  (err) => Promise.reject(err)
)


http.interceptors.response.use(
  (response: AxiosResponse) => { 
    const { status } = response;
    console.log(status);
    console.log(import.meta.env.SSR);
    if (status === 200) return response.data;
    return response;
  },

  (err) => Promise.reject(err)
);

export default http;
