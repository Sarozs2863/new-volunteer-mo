<template>
  <div>
    <van-nav-bar
      title="活动详情"
      left-text="返回"
      left-arrow
      @click-left="goBack()"
      :style="{ display: platform == 'android' ? '' : 'none' }"
    />
    <div class="act_detail">
      <van-cell title="活动名称" :value="actInfo.activityName" />
      <van-cell title="活动id" :value="activityId" />
      <van-cell title="创建时间" :value="actInfo.createTime" />
      <van-cell title="活动内容" :label="actInfo.activityContent" />

      <van-cell-group title="活动时间与地点">
        <van-cell title="活动时间" :value="activityTime" />
        <van-cell title="活动时长" :value="actInfo.activityDuration" />
        <van-cell title="活动地点" :value="actInfo.activityAddress" />
      </van-cell-group>

      <van-cell-group title="活动责任单位">
        <van-cell title="活动主办方" :value="actInfo.sponsor" />
        <van-cell title="活动承办方" :value="actInfo.contractor" />
      </van-cell-group>

      <van-cell-group title="活动对象">
        <van-cell title="活动对象" :value="actInfo.activityObject" />
        <van-cell title="参与人员" :value="actInfo.activityParticipants" />
        <van-cell title="活动人数" :value="actInfo.activityParticipantsNumber" />
      </van-cell-group>

      <van-cell-group title="活动背景、目的与意义">
        <van-cell title="活动背景" :label="actInfo.activityBackground" />
        <van-cell title="活动目的" :label="actInfo.activityPurpose" />
        <van-cell title="活动意义" :label="actInfo.activitySignificance" />
      </van-cell-group>

      <van-cell-group title="活动经费">
        <van-cell title="经费预算" :value="actInfo.activityFunds + '元'" />
      </van-cell-group>

      <van-cell-group title="活动开展">
        <van-cell title="活动准备阶段" :label="actInfo.activityProcess" />
        <van-cell title="活动举办阶段" :label="actInfo.activityProcessHolding" />
        <van-cell title="活动后续阶段" :label="actInfo.activityLaterPhases" />
        <van-cell title="活动安全" :label="actInfo.activitySafe" />
      </van-cell-group>

      <van-cell-group title="活动资源">
        <div>
          <van-cell title="服务队自行解决的物资:" />
        </div>
        <div v-for="(item, index) in ownResource" :key="index">
          <van-cell :title="item.name" s :value="item.number" />
        </div>
        <div>
          <van-cell title="需总队协调解决的物资:" />
        </div>
        <div v-for="(item, index) in ownResource" :key="index">
          <van-cell :title="item.name" :value="item.number" />
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { actDetail } from '@/api/approveAct'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activityId: this.$route.params.id,
      actInfo: {},
      // 活动时间需要计算后台返回的开始时间和结束时间
      activityTime: '',
      ownResource: [],
      helpResource: []
    }
  },
  created() {
    this.getActDetail()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async getActDetail() {
      const actInfo = await actDetail(this.activityId).then(res => {
        this.actInfo = res.data
        this.ownResource = JSON.parse(res.data.activityResource)
        this.helpResource = JSON.parse(res.data.activityResourceNeed)
        this.activityTime = `从 ${res.data.activityStartTime} \n至 ${res.data.activityEndTime}`
      })
    }
  },
  computed: {
    ...mapState(['platform'])
  }
}
</script>

<style lang="scss" scoped>
// 修改标签页底部的颜色

.act_detail {
  padding: 0.3rem;
}
.resource {
  padding: 0.1rem 0.4rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
}
/deep/ .van-cell__title {
  min-width: 30%;
}
/deep/ .van-cell__value {
  min-width: 70%;
}
</style>
