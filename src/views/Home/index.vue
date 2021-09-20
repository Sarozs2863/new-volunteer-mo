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
import { isIdCard, isPhone, isQQ } from '@/utils/validate';
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
			password: '',
			userData: {},
		};
	},
	activated() {
		// 不缓存verifyCode 将六位活动验证码清空
		this.verifyCode = '';
		// 工具栏默认不显示
		this.showPopover = false;
		this.userData = this.$store.state.userInfo;
	},
	methods: {
		// 检测登录环境
		testPlatform() {
			if (this.$cookies.get('cookie')) {
				return 'android';
			} else if (this.$route.query.platform) {
				if (this.$route.query.platform === 'mp') {
					return 'mp';
				} else if (this.$route.query.platform === 'ios') {
					return 'ios';
				} else {
					return false;
				}
			}
		},
		getPlatformToken() {
			let platform = this.testPlatform();
			console.log('platform is:' + platform);
			if (platform) {
				this.$store.commit('setPlatform', platform);
				switch (platform) {
					case 'android':
						this.$store.commit('setPlatformToken', this.$cookies.get('cookie'));
						break;
					case 'mp':
						if (this.$route.query.token) {
							this.$store.commit('setPlatformToken', this.$route.query.token);
						} else {
							this.$router.replace('/404');
						}
						break;
					case 'ios':
						if (this.$route.query.token) {
							this.$store.commit('setPlatformToken', this.$route.query.token);
						} else {
							this.$router.replace('/404');
						}
						break;
				}
			} else {
				return false;
			}
		},
		async init() {
			if (this.getPlatformToken() == false) {
				this.loginDialogShow = true;
			} else {
				await this.setVolunteerToken();
				await this.setUserInfo();
				await this.setHourView();
				await this.setRecentActs();
				await this.setCreditLevel();
			}
		},
		async webLogin() {
			let data = {
				stuNum: this.stuNo,
				jwcPwd: this.password
			};
			let res = await login(data);
			// console.log(res);
			if (res.code == 10000) {
				document.cookie = 'cookie=' + res.data;
			} else {
				this.$toast(res.msg);
			}
			this.init();
		},
		// // 阻止对话框关闭
		// testForm(action, done) {
		// 	if (action === 'confirm') {
		// 		return done(false);
		// 	} else {
		// 		return done();
		// 	}
		// },
		// // 阻止默认弹出手机键盘
		// noBomBox(event) {
		// 	document.activeElement.blur();
		// },
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
