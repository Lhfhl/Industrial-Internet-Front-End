import axios from "axios";

const http = axios.create({
  // 通用请求的地址前缀
  baseURL: '/api',
  timeout: 10000, //超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

const grafanaApi = axios.create({
  // 通用请求的地址前缀
  // maxRedirects: 0, // 禁用自动重定向
  timeout: 10000, //超时时间
  method: 'get'
  // headers:{
  //   token:'eyJrIjoiYXRmMk55MjkyQjlneVdWRFI1OFA2TzFEYzhTWFdaSVMiLCJuIjoibXlHcmFmYW5hIiwiaWQiOjF9'
})
grafanaApi.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.headers.Authorization = 'Bearer ' +'eyJrIjoibmVhU3JPMHhaVjN0UTNVSkhQR0VMaDBLbEtLMUhqY3EiLCJuIjoia2V5MSIsImlkIjoxfQ==';
  // return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
grafanaApi.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default http