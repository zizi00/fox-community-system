import axios from '../assets/js/axios'
import qs from 'qs'
// 登录
export function login(params) {
    return axios.post('/admin/user/login?' + qs.stringify(params))
}