import axios from '../assets/js/axios'
import { uploadFile }  from '../assets/js/axios'
import qs from 'qs'

// 获取动态列表
export function getDynamic (params) {
  return axios.get('/fox/admin/dynamic/getDynamicList?'+ qs.stringify(params))
}
// 发布动态
export function addDynamic (params) {
  return axios.post('/fox/admin/dynamic/addDynamic',params)
}
// 上传图片
export function uploadPhoto (params) {
  return uploadFile.post('/fox/admin/files/upload',params)
}

// 审核动态
export function updateAudit (params) {
  return axios.post('/fox/admin/dynamic/audit?'+ qs.stringify(params))
}

// 修改动态
export function updateDynamic (params) {
  return axios.post('/fox/admin/dynamic/updateDynamic',params)
}

