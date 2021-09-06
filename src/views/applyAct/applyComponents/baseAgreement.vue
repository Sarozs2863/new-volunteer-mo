<template>
  <div>
    <div class="base_form">
      <van-cell-group title="活动信息">
        <van-field label="项目简介：" v-model="baseForm.projectBrief"></van-field>
        <van-field label="参与人数：" v-model="baseForm.activityParticipantsNumber" type="digit"></van-field>
        <van-field label="项目分类：" v-model="baseForm.projectCategory"></van-field>
        <van-field label="开始时间：" v-model="baseForm.activityStartTime"></van-field>
        <van-field label="结束时间：" v-model="baseForm.activityEndTime"></van-field>
        <van-field label="活动时长：" v-model="baseForm.activityDuration"></van-field>
        <van-field label="每月开展频率：" type="digit" v-model="baseForm.timeMonth"></van-field>
        <van-field label="每周开展频率：" type="digit" v-model="baseForm.timeWeek"></van-field>
      </van-cell-group>
      <van-cell-group title="活动负责人信息">
        <van-field label="姓名：" v-model="baseForm.personInCharge"></van-field>
        <van-field label="学院班级：" v-model="baseForm.collegeAndClass"></van-field>
        <van-field
          label="联系电话："
          v-model="baseForm.phone"
          type="digit"
          :rules="[{ pattern: /^1[3456789]d{9}$/ }]"
        ></van-field>
        <van-field
          label="邮箱："
          v-model="baseForm.mail"
          :rules="[{ pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ }]"
        ></van-field>
      </van-cell-group>
      <van-cell-group title="基地信息">
        <van-field label="基地名称：" v-model="baseForm.baseName"></van-field>
        <van-field label="基地地址：" v-model="baseForm.address"></van-field>
        <van-field label="基地简介：" v-model="baseForm.introductionOfServiceBase"></van-field>
        <van-field label="是否挂牌:" name="radio">
          <template #input>
            <van-radio-group v-model="baseForm.listed" direction="horizontal">
              <van-radio name="0">未挂牌</van-radio>
              <van-radio name="1">已挂牌</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field label="挂牌时间：" v-model="baseForm.listedTime"></van-field>
        <van-field label="邮编：" v-model="baseForm.postcode"></van-field>
        <van-field label="乘车方式：" v-model="baseForm.modeOfTravel"></van-field>
      </van-cell-group>
      <van-cell-group title="基地负责人信息">
        <van-field label="姓名：" v-model="baseForm.personInChargeTwo"></van-field>
        <van-field
          label="联系电话："
          type="digit"
          v-model="baseForm.phoneTwo"
          :rules="[{ pattern: /^1[3456789]d{9}$/ }]"
        ></van-field>
        <van-field
          label="邮箱："
          v-model="baseForm.mailTwo"
          :rules="[{ pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ }]"
        ></van-field>
        <van-field label="所在单位及职位：" v-model="baseForm.unitAndPosition"></van-field>
      </van-cell-group>
    </div>
    <div class="btns">
      <van-row type="flex" justify="center" v-if="tag != 2">
        <van-button
type="primary"
round
style="width: 8.5rem; margin-bottom: 0.4rem;"
@click="saveBaseSheet()"
          >保存基地协议</van-button
        >
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-button type="info" round @click="backStep" style="width: 8.5rem; margin-bottom: 0.4rem;">上一步</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import { submitBaseAgreement, tableInfo } from '@/api/applyAct'
// import { isPhone, isEmail } from '@/utils/validate'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      //   baseForm: {}
    }
  },
  props: {
    childActive: '',
    activityId: {},
    tag: '',
    category: ''
  },
  mounted() {
    this.tag && this.getBase()
  },
  computed: {
    ...mapState(['planForm', 'applyForm', 'registerForm', 'spaceForm', 'baseForm'])
  },
  methods: {
    nextStep() {
      this.childActive++
      this.$emit('changeActive', this.childActive)
    },
    backStep() {
      this.childActive--
      this.$emit('changeActive', this.childActive)
    },
    async saveBaseSheet() {
      if (!this.validateForm()) {
        return
      }
      const data = this.baseForm
      data.activityId = this.activityId
      await submitBaseAgreement(data).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('doSetBaseForm', this.baseForm)
          this.$toast('保存成功！')
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    async getBase() {
      const params = {
        activityId: this.activityId,
        tableId: 6
      }
      await tableInfo(params).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('doSetBaseForm', res.data)
        } else if (res.code === 10000) {
          this.$store.dispatch('doSetBaseForm', {})
          this.$toast(res.msg)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('未知错误！')
        }
      })
    },
    validateForm() {
      if (this.baseForm.projectBrief === '') {
        this.$toast('请输入项目简介！')
        return false
      }
      if (this.baseForm.activityParticipantsNumber === '') {
        this.$toast('请输入参与人数！')
        return false
      }
      if (this.baseForm.projectCategory === '') {
        this.$toast('请输入项目分类！')
        return false
      }
      if (this.baseForm.activityStartTime === '') {
        this.$toast('请输入开始时间！')
        return false
      }
      if (this.baseForm.activityEndTime === '') {
        this.$toast('请输入结束时间！')
        return false
      }
      if (this.baseForm.activityDuration === '') {
        this.$toast('请输入活动时长！')
        return false
      }
      if (this.baseForm.timeMonth === '') {
        this.$toast('请输入每月开展频率！')
        return false
      }
      if (this.baseForm.timeWeek === '') {
        this.$toast('请输入每周开展频率！')
        return false
      }
      if (this.baseForm.personInCharge === '') {
        this.$toast('请输入负责人姓名！')
        return false
      }
      if (this.baseForm.collegeAndClass === '') {
        this.$toast('请输入负责人学院班级！')
        return false
      }
      if (this.baseForm.phone === '') {
        this.$toast('请输入负责人联系电话！')
        return false
      }
      if (this.baseForm.mail === '') {
        this.$toast('请输入负责人邮箱！')
        return false
      }
      if (this.baseForm.baseName === '') {
        this.$toast('请输入基地名称！')
        return false
      }
      if (this.baseForm.address === '') {
        this.$toast('请输入基地地址！')
        return false
      }
      if (this.baseForm.introductionOfServiceBase === '') {
        this.$toast('请输入基地简介！')
        return false
      }
      if (this.baseForm.listed === '') {
        this.$toast('请选择是否挂牌！')
        return false
      }
      if (this.baseForm.listedTime === '') {
        this.$toast('请输入挂牌时间！')
        return false
      }
      if (this.baseForm.postcode === '') {
        this.$toast('请输入基地邮编！')
        return false
      }
      if (this.baseForm.modeOfTravel === '') {
        this.$toast('请输入乘车方式！')
        return false
      }
      if (this.baseForm.personInChargeTwo === '') {
        this.$toast('请输入基地负责人姓名！')
        return false
      }
      if (this.baseForm.phoneTwo === '') {
        this.$toast('请输入基地负责人联系电话！')
        return false
      }
      if (this.baseForm.mailTwo === '') {
        this.$toast('请输入基地负责人邮箱！')
        return false
      }
      if (this.baseForm.unitAndPosition === '') {
        this.$toast('请输入基地负责人所在单位及职位！')
        return false
      }
      // 两个电话 两个邮箱
      //   if (!isPhone(this.phone)) {
      //     this.$toast('项目负责人手机号格式错误！')
      //     return false
      //   }
      //   if (!isPhone(this.phoneTwo)) {
      //     this.$toast('基地负责人手机号格式错误！')
      //     return false
      //   }
      //   if (!isEmail(this.mail)) {
      //     this.$toast('项目负责人邮箱格式错误！')
      //     return false
      //   }
      //   if (!isEmail(this.mailTwo)) {
      //     this.$toast('项目负责人邮箱格式错误！')
      //     return false
      //   }
      return true
    }
  }
}
</script>

<style lang="scss"></style>
