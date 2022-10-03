import request from './request';

// 获取招募活动列表
function getRecruitActList(params) {
	return request({
		url: '/recruit/list',
		method: 'GET',
		hideloading: true, // vant 加载效果
		params
	});
}

// 根据活动id获取活动详情
function getActDetails(actId) {
	return request({
		url: '/recruit/Info',
		method: 'GET',
		hideloading: true, // vant 加载效果
		params: {
			activityId: actId
		}
	});
}
// 志愿者报名参加活动
function signUpTheAct(actId) {
	return request({
		url: '/recruit/add',
		method: 'GET',
		hideloading: true, // vant 加载效果
		params: {
			activityId: actId
		}
	});
}
// 获取用户已参加的活动列表
function getParticipantedList() {
	return request({
		url: '/recruit/participated',
		method: 'GET',
		hideloading: true // vant 加载效果
	});
}
// 志愿者退出活动活动
function deleteActivity(actId) {
	return request({
		url: '/recruit/deleteActivity',
		method: 'GET',
		hideloading: true, // vant 加载效果
		params: {
			activityId: actId
		}
	});
}
export { getRecruitActList, getActDetails, signUpTheAct, getParticipantedList, deleteActivity };
