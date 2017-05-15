import axios from 'axios';
import qs from 'qs';  //axios发送的数据不是json格式，若需要json格式，添加此库

import config from '../../config';

//axios 配置
// axios.defaults.timeout=3000;
// axios.defaults.baseURL="http://172.168.1.207:9020"
axios.defaults.baseURL="/api";
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

axios.interceptors.request.use( (config) => {
	config.withCredentials = true;  // 需要跨域打开此配置
	return config;
},(error) => {
	return Promise.reject(error);
})

axios.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(error);
});

export default {
  get (url, params) {
    return axios({
      method: 'get',
      url:url,
      params,
      // withCredentials: true,
      timeout: 3000
    })
  },
  post (url, data) {
    return axios({
      method: 'post',
      url:url,
      data: qs.stringify(data),  //参数是json形式
      // data:data,
      timeout: 3000,
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  postJson (url, data) {
      return axios({
        method: 'post',
        url: url,
        data: data,
        timeout: 3000,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
      })
  }
  // form (url, formdata) {
  //   return axios({
  //     method: 'post',
  //     url:url,
  //     data: formdata,
  //     // withCredentials: true,
  //     timeout: 3000
  //   })
  // }
}