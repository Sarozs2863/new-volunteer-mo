<template>
	<div>
		<van-nav-bar
			:style="{ display: $store.state.platform === 'mp' ? 'none' : '' }"
			title="活动招募详情"
			left-text="返回"
			left-arrow
			@click-left="$router.go(-1)"
		/>
		<van-cell-group>
			<van-cell center size="large" title="活动名称：" :value="actDetails.activityName" />
			<van-cell center size="large" title="主办组织：" :value="actDetails.organization" />
			<van-cell center size="large" title="工时数量：" :value="actDetails.activityTime" />
			<van-cell center size="large" title="活动时间：" :value="actDetails.dayTime" />
			<van-cell center size="large" title="活动地点：" :value="actDetails.activityPlace" />
			<van-cell center size="large" title="活动简介：" :value="actDetails.introductory" />
		</van-cell-group>
		<div style="margin:18px">
			<van-button round block type="info" @click="signUp">立即报名</van-button>
		</div>
	</div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { signUpTheAct } from '@/api/recruitAct.js';
export default {
	data() {
		return {
			actDetails: {
				activityId: 99978,
				activityName: '0001',
				dayTime: '14:00-16:00',
				organization: '计算机学院',
				activityTime: '10h',
				activityPlace: '恒大楼门口',
				introductory:
					'这是一段活动简介这是一段活动简介这是一段活动简介这是一段活动简介这是一段活动简介这是一段活动简介这是一段活动简介这是一段活动简介这是一段活动简介'
			}
		};
	},
	mounted() {
		console.log(this.$route.params);
		this.actDetails = this.$route.params.actDetail;
	},
	methods: {
		// 确认报名，弹出提示窗口
		signUp() {
			Dialog.confirm({
				title: '注意事项',
				message: '您确认符合此活动所招募志愿者要求，且能准时无误参加吗？如若要退出请在活动正式开始前24h退出。'
			})
				.then(async () => {
					let res = await signUpTheAct(this.actDetails.activityId);
					if (res.code === 0) {
						Toast.success('报名成功！');
						// 提交成功回到首页
						setTimeout(() => {
							this.$router.go(-1);
						}, 1500);
					} else {
						Toast.fail(res.msg);
					}
				})
				.catch(() => {
					// on cancel
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
