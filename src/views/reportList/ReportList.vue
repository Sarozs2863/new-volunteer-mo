<template>
	<div>
		<div class="wrap">
			<div class="back_to_top" v-if="flag_scroll">
				<van-icon class="back_btn" name="arrow-up" @click="backTop"> </van-icon>
			</div>
			<van-nav-bar title="举报记录" left-arrow fixed placeholder @click-left="$router.go(-1)"> </van-nav-bar>
			<div class="content">
				<van-empty v-if="reportList.length === 0" description="你还没有举报记录哦！"></van-empty>
				<van-list v-else :finished="finished" finished-text="没有更多举报记录了哦~">
					<ReportCard @getList="getList" v-if="reportList.length > 0" :reportList="reportList"></ReportCard>
				</van-list>
			</div>
			<!-- <copyright></copyright> -->
		</div>
	</div>
</template>

<script>
import ReportCard from './reportCard.vue';
import { getReportList } from '@/api/report.js';
export default {
	data() {
		return {
			loading: false,
			flag_scroll: false,
			finished: false,
			reportList: []
		};
	},
	components: {
		ReportCard
		// copyright
	},
	methods: {
		async getList() {
			let res = await getReportList();
			if (res.code === 0) {
				this.reportList = res.data;
				this.reportList.reverse();
				this.finished = true;
				console.log('reportList', this.reportList);
			} else {
				this.$toast.fail(res.msg);
			}
			this.loading = false;
		},
		// 返回顶部
		backTop() {
			let top = document.getElementsByClassName('wrap')[0].scrollTop;
			// 实现滚动效果，缓慢回到顶部
			// 每20ms  向上移动50px
			const timeTop = setInterval(() => {
				document.getElementsByClassName('wrap')[0].scrollTop = top -= 50;
				if (top <= 0) {
					clearInterval(timeTop); //清除定时器
				}
			}, 20);
		},
		// 控制按钮显示
		handleScroll() {
			let scrollTop = document.getElementsByClassName('wrap')[0].scrollTop;
			console.log(scrollTop);
			if (scrollTop > 200) {
				this.flag_scroll = true;
			} else {
				this.flag_scroll = false;
			}
		}
	},
	async mounted() {
		window.addEventListener('scroll', this.handleScroll, true);
		this.getList();
	}
};
</script>

<style lang="scss" scoped>
// 返回顶部按钮样式
.back_to_top {
	position: fixed;
	bottom: 1.5rem;
	right: 1rem;
	border-radius: 50%;
	background-color: #1989fa;
	border: #1989fa 3px solid;
	padding: 0.18rem;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	z-index: 10000;
	.back_btn {
		font-size: 0.7rem;
		color: white;
	}
}

.wrap {
	overflow-y: scroll;
	width: 100%;
	height: 100vh;
}

.content {
	margin-top: 0.2rem;
	padding: 0 0.33rem;
	min-height: 14rem;
}
// 修改标签页底部的颜色
/deep/.van-tabs__line {
	background-color: rgb(0, 110, 255);
}

/* 活动卡片的相关样式 */
.act_card:active {
	filter: brightness(0.9);
	transition: 0.2s;
}
</style>
