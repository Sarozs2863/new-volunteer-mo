<template>
  <div>
    <van-nav-bar title="修改策划"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)"
                 @click-right="onClickRight"
                 :style="{'display': platform == 'android' ? '':'none'}" />
    <div class="content">
      <van-form class="apply_form"
                validate-first>
        <van-field label="活动名称："
                   class="remove_style"
                   v-model="applyForm.activityInPlanningForm.activityName"></van-field>
        <van-field label="活动内容："
                   type="textarea"
                   rows="4"
                   autosize
                   :rules="[{ required: true, message: '请填写活动内容！' }]"
                   v-model="applyForm.activityInPlanningForm.activityContent" />

        <!-- <van-cell-group title="活动分类">
          <van-field label="活动类型："
                     @click="categoryPicker = true"
                     v-model="category"
                     disabled>
          </van-field>
          <van-popup v-model="categoryPicker"
                     position="bottom">
            <van-picker :columns="categoryList"
                        @confirm="categoryConfirm"
                        show-toolbar
                        @cancel="categoryPicker = false"></van-picker>
          </van-popup>

          <van-field label="学院："
                     v-if="category == '院级活动' || category == '班级活动' "
                     v-model="college"
                     @click="collegePicker = true"
                     disabled>
          </van-field>
          <van-popup v-model="collegePicker"
                     position="bottom">
            <van-picker :columns="collegeList"
                        @confirm="collegeConfirm"
                        show-toolbar
                        @cancel="collegePicker = false"></van-picker>
          </van-popup>

          <van-field label="年级："
                     @click="stuLevelPicker = true"
                     v-model="stuLevel"
                     v-if="category == '班级活动'"
                     disabled>
          </van-field>
          <van-popup v-model="stuLevelPicker"
                     position="bottom">
            <van-picker :columns="stuLevelList"
                        @confirm="stuLevelConfirm"
                        show-toolbar
                        @cancel="stuLevelPicker = false"></van-picker>
          </van-popup>
          <van-field label="班级："
                     v-if="category == '班级活动'"
                     @click="classPicker = true"
                     v-model="theClass"
                     disabled>
          </van-field>
          <van-popup v-model="classPicker"
                     position="bottom">
            <van-picker :columns="classList"
                        @confirm="classConfirm"
                        show-toolbar
                        @cancel="classPicker = false"></van-picker>
          </van-popup>
        </van-cell-group> -->

        <van-cell-group title="活动时间与地点"
                        icon="location-o">
          <van-field readonly
                     clickable
                     name="calendar"
                     :value="activityTime"
                     label="活动日期："
                     placeholder="点击选择日期"
                     @click="showCalendar = true" />
          <van-calendar v-model="showCalendar"
                        @confirm="calendarConfirm"
                        type="range"
                        color="#1989fa"
                        allow-same-day
                        :min-date="minDate" />
          <van-field label="活动届别："
                     readonly
                     v-model="applyForm.level">
          </van-field>
          <van-field label="活动地点："
                     v-model="applyForm.activityInPlanningForm.activityAddress"
                     :rules="[{ required: true, message: '请填写活动地点！' }]"></van-field>
          <van-field label="活动时长："
                     v-model="applyForm.activityInPlanningForm.activityDuration"
                     placeholder="如：2h/班，3班/天"
                     :rules="[{ required: true, message: '请填写活动时长！' }]"></van-field>
        </van-cell-group>
        <van-cell-group title="活动责任单位">
          <van-field label="活动主办方："
                     v-model="applyForm.activityInPlanningForm.sponsor"
                     :rules="[{ required: true, message: '请填写活动主办方！'
                      }]"></van-field>
          <van-field label="活动承办方："
                     v-model="applyForm.activityInPlanningForm.contractor"
                     :rules="[{ required: true, message: '请填写活动承办方！' }]"></van-field>
        </van-cell-group>
        <van-cell-group title="活动对象">
          <van-field label="活动对象："
                     v-model="applyForm.activityInPlanningForm.activityObject"
                     :rules="[{ required: true, message: '请填写活动对象！' }]"></van-field>
          <van-field label="参与人员："
                     v-model="applyForm.activityInPlanningForm.activityParticipants"
                     :rules="[{ required: true, message: '请填写参与人员！' }]"></van-field>
          <van-field label="活动人数："
                     v-model="applyForm.activityInPlanningForm.activityParticipantsNumber"
                     type="digit"
                     :rules="[{ required: true, message: '请填写活动人数！' }]"></van-field>
        </van-cell-group>
        <van-number-keyboard v-model="applyForm.activityInPlanningForm.activityFunds"
                             :show="numKeyBoardshow"
                             :maxlength="6"
                             @blur="numKeyBoardshow = false" />
        <van-cell-group title="活动背景、目的与意义">
          <van-field label="活动目的:"
                     v-model="applyForm.activityInPlanningForm.activityPurpose">
          </van-field>
          <van-field label="活动背景:"
                     v-model="applyForm.activityInPlanningForm.activityBackground"></van-field>
          <van-field label="活动意义:"
                     v-model="applyForm.activityInPlanningForm.activitySignificance"></van-field>
        </van-cell-group>
        <van-cell-group title="活动经费">
          <van-field label="经费预算："
                     readonly
                     clickable
                     :value="applyForm.activityInPlanningForm.activityFunds"
                     @touchstart.native.stop="numKeyBoardshow = true"
                     placeholder="单位为元"
                     :rules="[{ required: true, message: '请填写活动经费预算！' }]" />
        </van-cell-group>
        <van-cell-group title="活动资源">
          <van-cell title="服务队自行解决物资：">
          </van-cell>
          <div class="table">
            <table>
              <tr class="title">
                <td>物资名称</td>
                <td>数量</td>
              </tr>
              <tr v-for="(item, index) in ownResource"
                  :key="index">
                <td><input type="text"
                         v-model="item.name"> </td>
                <td><input type="text"
                         v-model="item.number"></td>
                <van-icon name="close"
                          @click="delOne(ownResource,index)" />
              </tr>
              <tr>
                <!-- 占位 -->
                <td></td>
                <van-row type="flex"
                         justify="end">
                  <van-button type="info"
                              @click="addOne(ownResource)"
                              class="add">添加物资</van-button>
                </van-row>
              </tr>
            </table>
          </div>
          <van-cell title="需总队协调解决物资："></van-cell>
          <div class="table">
            <table>
              <tr class="title">
                <td>物资名称</td>
                <td>数量</td>
              </tr>
              <tr v-for="(item, index) in helpResource"
                  :key="index">
                <td><input type="text"
                         v-model="item.name"> </td>
                <td><input type="text"
                         v-model="item.number"></td>
                <van-icon name="close"
                          @click="delOne(helpResource,index)" />
              </tr>
              <tr>
                <td></td>
                <van-row type="flex"
                         justify="end">
                  <van-button type="info"
                              @click="addOne(helpResource)"
                              class="add">添加物资</van-button>
                </van-row>
              </tr>
            </table>
          </div>
        </van-cell-group>
        <van-cell-group title="活动开展">
          <van-field label="活动准备阶段："
                     label-width="2.7rem"
                     type="textarea"
                     rows="2"
                     autosize
                     v-model="applyForm.activityInPlanningForm.activityProcess" />
          <van-field label="活动举办阶段："
                     type="textarea"
                     label-width="2.7rem"
                     rows="2"
                     autosize
                     v-model="applyForm.activityInPlanningForm.activityProcessHolding" />
          <van-field label="活动后续阶段："
                     type="textarea"
                     label-width="2.7rem"
                     rows="2"
                     autosize
                     v-model="applyForm.activityInPlanningForm.activityLaterPhases" />
        </van-cell-group>

        <van-field label="活动安全："
                   type="textarea"
                   rows="2"
                   autosize
                   v-model="applyForm.activityInPlanningForm.activitySafe" />
      </van-form>
      <!-- 提交按钮 -->
      <van-row type="flex"
               justify="center">
        <van-button class="commit_btn"
                    type="info"
                    block
                    round
                    @click="changeApplyList()">修改申请</van-button>
      </van-row>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex';
import { changeApply, actDetail, categoryList, collegeList, classList, organizationId } from "@/api/applyAct"

export default {
  name: "ApplyAct",
  data () {
    return {
      activityId: this.$route.params.id,
      activityTime: "",
      applyForm: {
        organizationId: '',
        level: '',
        activityCategoryId: '',
        classOrCollegeId: '',
        activityInPlanningForm: {
        }
      },
      actObject: "",
      participant: "",
      showCalendar: false,
      minDate: new Date(2010, 0, 1),
      numKeyBoardshow: false,
      categoryPicker: false,
      category: '',
      categoryList: [],
      stuLevel: '',
      stuLevelPicker: false,
      stuLevelList: ['2016', '2017', '2018', '2019', '2020'],
      levelPicker: false,
      levelList: [],
      level: '',
      collegePicker: false,
      college: '',
      collegeList: [],
      collegeMap: new Map(),
      categoryMap: new Map(),
      classMap: new Map(),
      classPicker: false,
      classList: [],
      theClass: '',
      ownResource: [],
      helpResource: []
    }
  },
  computed: {
    ...mapState(["platform"]),
  },
  watch: {
    stuLevel () {
      this.getClassList()
    },
    college () {
      this.getClassList()
    }
  },
  mounted () {
    // 修改前先获取活动详情
    this.getActDetail()
    // this.getCategoryList()
    // this.getCollegeList()
    // this.getOrganisationId()
  },
  methods: {
    async getActDetail () {
      await actDetail(this.$route.params.id).then(res => {
        this.applyForm.activityInPlanningForm = res.data
        this.activityTime = `从 ${this.formatDate(res.data.activityStartTime)} 至 ${this.formatDate(res.data.activityEndTime)}`
        this.applyForm.level = (moment(res.data.activityStartTime)).year()
        this.ownResource = JSON.parse(res.data.activityResource)
        this.helpResource = JSON.parse(res.data.activityResourceNeed)
      })
    },
    formatDate (date) {
      return moment(date).format("YYYY-MM-DD");;
    },
    // 时间段选择
    calendarConfirm (date) {
      const [start, end] = date;
      this.applyForm.activityInPlanningForm.activityStartTime = `${this.formatDate(start)}`;
      this.applyForm.activityInPlanningForm.activityEndTime = `${this.formatDate(end)}`;
      this.applyForm.level = start.getFullYear()
      this.activityTime = `从 ${this.formatDate(start)} 至 ${this.formatDate(end)}`;
      this.showCalendar = false;
    },
    // 提交活动策划
    async changeApplyList () {
      console.log(this.applyForm)
      if (!this.validateForm()) {
        return
      }
      this.applyForm.activityInPlanningForm.activityId = this.activityId
      this.applyForm.activityInPlanningForm.activityResource = this.ownResource
      this.applyForm.activityInPlanningForm.activityResourceNeed = this.helpResource
      await changeApply(this.applyForm.activityInPlanningForm).then(res => {
        if (res.code == 1) {
          this.$toast('系统异常！')
          return
        }
        this.$toast('修改策划提交成功！即将跳转至活动申请首页！')
        setTimeout(() => {
          this.$router.push('/applyActList')
        }, 2000)
      });
    },
    // 提交前每项都不为空
    validateForm () {
      if (this.applyForm.activityInPlanningForm.activityName == '') {
        this.$toast('请输入活动名称！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityTime == '') {
        this.$toast('请输入活动时间！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityAddress == '') {
        this.$toast('请输入活动名称！')
        return false;
      }
      if (this.applyForm.level == '') {
        this.$toast('请输入活动届别！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityDuration == '') {
        this.$toast('请输入活动时长！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityPurpose == '') {
        this.$toast('请输入活动背景、目的与意义！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityObject == '') {
        this.$toast('请输入活动对象！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityParticipants == '') {
        this.$toast('请输入参与人员！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityParticipantsNumber == '') {
        this.$toast('请输入活动人数！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityContent == '') {
        this.$toast('请输入活动内容！')
        return false;
      }
      //   if (this.applyForm.activityInPlanningForm.activityResource == '') {
      //     this.$toast('请输入活动资源！')
      //     return false;
      //   }
      if (this.applyForm.activityInPlanningForm.activityProcess == '') {
        this.$toast('请输入活动过程！')
        return false;
        ;
      }
      if (this.applyForm.activityInPlanningForm.activityFunds == '') {
        this.$toast('请输入活动资金！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activityFunds == '') {
        this.$toast('请输入活动资金！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.activitySafe == '') {
        this.$toast('请输入活动安全！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.sponsor == '') {
        this.$toast('请输入活动主办方！')
        return false;
      }
      if (this.applyForm.activityInPlanningForm.contractor == '') {
        this.$toast('请输入活动承办方！')
        return false;
      }
      return true

    },
    delOne (arr, index) {
      arr.splice(index, 1)
    },
    addOne (arr) {
      arr.push({ name: '', number: '' })
    },
    // 获取活动分类
    async getCategoryList () {
      await categoryList().then(res => {
        let list = res.data
        for (let i = 0; i < list.length; i++) {
          this.categoryMap.set(list[i].activityCategoryName, list[i].activityCategoryId)
        }
        this.categoryList = res.data.map(item => { return item.activityCategoryName })
      })
    },
    categoryConfirm (value) {
      this.category = value
      this.categoryPicker = false
    },
    collegeConfirm (value) {
      this.college = value
      this.collegePicker = false
    },
    stuLevelConfirm (value) {
      this.stuLevel = value
      this.stuLevelPicker = false
    },
    classConfirm (value) {
      this.theClass = value
      this.classPicker = false
    },
    // 获取学院列表
    async getCollegeList () {
      await collegeList().then(res => {
        let list = res.data // 从后天获取到的是对象数组
        // 建立键值的映射关系
        for (let i = 0; i < list.length; i++) {
          this.collegeMap.set(list[i].collegeName, list[i].collegeId)
        }
        // 把所有的学院名字取出来
        this.collegeList = res.data.map(item => { return item.collegeName })
        // console.log(this.collegeList)
      })
    },
    // 获取organisationId 
    async getOrganisationId () {
      await organizationId().then(res => {
        console.log(res)
        this.applyForm.organizationId = res.data.id
      })
    },
    // 获取班级列表 
    async getClassList () {
      if (this.stuLevel != '' && this.college != '') {
        let params = {
          level: this.stuLevel,
          collegeId: this.collegeMap.get(this.college)
        }
        // console.log(params);
        await classList(params).then(res => {
          let list = res.data.list
          for (let i = 0; i < list.length; i++) {
            // this.classMap.set(list[i].className, list[i].classId)
          }
          this.classList = res.data.list.map(item => { return item.className })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0.2rem 0;
}
.apply_form {
  padding: 0 0.3rem;
}

// 取消van-cell 的下边框
/deep/.van-cell::after {
  border-bottom: 0;
}
.text_style {
  padding: 0 0.3rem;
}

.commit_btn {
  width: 8rem;
  margin: 0.5rem 0;
}

.table {
  //   padding-left: 0.43rem;
  table {
    font-size: 0.31rem;
    // .title {
    //   text-align: center;
    // }
  }
  td {
    width: 40%;
    text-align: center;
  }
  input {
    text-align: center;
  }
  .add {
    width: 2rem;
    height: 0.6rem;
    font-size: 0.31rem;
    padding: 0;
    position: relative;
    right: 0;
  }
}
</style>