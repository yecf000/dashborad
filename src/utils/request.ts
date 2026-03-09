import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import $toastMessage from "@/components/ToastMessage/index";

class HttpRequest {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API,
      timeout: 100000,
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      this.requestInterceptor,
      this.requestInterceptorError
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError
    );
  }

  requestInterceptor = (config: AxiosRequestConfig) => {

    config.headers["Content-Type"] = config?.headers?.["Content-Type"] ?? "application/json";
    config.headers["Accept"] = config?.headers?.["Accept"] ?? "application/json";
    // config.headers["lang"] = localStorage.getItem('lang') || 'en';
    // config.headers["token"] = localStorage.getItem("Token") || "";
    // config.headers["think-lang"] = localStorage.getItem("lang") || "en";
    return config;
  };

  requestInterceptorError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  responseInterceptor = (response: AxiosResponse) => {
    //响应拦截
    if (response.config.url?.includes('www.okx.com')) {
      return response.data
    } else {
      if (response.status == 200) {
        if (response.data.code == 401) {
          window.location.href = "/login";
        } else if (response.data.code == 1) {
          return response;
        } else {
          //消息提示
          $toastMessage.show({
            color: "#999",
            message: response.data.msg,
            location: "top",
          });
          return Promise.reject(response.data.msg);
        }
      }
    }
  };

  responseInterceptorError = (error: AxiosError<{ code: number; msg: string }>) => {
    if (error.response?.data && error.response?.data?.code == 401) {
      $toastMessage.show({
        color: "#999",
        message: error.response?.data.msg,
        location: "top",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    } else {
      $toastMessage.show({
        color: "#999",
        message: error.response?.data.msg,
        location: "top",
      });
      return Promise.reject(error);
    }
  };

  request<T>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config);
  }

  get<T>(config: AxiosRequestConfig) {
    const { url, data, ...arr } = config
    return this.instance.get<T>(url ?? '', {
      params: data,
      ...arr
    });
  }
  post<T>(config: AxiosRequestConfig) {
    const { url, data, ...arr } = config
    return this.instance.post<T>(url ?? '', data, arr);
  }
}

const http = new HttpRequest();

export default http;
