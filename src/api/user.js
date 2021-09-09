import request from './request';
import qs from 'qs';

// 手动输入账号密码获取 app端 token
function login(data) {
	return request({
		url: 'https://wusthelper.wustlinghang.cn/mobileapi/v2/jwc/login',
		method: 'POST',
		hideloading: false, // vant 加载效果
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
	});
}

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
		hideloading: false // vant 加载效果
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
		hideloading: false
	});
}

export { getVolunteerToken, getUserInfo, getHourView, getActsList, getCreditLevel, login };
