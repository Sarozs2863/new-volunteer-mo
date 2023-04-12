<template>
	<div class="wrap">
		<van-nav-bar
			:style="{ display: $store.state.platform === 'mp' ? 'none' : '' }"
			title="工时详情"
			left-text="返回"
			left-arrow
			@click-left="$router.go(-1)"
			@click-right="isShowCertificate"
		>
			<van-icon name="award-o" slot="right"></van-icon
		></van-nav-bar>

		<div class="myTimes fs-xxs sumcard">
			<!-- <van-row class="Item-details">
				<van-col>姓名：</van-col>
				<van-col>{{ $store.state.userInfo.studentName }}</van-col>
			</van-row>
			<van-row class="Item-details">
				<van-col>学号：</van-col>
				<van-col>{{ $store.state.userInfo.studentNum }}</van-col>
			</van-row> -->
			<van-row class="Item-details">
				<img src="../assets/img/myact.png" width="36px" height="40px" />
				<van-col>已参加活动：</van-col>
				<van-col>{{ $store.state.hourView.activityJoined }}</van-col>
			</van-row>
			<van-row class="Item-details">
				<img src="../assets/img/confirmed.png" width="36px" height="40px" />
				<van-col>已认证工时：</van-col>
				<van-col>{{ $store.state.hourView.timePassed }}h</van-col>
			</van-row>
			<van-row class="Item-details">
				<img src="../assets/img/unconfirmed.png" width="36px" height="40px" />
				<van-col>未认证工时：</van-col>
				<van-col>{{ $store.state.hourView.timeToBePassed }}h</van-col>
			</van-row>
			<!-- <div class="tips">
				快去参加更多志愿活动吧~
			</div> -->
		</div>
		<!-- <br /> -->
		<div style="width: 91%; margin-left: 5%">
			<ActCard
				style="background-color: rgb(248, 252, 255); margin-top: 35px"
				v-if="$store.state.recentActs.length > 0"
				:actList="$store.state.recentActs"
			></ActCard>
		</div>
		<!-- 志愿者证书 打印 -->
		<van-dialog
			v-model="showCertificate"
			className="certificate"
			close-on-click-overlay
			:show-cancel-button="false"
			:show-confirm-button="false"
			:lazy-render="false"
			:overlay="false"
		>
			<div id="canvasBox" slot="default" ref="canvasBox">
				<div class="downLoad" v-if="link && isMiniProgram">
					<img :src="link" alt="" />
					<van-button class="bottomButton">请长按保存</van-button>
				</div>
				<div v-else id="canvas" ref="canvas">
					<img id="origin" src="../assets/img/certificate - Copy.png" alt="" />
					<div>
						<p>{{ $store.state.userInfo.studentName }}</p>
						<span class="ChineseFont">{{ $store.state.hourView.timePassed }}h</span>
						<span class="EnglishFont">{{ $store.state.hourView.timePassed }}h</span>
					</div>
				</div>
				<div class="downLoad" v-show="isMiniProgram && !link">
					<van-button class="bottomButton" @click="showCertificate = false">加载中~~~</van-button>
				</div>
				<div class="downLoad" v-show="!isMiniProgram && !link">
					<van-button>加载中~~</van-button>
					<!-- <van-button @click="flutterCallJsMethod">保存</van-button> -->
				</div>
				<div class="downLoad" v-show="!isMiniProgram && link">
					<van-button @click="showCertificate = false">取消</van-button>
					<van-button @click="flutterCallJsMethod">保存</van-button>
				</div>
			</div>
		</van-dialog>
		<div class="button">
			<van-button v-show="isMiniProgram" @click="isShowCertificate" round>保存证书</van-button>
		</div>
		<copyright style="z-index: 1000"></copyright>
	</div>
</template>

<script>
import html2canvas from 'html2canvas';
import Copyright from '../components/Copyright.vue';
import ActCard from '@/components/ActCard.vue';
import { mapActions } from 'vuex';
import { CellGroup, Toast } from 'vant';

export default {
	components: {
		Copyright,
		ActCard
	},
	data() {
		return {
			link: '',
			test: '',
			showCertificate: true,
			isMiniProgram: false
		};
	},
	mounted() {
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner'
		});
		this.setHourView();
		this.loadImg();
		this.showCertificate = false;
		let u = navigator.userAgent;
		this.isMiniProgram = u.indexOf('miniProgram') > -1;
	},
	methods: {
		...mapActions(['setHourView']),
		isShowCertificate() {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner'
			});
			this.showCertificate = true;
		},

		//加载图片:在mounted之后
		loadImg() {
			let canvasID = this.$refs.canvas;
			html2canvas(canvasID, {
				useCORS: true, //允许跨域
				scale: 2,
				backgroundColor: null
			}).then((canvas) => {
				// 创建
				let dom = document.body.appendChild(canvas);
				let blob = dom.toDataURL('image/png', 1.0);
				this.link = blob;
				dom.style.display = 'none';
				URL.revokeObjectURL(blob);
			});
		},

		// 导出图片
		flutterCallJsMethod() {
			let u = navigator.userAgent;
			if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
				//交给android处理图片数据
				Toast.loading({
					message: '下载中...',
					forbidClick: true,
					loadingType: 'spinner'
				});
				WustHelper.base64ToJpg(this.link);
			} else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1) {
				//交给ios处理图片数据
				//通过flutter的方法，与webview交互
				VueToFlutter.postMessage(this.link);
			} else if (u.indexOf('Windows' > -1)) {
				var a = document.createElement('a'); // 生成一个a元素
				a.download = this.$store.state.userInfo.studentName + '.png'; // 设置图片名称
				a.href = this.link; // 将生成的URL设置为a.href属性
				a.click(); // 触发a的单击事件
			} else {
				Toast.fail('无法保存');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	background-color: rgb(248, 252, 255);
	.sumcard {
		border-radius: 0.3rem;
		background-color: #fff;
		padding: 0px 20px 0px 10px;
		box-shadow: 0 8px 12px #ebedf0;
		margin: 0px 0.4rem;
		background-color: rgb(250, 254, 255);
	}
	.myTimes {
		height: 200px;
		margin-top: 10px;
		padding-top: 20px;
		.Item-details {
			margin: 10px 10px 15px 40px;
			line-height: 40px;
			// border-bottom: grey solid 1px;
			// font-family: '华文中宋';
			display: flex;
			justify-content: start;
		}
		.Item-details > img {
			margin-right: 10px;
		}
	}
	.tips {
		margin-top: 20px;
		text-align: center;
		font-size: 15px;
		color: rgba(116, 117, 116, 0.705);
	}
	.certificate {
		width: 320px;
		height: auto;
		margin: auto;
		transition: 0.6s;
		border: 0.2px solid black;
		#canvasBox {
			height: auto;
			div {
				img {
					width: 320px;
					height: 453px;
				}
				div {
					p {
						font-size: 0.26rem;
						position: fixed;
						font-family: 'SimHei';
						// top: 20vh;
						// left: 11vw;
						font-weight: bold;
						top: 156px;
						left: 43px;
					}
					.ChineseFont {
						font-family: 'Times New Roman', Times, serif;
						// font-style: ;
						font-size: 0.2rem;
						position: fixed;
						// top: 28vh;
						// left: 34vw;
						left: 140px;
						top: 214px;
					}
					.EnglishFont {
						font-family: 'Times New Roman', Times, serif;
						// font-style: ;
						font-size: 0.2rem;
						position: fixed;
						// top: 28vh;
						// left: 34vw;
						left: 178px;
						top: 258px;
					}
				}
			}
			.downLoad {
				.bottomButton {
					z-index: 999;
					display: inline-block;
					width: 99%;
					font-size: 0.3rem;
				}
				button {
					z-index: 999;
					display: inline-block;
					width: 50%;
					font-size: 0.3rem;
				}
			}
		}
	}
	.button {
		display: flex;
		justify-content: center;
	}
}
</style>
