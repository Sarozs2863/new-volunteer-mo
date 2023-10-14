<template>
	<div>
		<div class="blue-area">
			<!-- 顶部滚动通知区域 -->
			<van-notice-bar left-icon="volume-o" :text="notice" />
			<!-- 顶部按钮区域 -->
			<van-row class="d-flex jc-end">
				<van-icon name="question-o" class="m-10" size="23px" color="#fff" @click="guideDialogShow = true" />
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
		<FuncArea class="func-area" style="margin-top: 15px"></FuncArea>
		<ActList></ActList>
		<copyright></copyright>

		<van-dialog
			v-model="loginDialogShow"
			title="用户登录"
			show-cancel-button
			confirmButtonColor="#1989FA"
			@confirm="webLogin"
		>
			<div style="margin-top: 20px">
				<van-field v-model="stuNo" label="学号" placeholder="请输入学号" />
				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
			</div>
		</van-dialog>

		<!-- 进入时候的弹窗 -->
		<van-dialog v-model="showQRCode" confirmButtonColor="#1989FA">
			<div class="QR_code">
				<div class="tips_intro">
					<div style="text-align: center">
						<img width="100" height="100" src="@/assets/img/groupflag.png" />
					</div>
					<div class="intro_text">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						武汉科技大学青年志愿者服务总队欢迎各位同学的加入，我校志愿者一直秉持着奉献、友爱、互助、进步的志愿精神！“志”同道合，“愿”你同行。欢迎扫码关注下列总队官方账号，期待和你的志愿之旅！
					</div>
					<div class="tips_save">截图至对应APP扫描</div>
				</div>
				<div class="tips_codes">
					<div class="code_items">
						<img width="120" height="120" src="@/assets/img/zdwx.jpg" />
						<div style="margin-top: -10px"><span class="code_type">微信</span></div>
					</div>
					<div class="code_items">
						<img width="110" height="110" src="@/assets/img/zdqq.jpg" />
						<div><span class="code_type">QQ</span></div>
					</div>
				</div>
			</div>
		</van-dialog>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { Toast } from 'vant';
import { login, updateStudentInfo } from '@/api/user';
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
			notice: '用户反馈QQ群：926518229。若工时信息与志愿者证不对应，请联系该活动的活动负责人或向院青队咨询',
			//登录弹窗
			loginDialogShow: false,
			stuNo: '',
			password: '',
			userData: {},
			//是否展示总队宣传弹窗
			showQRCode: false
		};
	},
	activated() {
		// 不缓存verifyCode 将六位活动验证码清空
		this.verifyCode = '';
		// 工具栏默认不显示
		// this.showPopover = false;
		this.userData = this.$store.state.userInfo;
	},
	methods: {
		// 检测登录环境
		testPlatform() {
			if (this.$cookies.get('cookie')) {
				return 'android';
			} else if (this.$route.query.platform) {
				//小程序
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
			console.log("token",this.getPlatformToken())
			if (this.getPlatformToken() == false) {
				this.loginDialogShow = true;
			} else {
				await this.setVolunteerToken();// 通过已有token，获取volunteerToken
				await this.setUserInfo();
				console.log('电话号: ' + this.$store.state.userInfo.phone);
				if (!this.$store.state.userInfo.phone) {
					this.showQRCode = true;
				}

				await this.setHourView();
				await this.setRecentActs();
				await this.setCreditLevel();
			}
			// this.getInfo();
			// function isLocalStorage() {
			// 	var testKey = 'test',
			// 		storage = window.localStorage;
			// 	try {
			// 		storage.setItem(testKey, 'testValue');
			// 		storage.removeItem(testKey);
			// 		return true;
			// 	} catch (error) {
			// 		return false;
			// 	}
			// }

			// console.log(isLocalStorage());
			// if (isLocalStorage()) {
			// 	if (new Date() - new Date(localStorage.getItem('syncDate')) > 1000 * 30) {
			// 		this.getInfo();
			// 	}
			// } else {
			// 	Toast.fail('失败');
			// }
		},

		async webLogin() {
			let data = {
				stuNum: this.stuNo,
				jwcPwd: this.password
			};
			let res = await login(data);
			console.log('res',res);
			if (res.code == 10000&& res.data) {
				console.log('教务处的token');
				console.log(res.data);
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

		// 从教务处获取 新信息，同步到领航服务器
		// async getInfo() {
		// 	const res = await updateStudentInfo(this.$cookies.get('cookie'));
		// 	if (res.code == 0) {
		// 		Toast.success(res.msg);
		// 		// 如果成功，将同步的时间记录
		// 		localStorage.setItem('syncDate', new Date());
		// 	} else {
		// 		// Toast.fail('失败');
		// 	}
		// },

		...mapActions(['setVolunteerToken', 'setUserInfo', 'setHourView', 'setRecentActs', 'setCreditLevel'])
	},
	mounted() {
		this.init();
		this.showQRCode = false;
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

.code_items {
	display: block;
	text-align: center;
}
.code_type {
	color: rgb(152, 152, 152);
}
.no_repeat {
	text-align: center;
	margin-top: 15px;
	color: rgb(126, 126, 126);
	letter-spacing: 0.1rem;
}
.tips_intro {
	margin-top: 20px;
}
.tips_codes {
	display: flex;
	justify-content: space-around;
	margin-top: 5px;
}
.tips_save {
	text-align: center;
	font-size: 0.3688rem;
	color: rgb(152, 152, 152);
	margin-top: 10px;
}
.intro_text {
	font-size: 0.44rem;
	line-height: 30px;
	width: 290px;
	text-align: start;
	margin-top: 10px;
	margin-left: 20px;
}
</style>
