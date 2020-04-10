// 获取用户列表
import axios from '../assets/js/axios'
import qs from 'qs'
export function getUserList(params) {
    return axios.get('/admin/userManage/getUserList?' + qs.stringify(params))
}
// 获取女用户认证列表
export function getAuthGirlsList(params) {
    return axios.get('/admin/userManage/getAuthGirlsInfo?' + qs.stringify(params))
}