import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import qs from "qs";

import { REQUEST_TIMEOUT_MS } from "./apiConstants";
import { apiRequestInterceptor } from "./interceptor";

export const apiRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_URL_SEVICER}`,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create();

const requestInterceptors = [apiRequestInterceptor];
requestInterceptors.forEach((interceptor) => {
  axiosInstance.interceptors.request.use(interceptor as any);
});

axiosInstance.interceptors.response.use();

class Api {
  static async get(
    url: string,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.get(_url, { ...apiRequestConfig, ...config });
  }

  static async post(
    url: string,
    body?: any,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.post(_url, body, { ...apiRequestConfig, ...config });
  }

  static async put(
    url: string,
    body?: any,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.put(_url, body, { ...apiRequestConfig, ...config });
  }

  static async patch(
    url: string,
    body?: any,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.patch(_url, body, { ...apiRequestConfig, ...config });
  }

  static async delete(
    url: string,
    queryParams?: any,
    config: AxiosRequestConfig = {},
  ) {
    const _url = url + qs.stringify(queryParams, { arrayFormat: "brackets" });
    return axiosInstance.delete(_url, { ...apiRequestConfig, ...config });
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default Api;
