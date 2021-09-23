<template>
	<div>
		<div class="wrap">
			<div class="top_bar">
				<van-nav-bar
					left-text="返回"
					left-arrow
					@click-left="$router.go(-1)"
					title="用户信息"
					fixed
					placeholder
					:style="{ display: platform == 'android' ? '' : 'none' }"
				>
				</van-nav-bar>
			</div>

			<div class="user_form">
				<van-field label="姓名：" v-model="userInfo.studentName" disabled></van-field>
				<van-field label="学号：" v-model="userInfo.studentNum" disabled></van-field>
				<van-field label="届别：" v-model="userInfo.level" disabled></van-field>
				<van-field label="学院：" disabled v-model="userInfo.collegeName"></van-field>
				<van-field label="班级：" disabled v-model="userInfo.className"></van-field>
				<van-field label="身份证号：" v-model="userInfo.idCardNumber"></van-field>
				<van-field label="联系电话：" v-model="userInfo.phone"></van-field>
				<van-field label="qq号：" v-model="userInfo.qqNum"></van-field>
				<!-- 籍贯 -->
				<div class="native_place_picker">
					<van-field
						label="籍贯："
						v-model="userInfo.native"
						@click="nativePlacePicker = true"
						@focus="noBomBox"
					></van-field>
					<van-popup v-model="nativePlacePicker" position="bottom">
						<van-picker
							:columns="nativePlaceList"
							@confirm="nativePlaceConfirm"
							show-toolbar
							@cancel="nativePlacePicker = false"
							@change="getCityList"
						>
						</van-picker>
					</van-popup>
				</div>

				<!-- 民族 -->
				<div class="nation_picker">
					<van-field
						label="民族："
						@click="nationPicker = true"
						v-model="userInfo.nationName"
						@focus="noBomBox"
					></van-field>
					<van-popup v-model="nationPicker" position="bottom">
						<van-picker
							:columns="Object.values(nationDict)"
							@confirm="nationConfirm"
							show-toolbar
							@cancel="nationPicker = false"
						>
						</van-picker>
					</van-popup>
				</div>

				<!-- 政治面貌 -->
				<div class="politic_picker">
					<van-field
						label="政治面貌："
						@click="politicPicker = true"
						v-model="userInfo.politicalOutlookName"
						@focus="noBomBox"
					></van-field>
					<van-popup v-model="politicPicker" position="bottom">
						<van-picker
							:columns="Object.values(politicalOutlookDict)"
							@confirm="politicConfirm"
							show-toolbar
							@cancel="politicPicker = false"
						>
						</van-picker>
					</van-popup>
				</div>

				<!-- 校区及寝室 -->
				<div class="dorm_picker">
					<van-field
						label="校区及寝室："
						@click="dormPicker = true"
						v-model="userInfo.dormName"
						@focus="noBomBox"
						placeholder="校区-栋-楼层"
					></van-field>
					<van-popup v-model="dormPicker" position="bottom">
						<van-picker :columns="dormList" @confirm="dormConfirm" show-toolbar @cancel="dormPicker = false">
						</van-picker>
					</van-popup>
				</div>

				<van-field label="寝室门牌号：" v-model="userInfo.dormitoryHouseNum" type="digit"></van-field>
				<!-- <van-field label="志愿者编号：" v-model="userInfo.registeredVolunteerNum" type="digit"></van-field> -->

				<!-- 空闲时间 -->
				<div class="timeToVolunteer">
					<van-field label="空闲时间：" readonly></van-field>
					<div class="spare_time_table">
						<table>
							<tr>
								<th>时段\星期</th>
								<th>一</th>
								<th>二</th>
								<th>三</th>
								<th>四</th>
								<th>五</th>
								<th>六</th>
								<th>日</th>
							</tr>
							<tr>
								<th>上午</th>
								<th v-for="(item, index) in morning" :key="index">
									<input :value="item" type="checkbox" v-model="timeList" />
								</th>
							</tr>
							<tr>
								<th>下午</th>
								<th v-for="(item, index) in afternoon" :key="index">
									<input :value="item" type="checkbox" v-model="timeList" />
								</th>
							</tr>
							<tr>
								<th>晚上</th>
								<th v-for="(item, index) in evening" :key="index">
									<input :value="item" type="checkbox" v-model="timeList" />
								</th>
							</tr>
						</table>
					</div>
				</div>

				<div class="intention">
					<van-field label="服务意向："></van-field>
					<van-checkbox-group v-model="userInfo.serverIntention" direction="horizontal">
						<div v-for="(item, index) in intentionList" :key="index">
							<van-checkbox :name="item.id" shape="square">{{ item.serverName }}</van-checkbox>
						</div>
						<van-checkbox disabled shape="square">海外服务</van-checkbox>
					</van-checkbox-group>
				</div>
				<van-field label="专业特长：" type="textarea" autosize v-model="userInfo.professionalExpertise"></van-field>
				<van-field label="爱好及技能：" type="textarea" autosize v-model="userInfo.hobbiesAndSkills"></van-field>

				<div class="btn">
					<van-button type="info" @click="doModUserInfo()" round style="width: 9rem; margin-top: 0.2rem ;"
						>确认修改</van-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { isIdCard, isPhone, isQQ } from '@/utils/validate';
import {
	getUserInfo,
	intentionList,
	nationList,
	dormList,
	provinceList,
	cityList,
	politicalOutlook,
	modUserInfo
} from '@/api/user';

export default {
	data() {
		return {
			userInfo: {},
			nativePlacePicker: false,
			nationPicker: false,
			politicPicker: false,
			dormPicker: false,
			levelList: [],
			collegeDict: {},
			provinceDict: {},
			cityDict: {},
			nationDict: {},
			politicalOutlookDict: {},
			buildingDict: {},
			// 第一列 省份，第二列 城市
			nativePlaceList: [{ values: [] }, { values: [] }],
			// 志愿服务时间 从左到右，周一到周日
			morning: [1, 2, 3, 4, 5, 6, 7],
			afternoon: [8, 9, 10, 11, 12, 13, 14],
			evening: [15, 16, 17, 18, 19, 20, 21],
			// 服务意向列表
			intentionList: [],
			// 寝室列表
			dormList: [
				{
					text: '黄家湖',
					children: []
				},
				{
					text: '青山',
					children: []
				}
			],
			timeList: []
		};
	},
	computed: {
		...mapState(['platform'])
	},
	mounted() {
		this.initList();
	},
	methods: {
		async initList() {
			await provinceList().then((res) => {
				this.nativePlaceList[0].values = res.data.map((item) => item.provinceName);
				res.data.forEach((e) => {
					this.provinceDict[e.provinceName] = e.id;
				});
			});
			await politicalOutlook().then((res) => {
				res.data.forEach((e) => {
					this.politicalOutlookDict[e.id] = e.politicalOutlookName;
				});
			});
			await nationList().then((res) => {
				res.data.forEach((e) => {
					this.nationDict[e.id] = e.nationName;
				});
			});

			let { data: lakeList } = await dormList({
				campus: 1 // 湖区
			});

			let { data: mountainList } = await dormList({
				campus: 2 // 山区
			});

			let list = lakeList.concat(mountainList);
			list.forEach((e) => {
				this.buildingDict[e.id] = e.buildingName;
			});
			console.log(this.buildingDict);
			// 添加校区下的宿舍区 （黄家湖-北一  青山-人和一栋）
			for (let i = 0; i < list.length; i++) {
				if (list[i].campus === 1) {
					// 黄家湖校区的宿舍楼
					this.dormList[0].children.push({
						text: lakeList[i].buildingName,
						children: []
					});
				} else if (list[i].campus === 2) {
					// 青山校区的宿舍楼
					this.dormList[1].children.push({
						text: list[i].buildingName,
						children: []
					});
				}
			}
			// 添加楼层
			for (let i = 0; i < this.dormList.length; i++) {
				// 找到寝室
				for (let j = 0; j < this.dormList[i].children.length; j++) {
					// 总共7层
					for (let floor = 1; floor <= 7; floor++) {
						this.dormList[i].children[j].children.push({
							text: floor
						});
					}
				}
			}

			await intentionList().then((res) => {
				this.intentionList = res.data;
				this.intentionList.pop();
			});

			await getUserInfo().then((res) => {
				console.log(res.data);
				this.userInfo = res.data;
				this.userInfo.nationName = this.nationDict[res.data.nationId];
				if(res.data.provinceName != null) {
					this.userInfo.native = res.data.provinceName + (res.data.provinceId > 4 ? res.data.cityName : '');
				}
				if(res.data.campus != null) {
					this.userInfo.dormName =
					(this.userInfo.campus === 1 ? '黄家湖校区-' : '青山校区-') +
					this.buildingDict[res.data.dormitoryBuilding] +
					'-' +
					this.userInfo.dormitoryLayer +
					'层';
				}
				if (this.userInfo.timeToVolunteerList != null) {
					this.timeList = this.userInfo.timeToVolunteerList;
				}
			});
		},
		async getCityList(picker, values) {
			let { data } = await cityList({
				provinceId: this.provinceDict[values[0]]
			});
			this.nativePlaceList[1].values = data.map((item) => item.cityName);
			data.forEach((e) => {
				this.cityDict[e.cityName] = e.id;
			});
		},
		async doModUserInfo() {
			let data = {
				phone: this.userInfo.phone,
				qqNum: this.userInfo.qqNum,
				idCardNumber: this.userInfo.idCardNumber,
				politicalOutlook: this.userInfo.politicalOutlook,
				provinceId: this.userInfo.provinceId,
				cityId: this.userInfo.cityId,
				// 暂时不需要填写志愿者编号
				// registeredVolunteerNum: this.userInfo.registeredVolunteerNum,
				nationId: this.userInfo.nationId,
				campus: this.userInfo.campus,
				dormitoryBuilding: this.userInfo.dormitoryBuilding,
				dormitoryLayer: this.userInfo.dormitoryLayer,
				dormitoryHouseNum: this.userInfo.dormitoryHouseNum,
				timeToVolunteer: this.timeList,
				professionalExpertise: this.userInfo.professionalExpertise,
				hobbiesAndSkills: this.userInfo.hobbiesAndSkills,
				serverIntention: this.userInfo.serverIntention
			};

			console.log(data);
			if (data.cityId == '' || data.cityId == undefined) {
				delete data.cityId;
			}

			for (let key in data) {
				if (!data[key]) {
					this.$toast('请填写完整！');
				}
			}

			if (data.timeToVolunteer.length == 0) {
				this.$toast('请选择空闲时间！');
				return;
			} else if (data.serverIntention.length == 0) {
				this.$toast('请选择服务意向！');
				return;
			}

			if (!isIdCard(data.idCardNumber)) {
				this.$toast('身份证输入格式错误!');
				return;
			}
			 else if (!isPhone(data.phone)) {
				this.$toast('手机号输入格式错误！');
				return;
			}
			else if (!isQQ(data.qqNum)) {
				this.$toast('qq号输入格式错误');
				return;
			}

			await modUserInfo(data).then((res) => {
				console.log(res);
				if (res.code == 0) {
					this.$toast.success('修改成功！');
					setTimeout(() => {
						this.$router.back(-1);
					}, 2000);
				} else {
					this.$toast(res.msg);
				}
			});
			// console.log(data);
		},
		// 阻止默认弹出手机键盘
		noBomBox(event) {
			document.activeElement.blur();
		},
		nativePlaceConfirm(value) {
			let municipalities = ['北京市', '天津市', '重庆市', '上海市'];
			// 四个直辖市属于 province
			this.userInfo.native = value[0] + (value[1] === undefined ? '' : value[1]);

			if (municipalities.includes(value[0])) {
				this.userInfo.provinceName = value[0];
				this.userInfo.provinceId = this.provinceDict[this.userInfo.provinceName];
				this.userInfo.cityId = '';
				// console.log(this.userInfo.provinceId);
			} else {
				this.userInfo.provinceName = value[0];
				this.userInfo.cityName = value[1];
				this.userInfo.provinceId = this.provinceDict[this.userInfo.provinceName];
				this.userInfo.cityId = this.cityDict[this.userInfo.cityName];
				// console.log(this.userInfo.provinceId);
				// console.log(this.userInfo.cityId);
			}
			console.log(this.userInfo.provinceId);
			console.log(this.userInfo.cityId);

			this.nativePlacePicker = false;
		},
		politicConfirm(value) {
			this.userInfo.politicalOutlookName = value;
			for (let key in this.politicalOutlookDict) {
				if (this.userInfo.politicalOutlookName == this.politicalOutlookDict[key]) this.userInfo.politicalOutlook = key;
			}
			this.politicPicker = false;
		},
		nationConfirm(value) {
			this.userInfo.nationName = value;
			for (let key in this.nationDict) {
				if (this.nationDict[key] == value) {
					this.userInfo.nationId = key;
				}
			}
			this.nationPicker = false;
		},
		dormConfirm(value) {
			this.userInfo.dormName = value[0] + '校区-' + value[1] + '-' + value[2] + '层';
			switch (value[0]) {
				case '黄家湖':
					this.userInfo.campus = 1;
					break;
				case '青山':
					this.userInfo.campus = 2;
					break;
			}
			for (let key in this.buildingDict) {
				if (value[1] == this.buildingDict[key]) this.userInfo.dormitoryBuilding = key;
			}
			console.log(this.userInfo.dormitoryBuilding);
			this.userInfo.dormitoryLayer = value[2];
			this.dormPicker = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 0.3rem 0.3rem;
	.van-cell::after {
		border: 0;
	}
}
.timeToVolunteer {
	font-size: 0.33rem;
	color: #646566;
	table tr th {
		font-weight: normal;
	}
	background-color: #fff;
	.spare_time_table {
		padding: 0 0.45rem;
		table {
			// margin: 0 auto;
			tr th :first-child {
				margin: 0 0.2rem;
				color: red;
				font-weight: normal !important;
			}
			input {
				width: 14px;
			}
		}
	}
}

.intention {
	background-color: #fff;
	.van-checkbox-group {
		.van-checkbox {
			margin: 0.1rem 0.1rem;
		}
	}
	display: flex;
	justify-content: space-around;
}
</style>
