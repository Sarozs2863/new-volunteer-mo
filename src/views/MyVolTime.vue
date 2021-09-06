<template>
	<div class="wrap">
		<van-nav-bar
			:style="{ display: $store.state.platform === 'mp' ? 'none' : '' }"
			title="工时详情"
			left-text="返回"
			left-arrow
			@click-left="$router.go(-1)"
		/>
		<div class="myTimes fs-xxs sumcard ">
			<!-- <van-row class="Item-details">
				<van-col>姓名：</van-col>
				<van-col>{{ $store.state.userInfo.studentName }}</van-col>
			</van-row>
			<van-row class="Item-details">
				<van-col>学号：</van-col>
				<van-col>{{ $store.state.userInfo.studentNum }}</van-col>
			</van-row> -->
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
			<van-row>
				<!-- <ActCard v-if="$store.state.recentActs.length > 0" :actList="$store.state.recentActs"></ActCard> -->
			</van-row>
			<div class="tips">
				快去参加更多志愿活动吧~
			</div>
		</div>

		<copyright style="z-index:1000"></copyright>
	</div>
</template>

<script>
import Copyright from '../components/Copyright.vue';
import ActCard from '@/components/ActCard.vue';
export default {
	components: {
		Copyright,
		ActCard
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	background-color: rgb(248, 252, 255);
	.sumcard {
		border-radius: 0.6rem;
		background-color: #fff;
		padding: 10px 20px 10px 10px;
		box-shadow: 0 8px 12px #ebedf0;
		margin: 0px 0.5rem;
		background-color: rgb(231, 243, 251);
	}
	.myTimes {
		height: 300px;
		margin-top: 20px;
		padding-top: 20px;
		.Item-details {
			margin: 10px 10px 10px 24px;
			line-height: 40px;
			border-bottom: grey solid 1px;
			font-family: '华文中宋';
			display: flex;
			justify-content: center;
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
