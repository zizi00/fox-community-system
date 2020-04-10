import axios from '../assets/js/axios'
import qs from 'qs'
// 登录
export function login(params) {
    return axios.post('/admin/user/login?' + qs.stringify(params))
}
// 获取举报列表
export function getComplaintList(params) {
    return axios.get('/admin/report/getPageList?' + qs.stringify(params))
}
// 充值记录
export function getRechargeList(params) {
    return axios.get('/admin/dataQuery/getRechargeRecordPageList?' + qs.stringify(params))
}

