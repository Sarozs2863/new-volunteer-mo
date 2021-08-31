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
// 获取个人信息
function getUserInfo() {
	return request({
		url: '/enterPage/studentInfo',
		method: 'GET',
		hideloading: true
	});
}
// 获取个人信用等级信息
function getCreditLevel() {
	return request({
		url: '/common/getCreditByToken',
		method: 'GET',
		hideloading: false
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
// 获取活动列表
function getActsList(param) {
	return request({
		url: 'volunteer/public/volunteerTime',
		method: 'GET',
		hideloading: true,
		params: param
	});
}

// 提交工时验证码
function submitValidCode() {
	return request({
		url: '/enterPage/studentInfo',
		method: 'GET',
		hideloading: true
	});
}

export { getVolunteerToken, getUserInfo, getHourView, getActsList, getCreditLevel };
