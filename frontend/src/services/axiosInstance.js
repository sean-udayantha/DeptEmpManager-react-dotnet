import axios from "axios";
const axiosInstance = axios.create({ baseURL: `http://localhost:5179/api` });

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 500) {
      return Promise.reject({
        isError: true,
        errorCode: 500,
        errorMsg: error.response.data.message,
      });
    }
    if (error?.response?.status === 401) {
      return Promise.reject({
        userToken: null,
        errorCode: 401,
        errorMsg: error.response.data.message,
      });
    }
    if (error?.response?.status === 404) {
      return Promise.reject({
        isError: true,
        errorCode: 404,
        errorMsg: error.response.data.message,
      });
    }
    if (error?.response?.status === 403) {
      return Promise.reject({
        isError: true,
        errorCode: 403,
        errorMsg: error.response.data.message,
      });
    }
    if (error?.response?.status === axios.ERR_NETWORK) {
      return Promise.reject({
        isError: true,
        errorCode: "ERR_NETWORK",
        errorMsg: error.response?.data?.message,
      });
    }

    return Promise.reject({
      isError: true,
      errorCode: "*",
      errorMsg: error.response?.data?.message || "Unable to perform request",
    });
  }
);


export default axiosInstance;