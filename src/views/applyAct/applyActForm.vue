/* eslint-disable vue/no-unused-components */ /* eslint-disable vue/require-prop-type-constructor */ /* eslint-disable
vue/require-prop-type-constructor */ /* eslint-disable vue/require-prop-type-constructor */ /* eslint-disable
vue/require-prop-type-constructor */
<template>
  <div class="apply_form_wrap">
    <div class="top_nav">
      <van-nav-bar
        title="活动申请"
        left-arrow
        placeholder
        fixed
        @click-left="$router.go(-1)"
        :style="{ display: platform == 'android' ? '' : 'none' }"
      />
    </div>
    <div class="steps">
      <van-steps :active="active" active-icon="success" active-color="#38f">
        <van-step>策划案</van-step>
        <van-step>申请表</van-step>
        <van-step v-if="category == '长期活动'">登记表</van-step>
        <!-- 长期活动才有 并且可以跳过 -->
        <van-step v-if="category != '校级活动'">场地表</van-step>
        <van-step v-if="category == '长期活动'">基地协议</van-step>
      </van-steps>
      <!-- 这个页面的各个组件都能使用 activityId -->
      <div style="text-align: center; color: #969799; margin: 0.3rem 0 0.15rem 0; font-size: 0.4rem;">
        每填完一个完整表单都要点击保存按钮哦！
      </div>
    </div>
    <div class="child_component">
      <!-- 策划案 子组件-->
      <activity-planning
        v-if="active == 0"
        @changeActive="change($event)"
        :activityId="id"
        :tag="tag"
        :category="category"
        :childActive="active"
      ></activity-planning>
      <!-- 申请表 -->
      <!-- 志愿服务申请表 -->
      <volunteer-apply
        v-if="active == 1"
        @changeActive="change($event)"
        :activityId="id"
        :tag="tag"
        :category="category"
        :childActive="active"
      >
      </volunteer-apply>
      <!-- 登记表 -->
      <activity-register
        v-if="active == 2 && category == '长期活动'"
        @changeActive="change($event)"
        :activityId="id"
        :tag="tag"
        :category="category"
        :childActive="active"
      ></activity-register>
      <!-- 场地表 -->
      <activity-space
        v-if="(active == 3 && category == '长期活动') || (active == 2 && category == '短期活动')"
        @changeActive="change($event)"
        :activityId="id"
        :tag="tag"
        :category="category"
        :childActive="active"
      ></activity-space>
      <!-- 基地协议 -->
      <base-agreement
        v-if="active == 4 && category == '长期活动'"
        @changeActive="change($event)"
        :activityId="id"
        :tag="tag"
        :category="category"
        :childActive="active"
      ></base-agreement>
      <!-- 确认提交按钮 -->

      <!-- <confirm-submmit v-if="active == 5"></confirm-submmit> -->
    </div>

    <!-- 判断当前active是不是数组中的最后一个元素 -->
    <div class="confirm_btn" v-if="tag != 2">
      <van-button type="info" round @click="doSubmitFullApply()">确认提交</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { submitFullApply } from '@/api/applyAct'

import activityPlanning from './applyComponents/activityPlanning'
import volunteerApply from './applyComponents/volunteerApply'
import classApply from './applyComponents/classApply'
import personApply from './applyComponents/personApply'
import activityRegister from './applyComponents/activityRegister'
import activitySpace from './applyComponents/activitySpace'
import baseAgreement from './applyComponents/baseAgreement'
import confirmSubmmit from './applyComponents/confirmSubmmit'

export default {
  data() {
    return {
      active: 0
      // 从活动基本信息页面接收到的参数
    }
  },
  props: {
    id: '',
    category: '',
    // 判断是新建的还是从草稿箱拿来的
    tag: ''
    // name: ''
  },
  //   watch: {
  //     'active': {
  //       // 步骤发生变化 取不同的数据
  //       handler: (val, oldVal) => {
  //         // 处理steps 的 scrollTop 返回到页面顶部
  //         this.getTabelInfo(val)
  //       }
  //     }
  //   },
  computed: {
    ...mapState(['platform', 'planForm', 'applyForm', 'registerForm', 'spaceForm', 'baseForm'])
  },
  components: {
    activityPlanning,
    volunteerApply,
    classApply,
    personApply,
    activityRegister,
    activitySpace,
    baseAgreement,
    confirmSubmmit
  },
  methods: {
    VolunteerApplychange(data) {
      this.active = data
    },
    change(data) {
      this.active = data
    },
    // 提交活动
    async doSubmitFullApply() {
      const data = new FormData()
      data.append('activityId', this.id)
      await submitFullApply(data).then(res => {
        // console.log(res)
        if (res.code === 0) {
          // 清空store中的数据
          this.$store.dispatch('doSetPlanForm', {})
          this.$store.dispatch('doSetApplyForm', {})
          this.$store.dispatch('doSetRegisterForm', {})
          this.$store.dispatch('doSetSpaceForm', {})
          this.$store.dispatch('doSetBaseForm', {})
          // 路由跳转 跳转到活动列表页面
          this.$toast('提交成功,即将跳转到活动列表页面！')
          setTimeout(() => {
            this.$router.push('/applyActList')
          }, 1500)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    }
    // 获取活动列表
    // 校级需要的是

    // 点击步骤条 上发生变化
    // changeStep (active) {
    //   this.active = active
    // },
    // // 获取某张表的内容
    // async getTabelInfo (active) {
    //   let params = {
    //     activityId: this.activityId,
    //     tableId: active + 1
    //   }
    //   // 会不会是上个表的内容
    //   // 监听childActive
    //   await tableInfo(params).then(res => {
    //     console.log(res)
    //     switch (tableId) {
    //       // 赋值策划案
    //       case 1: this.setPlanForm()
    //         break;
    //       case 2: this.setApplyForm()
    //         break;
    //       case 3: this.setRegisterForm()
    //         break;
    //       case 4: this.setSpaceForm()
    //         break;
    //       case 5: this.setBaseForm()
    //         break;
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
.apply_form_wrap {
  padding: 0.3rem;
  .top_nav {
    .van-nav-bar {
      z-index: 100000;
    }
  }
}
.steps {
  margin-bottom: 0.3rem;
}
.child_component {
  .van-cell::after {
    border: 0;
  }
  .van-field__label {
    min-width: 30%;
  }
}
.confirm_btn {
  display: flex;
  justify-content: center;
  .van-button {
    width: 8.5rem;
  }
}
</style>
