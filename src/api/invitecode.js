import axios from '../assets/js/axios'
import qs from 'qs'
// 获取邀请码
export function getInviteCodeList(params) {
    return axios.get('/fox/admin/inviteCode/getPageList?' + qs.stringify(params))
}
// 刷新邀请码
export function getRefreshCodet() {
    return axios.get('/fox/admin/inviteCode/generateCode')
}
// 添加邀请码
export function addInviteCode(params) {
    return axios.get('/fox/admin/inviteCode/add?' + qs.stringify(params))
}
// 修改邀请码状态
export function updateInviteCodestate(params) {
    return axios.get('/fox/admin/inviteCode/updateStatus?' + qs.stringify(params))
}


