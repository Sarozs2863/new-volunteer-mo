export default {
	platform: '',
	platformToken: '',
	volunteerToken: '',
	// 用户个人信息
	userInfo: '',
	// 根据性别确定头像
	gender: '',
	// 信用等级
	creditLevel: '',
	// 信用标签类型(默认为绿色)
	creditTag: 'primary ',
	creditLevelCount: 0,
	// 惩罚次数（0星次数）
	punishedTimes: 0,
	// actList: JSON.parse(localStorage.getItem('actList')),
	hourView: {},
	recentActs: [],
	// 举报需要的参数
	reportInfo: {
		reason: '',
		reasonOther: '',
		reportedPerson: '',
		startTime: '',
		endTime: '',
		informPersonNum: '',
		activityName: '',
		collegeId: 0
	}
};
