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
// 资金流水
export function getCapitalflowList(params) {
    return axios.get('/admin/dataQuery/getCapitalFlowPageList?' + qs.stringify(params))
}
// 获取提现列表
export function getCashoutList(params) {
    return axios.get('/admin/withDraw/getPageList?' + qs.stringify(params))
}
// 获取提现详情
export function getUserWithdrawDetail(params) {
    return axios.get('/admin/withDraw/getUserWithdrawDetail?' + qs.stringify(params))
}
// 确认汇款
export function updateStatus(params) {
    return axios.post('/admin/withDraw/updateStatus?' + qs.stringify(params))
}
// 充值累计
export function getRechargeOverview() {
    return axios.get('/admin/dataQuery/getRechargeOverview')
}
export function getCapitalOverview() {
    return axios.get('/admin/dataQuery/getCapitalOverview')
}


