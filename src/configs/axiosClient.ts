import axios from 'axios';
import qs from 'qs';

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem('meet:accessToken');
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem('meet:refreshToken');
  return refreshToken;
}

function refreshToken() {
  return axiosClient.post('/auth/refreshtoken', {
    refreshToken: getLocalRefreshToken(),
  });
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'x-api-token ' + getLocalAccessToken(),
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

axiosClient.interceptors.request.use(
  (config: any) => {
    // custom lai lam sau
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
    return res;
  },
  async (err: any) => {
    try {
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/signin' && err.response) {
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
