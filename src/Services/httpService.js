import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.request.use(function (config) {
  const access_token = localStorage.getItem("token");

  config.headers.token = access_token;

  return config;
})

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

const setJwt = (jwt) => {
  return (axios.defaults.headers.common["x-auth-token"] = jwt);
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
