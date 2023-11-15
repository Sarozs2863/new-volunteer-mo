import { getVolunteerToken, getUserInfo, getHourView, getActsList, getCreditLevel } from '@/api/user';
import { Toast } from 'vant';
export default {
	async setVolunteerToken({ commit, state }) {
		let { data: token } = await getVolunteerToken(state.platform);
		commit('setVolunteerToken', token);
	},
	async setUserInfo({ commit, state }) {
		try {
			console.log('execute setUserInfo');
			const res = await getUserInfo();
			if (res) {
				commit('setUserInfo', res.data);
			} else {
				Toast.fail("获取身份信息失败")
			}
		} catch (e) {

		}
	},
	async setCreditLevel({ commit, state }) {
		console.log('execute setCreditLevel');
		let { data } = await getCreditLevel();
		commit('setCreditLevel', data);
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
			recentActs = data.list.slice(0, 3);
		} else {
			recentActs = data.list;
		}
		// console.log(recentActs);
		commit('setRecentActs', recentActs);
	},
	doSetActList(context, payload) {
		return new Promise((resolve, reject) => {
			getActsList()
				.then((res) => {
					// Toast.clear();
					localStorage.setItem('actList', JSON.stringify(res.data.list));
					context.commit('setActList', res.data.list);
					resolve(res);
				})
				.catch((err) => reject(err));
		});
	},
	doSetHourView(context, payload) {
		return new Promise((resolve, reject) => {
			getHourView()
				.then((res) => {
					// Toast.clear();
					localStorage.setItem('hourView', JSON.stringify(res.data));
					context.commit('setHourView', res.data);
					resolve(res);
				})
				.catch((err) => reject(err));
		});
	}
};
