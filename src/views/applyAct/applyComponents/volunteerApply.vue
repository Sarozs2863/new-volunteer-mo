<template>
  <div class="top">
    <div>
      <van-field label="活动名称：" v-model="applyForm.activityName"></van-field>
      <van-field label="活动内容：" v-model="applyForm.activityContent" type="textarea" rows="4"></van-field>
      <van-cell-group title="基本信息">
        <van-field label="活动时间：" v-model="applyForm.activityDuration"></van-field>
        <van-field label="活动地点：" v-model="applyForm.activityAddress"></van-field>
        <van-field label="活动承办方：" v-model="applyForm.contractor"></van-field>
      </van-cell-group>
      <van-cell-group title="项目负责人">
        <van-field label="姓名：" v-model="applyForm.personInCharge"></van-field>
        <van-field
          label="电话："
          v-model="applyForm.phone"
          :rules="[{ pattern: / /, message }]"
          type="digit"
        ></van-field>
      </van-cell-group>
    </div>
    <div class="btns">
      <van-row type="flex" justify="center" v-if="tag != 2">
        <van-button
type="primary"
round
style="width: 8.5rem; margin-bottom: 0.4rem;"
@click="saveVolunteerApply()"
          >保存申请表</van-button
        >
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-button type="info" round @click="backStep">上一步</van-button>
        <van-button type="info" round @click="nextStep" v-if="category != '校级活动'">下一步</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import { isPhone } from '@/utils/validate.js'
import { submitVolunteerApply, tableInfo } from '@/api/applyAct'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      //   applyForm: {}
    }
  },
  computed: {
    ...mapState(['planForm', 'applyForm', 'registerForm', 'spaceForm', 'baseForm'])
  },
  props: {
    activityId: {},
    childActive: {},
    category: '',
    tag: ''
  },
  mounted() {
    this.tag && this.getApply()
    this.backToScrolTop()
  },
  methods: {
    backStep() {
      this.childActive--
      this.$emit('changeActive', this.childActive)
    },
    nextStep() {
      this.childActive++
      this.$emit('changeActive', this.childActive)
      //   this.saveVolunteerApply()
    },
    // 保存志愿服务申请
    async saveVolunteerApply() {
      if (!this.validateForm()) {
        return
      }
      const data = this.applyForm
      data.activityId = this.activityId
      console.log(data)
      await submitVolunteerApply(data).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.$toast('保存成功！')
          this.$store.dispatch('doSetApplyForm', this.applyForm)
        } else {
          this.$toast('返回异常！')
        }
      })
    },
    // 获取申请表
    async getApply() {
      const params = {
        activityId: this.activityId,
        tableId: 2
      }
      await tableInfo(params).then(res => {
        if (res.code == 0) {
          this.$store.dispatch('doSetApplyForm', res.data)
        } else if (res.code == 10000) {
          this.$store.dispatch('doSetApplyForm', {})
          this.$toast(res.msg)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    validateForm() {
      if (this.applyForm.activityName == '') {
        this.$toast('请输入活动名称！')
        return false
      }
      if (this.applyForm.activityContent == '') {
        this.$toast('请输入活动内容！')
        return false
      }
      if (this.applyForm.activityDuration == '') {
        this.$toast('请输入活动时间！')
        return false
      }
      if (this.applyForm.activityAddress == '') {
        this.$toast('请输入活动地点！')
        return false
      }
      if (this.applyForm.contractor == '') {
        this.$toast('请输入活动承办方！')
        return false
      }
      if (this.applyForm.activityName == '') {
        this.$toast('请输入项目负责人姓名！')
        return false
      }
      if (this.applyForm.phone == '') {
        this.$toast('请输入负责人电话！')
        return false
      }
      if (!isPhone(this.applyForm.phone)) {
        this.$toast('负责人电话输入格式错误！')
        return false
      }
      return true
    }
    // backToScrolTop () {
    //   let topElement = document.getElementsByClassName('top')[0]
    //   console.log(topElement)
    //   topElement.scrollTop = 0
    // }
  }
}
</script>

<style lang="scss"></style>
