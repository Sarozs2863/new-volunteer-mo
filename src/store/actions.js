import { getVolunteerToken, getUserInfo, getHourView, getActsList } from '@/api/user';
export default {
  async setVolunteerToken({ commit, state }) {
    let { data: token } = await getVolunteerToken();
    commit('setVolunteerToken', token);
  },
  async setUserInfo({ commit, state }) {
    console.log('execute setUserInfo');
    let { data } = await getUserInfo();
    commit('setUserInfo', data);
  },
  async setHourView({ commit, state }) {
    let { data } = await getHourView();
    commit('setHourView', data);
  },
  async setRecentActs({ commit, state }) {
    let { data } = await getActsList();
    // console.log(data.list);
    let recentActs;
    if (data.list.length >= 3) {
      recentActs = data.list.splice(-3);
    } else {
      recentActs = data.list;
    }
    // console.log(recentActs);
    commit('setRecentActs', recentActs);
  },
  doSetHourView(context, payload) {
    return new Promise((resolve, reject) => {
      hourOverview()
        .then(res => {
          Toast.clear();
          localStorage.setItem('hourView', JSON.stringify(res.data));
          context.commit('setHourView', res.data);
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }
};
