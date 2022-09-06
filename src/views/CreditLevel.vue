<template>
	<div>
		<van-nav-bar
			:style="{ display: $store.state.platform === 'mp' ? 'none' : '' }"
			title="信用等级"
			left-text="返回"
			left-arrow
			fixed
			placeholder
			@click-left="$router.go(-1)"
		>
		</van-nav-bar>
		<div class="creditCard">
			<van-row class="creditItems">
				<van-col class="items-font">您的信用等级：</van-col>
				<van-col>
					<van-rate
						v-model="currentCreditLevel"
						readonly
						count="3"
						:size="25"
						color="#1989fa"
						void-icon="star"
						void-color="#eee"
					/>
				</van-col>
			</van-row>
			<van-row class="creditItems">
				<van-col class="items-font">累计0星次数：{{ timesZero }}次</van-col>
			</van-row>
		</div>
		<div class="creditTips">
			<van-row class="title">信用等级规则</van-row>
			<van-row class="details">
				<van-row class="tips-items">1.信用等级划分为1至3星，初始每位志愿者都是3星</van-row>
				<van-row class="tips-items">2.参与志愿服务活动，被举报且被核实为迟到（早退），一次降1星</van-row>
				<van-row class="tips-items">3.被举报且被核实为旷到，一次降2星</van-row>
				<van-row class="tips-items"
					>4.被举报且被核实为从事与工作无关或影响志愿服务活动开展的个人活动，一次降1星</van-row
				>
				<van-row class="tips-items">5.其他情况，酌情降星</van-row>
				<br />
				<van-row class="tips-items">• 第一次等级降级为0星，在60天内禁止参与志愿服务活动 </van-row>
				<van-row class="tips-items"
					>• 第二次等级降为0星，在该学期禁止参与志愿服务活动，且该学期所做志愿活动获得的工时清0</van-row
				>
				<van-row class="tips-items"
					>• 第三次等级降为0星，在该学年禁止参与志愿服务活动，且该学年所做志愿活动获得的工时清0</van-row
				>
				<van-row class="tips-items">• 第四次等级降为0星，将被禁止参与志愿服务活动</van-row>
			</van-row>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentCreditLevel: 3,
			timesZero: 0
		};
	},
	mounted() {
		this.currentCreditLevel = this.$store.state.creditLevelCount;
		this.timesZero = this.$store.state.punishedTimes;
	}
};
</script>
<style lang="scss">
.creditCard {
	border-radius: 0.6rem;
	background-color: #fff;
	padding: 3px 10px 16px 10px;
	box-shadow: 0 8px 12px #ebedf0;
	margin: 10px 0.5rem;
	margin-top: 20px;
	.creditItems {
		display: flex;
		justify-content: start;
		line-height: 28px;
		margin-top: 13px;
		margin-left: 18%;
		.items-font {
			font-size: 20px;
		}
	}
}
.creditTips {
	border-radius: 0.6rem;
	background-color: #fff;
	padding: 2px 10px 20px 15px;
	box-shadow: 0 8px 12px #ebedf0;
	margin: 10px 0.5rem;
	margin-top: 30px;
	.title {
		display: flex;
		justify-content: center;
		font-size: 17px;
		font-weight: bold;
		color: rgb(51, 48, 48);
		line-height: 50px;
	}
	.details {
		font-size: 0.37rem;
		.tips-items {
			line-height: 20px;
		}
	}
}
</style>
