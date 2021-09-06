<template>
  <div class="wrap">
    <van-nav-bar title="工时表列表"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)"
                 fixed
                 placeholder
                 :style="{'display': platform == 'android' ? '':'none'}" />
    <van-tabs v-model="active"
              sticky
              :offset-top="platform == 'android' ? 46 : 0">
      <van-tab v-for="(item, index) in tabs"
               :key="index"
               :title="item">
        <van-list :finished="finished"
                  @load="getTimesheetList()"
                  v-model="loading">
          <van-empty v-if="timeSheetList.length == 0"
                     description="工时表列表空空如也~"></van-empty>
          <div class="list"
               v-else
               v-for="(item, index) in timeSheetList"
               :key="index">
            <div class="timesheet_card">
              <div class="timesheet_info">
                <van-cell title="活动名称 "
                          :value="activityName" />
                <van-cell title="工时表 ID "
                          :value="item.volunteerCheckId" />
                <van-cell title="活动日期"
                          :value="item.activityDate" />
                <van-cell title="负责人"
                          :value="item.crater" />
                <van-cell title="已参与人数"
                          :value="item.activityJoined" />
                <van-cell title="认证状态"
                          :value="item.volunteerStatusName" />
                <van-cell v-if="active == 1"
                          title="驳回原因"
                          :value="item.rejectReason" />
                <van-cell v-if="active == 3"
                          title="认证码"
                          :value="item.randomString" />
                <van-cell title="人员名单"
                          is-link
                          arrow-direction="down"
                          @click="getVolunteerList(item.volunteerCheckId)" />

              </div>
              <!-- 对志愿者的名单进行操作 -->
              <div class="volunteer_card"
                   v-if="volunteerCheckId == item.volunteerCheckId">
                <div class="volunteer_list"
                     v-for="(volunteer, i) in volunteerList"
                     :key="i">
                  <div class="volunteer_info">
                    <div>{{volunteer.studentNum}} </div>
                    <div class="stu_name">{{volunteer.studentName}} &nbsp; &nbsp; &nbsp;</div>
                    <div :class="active == 0 || active == 2 ? 'stu_hour' : ''"> {{ parseFloat(volunteer.volunteerTime).toFixed(1) }}h </div>
                  </div>
                  <div class="operate_btn"
                       v-if="active == 1 || active == 3 ">
                    <van-button type="info"
                                size="mini"
                                class="change_btn"
                                icon="setting-o"
                                @click="showModDialog(volunteerCheckId, volunteer)"></van-button>
                    <van-button type="danger"
                                size="mini"
                                icon="delete-o"
                                @click="doDelVolunteer(volunteerCheckId, volunteer)"></van-button>
                  </div>
                </div>
              </div>
              <!-- 上面是列表展示的基本信息 -->
              <!-- 下面是不同工时表分类进行不同的操作 -->
              <!-- 未提交 -->
              <div class="btn"
                   v-if="active == 3">
                <!-- <van-button @click="getVerifyCode(item.volunteerCheckId)"
                          type="primary">查看验证码</van-button> -->
                <!-- <van-button type="info" @click="getVolunteerList(item.volunteerCheckId)">详情</van-button> -->
                <van-button type="info"
                            @click="showAddDialog(item.volunteerCheckId)">学号添加</van-button>
                <van-button @click="confirmSheet(item.volunteerCheckId)"
                            type="info">提交工时表</van-button>
              </div>
              <!-- 待认证或已认证 -->
              <div class="btn"
                   v-if="active == 2 || active == 0">
                <!-- <van-button type="info"
                          @click="getVolunteerList(item.volunteerCheckId)">详情</van-button> -->
              </div>
              <!-- 已驳回 -->
              <div class="btn"
                   v-if="active == 1">
                <!-- <van-button type="primary"
                          @click="showRejectReason(item.volunteerCheckId)"
                          class="reject_reason_btn">驳回原因</van-button> -->
                <!-- <van-button type="info" @click="getVolunteerList(item.volunteerCheckId)">详情</van-button> -->
                <van-button type="info"
                            @click="showAddDialog(item.volunteerCheckId)">学号添加</van-button>
                <van-button type="info"
                            @click="confirmSheet(item.volunteerCheckId)">重新提交</van-button>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>

    <!-- 添加志愿者的对话框 -->
    <van-dialog v-model="showAddVolunteer"
                @confirm="doAddVolunteer()"
                show-cancel-button
                class="add_dialog">
      <div class="search">
        <van-field placeholder="请输入查询学生的学号："
                   v-model="stuNo"
                   center
                   type="digit">
          <template #button>
            <van-button type="info"
                        @click="doSearchVolunteer(stuNo)"
                        class="search_btn">查找</van-button>
          </template>
        </van-field>
      </div>
      <div class="search_info">
        <span>{{addVolunteerData.studentNum}} </span>
        <span>{{addVolunteerData.studentName}}</span>
      </div>
      <van-cell title="选择工时">
        <van-stepper v-model="time"
                     step="0.5"
                     min="0.5"
                     max="6"
                     :decimal-length="1" />
      </van-cell>
    </van-dialog>

    <!-- 修改志愿者的对话框 -->
    <van-dialog v-model="showModVolunteer"
                @confirm="doModVolunteer()"
                class="mod_dialog"
                show-cancel-button>
      <div class="mod_info">
        <span>{{modVolunteerData.studentNum}} </span>
        <span>{{modVolunteerData.studentName}}</span>
      </div>
      <van-cell title="更改工时"
                icon="certificate">
        <van-stepper v-model="time"
                     step="0.5"
                     min="0.5"
                     max="6"
                     :decimal-length="1" />

      </van-cell>
    </van-dialog>

    <!-- 删除志愿者是函数调用的 -->

  </div>

</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { timesheetList, timeSheetDetail, verificationCode, searchStu, submitSheet, addVolunteer, delVolunteer, modVolunteer, sheetRejectReason } from '@/api/applyAct'
export default {
  data () {
    return {
      activityId: this.$route.params.activityId,
      activityName: this.$route.params.activityName,
      tabs: ['已认证', '已驳回', '待认证', '未提交'],
      active: 0,
      timeSheetList: [],
      volunteerList: [],
      volunteerCheckId: '',
      showAddVolunteer: false,
      showModVolunteer: false,
      showVolunteerList: false,
      addVolunteerData: {},
      modVolunteerData: {},
      // 添加或修改的时间
      time: "",
      // 展示的验证码
      verifyCode: "",
      loading: false,
      finished: false,
      pageNum: 1,
      status: 1
    }
  },
  watch: {
    active () {
      this.finished = false
      this.loading = true
      this.pageNum = 1
      this.status = this.active + 1
      this.timeSheetList = []
      this.getTimesheetList()
    }
  },
  computed: {
    ...mapState(["platform"])
  },
  methods: {
    test (id) {
      return ++id;
    },
    formatter (date) {
      let newDate = moment(date).format("YYYY-MM-DD");
      return newDate
    },
    dateConfirm (value) {
      this.dateChioce = this.formatter(value);
      this.timePickerShow = false;
    },
    //获取活动列表
    async getTimesheetList () {
      // 已认证工时表1 已驳回2 待认证3 未确认4
      let params = {
        activityId: this.$route.params.activityId,
        status: this.status,
        currPage: this.pageNum
      }
      await timesheetList(params).then(res => {
        if (res.code != 0) {
          this.finished = true
        }
        this.loading = false
        let list = res.data.list
        if (this.pageNum > 1) {
          this.timeSheetList = [...this.timeSheetList, ...list]
        } else {
          this.timeSheetList = list
        }
        if (res.data.totalPage > res.data.currPage) {
          this.pageNum++
        }
        // else if (res.data.totalPage = res.data.currPage) 
        else if (res.data.totalPage == res.data.currPage || res.data.totalPage < res.data.currPage) {
          this.finished = true
        }

      })
    },
    // 获取工时表详情
    async getVolunteerList (id) {
      //   console.log(id)
      this.volunteerCheckId = id
      await timeSheetDetail(id).then(res => {
        this.volunteerList = res.data
        if (res.data.length == 0) {
          this.$toast('暂无相关志愿者！')
        }
      })
    },
    // 获取六位验证码
    async getVerifyCode (id) {
      await verificationCode(id).then(res => {
        // 返回为108 对应六位随机码无效！
        // 返回为0 输出验证码
        if (res.code == 108) {
          //   this.verifyCode = res.msg
          this.$dialog.alert({
            message: '验证码已失效！',
            confirmButtonColor: "#006eff"
          })
        } else if (res.code == 0) {
          this.verifyCode = res.data
          this.$dialog.alert({
            confirmButtonColor: "#006eff",
            message: this.verifyCode
          })
        } else {
          this.$toast('返回异常！')
        }
      })
    },
    // 向工时表中添加一名志愿者
    showAddDialog (sheetId) {
      this.volunteerCheckId = sheetId
      this.showAddVolunteer = true
    },
    //修改志愿者工时
    showModDialog (sheetId, volunteer) {
      // 首先根据学号查询志愿者
      //   console.log('工时表id' + sheetId)
      this.volunteerCheckId = sheetId
      this.modVolunteerData = volunteer
      this.showModVolunteer = true
    },
    async doSearchVolunteer (stuNo) {
      let params = {
        studentNum: stuNo,
        volunteerCheckId: this.volunteerCheckId
      }
      if (stuNo == '' || stuNo.length != 12) {
        this.$toast('请输入正确的学号！')
        return;
      }
      await searchStu(params).then(res => {
        if (res.code == 105) {
          this.$toast(res.msg)
        }
        this.addVolunteerData = res.data
      })
    },
    // 添加一名志愿者
    async doAddVolunteer () {
      let params = {
        volunteerCheckId: this.volunteerCheckId,
        studentNum: this.addVolunteerData.studentNum,
        volunteerTime: this.time,
      }
      console.log(params)
      await addVolunteer(params).then(res => {
        if (res.code == 0) {
          this.getVolunteerList(this.volunteerCheckId).then(res => {
            this.$toast('添加成功！')
          })
        } else if (res.code == 113) {
          this.$toast('该志愿者已在人员名单中，请勿重复添加！')
        }
        else {
          this.$toast('返回异常！')
        }
      })

    },
    // 修改志愿者工时信息
    async doModVolunteer () {
      let data = {
        volunteerCheckId: this.volunteerCheckId,
        studentNum: this.modVolunteerData.studentNum,
        volunteerTime: this.time
      }
      await modVolunteer(data).then(res => {
        if (res.code == 0) {
          this.getVolunteerList(this.volunteerCheckId).then(res => {
            this.$toast('修改成功！')
          })
        } else {
          this.$toast('返回异常!')
        }
      })
    },
    // 删除工时表中的一名志愿者
    doDelVolunteer (sheetId, volunteer) {
      this.$dialog.confirm({
        message: `是否确定将 ${volunteer.studentNum} ${volunteer.studentName}\n从该工时表删除？`,
        showCancelButton: true
      }).then(async () => {
        let params = {
          volunteerCheckId: sheetId,
          studentNum: volunteer.studentNum
        }
        await delVolunteer(params).then(res => {
          if (res.code == 0) {
            this.getVolunteerList(sheetId).then(res => {
              this.$toast('删除成功！')
            })
          } else {
            this.$toast('返回异常！')
          }
        })


      })
    },
    // 提交工时表
    confirmSheet (id) {
      // 是否确认工时表
      this.$dialog.confirm({
        message: '是否确定提交活动？',
        confirmButtonColor: '#006eff'
      }).then(async () => {
        await submitSheet(id).then(res => {
          console.log(res);
        })
        this.getTimesheetList().then(res => {
          this.$toast('提交成功！')
        })
      })

    },
    // 显示驳回原因
    async showRejectReason (sheetId) {
      //   console.log('获取驳回原因工时表id为' + sheetId)
      await sheetRejectReason(sheetId).then(res => {
        if (res.code == 0) {
          if (res.data.reason == '') {
            this.$dialog.alert({
              message: "驳回原因为空！",
              confirmButtonColor: "#006eff"
            })
          } else {
            this.$dialog.alert({
              message: res.data.reason,
              confirmButtonColor: "#006eff"
            })
          }
        } else if (res.code == 128) {
          this.$dialog.confirm({
            message: res.msg,
            confirmButtonColor: "#006eff"
          })
        } else {
          this.$toast('返回异常！')
        }
      }
      )
    }

  }
}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 15rem;
  .van-nav-bar {
    min-height: 1.22667rem;
  }
}
.list {
  padding: 0rem 0.3rem; //   min-height: 10rem;
}
.volunteer_card {
  margin: 0 0.4rem;
  .volunteer_list {
    line-height: 0.55rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    margin: 0.1rem 0;

    // 志愿者学号 姓名 工时
    .volunteer_info {
      display: flex;
      .stu_name {
        margin: 0 0.1rem;
        width: 1.3rem;
        text-align: center;
      }
      .stu_hour {
        position: absolute;
        right: 1rem;
      }
    }
  }
}
.time_select {
  margin-bottom: 0.3rem;
}
.timesheet_card {
  margin: 0.2rem 0;
  background-color: #fff;
  padding: 0.2rem;
  .timesheet_info {
    .van-cell::after {
      border: 0;
    }
  }
}
/deep/.van-tabs__line {
  background-color: rgb(0, 110, 255);
}

.btn {
  //   margin: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem;
  .van-button {
    height: 0.8rem;
    .reject_reason_btn {
      width: 3.3rem;
    }
  }
}
.mod_dialog {
  /deep/ .van-dialog__confirm {
    color: #006eff;
  }
  .mod_info {
    text-align: center;
    padding: 0.7rem 0 0.4rem 0;
  }
}
.add_dialog {
  .search {
    padding-top: 0.6rem;
  }
  .search_btn {
    height: 0.8rem;
  }
  .search_info {
    text-align: center;
    padding-bottom: 0.2rem;
  }
}
</style>