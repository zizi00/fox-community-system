// axios配置
import axios from 'axios'
// import router from '../../router/index'
import { Toast } from 'vant'
import store from '@/store/index'
// import common from './common'

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 10
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.token
    const fromType = '0'
    config.data = JSON.stringify(config.data)
    if (token) {
      config.headers.token = token
    }
    config.headers.fromType = fromType
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
      Toast({ message: '服务繁忙，请稍后再试!', type: 'fail' })
    } else if (response.data.code === -1) {
      Toast({ message: response.data.message, type: 'fail' })
    } else if (response.data.code === 0) {
    } else if (response.data.code === 1) {
      Toast({ message: response.data.message, type: 'fail' })
    } else {
      Toast({ message: response.data.message, type: 'danger' })
    }
    return response.data
  },
  error => {
    console.log(error.response)
    switch (error.response.status) {
      case 401:
        Toast({ message: '登录已失效，请重新登录！', type: 'fail' })
        setTimeout(function () {
          // 清空登录信息
          // common.clearUserInfo()
          // localStorage.removeItem('user_name')
          // localStorage.removeItem('region_info')
          // // 重定向到登录页面
          // router.push({ name: 'login' })
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
        Toast({ message: '服务器错误，请重新尝试操作！', type: 'fail' })
        break
      default:
        Toast({ message: error, type: 'fail' })
        return Promise.resolve(error.response)
    }
  }
)
// 在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 10
axios.defaults.retryDelay = 1000

export default instance
