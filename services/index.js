import axios from "axios";
import { BASE_API } from "../app/constants";

export const axiosPost = async (urlAPI, data) => {
  var config = {
    method: "post",
    url: `${BASE_API}${urlAPI}`,
    headers: {
      "Content-Type": "application/json",
      Authorization:
      "Bearer "+ window.localStorage.getItem('access_token'),
    },
    data: JSON.stringify(data),
  };
  // console.log(config);

  return axios(config)
    .then(function (response) {
      // console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.data.error;
    });
};

export const axiosGet = async (urlAPI, dataVal = {}) => {
  let data = JSON.stringify(dataVal);

  var config = {
    method: "get",
    url: `${BASE_API}${urlAPI}`,
    headers: {
      "Content-Type": "application/json",
      Authorization:
      "Bearer "+ window.localStorage.getItem('access_token'),
    },
    data: data,
  };

  // console.log(config);

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data.error;
    });
};

// export default axiosPost;
