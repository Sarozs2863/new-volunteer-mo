<template>
  <div>
    <div>
      <van-cell-group title="志愿服务项目">
        <van-field label="项目名称:" v-model="registerForm.activityName"></van-field>
        <van-field label="项目类别:" v-model="registerForm.projectCategory"></van-field>
        <van-field label="工作内容:" v-model="registerForm.jobContent"></van-field>
        <van-field label="能力要求:" v-model="registerForm.capabilityRequirements"></van-field>
        <van-field label="活动时长:" v-model="registerForm.activityDuration"></van-field>
        <van-field label="开始时间:" v-model="registerForm.activityStartTime"></van-field>
        <van-field label="结束时间:" v-model="registerForm.activityEndTime"></van-field>
        <van-field label="每月开展频率:" v-model="registerForm.timeMonth" type="digit"></van-field>
        <van-field label="每周开展频率:" v-model="registerForm.timeWeek" type="digit"></van-field>
        <van-field label="参与人员数量:" v-model="registerForm.activityParticipantsNumber" type="digit"></van-field>
        <van-field label="基地是否挂牌:" name="radio">
          <template #input>
            <van-radio-group v-model="registerForm.listed" direction="horizontal">
              <van-radio name="0">未挂牌</van-radio>
              <van-radio name="1">已挂牌</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field label="挂牌名称:" v-model="registerForm.listedName"></van-field>
      </van-cell-group>
      <van-cell-group title="项目负责人">
        <van-field label="姓名:" v-model="registerForm.personInCharge"></van-field>
        <van-field label="学院班级:" v-model="registerForm.collegeAndClass"></van-field>
        <van-field label="联系电话:" v-model="registerForm.phone" type="digit"></van-field>
      </van-cell-group>
      <van-cell-group title="志愿服务接收单位">
        <van-field label="负责人:" v-model="registerForm.personInChargeTwo"></van-field>
        <van-field label="联系电话:" v-model="registerForm.phoneTwo" type="digit"></van-field>
        <van-field label="邮箱:" v-model="registerForm.mail"></van-field>
        <van-field label="地址:" v-model="registerForm.address"></van-field>
        <van-field label="邮编:" v-model="registerForm.postcode" type="digit"></van-field>
        <van-field label="乘车方式:" v-model="registerForm.modeOfTravel"></van-field>
        <van-field label="服务对象:" v-model="registerForm.serviceObject"></van-field>
        <van-field label="服务对象数量:" v-model="registerForm.serviceObjectNumber" type="digit"></van-field>
        <van-field label="其他信息:" v-model="registerForm.more"></van-field>
      </van-cell-group>
    </div>
    <div class="btns">
      <van-row type="flex" justify="center" v-if="tag != 2">
        <van-button
type="primary"
round
style="width: 8.5rem; margin-bottom: 0.4rem;"
@click="saveRegisterSheet()"
          >保存登记表</van-button
        >
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-button type="info" round @click="backStep">上一步</van-button>
        <van-button type="info" round @click="nextStep">下一步</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import { isPhone, isEmail } from '@/utils/validate.js'
import { submitRegisterSheet, tableInfo } from '@/api/applyAct'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      //   registerForm: {}
    }
  },
  props: {
    childActive: '',
    activityId: '',
    tag: '',
    category: ''
  },
  mounted() {
    this.tag && this.getRegister()
  },
  computed: {
    ...mapState(['planForm', 'applyForm', 'registerForm', 'spaceForm', 'baseForm'])
  },
  methods: {
    nextStep() {
      this.childActive++
      this.$emit('changeActive', this.childActive)
      //   this.saveRegisterSheet()
    },
    backStep() {
      this.childActive--
      this.$emit('changeActive', this.childActive)
    },
    async saveRegisterSheet() {
      if (!this.validateForm()) {
        return
      }
      this.registerForm.activityId = this.activityId
      const data = this.registerForm
      //   let data = this.registerForm
      //   data.activityId = this.activityId
      console.log(data)
      await submitRegisterSheet(data).then(res => {
        if (res.code === 0) {
          this.$toast('保存成功！')
          this.$store.dispatch('doSetRegisterForm', this.registerForm)
          // 第一次填的时候 登记表的内容赋值给基地协议
          if (JSON.stringify(this.baseForm) === '{}') {
            this.$store.dispatch('doSetBaseForm', this.registerForm)
          }
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('未知错误！')
        }
      })
    },
    async getRegister() {
      const params = {
        activityId: this.activityId,
        tableId: 4
      }
      await tableInfo(params).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('doSetRegisterForm', res.data)
        } else if (res.code === 10000) {
          this.$store.dispatch('doSetRegisterForm', {})
          this.$toast(res.msg)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('未知错误！')
        }
      })
    },
    validateForm() {
      if (this.registerForm.activityName === '') {
        this.$toast('请输入活动名称！')
        return false
      }
      if (this.registerForm.projectCategory === '') {
        this.$toast('请输入活动类别！')
        return false
      }
      if (this.registerForm.jobContent === '') {
        this.$toast('请输入工作内容！')
        return false
      }
      if (this.registerForm.capabilityRequirements === '') {
        this.$toast('请输入能力要求！')
        return false
      }
      if (this.registerForm.activityDuration === '') {
        this.$toast('请输入活动时长！')
        return false
      }
      if (this.registerForm.activityStartTime === '') {
        this.$toast('请输入活动开始时间！')
        return false
      }
      if (this.registerForm.activityEndTime === '') {
        this.$toast('请输入活动结束时间！')
        return false
      }
      if (this.registerForm.timeMonth === '') {
        this.$toast('请输入每月开展频率！')
        return false
      }
      if (this.registerForm.timeWeek === '') {
        this.$toast('请输入每周开展频率！')
        return false
      }
      if (this.registerForm.activityParticipantsNumber === '') {
        this.$toast('请输入参与人员数量！')
        return false
      }
      if (this.registerForm.listed === '') {
        this.$toast('请选择基地是否挂牌！')
        return false
      }
      if (this.registerForm.listedName === '' && this.registerForm.listed === 1) {
        this.$toast('请输入挂牌名称！')
        return false
      }
      if (this.registerForm.personInCharge === '') {
        this.$toast('请输入项目负责人姓名！')
        return false
      }
      if (this.registerForm.collegeAndClass === '') {
        this.$toast('请输入项目负责人学院班级！')
        return false
      }
      if (this.registerForm.phone === '') {
        this.$toast('请输入项目负责人联系电话！')
        return false
      }
      if (this.registerForm.personInChargeTwo === '') {
        this.$toast('请输入接收单位负责人！')
        return false
      }
      if (this.registerForm.phoneTwo === '') {
        this.$toast('请输入接收单位负责人联系电话！')
        return false
      }
      if (this.registerForm.mail === '') {
        this.$toast('请输入接收单位负责人邮箱！')
        return false
      }
      if (this.registerForm.address === '') {
        this.$toast('请输入接收单位地址！')
        return false
      }
      if (this.registerForm.postcode === '') {
        this.$toast('请输入接收单位邮编！')
        return false
      }
      if (this.registerForm.modeOfTravel === '') {
        this.$toast('请输入乘车方式！')
        return false
      }
      if (this.registerForm.serviceObject === '') {
        this.$toast('请输入服务对象！')
        return false
      }
      if (this.registerForm.serviceObjectNumber === '') {
        this.$toast('请输入服务对象数量！')
        return false
      }
      if (this.registerForm.more === '') {
        this.$toast('请输入其他信息！')
        return false
      }
      //   if (!isPhone(this.registerForm.phone)) {
      //     this.$toast('项目负责人联系电话格式错误！')
      //     return false
      //   }
      //   if (!isPhone(this.registerForm.phoneTwo)) {
      //     this.$toast('志愿服务接收单位负责人联系电话格式错误！')
      //     return false
      //   }
      //   if (!isEmail(this.registerForm.mail)) {
      //     this.$toast('志愿服务接收单位负责人邮箱格式错误！')
      //     return false
      //   }
      return true
    }
  }
}
</script>

<style lang="scss">
/deep/ .van-cell::after {
  border-bottom: 0;
}
/deep/ .van-field__label {
  min-width: 30%;
}
</style>
