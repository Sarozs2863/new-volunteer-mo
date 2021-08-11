<template>
	<div>
		<!-- <h1 class="text-center">违规举报页面</h1> -->
		<van-nav-bar title="举报详情" left-text="返回" fixed placeholder left-arrow @click-left="$router.go(-1)">
		</van-nav-bar>
		<van-notice-bar color="#1989fa" background="#ecf9ff" scrollable left-icon="info-o">
			此次举报将全程保护您的个人信息，请实事求是、放心填写！
		</van-notice-bar>

		<van-form @submit="onSubmit">
			<!-- 此次志愿活动名称 -->
			<van-field
				v-model="details.activityName"
				autocomplete="off"
				name="志愿活动名称"
				label="活动名称"
				colon
				required
				placeholder="此次志愿活动名称"
				:rules="[{ required: true, message: '请填写活动名称' }]"
			/>
			<!-- 选择开始时间 -->
			<van-field
				clickable
				colon
				required
				:rules="[{ required: true, message: '请填写活动大致开始时间' }]"
				name="datetimePicker1"
				:value="details.startTime"
				autocomplete="off"
				label="开始时间"
				placeholder="点击选择活动大致开始时间"
				@click="showStartPicker = true"
			/>
			<van-popup v-model="showStartPicker" position="bottom">
				<van-datetime-picker
					type="datetime"
					title="年-月-日-时-分"
					:min-date="minDate"
					:max-date="maxDate"
					@confirm="StartTimeConfirm"
					@cancel="showStartPicker = false"
				/>
			</van-popup>
			<!-- 选择结束时间 -->
			<van-field
				clickable
				colon
				required
				:rules="[{ required: true, message: '请填写活动大致结束时间' }]"
				name="datetimePicker2"
				:value="details.endTime"
				autocomplete="off"
				label="结束时间"
				placeholder="点击选择活动大致结束时间"
				@click="showEndPicker = true"
			/>
			<van-popup v-model="showEndPicker" position="bottom">
				<van-datetime-picker
					type="datetime"
					title="年-月-日-时-分"
					:min-date="newMinDate"
					:max-date="maxDate"
					@confirm="EndTimeConfirm"
					@cancel="showEndPicker = false"
				/>
			</van-popup>
			<!-- Ta的姓名 -->
			<van-field
				v-model="details.reportedPerson"
				autocomplete="off"
				name="被举报人姓名"
				label="Ta的姓名"
				colon
				placeholder="被举报人的姓名"
			/>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">提交举报</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			showStartPicker: false,
			showEndPicker: false,
			minDate: new Date(2021, 7, 1),
			newMinDate: new Date(),
			maxDate: new Date(2031, 7, 1),
			details: {
				reportedPerson: '',
				startTime: '',
				endTime: '',
				activityName: '',
				informPersonNum: ''
			}
		};
	},
	created() {
		this.details.informPersonNum = this.$store.state.userInfo.studentNum;
		console.log(this.$store.state.userInfo.studentNum);
	},
	methods: {
		...mapMutations([
			'commitReport' // 将 `this.commitReport()` 映射为 `this.$store.commit('commitReport')`
		]),
		async onSubmit() {
			this.$store.commit('setDetails', this.details);
			const { msg } = await this.commitReport();
			console.log(msg);
			console.log(this.$store.state.reportInfo);
		},
		StartTimeConfirm(time) {
			this.details.startTime =
				time.getFullYear() +
				'年' +
				(time.getMonth() + 1) +
				'月' +
				time.getDate() +
				'日' +
				time.getHours() +
				'时' +
				time.getMinutes() +
				'分';
			this.showStartPicker = false;
			this.newMinDate = time;
		},
		EndTimeConfirm(time) {
			this.details.endTime =
				time.getFullYear() +
				'年' +
				(time.getMonth() + 1) +
				'月' +
				time.getDate() +
				'日' +
				time.getHours() +
				'时' +
				time.getMinutes() +
				'分';
			this.showEndPicker = false;
		}
	}
};
</script>

<style></style>
