<template>
	<div class="wrap">
		<van-nav-bar title="工时详情" left-text="返回" left-arrow @click-left="$router.go(-1)" />
		<div class="myTimes fs-xxs card ">
			<van-row class="Item-details">
				<van-col>姓名：</van-col>
				<van-col>{{ $store.state.userInfo.studentName }}</van-col>
			</van-row>
			<van-row class="Item-details">
				<van-col>学号：</van-col>
				<van-col>{{ $store.state.userInfo.studentNum }}</van-col>
			</van-row>
			<van-row class="Item-details">
				<van-col>已参加活动：</van-col>
				<van-col>{{ $store.state.hourView.activityJoined }}</van-col>
			</van-row>
			<van-row class="Item-details">
				<van-col>已认证工时：</van-col>
				<van-col>{{ $store.state.hourView.timePassed }}h</van-col>
			</van-row>
			<van-row class="Item-details">
				<van-col>未认证工时：</van-col>
				<van-col>{{ $store.state.hourView.timeToBePassed }}h</van-col>
			</van-row>
			<div class="tips">
				快去参加更多志愿活动吧~
			</div>
		</div>

		<copyright></copyright>
	</div>
</template>

<script>
import Copyright from '../components/Copyright.vue';
export default {
	components: {
		Copyright
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	.myTimes {
		height: 300px;
		margin-top: 10px;
		padding-top: 20px;
		.Item-details {
			margin: 10px 10px 10px 24px;
			line-height: 40px;
			border-bottom: grey solid 1px;
		}
	}
	.tips {
		margin-top: 20px;
		text-align: center;
		font-size: 15px;
		color: rgba(116, 117, 116, 0.705);
	}
}
</style>
