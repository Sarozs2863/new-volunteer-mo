<template>
	<div>
		<div class="blue-area">
			<!-- 顶部滚动通知区域 -->
			<van-notice-bar left-icon="volume-o" :text="notice" />
			<!-- 顶部按钮区域 -->
			<van-row class="d-flex jc-end">
				<van-icon name="question-o" class="m-10 " size="23px" color="#fff" @click="guideDialogShow = true" />
			</van-row>
			<!-- 用户反馈 -->
			<van-dialog v-model="guideDialogShow" title="用户反馈" confirm-button-color="#006eff">
				<div class="feedback">
					{{ notice }}
				</div>
			</van-dialog>
			<UserInfo class="user-info"></UserInfo>
		</div>
		<ValidCodeCard class="card main-card d-flex jc-center mt-2"></ValidCodeCard>
		<FuncArea class="func-area" style="margin-top: 15px;"></FuncArea>
		<ActList></ActList>
		<copyright></copyright>

		<van-dialog
			v-model="loginDialogShow"
			title="用户登录"
			show-cancel-button
			confirmButtonColor="#1989FA"
			@confirm="webLogin"
		>
			<div style="margin-top: 20px;">
				<van-field v-model="stuNo" label="学号" placeholder="请输入学号" />
				<van-field v-model="password" label="密码" placeholder="请输入密码" />
			</div>
		</van-dialog>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '@/api/user';
// 活动列表 全局组件
import ActList from '@/views/Home/components/ActList.vue';
import copyright from '@/components/Copyright.vue';
// 六位认证码区域
import ValidCodeCard from './components/ValidCodeCard.vue';
// 学生信息区域
import UserInfo from './components/UserInfo.vue';
// 功能区
import FuncArea from './components/FuncArea.vue';

export default {
	name: 'HomePage',
	components: {
		ValidCodeCard,
		UserInfo,
		FuncArea,
		ActList,
		copyright
	},
	data() {
		return {
			guideDialogShow: false,
			notice: '用户反馈qq群：926518229。若工时信息与志愿者证不对应，请联系该活动的活动负责人或向院青队咨询',
			loginDialogShow: false,
			stuNo: '',
			password: ''
		};
	},
	methods: {
		testPlatform() {
			if (this.$cookies.get('cookie')) {
				this.platformToken = this.$cookies.get('cookie');
				return 'andriod';
			} else if (this.$route.query.token) {
				this.platformToken = this.$route.query.token;
				if (this.$route.query.platform === 'mp') {
					return 'mp';
				} else if (this.$route.query.platform === 'ios') {
					return 'ios';
				} else {
					this.$toast('未检测到用户信息！');
					return false;
				}
			}
		},
		getPlatformToken() {
			let platform = this.testPlatform() || '获取平台信息失败！';
			this.$toast(platform);
			this.$store.commit('setPlatform', platform);
			this.$store.commit('setPlatformToken', this.platformToken);
		},
		async init() {
			// if (!this.getPlatformToken()) {
			// 	// 未在cookie或router.query中获取到token，手动登录
			// 	// this.loginDialogShow = true;
			// 	this.$toast('warning');
			// 	return;
			// }
			this.getPlatformToken();
			await this.setVolunteerToken();
			await this.setUserInfo();
			await this.setHourView();
			await this.setRecentActs();
			await this.setCreditLevel();
		},
		async webLogin() {
			// let params = {
			// }
			// let res = await login()
		},
		...mapActions(['setVolunteerToken', 'setUserInfo', 'setHourView', 'setRecentActs', 'setCreditLevel'])
	},
	mounted() {
		this.init();
	}
};
</script>

<style lang="scss" scoped>
.main-card {
	margin-top: -80px;
}
.blue-area {
	background-color: rgb(25, 137, 250);
	width: 100%;
	height: 325px;
}
.feedback {
	text-align: center;
	padding: 0.45rem;
}
</style>
