// axios
import request from './request'


// 用户名称 get 方法
function getVolunteerToken(params) {
  return request({
    url: '/login/mobile',
    method: 'get',
    params,
    hideloading: true // vant 加载效果
  })
}

export {
  getVolunteerToken
}
