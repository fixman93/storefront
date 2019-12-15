import {
    history
  } from "./../helpers/history";
  import {
    authHeader
  } from "./../helpers/auth-header";
  import axios from 'axios';
  
  
  export const api = {
    postApi,
    getApi,
    updateApi,
    deleteApi
  };
  
  let config = {
    apiUrl: "/public/v1"
  };
  
  function getApi(url) {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
      url: `${config.apiUrl}` + url,
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
    return axios.delete(`${config.apiUrl}` + url, requestOptions).then(handleResponse);
  }
  
  function postApi(url, payload, customHeaders) {
    // check for custom headers if any or use default headers
    let headers = customHeaders ? customHeaders : {
      ...authHeader(),
      "Content-Type": "application/json"
    }
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