import { baseUrl } from "../configs";
import axios from "axios";

/**
 * 根据不同环境设置不同的请求地址
 * 把返回值赋给axios.defaults.baseURL即可
 */
// function setBaseUrl(){
//   switch(process.env.NODE_ENV){
//     case 'development': return 'http://development.com';
//     case 'test': return 'http://test.com';
//     case 'production' : return 'https://production.com';
//     default : return baseUrl;
//   }
// }

// 默认基础请求地址
axios.defaults.baseURL = baseUrl;
// 请求是否带上cookie
axios.defaults.withCredentials = false;

axios.interceptors.request.use((config) => {
  if (!config.url?.endsWith("auth")) {
    config.headers.authToken = sessionStorage.getItem("Access-Token");
  }
  return config;
});

// 对返回的结果做处理
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error?.response?.status;
    switch (status) {
      case 401:
        localStorage.removeItem("Access-Token");
    }
    console.log("error", error)
    return Promise.reject(error);
  }
);

export default axios;
