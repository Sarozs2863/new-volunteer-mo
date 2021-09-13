<template>
	<!-- 头像以及个人信息区域 -->
	<div>
		<van-row class="d-flex jc-center ">
			<van-image @click="showQRCode = true" round width="2.5rem" height="2.5rem" :src="$store.state.gender" />
		</van-row>
		<van-row style="margin-top:5px" type="flex" justify="center">
			<span class=" fs-xxs text-background">{{ $store.state.userInfo.studentName }}</span>
			<div class="user-statu">
				<van-tag :type="$store.state.creditTag" size="large ">{{ $store.state.creditLevel }}</van-tag>
			</div>
		</van-row>
		<van-row class="fs-xxxs d-flex jc-center" style="line-height:20px" gutter="20">
			<van-col class="stu_college text-background">{{ $store.state.userInfo.collegeName }}</van-col>
			<van-col class="stu_num text-background">{{ $store.state.userInfo.studentNum }}</van-col>
		</van-row>
		<van-overlay :show="showQRCode" @click="show = false" style="position:absolute;z-index:10000">
			<div class="QR_code" v-if="showQRCode" @click.stop>
				<div class="tips_intro">
					<div style="text-align:center">
						<img width="100" height="100" src="@/assets/img/groupflag.png" />
					</div>
					<div class="intro_text">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						欢迎加入武汉科技大学志愿者这个大家庭，我校志愿者一直秉持着奉献、友爱、互助、进步的志愿者精神！期待和你的志愿之旅！
						“志”同道合，“愿”你同行。获取更多志愿资讯，欢迎扫码关注下列账号!
					</div>
					<div class="tips_save">
						长按图片可保存
					</div>
				</div>
				<div class="tips_codes">
					<img width="120" height="120" src="@/assets/img/zdwx.png" />
					<img width="110" height="110" src="@/assets/img/zdqq.png" />
				</div>
				<van-button type="info" class="tips_confirm" @click="showQRCode = false">确认</van-button>
			</div>
		</van-overlay>
		<!-- <div class="QR_code" v-if="showQRCode">
			<div class="tips_intro">
				<div style="text-align:center">
					<img width="100" height="100" src="@/assets/img/groupflag.png" />
				</div>
				<div class="intro_text">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					欢迎加入武汉科技大学志愿者这个大家庭，我校志愿者一直秉持着奉献、友爱、互助、进步的志愿者精神！期待和你的志愿之旅！
					“志”同道合，“愿”你同行。获取更多志愿资讯，欢迎扫码关注下列账号!
				</div>
				<div class="tips_save">
					长按图片可保存
				</div>
			</div>
			<div class="tips_codes">
				<img width="120" height="120" src="@/assets/img/zdwx.png" />
				<img width="110" height="110" src="@/assets/img/zdqq.png" />
			</div>
			<van-button type="info" class="tips_confirm" @click="showQRCode = false">确认</van-button>
		</div> -->
	</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	data() {
		return {
			showQRCode: false
		};
	},
	mounted() {
		// console.log('this.$store.state.creditLevel', this.$store.state.creditLevel);
		// if (this.$store.state.creditLevel === '⚠') {
		// 	this.tag_type = 'danger';
		// } else {
		// 	this.tag_type = 'success';
		// }
	},
	methods: {
		setup() {
			const show = ref(false);
			return { show };
		}
	}
};
</script>

<style>
.QR_code {
	position: absolute;
	margin-left: 5%;
	margin-top: 10%;
	background-color: #fff;
	padding: 0.4rem 0.5rem 1rem 0.5rem;
	/* box-shadow: 0 px 8px #f7f8fa; */
	border-radius: 0.6rem;
	height: 500px;
	width: 80%;
	background-color: white;
	z-index: 10000;
}
.tips_intro {
	/* display: flex; */
	justify-content: center;
	line-height: 18px;
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
	margin-top: 20px;
}
.intro_text {
	font-size: 0.47rem;
	line-height: 30px;
	margin-left: 10px;
	text-align: start;
	margin-top: 10px;
}
.tips_confirm {
	width: 90%;
	margin-left: 6%;
	border-radius: 2rem;
	height: 38px;
	margin-top: 10px;
}
.user-statu {
	margin-left: 12px;
	line-height: 34px;
}
.stu_college {
	margin-right: 10px;
	margin-top: 2px;
	background-color: rgba(46, 46, 46, 0.2);
	border-radius: 1rem;
	height: 0.6rem;
	line-height: 0.45rem;
	padding: 0.12rem 0.28rem;
}
.stu_num {
	margin-top: 2px;
	background-color: rgba(46, 46, 46, 0.2);
	border-radius: 1rem;
	height: 0.6rem;
	line-height: 0.45rem;
	padding: 0.12rem 0.28rem;
}
</style>
