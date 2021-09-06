<template>
	<div>
		<van-nav-bar title="活动策划" left-text="返回" fixed placeholder left-arrow @click-left="$router.go(-1)">
		</van-nav-bar>
		<div class="tips">
			<p>该功能暂未开放</p>
			<p>如需使用请前往管理端</p>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
.tips {
	text-align: center;
	margin-top: 10%;
	font-size: 21px;
	font-family: '仿宋';
}
</style>
