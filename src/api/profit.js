import axios from '../assets/js/axios'
import qs from 'qs'

// 获取分销记录列表
export function getAgencyList (params) {
    return axios.get('/fox/admin/agency/list?'+ qs.stringify(params))
  }

// 获取分销配置列表
export function getConfigList (params) {
    return axios.get('/fox/admin/agency/configList?'+ qs.stringify(params))
  }

// 更改分销配置
export function configUpdate (params) {
    return axios.post('/fox/admin/agency/configUpdate', params)
  }
