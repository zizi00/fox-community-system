import config from './config'
let common = {
  /**
   * 存储缓存
   * @key * 名称
   * @value *值
   * @returns {string}
   */
  setLocalStorage: (key, value) => {
    let curtime = new Date().getTime() // 获取当前时间 ，转换成JSON字符串序列
    let valueDate = JSON.stringify({
      val: value,
      timer: curtime
    })
    try {
      localStorage.setItem(key, valueDate)
    } catch (e) {
      console.log('Error: 保存到本地存储失败')
    }
  },
  /**
   * 获取缓存
   * @key * 名称
   * @returns {string}
   */
  getLocalStorage: (key) => {
    let exp = 2 * 60 * 60 * 1000 // 毫秒秒数
    if (localStorage.getItem(key)) {
      let vals = localStorage.getItem(key) // 获取本地存储的值
      let dataObj = JSON.parse(vals) // 将字符串转换成JSON对象
      // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
      let isTimed = (new Date().getTime() - dataObj.timer) > exp
      if (isTimed) {
        localStorage.removeItem(key)
        return null
      } else {
        var newValue = dataObj.val
      }
      return newValue
    } else {
      return null
    }
  },
  getDomain: () => {
    let host = window.location.host
    if (host.indexOf('localhost') > -1) {
      return 'localhost'
    } else {
      return config.cookie_domain
    }
  },
  /**
   * 存储cookie
   * @param name键名 value键值
   * @returns {*}
   */
  setCookie: (name, value, time) => {
    let expire = time ? (time * 1000) : (1 * 24 * 60 * 60 * 1000)
    let exp = new Date()
    let newName = 'trade_' + name
    exp.setTime(exp.getTime() + expire)
    if (common.getDomain() === 'localhost') {
      document.cookie = newName + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
    } else {
      document.cookie = newName + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';domain=' + config.cookie_domain + ';path=/'
    }
  },
  /**
   * 获取cookie
   * @param name键名
   * @returns {string}
   */
  getCookie: (name) => {
    let newName = 'trade_' + name
    let reg = new RegExp('(^| )' + newName + '=([^;]*)(;|$)')
    var arr = document.cookie.match(reg)
    if (arr !== null) {
      return unescape(arr[2])
    }
    return null
  },
  /**
   * 删除cookie
   * @param name键名
   * @returns {*}
   */
  delCookie: (name) => {
    let newName = 'trade_' + name
    let value = common.getCookie(name)
    if (value) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1000)
      if (common.getDomain() === 'localhost') {
        document.cookie = newName + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
      } else {
        document.cookie = newName + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';domain=' + config.cookie_domain + ';path=/'
      }
    }
  },
  /**
   * 保存登录信息
   * @param data
   * @returns {*}
   */
  setLoginInfo: (data) => {
    // let user = data || {}
    // common.setCookie('access_token', user.token)
    // common.setLocalStorage('user_name', user.userName)
    // common.setLocalStorage('region_info', user.regionInfo)
  },
  /**
   * 保存用户信息
   * @param data
   * @returns {*}
   */
  setUserInfo: (data) => {
    // let user = data || {}
    // // common.setCookie('access_token', user.token)
    // // let userInfo = data || {}
    // common.setCookie('user_info', JSON.stringify(user))
  },
  /**
   * 获取登录信息
   * @param *
   * @returns {object}
   */
  getUserInfo: () => {
    // let user = common.getCookie('user_info') || '{}'
    // return JSON.parse(user)
  },
  /**
   * 清除登录信息
   * @param *
   * @returns {*}
   */
  clearUserInfo: () => {
    common.delCookie('access_token')
    common.delCookie('user_info')
  },
  /*
    height 高
    width 宽
   * type 缩放方式 fill（固定宽高自动裁剪） mfit(将图缩略成宽度为n，高度为n，按短边优先)
   *      lfit(将图缩略成宽度为n，高度为n，按长边优先)
   *      fixed(将图强制缩略成宽度为n，高度为n)
   * form 图片格式 jpg,png,webp,bmp,gif,tiff
  */
  // 图片加载缩放，格式处理
  picture: function (width, height, form, type) {
    let picText = ''
    switch (arguments.length) {
      case 1:
        picText = '?x-oss-process=image/resize,resize,l_' + width
        break
      case 2:
        picText = '?x-oss-process=image/resize,m_fixed,h_' + height + ',w_' + width
        break
      case 3:
        picText = '?x-oss-process=image/resize,m_fixed,h_' + height + ',w_' + width + '/format,' + form
        break
      case 4:
        picText = '?x-oss-process=image/resize,m_' + type + ',h_' + height + ',w_' + width + '/format,' + form
        break
      default:
        picText = '?x-oss-process=image/resize,m_fixed,h_100,w_100/format,jpg'
    }
    return picText
  },
  manageDate: (date) => { // 转换时间格式
    if (!date) {
      return ''
    }
    var d = new Date(date)
    // if (d.getHours() <= 9) {
    //   var h = '0' + d.getHours()
    // } else {
    //   h = d.getHours()
    // }
    // if (d.getMinutes() <= 9) {
    //   var f = '0' + d.getMinutes()
    // } else {
    //   f = d.getMinutes()
    // }
    // if (d.getSeconds() <= 9) {
    //   var s = '0' + d.getSeconds()
    // } else {
    //   s = d.getSeconds()
    // }
    if (d.getFullYear() <= 9) {
      var F = '0' + d.getFullYear()
    } else {
      F = d.getFullYear()
    }
    if ((d.getMonth() + 1) <= 9) {
      var Y = '0' + (d.getMonth() + 1)
    } else {
      Y = (d.getMonth() + 1)
    }
    if (d.getDate() <= 9) {
      var R = '0' + d.getDate()
    } else {
      R = d.getDate()
    }
    // return F + '-' + Y + '-' + R + ' ' + h + ':' + f + ':' + s
    return F + '/' + Y + '/' + R
  }
}

export default common
