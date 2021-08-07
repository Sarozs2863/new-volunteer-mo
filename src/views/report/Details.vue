<template>
	<div>
		<!-- <h1 class="text-center">违规举报页面</h1> -->
		<van-nav-bar
			title="举报详情"
			left-text="返回"
			fixed
			placeholder
			left-arrow
			@click-left="$router.go(-1)"
			@click-right="onClickRight"
		>
			<template #right>
				<van-button plain type="info" size="mini" class="fs-xxxxs">提交</van-button>
			</template>
		</van-nav-bar>
		<van-notice-bar color="#1989fa" background="#ecf9ff" scrollable left-icon="info-o">
			此次举报将全程保护您的个人信息，请实事求是、放心填写！
		</van-notice-bar>

		<van-cell-group>
			<van-cell title="单元格" value="" />
		</van-cell-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			palceholder: '请输入具体原因',
			reasons: ['做与志愿服务活动无关的事情', '进行影响活动开展的个人活动', '迟到', '早退', '旷到'],
			result: [],
			otherrason: ''
		};
	},
	methods: {
		onClickRight() {
			if (this.otherrason === '') {
				console.log('结果', this.result);
			} else {
				this.result.push(this.otherrason);
				console.log('结果', this.result);
			}
			this.$router.push('/details');
		},
		toggle(index) {
			this.$refs.checkboxes[index].toggle();
		}
	}
};
</script>

<style></style>
