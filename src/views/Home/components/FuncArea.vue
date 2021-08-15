<template>
	<div>
		<van-grid :column-num="3" clickable>
			<van-grid-item
				v-for="value in functions"
				:to="value.path"
				:key="value.id"
				:icon="value.icon"
				:text="value.text"
			/>
		</van-grid>
	</div>
</template>

<script>
export default {
	data() {
		return {
			functions: [
				{
					id: 1,
					icon: 'todo-list-o',
					text: '活动招募',
					path: '/actrecruit'
				},
				{
					id: 2,
					icon: 'smile-o',
					text: '信用等级',
					path: '/creditlevel'
				},
				{
					id: 3,
					icon: 'notes-o',
					text: '工时概览',
					path: '/mytimes'
				},
				{
					id: 4,
					icon: 'warn-o',
					text: '违规举报',
					path: '/report'
				},
				{
					id: 5,
					icon: 'eye-o',
					text: '举报记录',
					path: '/reportlist'
				},
				{
					id: 6,
					icon: 'edit',
					text: '活动策划',
					path: ''
				}
			]
		};
	}
};
</script>

<style></style>
