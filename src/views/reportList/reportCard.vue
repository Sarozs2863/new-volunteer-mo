<template>
	<div>
		<van-row class="act_card" v-for="(report, index) in reportList" :key="index" type="flex" justify="space-around">
			<van-col class="left" span="14">
				<van-row class="act_name">{{ report.activityName }}</van-row>
				<div class="date_crater">
					<b style="display: inline-block; width: 60px">举报时间：</b>{{ report.completeTime }}
				</div>
				<van-row class="organization"
					><b style="display: inline-block; width: 60px">被举报人：</b>{{ report.reportedPersonName }}</van-row
				>
				<div class="status"><b style="display: inline-block; width: 60px"> 举报状态：</b>{{ report.status }}</div>
			</van-col>
			<van-col class="right">
				<van-row
					><van-button type="info" style="margin-left: -20px" @click="confirmCancelReport(report.id)"
						>撤销举报</van-button
					></van-row
				>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Dialog } from 'vant';
import { getReportList, cancelReport } from '@/api/report.js';
export default {
	name: 'ReportCard',
	props: ['reportList'],
	computed: {
		// ...mapState(['actList'])
	},
	methods: {
		async cancelReport(reportId) {
			let res = await cancelReport(reportId);
			if (res.code === 0) {
				this.$toast.success('撤销该条举报成功！');
			} else {
				this.$toast.fail(res.msg);
			}
		},
		confirmCancelReport(reportId) {
			Dialog.confirm({
				title: '确认撤销该条举报吗？',
				message: '此次举报将全程保护您的个人信息，请实事求是，放心填写！'
			})
				.then(() => {
					this.cancelReport(reportId);
					setTimeout(() => {
						this.$emit('getList');
					}, 1000);
				})
				.catch(() => {
					// on cancel
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
			font-size: 0.45rem;
			font-weight: bold;
		}
		.date_crater {
			display: flex;
			line-height: 0.3rem;
			.date {
				margin-right: 0.15rem;
			}
		}
		.status {
			margin: 5px 0;
		}
		.organization {
			// font-size: 0.35rem;
			margin: 0.1rem 0;
		}
	}
	.right {
		// margin: 0.3rem 0 0.15rem;
		.hour {
			color: #1989fa;
			font-size: 0.6rem;
			margin: 0.07rem 0 0.3rem;
			text-align: center;
		}
	}
}
</style>
