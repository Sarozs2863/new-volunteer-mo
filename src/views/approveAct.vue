<template>
  <div>
    <van-nav-bar
      title="工时提交"
      left-text="返回"
      left-arrow
      @click-left="goBack()"
      :style="{ display: platform == 'android' ? '' : 'none' }"
    />

    <div class="content">
      <div class="act_info_card">
        <van-cell title="活动信息" icon="label-o"></van-cell>
        <van-field v-model="actData.activityName" label="活动名称" readonly input-align="right" />
        <van-field v-model="date" label="活动日期" readonly input-align="right" />
        <van-field v-model="actData.crater" label="活动负责人" readonly input-align="right" />
      </div>
      <div class="select_hour_card">
        <div>
          <van-cell title="选择工时" icon="certificate"> </van-cell>
        </div>
        <div class="wrap">
          <div class="btns" v-for="(item, index) in volunteerTimes" :key="index">
            <input type="radio" :value="item" v-model="actData.volunteerTime" />
            <span>{{ item }}h</span>
          </div>
        </div>
      </div>

      <div class="confirm_btn">
        <van-row type="flex" justify="center">
          <van-button round block type="info" @click="confirmDialogShow = true">提交工时</van-button>
        </van-row>
      </div>
    </div>

    <!-- 确认提交对话框 -->
    <van-dialog
      v-model="confirmDialogShow"
      title="信息确认"
      show-cancel-button
      class="confirm_dialog"
      @confirm="confirmApproveAct()"
    >
      <van-cell-group>
        <van-field v-model="userInfo.studentNum" label="学号" readonly />
        <van-field v-model="actData.activityName" label="活动名称" readonly />
        <van-field v-model="actData.volunteerTime" label="活动工时" readonly />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { actDetail, actApprove } from '@/api/approveAct';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      actData: {
        id: '',
        activityName: '',
        // 活动负责人 crater
        crater: this.$route.params.crater,
        // 需要提交的活动工时
        volunteerTime: '',
        activityName: this.$route.params.activityName
      },
      date: this.$route.params.activityDate,
      activityId: this.$route.params.activityId,
      sheetId: this.$route.params.sheetId,
      randomString: this.$route.params.randomString,
      volunteerTimes: this.$route.params.volunteerTimes.sort(),
      confirmDialogShow: false
    };
  },
  name: 'ApproveAct',
  computed: {
    ...mapState(['userInfo', 'platform'])
  },
  mounted() {
    // this.getActDetail()
    // 展示诚信协议
    this.honestAgreement();
    // console.log(this.$route.params);
  },
  methods: {
    test() {
      console.log(this.$route.params);
    },
    goBack() {
      this.$router.go(-1);
    },
    // 提交活动认证
    onSubmit(values) {
      console.log('submit', values);
    },
    // 确认工时选择
    onConfirm(value) {
      this.actData.volunteerTime = value;
      this.showPicker = false;
    },
    // 展示诚信协议
    honestAgreement() {
      this.$dialog.alert({
        title: '诚信协议',
        message:
          '<div>我承诺:诚信参与志愿服务活动，所选择工时数为本人此次活动<b>真实的</b>服务时长</div><div>我同意:公开我的志愿服务时长和活动记录等信息，以配合广大志愿者和学校对诚信志愿的监督与核查！</div>',
        confirmButtonColor: '#006eff',
        // messageAlign: "left",
        allowHtml: true
      });
    },
    // 根据路由参数approveActId获取活动详情
    async getActDetail() {
      console.log(`getActDetail`);
      const res = await actDetail(this.$route.params.activityId);
      console.log('res.data', res.data);
      this.actData = res.data;
      console.log('actData', actData);
      this.actData.crater = this.$route.params.crater;
    },
    // 提交活动认证
    async confirmApproveAct() {
      const data = new FormData();
      data.append('volunteerTime', this.actData.volunteerTime);
      data.append('randomString', this.$route.params.randomString);
      //   let data = {
      //     volunteerTime: this.actData.volunteerTime,
      //     randomString: this.$route.params.randomString
      //   }
      const that = this;
      console.log('data:', data);
      console.log('123123', this.actData.volunteerTime);
      if (this.actData.volunteerTime === '') {
        this.$toast('未选择活动工时,请重新选择！');
        return;
      }
      await actApprove(data).then(res => {
        // this.$dialog.confirm().then(this.$router.push('/'));
        if (res.code === 0) {
          this.$store
            .dispatch('doSetActList')
            .then(res => {
              this.$store.dispatch('doSetHourView').then(res => {
                this.$toast({
                  message: '提交成功!'
                });
                setTimeout(() => {
                  this.$router.push('/');
                }, 1500);
              });
            })
            .catch(err => console.log(err));
        } else {
          this.$toast({
            message: res.msg
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-field--disabled .van-field__label {
  color: #323233;
}

/deep/ .van-dialog__content {
  padding: 0 0.2rem;
}
/deep/ .van-dialog__confirm {
  color: #006eff;
}
/deep/ .van-dialog__header {
  padding: 0.4rem 0 0.2rem;
}
.wrap {
  display: flex;
  .btns {
    padding: 0 0.3rem;
    display: flex;
    line-height: 0.7rem;
    //   justify-content: space-between;
    input {
      width: 20px;
      height: 20px;
    }
  }
}

.agreement_dialog {
  padding: 0 0.5rem;
  width: 7.5rem;
  /deep/ .van-dialog__header {
    margin-bottom: 0.3rem;
    padding-top: 0.3333rem;
  }
  /deep/.van-dialog__content {
    text-indent: 2em;
    padding-bottom: 0.75rem;
  }
  /deep/ .van-dialog__confirm {
    color: #006eff;
  }
}
.act_info_card {
  margin-top: 0.3rem;
  .van-cell::after {
    border: 0;
  }
}

.content {
  padding: 0 0.4rem;
  min-height: 17.5rem;
}
.user_info_card {
  margin: 0.3rem 0;
}
.select_hour_card {
  //   padding: 0.4rem 0.4rem 0.2rem;
  //   padding-bottom: 1rem;
  background-color: #fff;
  border-radius: 3px;
  margin: 0.4rem 0;
  //   height: 1.8rem;
  font-size: 0.4rem;
  padding-bottom: 0.3rem;
}
.confirm_btn {
  margin: 0.5rem 0;
  .van-button {
    width: 8rem;
  }
}
</style>
