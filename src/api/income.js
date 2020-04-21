import axios from '../assets/js/axios'
import qs from 'qs'
// 查询收益
export function getInCome(params) {
    return axios.get('/admin/statistics/getByDate?' + qs.stringify(params))
}
// 获取本月本周收益
export function getByDateWithMonth() {
    return axios.get('/admin/statistics/getByDateWithMonth')
}

