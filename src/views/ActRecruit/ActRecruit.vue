<template>
	<div>
		<div class="wrap">
			<div class="back_to_top" v-if="flag_scroll">
				<van-icon class="back_btn" name="arrow-up" @click="backTop"> </van-icon>
			</div>
			<van-nav-bar title="活动招募" left-text="返回" left-arrow fixed placeholder @click-left="$router.go(-1)">
			</van-nav-bar>
			<van-tabs v-model="activeName">
				<van-tab title="活动报名" name="活动报名">
					<div>
						<van-cell title="点击选择查询日期" :value="date" @click="showDatePicker = true" />
						<van-calendar color="#1989fa" v-model="showDatePicker" @confirm="onConfirm" />
					</div>
					<div class="content">
						<van-empty v-if="ActRecruitList.length === 0" description="这一天暂时没有活动在招募志愿者噢~"></van-empty>
						<van-list
							v-else
							:finished="finished"
							finished-text="没有更多活动了哦~"
							@load="getActList()"
							v-model="loading"
						>
							<ActRecruitCard v-if="ActRecruitList.length > 0" :actRecruitList="ActRecruitList"></ActRecruitCard>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="我参加的" name="我参加的">
					<div class="content">
						<van-empty v-if="participantedList.length === 0" description="您还没有报名参加任何活动哦~"></van-empty>
						<van-list
							v-else
							:finished="finished"
							finished-text="没有更多活动了哦~"
							@load="getMyList()"
							v-model="loading"
						>
							<MyActCard
								v-if="participantedList.length > 0"
								@refreshthelist="getMyList"
								:participantedList="participantedList"
							></MyActCard>
						</van-list>
					</div>
				</van-tab>
			</van-tabs>
			<div></div>
			<Copyright></Copyright>
		</div>
	</div>
</template>

<script>
import ActRecruitCard from './ActRecruitCard.vue';
import MyActCard from './MyActCard.vue';
import { getRecruitActList, getParticipantedList } from '@/api/recruitAct.js';
import Copyright from '@/components/Copyright.vue';
export default {
	data() {
		return {
			loading: false,
			flag_scroll: false,
			finished: false,
			ActRecruitList: [],
			participantedList: [],
			pageNum: 1,
			date: '',
			showDatePicker: false,
			activeName: '活动报名'
		};
	},
	components: {
		ActRecruitCard,
		MyActCard,
		Copyright
	},
	async mounted() {
		window.addEventListener('scroll', this.handleScroll, true);
		let time = new Date();
		// 默认查询时间为今天
		this.date = this.formatTimes(time);
		this.getActList();
		this.getMyList();
	},
	methods: {
		//分割线
		formatDate(date) {
			return this.formatTimes(date);
		},
		onConfirm(date) {
			this.showDatePicker = false;
			this.date = this.formatDate(date);
			this.getActList();
		},
		// 格式化时间
		formatTimes(time) {
			let years = time.getFullYear() + '';
			let months = time.getMonth() + 1 + '';
			let days = time.getDate() + '';
			let yy = years;
			let mm = months.length === 1 ? '0' + months : months;
			let dd = days.length === 1 ? '0' + days : days;
			console.log(yy, mm, dd);
			return `${yy + '-' + mm + '-' + dd}`;
		},
		// 获取招募活动列表的函数
		async getActList() {
			this.pageNum = 1;
			// 设置查询参数
			let params = {
				currPage: this.pageNum,
				date: this.date
			};
			let res = await getRecruitActList(params);
			this.loading = false;
			// 保证切换日期后能够正常加载列表
			this.finished = false;
			let list = res.data.list;
			console.log('list:', list);
			console.log('finished:', this.finished);
			if (this.pageNum > 1) {
				this.ActRecruitList = [...this.ActRecruitList, ...list];
				console.log('ActRecruitListif:', this.ActRecruitList);
			} else {
				this.ActRecruitList = list;
				console.log('ActRecruitListelse:', this.ActRecruitList);
			}
			if (res.data.list.length === 0) {
				this.finished = true;
				console.log('res.data.list.length === 0');
			}
			// 若是当前页数 = 总页数，则已经没有数据，即已经加载完成
			if (res.data.currPage === res.data.totalPage) {
				this.finished = true;
				console.log('res.data.currPage === res.data.totalPage');
			}
			// 若是总页数大于当前页码，页码+1
			if (res.data.totalPage > res.data.currPage) {
				this.pageNum++;
				console.log('this.pageNum', this.pageNum);
			}
		},
		async getMyList() {
			let res = await getParticipantedList();
			this.loading = false;
			// 保证切换日期后能够正常加载列表
			this.finished = false;
			this.pageNum = 1;
			let list = res.data.list;
			console.log('list:', list);
			console.log('finished:', this.finished);
			if (this.pageNum > 1) {
				this.participantedList = [...this.participantedList, ...list];
				console.log('participantedListIF:', this.participantedList);
			} else {
				this.participantedList = list;
				console.log('participantedListelse:', this.participantedList);
			}
			if (res.data.list.length === 0) {
				this.finished = true;
				console.log('res.data.list.length === 0');
			}
			// 若是当前页数 = 总页数，则已经没有数据，即已经加载完成
			if (res.data.currPage === res.data.totalPage) {
				this.finished = true;
				console.log('res.data.currPage === res.data.totalPage');
			}
			// 若是总页数大于当前页码，页码+1
			if (res.data.totalPage > res.data.currPage) {
				this.pageNum++;
				console.log('this.pageNum', this.pageNum);
			}
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
			// console.log(scrollTop);
			if (scrollTop > 200) {
				this.flag_scroll = true;
			} else {
				this.flag_scroll = false;
			}
		}
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
