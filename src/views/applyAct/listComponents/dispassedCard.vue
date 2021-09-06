<template>
  <div class="wrap">
    <van-empty v-if="dispassedList.length == 0"
               description="这里没有被驳回的活动哦！"></van-empty>
    <div v-else
         class="dispassed_card"
         v-for="(item, index) in dispassedList"
         :key="index">
      <van-cell-group>
        <van-cell title="活动名称"
                  :value="item.activityName"></van-cell>
        <van-cell title="提交时间"
                  :value="item.createTime"></van-cell>
        <van-cell title="审核状态"
                  :value="item.statusName"></van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="info"
                    class="reject_reason_btn"
                    @click="getRejectReason(item.activityId)">查看驳回原因</van-button>
        <van-button type="info"
                    @click="jumpToModify(item)">修改</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { actRejectReason } from '@/api/applyAct'
export default {
  data () {
    return {

    }
  },
  props: ['dispassedList'],
  methods: {
    async getRejectReason (id) {
      await actRejectReason(id).then(res => {
        if (res.code == 0) {
          let reason = res.data.reason
          this.$dialog.alert(
            {
              message: reason,
              confirmButtonColor: "#006eff"
            }
          )
        } else if (res.code == 128) {
          this.$dialog.alert(
            {
              message: res.msg,
              confirmButtonColor: "#006eff"
            }
          )
        } else {
          this.$dialog.alert(
            {
              message: '返回异常！',
              confirmButtonColor: "#006eff"
            }
          )
        }

      })

    },
    async jumpToModify (act) {
      if (act.categoryName == '班级活动') {
        this.$router.push(`/classApply/${act.activityId}/0`)
      } else {
        this.$router.push(`applyActForm/${act.activityId}/${act.categoryName}/0`)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 13rem;
}

.dispassed_card {
  background-color: #fff;
  padding-bottom: 0.2rem;
  margin: 0.3rem 0;
  .van-cell::after {
    border: 0;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
}

.btn {
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem;
  .van-button {
    height: 0.8rem;
    width: 4rem;
  }
}
</style>