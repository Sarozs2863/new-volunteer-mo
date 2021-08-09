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
			@click-right="commitReport"
		>
			<template #right>
				<van-button plain type="info" size="mini" class="fs-xxxxs">提交</van-button>
			</template>
		</van-nav-bar>
		<van-notice-bar color="#1989fa" background="#ecf9ff" scrollable left-icon="info-o">
			此次举报将全程保护您的个人信息，请实事求是、放心填写！
		</van-notice-bar>

		<van-form @submit="onSubmit">
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: ''
		};
	},
	methods: {
		commitReport() {},
		onSubmit() {}
	}
};
</script>

<style></style>
