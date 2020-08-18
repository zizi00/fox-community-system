// 获取用户列表
import axios from '../assets/js/axios'
import qs from 'qs'
export function getUserList(params) {
    return axios.get('/fox/admin/userManage/getManageUserList?' + qs.stringify(params))
}
// 获取女用户认证列表
export function getAuthGirlsList(params) {
    return axios.get('/fox/admin/userManage/getAuthGirlsInfo?' + qs.stringify(params))
}
// 获取用户详情
export function getByUserId(params) {
    return axios.get('/fox/admin/userManage/getByUserId?' + qs.stringify(params))
}
// 禁用或者启用用户
export function forbiddenUser(params) {
    return axios.post('/fox/admin/userManage/forbidden?' + qs.stringify(params))
}
// 获取条件日期新增用户数
export function getTodayUser(params) {
    return axios.get('/fox/admin/userManage/getIncrementUserByDate?' + qs.stringify(params))
}
// 获取条件日期新增vip数
export function getVip(params) {
    return axios.get('/fox/admin/userManage/getIncrementVipByDate?' + qs.stringify(params))
}
// 审核女用户
export function auditUser(params) {
    return axios.post('/fox/admin/userManage/auditUser?' + qs.stringify(params))
}

// 女用户同步
export function getSyncGirlsInfo(params) {
    return axios.get('/fox/admin/userManage/getSyncGirlsInfo?' + qs.stringify(params))
}

// 女用户上下架
export function SyncGirls(params) {
    return axios.get('/fox/admin/userManage/down?' + qs.stringify(params))
}

 
