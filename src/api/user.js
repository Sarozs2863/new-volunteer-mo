import request from './request';

function getVolunteerToken(platform) {
  let url;
  if (platform === 'mp') {
    url = '/login/mp';
  } else {
    url = '/login/mobile';
  }
  return request({
    url: url,
    method: 'POST',
    hideloading: false // vant 加载效果
  });
}

function getUserInfo() {
  return request({
    url: '/enterPage/studentInfo',
    method: 'GET',
    hideloading: true
  });
}

// 获取工时概览 已参与 xx 活动， 已认证 xxx 工时， 未认证 xxx 工时
function getHourView() {
  console.log('getHourView');
  return request({
    url: '/volunteer/public/sumTime',
    method: 'GET',
    hideloading: true // vant 加载效果
  });
}

function getActsList() {
  return request({
    url: 'volunteer/public/volunteerTime',
    method: 'GET',
    hideloading: true // vant 加载效果
  });
}

export { getVolunteerToken, getUserInfo, getHourView, getActsList };
