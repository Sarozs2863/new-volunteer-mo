<template>
  <div>
    <div class="blue-area">
      <!-- 顶部滚动通知区域 -->
      <van-notice-bar left-icon="volume-o" :text="notice" />
      <!-- 顶部按钮区域 -->
      <van-row class="d-flex jc-end">
        <van-icon name="question-o" class="m-10 " size="23px" color="#fff" @click="guideDialogShow = true" />
        <van-icon name="more-o" class="m-10 " size="23px" color="#fff" />
      </van-row>
      <!-- 用户反馈 -->
      <van-dialog v-model="guideDialogShow" title="用户反馈" confirm-button-color="#006eff">
        <div class="feedback">
          {{ notice }}
        </div>
      </van-dialog>
      <!-- 头像以及个人信息区域 -->
      <div class="user-info">
        <UserInfo></UserInfo>
      </div>
    </div>
    <!-- 提交工时验证码区域 -->
    <div class="card main-card d-flex jc-center mt-2">
      <ValidCodeCard></ValidCodeCard>
    </div>
    <!-- 底部功能区域 -->
    <div class="func-area" style="margin-top: 15px;">
      <FuncArea></FuncArea>
    </div>

    <!-- 活动列表卡片 -->
    <div>
      <ActList></ActList>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ValidCodeCard from '../components/ValidCodeCard.vue';
import UserInfo from '../components/UserInfo.vue';
import FuncArea from '../components/FuncArea.vue';
import ActList from '../components/ActList.vue';
export default {
  name: 'HomePage',
  components: {
    ValidCodeCard,
    UserInfo,
    FuncArea,
    ActList
  },
  data() {
    return {
      guideDialogShow: false,
      notice: '用户反馈qq群：926518229。若工时信息与志愿者证不对应，请联系该活动的活动负责人或向院青队咨询'
    };
  },
  methods: {
    testPlatform() {
      if (this.$cookies.get('cookie')) {
        this.platformToken = this.$cookies.get('cookie');
        return 'andriod';
      } else if (this.$router.query.token) {
        this.platformToken = this.$cookies.get('cookie');
        if (this.$router.query.platform === 'mp') {
          return 'mp';
        } else if (this.$router.query.platform === 'ios') {
          return 'ios';
        } else {
          this.$toast('未检测到用户信息！');
          return;
        }
      }
    },
    getPlatformToken() {
      let platform = this.testPlatform() || '获取平台信息失败！';
      this.$toast(platform);
      this.$store.commit('setPlatform', platform);
      this.$store.commit('setPlatformToken', this.platformToken);
    },
    ...mapActions(['setVolunteerToken', 'setUserInfo', 'setHourView', 'setRecentActs'])
  },
  async mounted() {
    this.getPlatformToken();
    await this.setVolunteerToken();
    await this.setUserInfo();
    await this.setHourView();
    await this.setRecentActs();
  }
};
</script>

<style lang="scss" scoped>
.main-card {
  margin-top: -80px;
}
.blue-area {
  background-color: rgb(25, 137, 250);
  width: 100%;
  height: 325px;
}
.feedback {
  text-align: center;
  padding: 0.45rem;
}
</style>
