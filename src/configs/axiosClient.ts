import axios from 'axios';
import qs from 'qs';
import { apiEndpoint } from '../api/http-rest/auth/apiEndpoint';

function getLocalAccessToken() {
  const accessToken = localStorage.getItem('meet:accessToken');
  return accessToken ? JSON.parse(accessToken) : null;
}

function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem('meet:refreshToken');
  return refreshToken ? JSON.parse(refreshToken) : null;
}
// update sau
function refreshToken() {
  return axiosClient.post('/auth/access-token', {
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
    console.log(getLocalAccessToken());

    config.headers = {
      ...config.headers,
      'x-api-token': getLocalAccessToken() ?? '',
    };
    console.log(config);
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
      console.log(err);

      const originalConfig = err.config;
      if (originalConfig?.url !== apiEndpoint.loginWithEmail && err.response) {
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
