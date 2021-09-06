<template>
	<div class="wrap">
		<div class="back_to_top" v-if="flag_scroll">
			<van-icon class="back_btn" name="arrow-up" @click="backTop"> </van-icon>
		</div>
		<van-nav-bar
			:style="{ display: $store.state.platform === 'mp' ? 'none' : '' }"
			title="活动列表"
			left-arrow
			fixed
			placeholder
			@click-left="$router.go(-1)"
		>
		</van-nav-bar>
		<div class="content">
			<van-empty v-if="actList.length == 0" description="你还没有参与过志愿活动哦！"></van-empty>
			<van-list
				v-else
				:finished="finished"
				finished-text="快去参加更多的志愿活动吧！"
				@load="getActList"
				v-model="loading"
			>
				<ActCard v-if="actList.length > 0" :actList="actList"></ActCard>
			</van-list>
		</div>
		<Copyright></Copyright>
	</div>
</template>

<script>
import ActCard from '@/components/ActCard.vue';
import Copyright from '@/components/Copyright.vue';
import { mapState } from 'vuex';
import { getActsList } from '@/api/user.js';

export default {
	name: 'AllActList',
	data() {
		return {
			//   active: 0,
			//   tabs: ['全部', '已认证', '未认证'],
			actList: [],
			finished: false,
			pageNum: 1,
			loading: false,
			flag_scroll: false
		};
	},
	computed: {
		...mapState(['getActsList', 'platform'])
	},
	components: {
		ActCard,
		Copyright
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll, true);
		this.getActList();
	},
	methods: {
		// 标签页切换
		selectApproved() {},
		async getActList() {
			let params = {
				currPage: this.pageNum
			};
			await getActsList(params).then((res) => {
				this.loading = false;
				console.log('res.data.list', res.data.list);
				let list = res.data.list;
				if (this.pageNum > 1) {
					this.actList = [...this.actList, ...list];
				} else {
					this.actList = list;
				}
				// if (res.data.list.length === 0) {
				// 	this.finished = true;
				// }
				// 若是当前页数 = 总页数，则已经没有数据
				if (res.data.currPage === res.data.totalPage) {
					this.finished = true;
				}
				// 若是总页数大于当前页码，页码+1
				if (res.data.totalPage > res.data.currPage) {
					this.pageNum++;
				}
			});
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
		.organization {
			font-size: 0.35rem;
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
