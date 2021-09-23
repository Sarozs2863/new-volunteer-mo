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
		// 设置用户基本信息
		state.userInfo = userInfo;
		// 根据用户性别设置头像
		state.gender = require('@/assets/img/people.png');
		// 信息补全之前没有身份证号信息
		if (userInfo.idCardNumber) {
			let genderId = userInfo.idCardNumber[16];
			if (genderId % 2 === 0) {
				state.gender = require('@/assets/img/girl.png');
			} else if (genderId % 2 === 1) {
				state.gender = require('@/assets/img/boy.png');
			} else {
				state.gender = require('@/assets/img/people.png');
			}
		}
		console.log(userInfo, state.gender);
	},
	setCreditLevel(state, data) {
		state.creditLevel = '';
		if (data.creditLevel === 0) {
			state.creditLevel = '⚠';
			state.creditTag = 'danger';
		} else {
			for (let i = 0; i < data.creditLevel; i++) {
				state.creditLevel += '★';
				state.creditTag = 'success';
			}
		}
		state.punishedTimes = data.punishedTimes;
		state.creditLevelCount = data.creditLevel;
		console.log('creditLevel', state.creditLevel, state.punishedTimes);
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
	}
};
