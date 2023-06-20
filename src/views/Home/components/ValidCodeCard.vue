<template>
	<div>
		<van-row class="mt-2">
			<van-password-input
				info="在上方输入正确的认证码，即可提交工时"
				:value="verifyCode"
				:mask="false"
				:gutter="10"
				:length="6"
				:focused="showKeyboard"
				@focus="showKeyboard = true"
			/>
			<div class="d-flex jc-center mt-1">
				<van-button
					type="info"
					block
					class="mt-1 submit-btn"
					:disabled="verifyCode.length < 6 ? true : false"
					@click="commitVerifyCode()"
					>提交工时</van-button
				>
			</div>
			<!-- 数字键盘 -->
			<van-number-keyboard v-model="verifyCode" :maxlength="6" :show="showKeyboard" @blur="showKeyboard = false" />
		</van-row>
	</div>
</template>

<script>
import { getApprovedActId } from '@/api/volunteerHome';
export default {
	data() {
		return {
			verifyCode: '',
			showKeyboard: false
		};
	},
	methods: {
		// 输入六位验证码跳转到提交工时页面
		async commitVerifyCode() {
			const res = await getApprovedActId(this.verifyCode);
			if (res.data === null) {
				this.$toast({
					message: '六位随机码无效！随机码错误或者过期'
				});
				return;
			}
			// 传活动id
			const activityId = res.data.activityId;
			const sheetId = res.data.volunteerCheckId;
			const participateDate = res.data.participateDate;
			const activityName = res.data.activityName;
			const volunteerTimes = res.data.volunteerTimes;
			const crater = res.data.crater;
			// this.$router.push(`/approveAct/${this.approveActId}/${this.verifyCode}`)
			this.$router.push({
				name: 'ApproveAct',
				params: {
					activityId: activityId,
					sheetId: sheetId,
					participateDate: participateDate,
					randomString: this.verifyCode,
					volunteerTimes: volunteerTimes,
					crater: crater,
					activityName: activityName
				}
			});
		}
	}
};
</script>

<style>
.van-password-input__item {
	border: solid rgb(150, 148, 148) 1px;
	border-radius: 8px;
	width: 1.1rem;
}
.submit-btn {
	border-radius: 50px;
	width: 90%;
	font-size: 0.488rem;
}
</style>
