<template>
  <div class="wrap">
    <van-empty v-if="passedList.length == 0"
               description="这里没有已通过的活动哦！"></van-empty>
    <div v-else
         class="passed_card"
         v-for="(act,index) in passedList"
         :key="index">
      <van-row class="act_info">
        <van-col class="left">
          <van-row class="act_name">{{act.activityName}}</van-row>
          <van-row class="act_principal"> ID:{{act.activityId}}</van-row>
          <van-row class="act_principal"> 负责人:{{act.crater}}</van-row>
          <van-row class="act_time"> 从 {{act.activityStartTime}} 至 {{act.activityEndTime}}</van-row>
        </van-col>
        <van-col class="right">
          <div class="timesheet">
            <van-row class="sheet_detail"
                     type="flex"
                     justify="end"
                     @click="$router.push(`timeSheetList/${act.activityId}/${act.activityName}`)">工时表列表 ></van-row>
            <van-row class="approve"
                     type="flex"
                     justify="space-around">
            </van-row>
            <van-row class="btn"
                     type="flex"
                     justify="center">
              <van-button type="info"
                          @click="jumpToGenerate(act)">生成工时表</van-button>
            </van-row>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      date: ''
    }
  },
  props: ['passedList'],
  methods: {
    onSelect (date) {
      this.date = moment(date).format("YYYY-MM-DD");
    },
    jumpToGenerate (act) {
      this.$router.push({
        name: 'GenerateTimesheet',
        params: act
      })
    },
    jumpToDetail (act) {
      //  想办法实现动态路由跳转
      if (act.categoryName == '班级活动') {
        this.$router.push(`/classApply/${act.activityId}/1`)
      } else {
        this.$router.push(`applyActForm/${act.activityId}/${act.categoryName}/2`)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 13rem;
}

.btn {
  margin-top: 0.4rem;
}
.passed_card {
  padding: 0.25rem 0.4rem;
  background-color: #fff;
  margin: 0.2rem 0;
  border-radius: 0.25rem;
  font-size: 0.25rem;
  .act_info {
    display: flex;
    .left {
      width: 50%;
      .act_name {
        font-size: 0.6rem;
        font-weight: bold;
        margin-bottom: 0.3rem;
        // margin: 0.1rem 0;
      }
      .act_principal {
        margin: 0.15rem 0;
      }
      .act_time {
        margin: 0.1rem 0;
      }
      .van-button {
        height: 1rem;
      }
    }
    .right {
      //   padding-top: 0.6rem;
      width: 50%;

      .timesheet {
        padding: 0.05rem 0.2rem 0.2rem;
        .sheet_detail {
          font-size: 0.4rem;
          padding-right: 0.2rem;
          color: #b0afb7;
          margin-bottom: 0.35rem;
        }
        .approve {
          .van-col {
            margin: 0 0.1rem;
          }
        }
        .van-button {
          margin-top: 0.2rem;
          height: 1rem;
          width: 4rem;
        }
      }
    }
  }
}
</style>