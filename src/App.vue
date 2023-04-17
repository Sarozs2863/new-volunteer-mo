<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!-- <repair></repair> -->
	</div>
</template>
<script>
import Repair from './views/Repair.vue';
import { updateStudentInfo } from '@/api/user';
import { Dialog, Toast } from 'vant';
export default {
	components: { Repair },
	name: 'App',
	methods: {
		// 从教务处获取 新信息，同步到领航服务器
		async getInfo() {
			const res = await updateStudentInfo(this.$cookies.get('cookie'));
			console.log(res);
			if (res.code == 0) {
				// Toast.success(res.msg);
				// 将同步的时间记录
				localStorage.setItem('syncDate', new Date());
			} else {
				// Toast.fail('失败');
			}
		}
	},
	created() {
		if (new Date() - new Date(localStorage.getItem('syncDate')) < 1000 * 60 * 60 * 24) {
			getInfo();
		}
	}
};
</script>
<style lang="scss">
// html {
//     -webkit-filter: grayscale(100%);
//     filter: grayscale(100%);
// }
</style>
