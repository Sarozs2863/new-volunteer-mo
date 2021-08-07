import store from '@/store';
import request from './request';

// 根据活动id获取活动详情
export function actDetail(param) {
  return request({
    url: '/volunteer/public/activityContent',
    method: 'GET',
    params: {
      activityId: param
    }
  });
}

// 提交活动认证
export function actApprove(data) {
  return request({
    url: '/volunteer/public/time',
    method: 'POST',
    data,
    headers: {
      token: store.state.volunteerToken
      //   'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
