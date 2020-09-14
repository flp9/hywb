import Axios from 'axios'
import { Message } from 'element-ui'
import api from './api'
import cookie from 'js-cookie'
import router from '../router/index'

const instance = Axios.create({
    baseURL: api.zlhUrl,
    timeout: 15000, // 请求超时时间,
    headers: {}
  });

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log(router.currentRoute, '')
  if (cookie.get('token')) {
    config.headers['hysz'] = cookie.get('token') // 让每个请求携带自定义token 请根据实际情况自行修改
  }else {
    if(router.currentRoute.meta.checkCookie){
      router.push('/');
      return;
    }
  }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    Message({
      message: '请求出错',
      type: 'warning'
    })
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.status === 401){
      Message({
        message: '登录超时，请重新登录',
        type: 'warning'
      })
      router.push('/');
      return;
    }else if(response.status === 500){
      Message({
        message: '请求出现了一点问题，请稍后再试...',
        type: 'danger'
      })
      return;
    }
    // console.log(response, 'response')
    return response;
  }, function (error) {
    Message({
      message: '好像出现了一点问题，请稍后再试',
        type: 'warning'
    })
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance
