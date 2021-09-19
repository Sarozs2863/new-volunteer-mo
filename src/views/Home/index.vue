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
		<!-- 首次进入时的信息补全对话框 -->
		<!-- <van-dialog v-model="modUser" title="信息补全" @confirm="doModUserInfo" class="info_fill" :before-close="testForm">
			<van-form ref="infoForm">
				<van-field label="学号" v-model="userData.studentNum" border disabled></van-field>
				<van-field label="姓名" v-model="userData.studentName" disabled></van-field>
				<van-field label="届别" v-model="userData.level" disabled></van-field>
				<van-field label="学院" v-model="userData.collegeName" disabled></van-field>
				<van-field label="班级" v-model="userData.className" disabled></van-field>
				<van-field
					label="身份证号"
					v-model="userData.idCardNumber"
					name="idCard"
					:rules="[
						{
							pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
							message: '身份证号格式有误！'
						},
						{ required: true, message: '请填写您的手机号码！' }
					]"
				></van-field>
				<van-field
					label="手机号"
					v-model="userData.phone"
					type="tel"
					name="phone"
					:rules="[{ pattern: /^1\d{10}$/, message: '手机号格式有误！' }]"
				></van-field>
				<van-field
					label="qq号"
					v-model="userData.qqNum"
					:rules="[{ pattern: /^[1-9][0-9]{4,10}$/, message: 'qq号格式有误！' }]"
				></van-field>
				<van-field
					label="政治面貌"
					v-model="politicOutlook"
					@click="politicPicker = true"
					@focus="noBomBox"
				></van-field>
			</van-form>
		</van-dialog>
		<van-popup v-model="politicPicker" position="bottom">
			<van-picker show-toolbar :columns="politicOutlooks" @confirm="onConfirm" @cancel="politicPicker = false" />
		</van-popup> -->
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
			modUser: false,
			politicOutlooks: ['中共党员', '中共预备党员', '共青团员', '群众'],
			politicPicker: false,
			politicOutlook: ''
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
		// async webLogin() {
		// 	let data = {
		// 		stuNum: this.stuNo,
		// 		jwcPwd: this.password
		// 	};
		// 	let res = await login(data);
		// 	// console.log(res);
		// 	if (res.code == 10000) {
		// 		document.cookie = 'cookie=' + res.data;
		// 	} else {
		// 		this.$toast(res.msg);
		// 	}
		// 	this.init();
		// },
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
		// // 政治面貌的picker
		// onConfirm(value, index) {
		// 	console.log(index);
		// 	this.politicOutlook = value;
		// 	this.userData.politicalOutlook = index + 1;
		// 	this.politicPicker = false;
		// },
		// // 表单验证规则
		// validateForm() {
		// 	if (this.userData.idCardNumber === '') {
		// 		this.$toast('请输入您的身份证号！');
		// 		return false;
		// 	} else if (this.userData.phone === '') {
		// 		this.$toast('请输入您的手机号！');
		// 		return false;
		// 	} else if (this.userData.qqNum === '') {
		// 		this.$toast('请输入您的qq号！');
		// 		return false;
		// 	} else if (!isIdCard(this.userData.idCardNumber)) {
		// 		this.$toast('身份证号输入格式有误！');
		// 		console.log('身份证号输入格式有误！');
		// 		return false;
		// 	} else if (!isPhone(this.userData.phone)) {
		// 		this.$toast('手机号输入格式有误！');
		// 		console.log('手机号输入格式有误！');
		// 		return false;
		// 	} else if (!isQQ(this.userData.qqNum)) {
		// 		this.$toast('qq输入格式有误！');
		// 		console.log('qq号输入格式有误！');
		// 		return false;
		// 	}

		// 	if (this.userData.politicOutlook === '') {
		// 		this.$toast('请选择您的政治面貌！');
		// 		return false;
		// 	}
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
