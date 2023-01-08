<template>
  <div>
    <van-nav-bar title="生成工时表" left-arrow @click-left="goBack()" />
    <div class="valid_time">
      <van-field
        label="六位码有效时间"
        label-width="3rem"
        placeholder="单位为小时"
        v-model="validTime"
        required
        type="number"
      ></van-field>
      <van-field label="预设工时" name="defaultHour" required>
        <template #input>
          <van-checkbox-group v-model="defaultHour" direction="horizontal">
            <van-checkbox name="0.5" shape="square">0.5h</van-checkbox>
            <van-checkbox name="1" shape="square">1.0h</van-checkbox>
            <van-checkbox name="1.5" shape="square">1.5h</van-checkbox>
            <div style="margin:0.3rem 0; display: flex">
              <van-checkbox name="2" shape="square">2.0h</van-checkbox>
              <van-checkbox name="2.5" shape="square">2.5h</van-checkbox>
              <van-checkbox name="3.0" shape="square">3.0h</van-checkbox>
            </div>
            <van-checkbox name="3.5" shape="square">3.5h</van-checkbox>
            <van-checkbox name="4.0" shape="square">4.0h</van-checkbox>
            <van-checkbox name="4.5" shape="square">4.5h</van-checkbox>
            <div style="margin-top: 0.3rem; display: flex">
              <van-checkbox name="5.0" shape="square">5.0h</van-checkbox>
              <van-checkbox name="5.5" shape="square">5.5h</van-checkbox>
              <van-checkbox name="6.0" shape="square">6.0h</van-checkbox>
            </div>
          </van-checkbox-group>
        </template>
      </van-field>
    </div>
    <van-calendar
      title="请选择活动日期"
      :poppable="false"
      color="#006eff"
      @select="onSelect"
      @confirm="onConfirm"
      :style="{ height: '500px' }"
      allow-same-day
      :min-date="startDate"
      :max-date="endDate"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { createTimesheet } from '@/api/applyAct.js'
export default {
  data() {
    return {
      activityId: this.$route.params.activityId,
      startDateStr: this.$route.params.activityStartTime,
      endDateStr: this.$route.params.activityEndTime,
      validTime: '',
      defaultHour: [],
      date: '',
      showKeyboard: false
    }
  },
  mounted() {
    this.test()
  },
  computed: {
    startDate: function() {
      const res = this.startDateStr.split('-')
      return new Date(Number(res[0]), Number(res[1] - 1), Number(res[2]))
    },
    endDate: function() {
      const res = this.endDateStr.split('-')
      return new Date(Number(res[0]), Number(res[1] - 1), Number(res[2]))
    }
  },
  methods: {
    test() {},
    // 将日期字符串格式化未日期
    getDate(str) {
      const res = str.split('-')
      const myDate = new Date(Number(res[0]), Number(res[1] - 1), Number(res[2]))
      return myDate
    },
    goBack() {
      this.$router.go(-1)
    },
    onSelect(date) {
      //   console.log(date)
      this.date = moment(date).format('YYYY-MM-DD')
      // console.log(this.date)
    },
    async onConfirm() {
      if (this.validTime === '') {
        this.$toast('请输入认证码有效时间！')
        return
      }
      if (this.date === '') {
        this.$toast('请选择活动日期！')
        return
      }
      if (this.defaultHour === '') {
        this.$toast('请选择预设工时！')
        return
      }
      console.log(this.activityId)
      const data = {
        activityId: this.activityId,
        effectiveTime: this.validTime,
        participateDate: this.date,
        volunteerTimes: this.defaultHour
        // volunteerTimes: JSON.stringify(this.defaultHour)
      }
      await createTimesheet(data).then(res => {
        if (res.code === 0) {
          this.$dialog.alert({
            message: `生成工时表成功!\n活动日期为 ${this.date}\n认证码为 ${res.data}\n有效时间为 ${this.validTime} 小时`,
            confirmButtonColor: '#006EFF'
          })
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.valid_time {
  padding: 0.2rem;
}
</style>
