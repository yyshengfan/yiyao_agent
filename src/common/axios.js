import axios from 'axios'
import { method } from './method'

// 请求拦截
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = sessionStorage['token']

    // 去掉空属性
    if (typeof config.data === 'object') {
      Object.keys(config.data).forEach(item => {
        if (config.data[item] === '') delete config.data[item]
      })
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 返回参数拦截
axios.interceptors.response.use(
  async function (response) {
    if (typeof response.data === 'object') {
      const code = ~~response.data.code
      const msg = response.data.msg || ''
      switch (code) {
        case 0:
          break
        case 1:
          method.swal.success('操作成功！')
          break
        case 410:
          const res = await method.swal.warning('登录已过期!')
          if (res.value) {
            window.location.href = '/'
          }
          break
        case 500:
          break
        default:
          method.swal.err(msg)
          break
      }
      return response.data
    } else {
      return Promise.resolve(response.data)
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axios
