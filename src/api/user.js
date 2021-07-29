// axios
import request from './request'


// 用户名称 get 方法
function login(params) {
  return request({
    url: 'user/token',
    method: 'get',
    params,
    hideloading: true // vant 加载效果
  })
}

export {
    login
}
