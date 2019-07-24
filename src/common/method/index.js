import Swal from 'sweetalert2'
import { config } from '../config/index'
import moment from 'moment'

const swal = {
  success: function (msg) {
    Swal.fire({
      title: `成功`,
      text: msg || '',
      buttonsStyling: false,
      confirmButtonClass: 'md-button md-success',
      type: 'success'
    })
  },
  err: function (msg) {
    Swal.fire({
      title: `失败`,
      text: msg || '',
      buttonsStyling: false,
      confirmButtonClass: 'md-button md-danger',
      type: 'error'
    })
  },
  warning: function (msg) {
    Swal.fire({
      title: `警告`,
      text: msg || '',
      buttonsStyling: false,
      confirmButtonClass: 'md-button md-warning',
      type: 'warning'
    })
  },
  isOk: function (obj) {
    return Swal.fire({
      title: obj.title || '确认删除吗',
      text: obj.text || '删除后将无法恢复，请谨慎操作！',
      // type: "warning",
      showCancelButton: true,
      confirmButtonClass: 'md-button md-success',
      cancelButtonClass: 'md-button md-danger',
      confirmButtonText: obj.ok || 'ok',
      buttonsStyling: false
    })
  },
  simpleForm: function (obj) {
    return Swal.fire({
      title: obj.title,
      html: `<div class="md-field md-theme-default">
        <input type="text" id="md-input" class="md-input">
        </div>`,
      showCancelButton: true,
      confirmButtonClass: 'md-button md-success',
      cancelButtonClass: 'md-button md-danger',
      buttonsStyling: false
    })
  }
}

const tittleAndContent = function (config, item) {
  const list = []
  for (let key in config) {
    const obj = {
      title: config[key],
      content: item[key] || ''
    }
    list.push(obj)
  }
  return list
}

// 检验非空
const isPass = function (params, str) {
  const list = typeof str === 'string' ? str.split(',') : str
  for (const item of list) {
    if (!params[item]) {
      return false
    }
  }
  return true
}

const formatUrl = function (url) {
  const env = process.env.NODE_ENV || 'development'
  const str = config[env]
  const baseurl = str.replace('api/v1/', '')
  return baseurl + url
}

const timeformat = function (date) {
  if (!date) return ''
  return moment
    .unix(date)
    .utcOffset(~~localStorage.time_zone * 60)
    .format('YYYY-MM-DD HH:mm:ss')
}

const formatTime = function (ts) {
  return moment(ts * 1000)
    .utcOffset(~~localStorage.time_zone * 60)
    .format('YYYY-MM-DD HH:mm:ss')
}

const timetounix = function (date) {
  return moment(date).unix()
}

// 取整（保留many位小数）
const numberFix = function (num, many) {
  many = many !== undefined ? many + 1 : 3
  if (num) {
    var fixnum = num.toFixed(many)
    return fixnum.substring(0, fixnum.lastIndexOf('.') + many)
  } else {
    return 0
  }
}

// 取整加千分位i
const numberFixAddThree = function (num, many) {
  many = many !== undefined ? many + 1 : 3
  if (num) {
    // 保留N位小数
    num = parseFloat(num)
    var fixnum = num.toFixed(many)
    let number = fixnum.substring(0, fixnum.lastIndexOf('.') + many) + ''

    // 千分位(只对整数)
    const int = number.toString().split('.')
    int[1] = int[1] ? '.' + int[1] : ''
    return int[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + int[1]
  } else {
    return 0
  }
}

const addThousandth = function (num) {
  const int = num.split('.')
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (int[1] || '')
}
// 去掉千分位
const abandonThousandth = function (str) {
  if (str) {
    str = str + ''
    return str.replace(/,/g, '')
  } else {
    return ''
  }
}

const method = {
  swal,
  tittleAndContent,
  isPass,
  formatUrl,
  timeformat,
  timetounix,
  formatTime,
  numberFix,
  numberFixAddThree,
  abandonThousandth,
  addThousandth
}
export { method }
