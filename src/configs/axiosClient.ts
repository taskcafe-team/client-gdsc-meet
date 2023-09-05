import axios from 'axios';
import qs from 'qs';
import { apiEndpoint } from './apiEndpoint';
import { headers } from 'next/dist/client/components/headers';

function getLocalAccessToken() {
  const accessToken = localStorage.getItem('meet:accessToken');
  return accessToken ? accessToken : "";
}

function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem('meet:refreshToken');
  return refreshToken;
}
// update sau
function refreshToken() {
  return axiosClient.post('/auth/refreshtoken', {
    refreshToken: getLocalRefreshToken(),
  });
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SEVICER,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

axiosClient.interceptors.request.use(
  (config: any) => {
    // custom lai lam sau
    config.headers = {
      ...config.headers,
      Authorization: 'x-api-token' + getLocalAccessToken(),
    };
    return {
      ...config,
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err: any) => {
    try {
      const originalConfig = err.config;
      if (originalConfig.url !== apiEndpoint.loginWithEmail && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const rs = await refreshToken();
          const { accessToken } = rs.data;
          window.localStorage.setItem('meet:accessToken', accessToken);

          return axiosClient(originalConfig);
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }

    return Promise.reject(err);
  },
);

export default axiosClient;
