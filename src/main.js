// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 全局引入按需引入UI库 vant
import '@/plugins/vant';
// 引入全局样式
import '@/assets/css/index.scss';
// 移动端适配
import 'lib-flexible/flexible.js';
// 引入cookies，接收app端通过cookie注入的helperToken
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);



// filters
import './filters';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	/* 小程序端路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
});
