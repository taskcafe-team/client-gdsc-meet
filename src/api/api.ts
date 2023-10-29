import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from "axios";
import qs from "qs";

import { REQUEST_TIMEOUT_MS } from "./apiConstants";
import {
  apiFailureResponseInterceptor,
  apiRequestInterceptor,
  apiSuccessResponseInterceptor,
} from "./interceptor";
import { Agent } from "https";

const apiRequestConfig: CreateAxiosDefaults<any> = {
  baseURL: `${"https://gdsc-meet.us.to:5000"}`,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  httpAgent: new Agent({ rejectUnauthorized: false }),
};

const axiosInstance: AxiosInstance = axios.create(apiRequestConfig);

// -- Request --
const requestInterceptors = [apiRequestInterceptor];
requestInterceptors.forEach((interceptor) => {
  axiosInstance.interceptors.request.use(interceptor as any);
});

// -- Response --
const responseInterceptors = [
  apiSuccessResponseInterceptor,
  apiFailureResponseInterceptor,
];
responseInterceptors.forEach((interceptor) => {
  axiosInstance.interceptors.request.use(interceptor as any);
});

class Api {
  static async get(
    url: string,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.get(_url, { ...config });
  }

  static async post(
    url: string,
    body?: any,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.post(_url, body, { ...config });
  }

  static async put(
    url: string,
    body?: any,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.put(_url, body, { ...config });
  }

  static async patch(
    url: string,
    body?: any,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.patch(_url, body, { ...config });
  }

  static async delete(
    url: string,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.delete(_url, { ...config });
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default Api;
