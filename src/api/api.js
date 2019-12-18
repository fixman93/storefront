import { history } from "./../helpers/history";
import { authHeader, authHeader2 } from "./../helpers/auth-header";
import axios from "axios";

export const api = {
  postApi,
  getApi,
  updateApi,
  deleteApi,
  getApi_Cart,
  updateApi_Cart
};

let config = {
  apiUrl: "https://api-test.services.distll.com/public/v1"
};

function getApi(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    url: `${config.apiUrl}` + url
  };
  return axios(requestOptions).then(handleResponse);
}

function getApi_Cart(url) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer [!h1s_1$_@_$3cr3t!!]",
      "x-distll-user-id": 3,
      "Content-Type": "application/json"
    },
    url: `https://api-test.services.distll.com/cart/v1` + url
  };
  return axios(requestOptions).then(handleResponse);
}

function updateApi_Cart(url, payload) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer [!h1s_1$_@_$3cr3t!!]",
      "x-distll-user-id": 3,
      "Content-Type": "application/json"
    },
    url: `https://api-test.services.distll.com/cart/v1` + url,
    data: payload
  };
  return axios(requestOptions).then(handleResponse);
}

function updateApi(url, payload) {
  const requestOptions = {
    method: "PUT",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json"
    },
    url: config.apiUrl + url,
    data: payload
  };
  return axios(requestOptions).then(handleResponse);
}

function deleteApi(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };
  return axios
    .delete(`${config.apiUrl}` + url, requestOptions)
    .then(handleResponse);
}

function postApi(url, payload, customHeaders) {
  // check for custom headers if any or use default headers
  let headers = customHeaders
    ? customHeaders
    : {
        ...authHeader(),
        "Content-Type": "application/json"
      };
  const requestOptions = {
    method: "POST",
    url: config.apiUrl + url,
    headers: headers,
    data: payload
  };
  return axios(requestOptions).then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (!response.statusText === "OK") {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
    }

    const error = data || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
