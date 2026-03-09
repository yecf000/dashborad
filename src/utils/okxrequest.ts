import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import CryptoJS from 'crypto-js'
import account from "@/config/account";
import $toastMessage from "@/components/ToastMessage/index";
function gettime() {
  var d = new Date(+new Date() - 8 * 3600 * 1000);
  d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
  return (d.toISOString())
}
class HttpRequest {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API,
      timeout: 10000,
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
    let url = config.url
    let method = config.method?.toUpperCase()
    let params = config.params
    let data = config.data
    let requestPath = url
    let reqbody = ''
    let result = ''
    let time = gettime()
    if (data && (method == 'POST')) {
      reqbody = JSON.stringify(data)
      result = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(time + method + requestPath + reqbody, account.apikey))
    }
    if (params && (method == 'GET')) {
      let pstr = ''
      Object.keys(params).forEach((key) => {
        pstr += key + '=' + params[key] + '&'
      })
      pstr = pstr.substring(0, pstr.length - 1);
      requestPath = requestPath + '?' + pstr
      result = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(time + method + requestPath, account.apikey))
    }
    // return
    config.headers["Content-Type"] = config?.headers?.["Content-Type"] ?? "application/json";
    config.headers["Accept"] = config?.headers?.["Accept"] ?? "application/json";
    config.headers["OK-ACCESS-KEY"] = account.api
    config.headers["OK-ACCESS-PASSPHRASE"] = account.PASSPHRASE
    config.headers["OK-ACCESS-SIGN"] = result
    config.headers["OK-ACCESS-TIMESTAMP"] = time
    return config;
  };

  requestInterceptorError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  responseInterceptor = (response: AxiosResponse) => {
    //响应拦截
    if (response.config.baseURL?.includes('www.okx.com')) {
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
