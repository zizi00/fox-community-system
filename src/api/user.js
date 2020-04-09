// 获取女用户列表
import axios from '../assets/js/axios'
import qs from 'qs'
export function getUserList(params) {
    return axios.get('/admin/userManage/getUserList?' + qs.stringify(params))
}