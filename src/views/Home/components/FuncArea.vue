<template>
	<div style="z-index:-1">
		<van-grid :column-num="3" clickable :border="false">
			<van-grid-item to="/actrecruit" :key="1" icon="todo-list-o" text="活动招募" />
			<van-grid-item to="/creditlevel" :key="2" icon="smile-o" text="信用等级" />
			<van-grid-item to="/mytimes" :key="3" icon="notes-o" text="工时概览" />
			<van-grid-item to="/report" :key="4" icon="warn-o" text="违规举报" />
			<van-grid-item to="/reportlist" :key="5" icon="eye-o" text="举报记录" />
			<van-grid-item to="" :key="6" icon="edit" text="活动策划" @click="checkIt" />
		</van-grid>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		checkIt() {
			this.$toast('该功能暂未开放!\n如有需要请前往管理端使用！');
		}
	}
};
</script>

<style></style>
