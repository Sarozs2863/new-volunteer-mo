import axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
});

//  请求拦截
service.interceptors.request.use(
	(config) => {
		if (config.url === '/login/mobile' || config.url === '/login/mp') {
			config.headers['token'] = store.state.platformToken;
		} else if (config.url === 'https://wusthelper.wustlinghang.cn/mobileapi/v2/jwc/login') {
		} else {
			config.headers['token'] = store.state.volunteerToken;
		}

		if (config.hideloading) {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner'
			});
		}
		// console.log(config);
		return config;
	},
	(error) => {
		// console.log(error);
		return Promise.reject(error);
	}
);
// respone 响应拦截
service.interceptors.response.use(
	(response) => {
		Toast.clear(); // 加载效果停止
		const res = response.data;
		if (res.status && res.status !== 200) {
			Toast(res.msg);
			switch (res.status) {
				case 11101:
					// ...
					break;
				case 11102:
					// ...
					break;
				case 11103:
					// ...
					break;
				default:
					return Promise.reject(res || 'error');
			}
		} else {
			return Promise.resolve(res);
		}
	},
	(error) => {
		Toast.clear();
		console.log('err' + error); // for debug
		switch (error.response.status) {
			case 401:
				// ...
				break;
			case 500:
				// ...
				break;
			default:
				return Promise.reject(error);
		}
	}
);

export default service;
