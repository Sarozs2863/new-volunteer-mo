<template>
  <div>
    <van-row class="act_card" v-for="act in actList" :key="act.activityId" type="flex" justify="space-around">
      <van-col class="left" span="13">
        <van-row class="act_name">{{ act.activityName }}</van-row>
        <div class="date_crater">
          <div class="date">{{ act.activityDate }}</div>
          <div class="crater">{{ act.crater }}</div>
        </div>
        <van-row class="organization">{{ act.organizationName }}</van-row>
      </van-col>
      <van-col class="right">
        <van-row class="hour">{{ parseFloat(act.volunteerTime).toFixed(1) }}h</van-row>
        <van-row>
          <van-tag type="primary " size="large" v-if="act.volunteerStatus == 5">已认证</van-tag>
          <van-tag type="warning" size="large" v-else>未认证</van-tag>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ActCard',
  props: ['actList'],
  computed: {
    // ...mapState(["actList"]),
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.act_card:active {
  filter: brightness(0.9);
  transition: 0.2s;
}
.act_card {
  background-color: #fff;
  margin-top: 0.24rem;
  border-radius: 5px;
  // box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0.36rem 0rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    // margin-top: 0.3rem;
    .act_name {
      margin: 0.1rem 0 0.28rem;
      font-size: 0.45rem;
      font-weight: bold;
    }
    .date_crater {
      display: flex;
      line-height: 0.3rem;
      .date {
        margin-right: 0.15rem;
      }
    }
    .organization {
      font-size: 0.35rem;
      margin: 0.1rem 0;
    }
  }
  .right {
    // margin: 0.3rem 0 0.15rem;
    .hour {
      color: #1989fa;
      font-size: 0.6rem;
      margin: 0.07rem 0 0.3rem;
      text-align: center;
    }
  }
}
</style>
