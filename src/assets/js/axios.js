// axios配置
import axios from 'axios'
// import router from '../../router/index'
import { Message,Loading } from "element-ui";
import router from "../../router/index";
import store from '@/store/index'
// import common from './common'

// 创建axios实例
// var instance = axios.create({
//   timeout: 1000 * 10
// })
var instance = axios.create({
  timeout: 1000 * 10,
  // baseURL: process.env.NODE_ENV === 'development' ? '/api' : ''
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://103.45.120.154'
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.token
    // const fromType = '0'
    config.data = JSON.stringify(config.data)
    if (token) {
      config.headers.token = token
    }
    // config.headers.fromType = fromType
    return config
  },
  error => {
    Toast({ type: 'fail', message: error })
    return Promise.reject(error)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.code === -2) {
      Message({ message: '服务繁忙，请稍后再试!', type: 'error',duration:5000})
    } else if (response.data.code === -1) {
      console.log(response.data.message)
      // Message({ message: response.data.message, type: 'error',duration:5000 })
      if(response.data.message === "token无效"){
        //  重定向到登录页面
        router.push({ name: 'Login' })
      }
    } else if (response.data.code === 0) {
    } else if (response.data.code === 1) {
      // Message({ message: response.data.message, type: 'error',duration:8000 })
    } else {
      Message({ message: response.data.message, type: 'error',duration:3000 })
    }
    return response.data
  },
  error => {
    console.log(error.response)
    switch (error.response.status) {
      case 401:
        Message({ message: '登录失效，请重新登录', type: 'error',duration:3000 })
        setTimeout(function () {
          // 清空登录信息
          // common.clearUserInfo()
          // localStorage.removeItem('user_name')
          // localStorage.removeItem('region_info')
          // // 重定向到登录页面
          router.push({ name: 'Login' })
        }, 500)
        break
      case 403:
        // router.push({ name: '403' })
        break
      case 404:
        // router.push({ name: '404' })
        break
      case 500:
        // router.push({ name: '500' })
        break
      case 503:
        Message({ message: '服务器错误，请重新尝试操作！', type: 'fail' })
        break
      default:
        Message({ message: error, type: 'fail' })
        return Promise.resolve(error.response)
    }
  }
)
// 在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 10
axios.defaults.retryDelay = 1000

export default instance
