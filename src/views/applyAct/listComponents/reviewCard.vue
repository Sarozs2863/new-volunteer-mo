<template>
  <div class="wrap">
    <van-empty v-if="reviewList.length === 0" description="这里没有审核中的活动哦！"></van-empty>
    <div class="review_card" v-for="(item, index) in reviewList" :key="index" @click="jumpToDetail(item)">
      <van-cell-group>
        <van-cell title="活动名称" :value="item.activityName"></van-cell>
        <van-cell title="提交时间" :value="item.createTime"></van-cell>
        <van-cell title="审核状态" :value="item.statusName"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    reviewList: Array
  },
  methods: {
    jumpToDetail(act) {
      //  想办法实现动态路由跳转
      if (act.categoryName === '班级活动') {
        this.$router.push(`/classApply/${act.activityId}/1`)
      } else if (act.categoryName === '假期个人活动') {
        // 2 查看活动详情
        this.$router.push(`personApply/${act.activityId}/2`)
      } else {
        this.$router.push(`applyActForm/${act.activityId}/${act.categoryName}/2`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.review_card {
  margin: 0.3rem 0;
  .van-cell ::after {
    border: 0;
  }
}
.wrap {
  min-height: 13rem;
}
</style>
