<template>
	<!-- 头像以及个人信息区域 -->
	<div>
		<van-row class="d-flex jc-center ">
			<van-image @click="$router.push('/user')" round width="2.5rem" height="2.5rem" :src="$store.state.gender" />
		</van-row>
		<van-row style="margin-top:5px" type="flex" justify="center">
			<span class=" fs-xxs text-background">{{ $store.state.userInfo.studentName }}</span>
			<div class="user-statu">
				<van-tag :type="$store.state.creditTag" size="large ">{{ $store.state.creditLevel }}</van-tag>
			</div>
		</van-row>
		<van-row class="fs-xxxs d-flex jc-center" style="line-height:20px" gutter="20">
			<van-col class="stu_college text-background">{{ $store.state.userInfo.collegeName }}</van-col>
			<van-col class="stu_num text-background">{{ $store.state.userInfo.studentNum }}</van-col>
		</van-row>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>

<style>
.code_items {
	display: block;
	text-align: center;
}
.code_type {
	color: rgb(152, 152, 152);
}
.no_repeat {
	text-align: center;
	margin-top: 15px;
	color: rgb(126, 126, 126);
	letter-spacing: 0.1rem;
}
.tips_intro {
	margin-top: 20px;
}
.tips_codes {
	display: flex;
	justify-content: space-around;
	margin-top: 5px;
}
.tips_save {
	text-align: center;
	font-size: 0.3688rem;
	color: rgb(152, 152, 152);
	margin-top: 10px;
}
.intro_text {
	font-size: 0.44rem;
	line-height: 30px;
	margin-left: 10px;
	text-align: start;
	margin-top: 10px;
}

.user-statu {
	margin-left: 12px;
	line-height: 34px;
}
.stu_college {
	margin-right: 10px;
	margin-top: 2px;
	background-color: rgba(46, 46, 46, 0.2);
	border-radius: 1rem;
	height: 0.6rem;
	line-height: 0.45rem;
	padding: 0.12rem 0.28rem;
}
.stu_num {
	margin-top: 2px;
	background-color: rgba(46, 46, 46, 0.2);
	border-radius: 1rem;
	height: 0.6rem;
	line-height: 0.45rem;
	padding: 0.12rem 0.28rem;
}
</style>
