import request from '@/api/request.js';
export default {
	setPlatform(state, platform) {
		state.platform = platform;
	},
	setPlatformToken(state, token) {
		state.platformToken = token;
	},
	setVolunteerToken(state, token) {
		state.volunteerToken = token;
	},
	setUserInfo(state, userInfo) {
		state.userInfo = userInfo;
		console.log(userInfo);
	},
	setHourView(state, hourView) {
		state.hourView = hourView;
		console.log('工时概览', state.hourView);
	},
	setRecentActs(state, recentActs) {
		state.recentActs = recentActs;
		console.log('近期活动', recentActs);
	},
	// 设置举报参数
	setReasons(state, reasons) {
		state.reportInfo.reason = reasons.reason;
		state.reportInfo.reasonOther = reasons.reasonOther;
	},
	setDetails(state, details) {
		state.reportInfo.reportedPerson = details.reportedPerson;
		state.reportInfo.startTime = details.startTime;
		state.reportInfo.endTime = details.endTime;
		state.reportInfo.activityName = details.activityName;
		state.reportInfo.informPersonNum = details.informPersonNum;
	},
	
};
