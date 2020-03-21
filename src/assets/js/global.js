import { getBasicInfoOfUser, systemConfig } from '@/api/index.js'
let global = {
  getBasicUserInfo () {
    // 获取用户个人信息
    getBasicInfoOfUser().then(res => {
      if (res.code === 0) {
        console.log(res.data)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
      }
    })
  },
  getsystemConfig () {
    // 获取婚恋全局配置
    systemConfig().then(res => {
      if (res.code === 0) {
        console.log(res.data)
        localStorage.setItem('basicInfo', JSON.stringify(res.data))
      }
    })
  }
}
export default global
