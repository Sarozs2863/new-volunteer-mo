<template>
	<div>
		<van-nav-bar
			title="违规举报"
			left-text="返回"
			fixed
			placeholder
			left-arrow
			@click-left="$router.go(-1)"
			@click-right="onClickRight"
		>
			<template #right>
				<van-button plain type="info" size="mini" class="fs-xxxxs">下一步</van-button>
			</template>
		</van-nav-bar>
		<van-notice-bar color="#1989fa" background="#ecf9ff" scrollable left-icon="info-o">
			此次举报将全程保护您的个人信息，请实事求是、放心填写！
		</van-notice-bar>
		<van-row class="text-center m-1 fs-xxs" style="font-family: 华文行楷"> 请选择举报原因 </van-row>
		<!-- 单选框 -->
		<div>
			<van-radio-group v-model="reasons.reportedReasonId" @change="showOtherReasonArea">
				<van-cell-group>
					<van-cell title="1. 参与志愿服务活动时迟到或早退。" clickable @click="reasons.reportedReasonId = '1'">
						<template #right-icon>
							<van-radio name="1" />
						</template>
					</van-cell>
					<van-cell title="2. 参与志愿活动旷到。" clickable @click="reasons.reportedReasonId = '2'">
						<template #right-icon>
							<van-radio name="2" />
						</template>
					</van-cell>
					<van-cell
						title="3. 从事与工作无关或影响志愿活动开展的个人活动"
						clickable
						@click="reasons.reportedReasonId = '3'"
					>
						<template #right-icon>
							<van-radio name="3" />
						</template>
					</van-cell>
					<van-cell title="4. 其他理由" clickable @click="reasons.reportedReasonId = '4'">
						<template #right-icon>
							<van-radio name="4" />
						</template>
					</van-cell>
					<van-cell>
						<template #right-icon>
							<van-field
								v-if="showOtherReason"
								v-model="reasons.otherReportedReason"
								rows="4"
								autosize
								type="textarea"
								:placeholder="palceholder"
							/>
						</template>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</div>
		<Copyright></Copyright>
	</div>
</template>

<script>
import Copyright from '@/components/Copyright.vue';
export default {
	components: {
		Copyright
	},
	data() {
		return {
			palceholder: '请输入具体原因',
			showOtherReason: false,
			reasons: {
				reportedReasonId: '',
				otherReportedReason: ''
			}
		};
	},
	methods: {
		onClickRight() {
			// console.log(111);
			if (this.reasons.reason === '') {
				this.$toast('您还未选择任何举报原因！请先选择。');
			} else if (this.reasons.reportedReasonId === '4' && this.reasons.otherReportedReason === '') {
				this.$toast('请填写具体其他原因');
			} else {
				if (this.reasons.reportedReasonId === '4') {
				} else {
					this.reasons.otherReportedReason = '无其他原因';
				}
				this.$router.push({
					name: 'Details',
					params: {
						reasons: this.reasons
					}
				});
			}
		},

		showOtherReasonArea() {
			console.log(this.reasons.reportedReasonId);
			this.showOtherReason = this.reasons.reportedReasonId === '4' ? true : false;
		}
	}
};
</script>

<style></style>
