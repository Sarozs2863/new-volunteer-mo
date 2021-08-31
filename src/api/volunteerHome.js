import request from './request';

// 根据六位验证码获取活动id
export function getApprovedActId(randomString) {
	return request({
		url: '/volunteer/public/timetableInfo/',
		method: 'GET',
		params: {
			randomString: randomString
		}
	});
}
// 获取工时概览
export function hourOverview() {
	return request({
		url: 'volunteer/public/sumTime',
		method: 'GET'
	});
}
