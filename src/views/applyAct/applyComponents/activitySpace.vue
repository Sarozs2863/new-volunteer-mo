/* eslint-disable vue/require-prop-type-constructor */ /* eslint-disable vue/require-prop-type-constructor */ /*
eslint-disable vue/require-prop-type-constructor */ /* eslint-disable vue/require-prop-type-constructor */ /*
eslint-disable vue/require-prop-type-constructor */ /* eslint-disable vue/require-prop-type-constructor */
<template>
  <div>
    <div>
      <van-cell-group title="活动基本信息">
        <van-field label="活动名称：" v-model="spaceForm.activityName"></van-field>
        <van-field label="活动内容：" v-model="spaceForm.activityContent" type="textarea" rows="4"></van-field>
        <van-field label="活动时间：" v-model="spaceForm.activityTime"></van-field>
        <van-field label="活动地点：" v-model="spaceForm.activityAddress"></van-field>
        <van-field label="参与人数：" type="digit" v-model="spaceForm.activityParticipantsNumber"></van-field>
      </van-cell-group>
      <van-cell-group title="活动负责">
        <van-field label="活动承办方：" v-model="spaceForm.contractor"></van-field>
        <van-field label="活动负责人：" v-model="spaceForm.personInCharge"></van-field>
        <van-field label="联系电话：" type="digit" v-model="spaceForm.phone"></van-field>
      </van-cell-group>
    </div>
    <div class="btns">
      <van-row type="flex" justify="center">
        <div v-if="tag != 2">
          <van-button
type="primary"
round
style="width: 8.5rem; margin-bottom: 0.4rem;"
@click="saveSpaceSheet()"
            >保存场地表</van-button
          >
        </div>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-button type="info" round @click="backStep">上一步</van-button>
        <van-button
          type="info"
          round
          v-if="(tag == 1 || tag == 0 || typeof tag == 'undefined') && category === '长期活动'"
          @click="nextStep"
          >下一步</van-button
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { submitSpaceSheet, tableInfo } from '@/api/applyAct'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      //   spaceForm: {}
    }
  },
  props: {
    childActive: '',
    category: '',
    activityId: {},
    tag: ''
  },
  mounted() {
    this.tag && this.getSpace()
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
      this.saveSpaceSheet()
    },
    // 保存场地表
    async saveSpaceSheet() {
      if (!this.validateForm()) {
        return
      }
      const data = this.spaceForm
      data.activityId = this.activityId
      await submitSpaceSheet(data).then(res => {
        if (res.code === 0) {
          this.$toast('保存成功！')
          this.$store.dispatch('doSetSpaceForm', this.spaceForm)
        } else if (res.code === 10000) {
          this.$store.dispatch('doSetSpaceForm', {})
          this.$toast(res.msg)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    // 场地表的tableId是5
    async getSpace() {
      const params = {
        activityId: this.activityId,
        tableId: 5
      }
      await tableInfo(params).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('doSetSpaceForm', res.data)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    // validate
    validateForm() {
      if (this.spaceForm.activityName === '') {
        this.$toast('请输入活动名称！')
        return false
      }
      if (this.spaceForm.activityContent === '') {
        this.$toast('请输入活动内容！')
        return false
      }
      if (this.spaceForm.activityTime === '') {
        this.$toast('请输入活动时间！')
        return false
      }
      if (this.spaceForm.activityAddress === '') {
        this.$toast('请输入活动地点！')
        return false
      }
      if (this.spaceForm.activityParticipantsNumber === '') {
        this.$toast('请输入参与人数！')
        return false
      }
      if (this.spaceForm.contractor === '') {
        this.$toast('请输入活动承办方！')
        return false
      }
      if (this.spaceForm.personInCharge === '') {
        this.$toast('请输入活动负责人！')
        return false
      }
      if (this.spaceForm.phone === '') {
        this.$toast('请输入联系电话！')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss"></style>
