// axios
import request from './request'


// 用户名称 get 方法
function getVolunteerToken(params) {
  return request({
    url: '/login/mobile',
    method: 'POST',
    params,
    hideloading: false // vant 加载效果
  })
}

export {
  getVolunteerToken
}
