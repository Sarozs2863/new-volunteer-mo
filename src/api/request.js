import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base api url + request url
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

//  请求拦截
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['token'] = ''
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// respone 响应拦截
service.interceptors.response.use(
  response => {
    Toast.clear() // 加载效果停止
    const res = response.data
    if (res.status && res.status !== 200) {
      switch (res.status) {
        case 11101:
          // ...
          break
        case 11102:
          // ...
          break
        case 11103:
          // ...
          break
        default:
            return Promise.reject(res || 'error')
      }
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear();
    console.log('err' + error) // for debug
    switch(error.response.status) {
        case 401:
            // ...
            break;
        case 500:
            // ...
            break;
        default: 
           return Promise.reject(error);
    }
  }
)

export default service
