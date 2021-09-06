<template>
	<div class="copyright">
		<van-row>领航工作室出品</van-row>
		<van-row>微信公众号：武科大助手</van-row>
		<!-- <div>mp token {{$route.query.token}}</div> -->
	</div>
</template>

<script>
export default {
	name: 'Copyright',
	data() {
		return {
			testCookie: ''
		};
	},
	mounted() {
		this.getCookie();
	},
	methods: {
		getCookie() {
			this.testCookie = this.$cookies.get('cookie');
		}
	}
};
</script>

<style>
.copyright {
	text-align: center;
	margin: 0.3rem 0;
	line-height: 0.55rem;
	padding: 0.5rem;
	position: relative;
	z-index: -1;
	/* bottom: 0.5rem; */
}
</style>
