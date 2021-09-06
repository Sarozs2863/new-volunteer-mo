<template>
  <div class="wrap">
    <div>
      <van-nav-bar
        title="个人活动申请"
        left-text="返回"
        fixed
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="onClickRight"
        :style="{ display: platform == 'android' ? '' : 'none' }"
      />
    </div>
    <div class="person_apply_form">
      <van-cell-group title="个人信息">
        <van-field label="学号：" v-model="userData.studentNum"></van-field>
        <van-field label="姓名：" v-model="userData.studentName"></van-field>
        <van-field label="学院班级：" v-model="userData.className"></van-field>
      </van-cell-group>

      <van-cell-group title="活动基本信息">
        <van-field label="活动名称：" v-model="personForm.activityName"></van-field>
        <van-field label="活动时间：" v-model="personForm.activityTime"></van-field>
        <van-field label="活动时长：" v-model="personForm.activityDuration"></van-field>
        <van-field label="活动地点：" v-model="personForm.activityAddress"></van-field>
      </van-cell-group>

      <van-cell-group title="活动详情">
        <van-field label="活动内容：" v-model="personForm.activityContent"></van-field>
        <van-field label="活动目的：" v-model="personForm.activityPurpose"></van-field>
        <van-field label="活动意义：" v-model="personForm.activitySignificance"></van-field>
        <van-field label="活动对象：" v-model="personForm.activityObject"></van-field>
        <van-field name="uploader" label="活动图片：">
          <template #input v-if="tag === undefined">
            <van-uploader v-model="personForm.file"></van-uploader>
          </template>
        </van-field>
      </van-cell-group>
      <div style="width: 100%; ">
        <img :src="imgUrl" style="width: 100%;" />
      </div>
    </div>

    <div v-if="typeof tag == 'undefined' || tag == 1">
      <div class="class_apply_btn">
        <van-button type="info" round @click="savePersonApply()">暂存申请</van-button>
        <van-button type="info" round @click="doSubmitFullApply()">
          {{ tag === 0 ? '修改申请' : '提交申请' }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import { mapState } from 'vuex'
import { submitPersonApply, submitFullApply, tableInfo } from '@/api/applyAct'

export default {
  data() {
    return {
      //   personForm: {},
      imgUrl: '',
      fileList: []
    }
  },
  props: {
    id: '',
    tag: ''
  },
  computed: {
    ...mapState(['platform', 'userData', 'personForm'])
  },
  // 载入学院列表 班级列表
  mounted() {
    this.tag && this.getPersonApply()
  },
  watch: {},
  methods: {
    // 暂存假期个人活动申请表
    async savePersonApply() {
      const form = new FormData()
      form.append('activityId', this.$route.params.id)
      form.append('activityName', this.personForm.activityName)
      form.append('collegeAndClass', this.userData.className)
      form.append('activityTime', this.personForm.activityTime)
      form.append('activityDuration', this.personForm.activityDuration)
      form.append('activityAddress', this.personForm.activityAddress)
      form.append('file', this.personForm.file[0].file)
      form.append('activityPurpose', this.personForm.activityPurpose)
      form.append('activitySignificance', this.personForm.activitySignificance)
      form.append('activityObject', this.personForm.activityObject)
      form.append('activityContent', this.personForm.activityContent)
      form.append('studentNum', this.userData.studentNum)
      form.append('studentName', this.userData.studentName)
      //   console.log(this.personForm.file[0].content)
      submitPersonApply(form).then(res => {
        if (res.code === 0) {
          this.$toast('暂存成功！')
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    async doSubmitFullApply() {
      const data = new FormData()
      data.append('activityId', this.id)
      // 这里做一个异步的嵌套可以
      await submitFullApply(data).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$toast('提交成功！')
          setTimeout(() => {
            this.$router.push('/applyActList')
          }, 1500)
        } else if (res.code === 10000) {
          this.$toast('请先点击左侧暂存提交按钮哦！')
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('系统异常！')
        }
      })
    },
    // 获取个人活动申请表详情
    async getPersonApply() {
      const params = {
        activityId: this.id,
        tableId: 7
      }
      await tableInfo(params).then(res => {
        if (res.code === 0) {
          //   debugger
          //   this.personForm = res.data
          // 这里要调用store中的方法
          this.imgUrl = res.data.addressPic
          this.$store.dispatch('doSetPersonForm', res.data)
          //   this.activityTime = `从 ${this.formatDate(res.data.activityStartTime)} 至 ${this.formatDate(
          // res.data.activityEndTime
          //   )}`
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('系统异常！')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.person_apply_form {
  padding: 0.3rem;
  .van-cell::after {
    border: 0;
  }
}
.class_apply_btn {
  margin: 0.3rem 0;
  display: flex;
  justify-content: space-around;
  .van-button {
    width: 4rem;
  }
}
</style>
