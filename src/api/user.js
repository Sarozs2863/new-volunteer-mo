import request from './request';
import qs from 'qs';

// 手动输入账号密码获取 app端 token
export function login(data) {
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

// 更新学生信息
export function updateStudentInfo(data) {
	return request({
		url: '/volunteer/public/updateStuInfoFromWustHelper',
		method: 'put',
		params: {
			appToken: data
		}
		// hideloading: false, // vant 加载效果
	});
}

export function getVolunteerToken(platform) {
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
export function getUserInfo() {
	return request({
		url: '/enterPage/studentInfo',
		method: 'GET',
		hideloading: true
	});
}
// 获取个人信用等级信息
export function getCreditLevel() {
	return request({
		// url: '/common/getCreditByToken',
		url: '/stuPunished/getStuInfoByNum',
		method: 'GET',
		hideloading: false
	});
}
// 获取工时概览 已参与 xx 活动， 已认证 xxx 工时， 未认证 xxx 工时
export function getHourView() {
	console.log('getHourView');
	return request({
		url: '/volunteer/public/sumTime',
		method: 'GET',
		hideloading: false // vant 加载效果
	});
}
// 获取活动列表
export function getActsList(param) {
	return request({
		url: 'volunteer/public/volunteerTime',
		method: 'GET',
		hideloading: true,
		params: param
	});
}

// 提交工时验证码
export function submitValidCode() {
	return request({
		url: '/enterPage/studentInfo',
		method: 'GET',
		hideloading: false
	});
}

// 获取届别列表
export function levelList() {
	return request({
		url: '/common/allLevel',
		method: 'GET'
	});
}

// 获取学院
export function collegeList() {
	return request({
		url: '/common/allCollege',
		method: 'GET'
	});
}

// 获取班级
export function classList(params) {
	return request({
		url: '/common/classList',
		method: 'GET',
		params
	});
}

// 民族
export function nationList(params) {
	return request({
		url: '/common/nations',
		method: 'GET',
		params
	});
}

// 宿舍楼 如南二 北一
export function dormList(params) {
	return request({
		url: '/common/buildings',
		method: 'GET',
		params
	});
}

// 获取政治面貌列表
export function politicalOutlook() {
	return request({
		url: '/common/politicalOutlook',
		method: 'GET'
	});
}

// 获取省份列表
export function provinceList() {
	return request({
		url: '/enterPage/provinces',
		method: 'GET'
	});
}

// 获取城市列表
export function cityList(params) {
	return request({
		url: '/enterPage/cities',
		method: 'GET',
		params
	});
}

// 服务意向
export function intentionList(params) {
	return request({
		url: '/common/serverIntention',
		method: 'GET',
		params
	});
}

// 补全用户信息
export function modUserInfo(data) {
	return request({
		url: '/volunteer/public/personInfo',
		method: 'PUT',
		data
	});
}
