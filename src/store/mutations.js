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
  }
};
