import axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	//测试环境
	// baseURL: "https://fat-admin-volunteer.wustlinghang.cn/volunteer",
	// baseURL: 'https://volunteer.ciduid.top/volunteer',
	// baseURL: 'http://49.234.41.131:1314/volunteer',
	// baseURL: 'https://192.168.54.179:1314/volunteer',
	timeout: 5000
});

//  请求拦截
service.interceptors.request.use(
	(config) => {
		console.log('env', process.env.VUE_APP_BASE_API)
		// 手机和小程序 登录
		if (config.url === '/login/mobile' || config.url === '/login/mp') {
			config.headers['token'] = store.state.platformToken;
		} else if (config.url === 'https://wusthelper.wustlinghang.cn/mobileapi/v2/jwc/login') {
			//
		} else {
			//
			config.headers['token'] = store.state.volunteerToken;
		}

		if (config.hideloading) {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner'
			});
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// respone 响应拦截
service.interceptors.response.use(
	(response) => {
		Toast.clear(); // 加载效果停止
		const res = response.data;
		console.log("总res", res)
		if (res.status && res.status !== 200) {
			Toast(res.msg);
			switch (res.status) {
				case 401:
					Toast
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
		} else if (!isNaN(res.code) && (res.code !== 10000 && res.code !== 0)) {
			switch (res.code) {
				case 2004:
					console.log("err")
					Toast.fail("登录过期，请重新登录")
				case 30001:
					Toast.fail(res.msg)
				default:
					Toast.fail(res.msg)
			}
			return Promise.reject(res || 'error');
		} else {
			return Promise.resolve(res);
		}
	},
	(error) => {
		Toast.clear();
		console.log('err ' + error); // for debug
		switch (error.response.status) {
			case 401:
				// ...
				break;
			case 500:
				// ...
				break;
			default:
				Toast.fail(error)
				return Promise.reject(error);
		}
	}
);

export default service;
