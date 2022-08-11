// 引入axios 并给axios设置基础路径
import axios from 'axios'

import store from '@/store'

// 设置基础路径
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器

request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user && user.token) {
      // 将token添加在请求头中
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意:必须将config返回出去
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
export default request
