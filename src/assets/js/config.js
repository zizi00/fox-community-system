/**
 *
 cookie_domain   Cookie应用域名
 cookie_prefix       Cookie前缀
 */
function notEmpty (obj) {
  if (obj) {
    if ((typeof obj) === 'object') {
      if (Object.keys(obj).length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
let config = notEmpty(window.configure) ? window.configure : {
  cookie_domain: '',
  cookie_prefix: ''
}
export default {
  cookie_domain: config.cookie_domain ? config.cookie_domain : '',
  cookie_prefix: config.cookie_prefix ? config.cookie_prefix : ''
}
