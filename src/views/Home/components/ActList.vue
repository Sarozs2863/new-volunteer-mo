<template>
	<div class="act_list_card">
		<van-row class="nav" type="flex" justify="space-between">
			<van-col class="left">
				<van-col>
					<van-icon class="icon_list" name="todo-list-o" />
				</van-col>
				<van-col class="title">近期活动</van-col>
			</van-col>

			<van-col class="right" @click="toAllActList">
				<van-col class="title">查看全部活动</van-col>
				<van-col>
					<van-icon class="icon_arrow" name="arrow" />
				</van-col>
			</van-col>
		</van-row>
		<!-- 活动卡片 -->
		<van-skeleton :row="3" :loading="false" :animate="false" class="skeleton2">
			<ActCard v-if="$store.state.recentActs.length > 0" :actList="$store.state.recentActs"></ActCard>
			<van-empty class="null_list" v-else description="你好像还没有参加过志愿活动哦！" />
		</van-skeleton>
		<!-- <van-skeleton class="skeleton2" :row="3" :loading="loading"> </van-skeleton>
    <van-skeleton :row="3" class="skeleton2" :loading="loading"> </van-skeleton> -->
	</div>
</template>

<script>
import ActCard from '@/components/ActCard.vue';
export default {
	name: 'ActList',
	components: {
		ActCard
	},
	data() {
		return {
			loading: true
		};
	},
	methods: {
		toAllActList() {
			console.log('to AllActList');
			this.$router.push('/actList');
		}
	}
};
</script>

<style lang="scss" scoped>
.skeleton1 {
	margin: 0.3rem;
	padding: 0.4rem 0;
	height: 5.5rem;
}
.skeleton2 {
	margin: 0.3rem;
	padding: 0.4rem 0;
}
.van-empty {
	margin-top: 0.4rem;
	background-color: #fff;
}
.act_list_card {
	margin: 0.4rem 0;
	padding: 0 0.33rem;
	min-height: 398px;
	.nav {
		padding: 0.3rem 0.3rem;
		font-size: 0.35rem;
		vertical-align: middle;
		background-color: #fff;
		border-radius: 5px;
		.left {
			.icon_list {
				font-size: 0.7rem;
				vertical-align: middle;
			}
			.title {
				margin: 2px 0 0 4px;
				font-size: 0.4rem;
			}
		}
		.right {
			margin-top: 3.3px;
			.title {
				line-height: 0.57rem;
			}
			.icon_arrow {
				font-size: 0.45rem;
				line-height: 0.6rem;
				vertical-align: middle;
			}
		}
	}
	.act_card {
		// background-color: #fff;
		margin-top: 0.2rem;
		border-radius: 5px;
		// box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
		padding: 0.4rem;

		.left {
			margin-top: 0.1rem;
			.act_name {
				font-size: 0.45rem;
			}
			.date {
				font-size: 0.3rem;
				margin: 0.06rem 0 0.05rem;
			}
			.organization {
				font-size: 0.35rem;
			}
		}
		.right {
			margin: 0.1rem 0 0.15rem;
			.hour {
				color: #1989fa;
				font-size: 0.55rem;
				margin: 0.04rem 0 0.27rem;
				text-align: center;
			}
		}
	}
	.null_list {
		padding-bottom: 2.5rem;
		padding-top: 0;
		height: 11.5rem;
		background-color: #fff;
		border-radius: 0.2rem;
	}
}
</style>
