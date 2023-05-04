import axios, { 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, 
  type AxiosResponse 
} from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:6173/api',
  withCredentials: true
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,

  (err) => Promise.reject(err)
)


http.interceptors.response.use(
  (response: AxiosResponse) => { 
    const { status } = response;
    if (status === 200) return response.data;
    return response;
  },

  (err) => Promise.reject(err)
);

export default http;
