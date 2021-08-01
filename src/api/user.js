// axios
import request from './request';

// 用户名称 get 方法
function getVolunteerToken() {
  return request({
    url: '/login/mobile',
    method: 'POST',
    hideloading: false // vant 加载效果
  });
}

function getUserInfo() {
  return request({
    url: '/enterPage/studentInfo',
    method: 'GET',
    hideloading: false // vant 加载效果
  });
}

export { getVolunteerToken, getUserInfo };
