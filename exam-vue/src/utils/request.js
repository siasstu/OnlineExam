import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
import router from "@/router";
import { Message } from "element-ui";

let baseUrl = "http://localhost:8088";
const requests = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
});

requests.interceptors.request.use((config) => {
  nprogress.start()
  const token = localStorage.getItem('token');
  config.headers.token = token
  return config;
}, (error) => {
  return Promise.reject(error);
});

requests.interceptors.response.use((response) => {
  if (response.status === 200) {
    nprogress.done()
    return response
  } else {
    Message({
      type: "error",
      message: response.data.message
    })
  }
}, (error) => {
  const resp = error.response.data
  if (resp.code === 4001) {
    Message({
      type: "error",
      message: "身份认证过期，请重新登录"
    })
  } else if (resp.code === 4003) {
    Message({
      type: "error",
      message: "您尚未登录，请登录"
    })
  } else if (resp.code === 4002) {
    Message({
      type: "error",
      message: "身份认证失败，请重新登录"
    })
  } else {
    router.push('/error')
    return Promise.reject(error);
  }
  localStorage.clear()
  router.push("/login")
  nprogress.done()
});

const get = function (url, params) {
  return new Promise((resolve, reject) => {
    requests({
      url: url,
      method: 'get',
      params: params,
      headers: { 'Content-Type': 'application/json', 'request-ajax': true }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

const post = function (url, params) {
  return new Promise((resolve, reject) => {
    requests({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'application/json', 'request-ajax': true }
    }).then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}

const fileUpload = function (url, params) {
  return new Promise((resolve, reject) => {
    requests({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

const downloadUrl = function (url, params) {
  return new Promise((resolve, reject) => {
    requests({
      url: url,
      method: 'post',
      data: params,
      responseType: "blob"
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export {
  get,
  post,
  fileUpload,
  downloadUrl,
}