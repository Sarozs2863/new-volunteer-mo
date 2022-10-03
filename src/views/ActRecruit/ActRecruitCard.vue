<template>
	<div>
		<van-row
			class="act_card"
			v-for="(recruitAct, index) in actRecruitList"
			:key="index"
			type="flex"
			justify="space-around"
		>
			<van-col class="left" span="13">
				<van-row class="act_name">{{ recruitAct.activityName }}</van-row>
				<van-row class="act_time">活动时间：{{ recruitAct.activityStartTime }}</van-row>
				<van-row class="act_organization">主办单位：{{ recruitAct.organization }}</van-row>
			</van-col>
			<van-col class="right">
				<van-row class="activityTime fs-xxs">
					{{ recruitAct.activityTime }}
				</van-row>
				<van-row>
					<van-button type="info" size="small" @click="checkTheAct(dataMap.get(recruitAct.id))">活动详情</van-button>
				</van-row>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { getActDetails } from '@/api/recruitAct.js';
export default {
	name: 'ActRecruitCard',
	props: ['actRecruitList', 'dataMap'],
	computed: {
		// ...mapState(['actList'])
	},
	methods: {
		async checkTheAct(data) {
			// let res = await getActDetails(actId);
			console.log('oneData:', data);
			this.$router.push({
				name: 'recruitDetails',
				params: {
					actDetail: data
				}
			});
		}
	},
	created() {}
};
</script>

<style lang="scss" scoped>
.act_card:active {
	filter: brightness(0.9);
	transition: 0.2s;
}
.act_card {
	background-color: #fff;
	margin-top: 0.24rem;
	border-radius: 5px;
	// box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
	padding: 0.36rem 0rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.left {
		// margin-top: 0.3rem;
		.act_name {
			margin: 0.1rem 0 0.28rem;
			font-size: 0.55rem;
			font-weight: bold;
		}
		.act_time {
			display: flex;
			font-size: 0.34rem;
			// font-weight: bold;
			line-height: 0.3rem;
		}
		.act_organization {
			font-size: 0.34rem;
			// font-weight: bold;
			margin: 0.1rem 0;
		}
	}
	.right {
		// margin: 0.3rem 0 0.15rem;
		.activityTime {
			margin-bottom: 6px;
			display: flex;
			justify-content: center;
		}
	}
}
</style>
