<template>
  <div class="wrap">
    <van-nav-bar
      title="活动申请"
      left-text="返回"
      fixed
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
      :style="{ display: platform === 'android' ? '' : 'none' }"
    />
    <div class="act_category">
      <!-- 首先选择活动类型 -->
      <van-cell-group title="活动基本信息">
        <van-field
          label="活动类型："
          @click="categoryPicker = true"
          v-model="category"
          :rules="[{ required: true, message: '请选择活动类型！' }]"
          @focus="noBomBox"
        >
        </van-field>
        <van-popup v-model="categoryPicker" position="bottom">
          <van-picker
            :columns="categoryList"
            @confirm="categoryConfirm"
            show-toolbar
            @cancel="categoryPicker = false"
          ></van-picker>
        </van-popup>
        <van-field
          label="活动名称："
          v-model="basicForm.activityName"
          :rules="[{ required: true, message: '请填写活动名称！' }]"
        >
        </van-field>
        <!-- 活动时间 -->
        <van-field
          readonly
          clickable
          name="calendar"
          v-model="activityTime"
          label="活动时间："
          placeholder="点击选择日期"
          :rules="[{ required: true, message: '请选择活动日期！' }]"
          @click="showCalendar = true"
        />
        <van-calendar
          v-model="showCalendar"
          @confirm="calendarConfirm"
          type="range"
          color="#1989fa"
          allow-same-day
          :min-date="minDate"
          :max-date="maxDate"
        />
        <!-- 活动地点 -->
        <van-field
          label="活动地点："
          v-model="basicForm.activityAddress"
          :rules="[{ required: true, message: '请填写活动地点！' }]"
        >
        </van-field>
        <!-- 上级组织 -->
        <van-field
          name="picker"
          clickable
          label="上级组织："
          v-model="organizationName"
          @focus="noBomBox"
          :disabled="$store.getters.userData.adminTag != 0"
          @click="organizationPicker = true"
        />
        <van-popup v-model="organizationPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="cates"
            @confirm="organizationConfirm"
            @cancel="organizationPicker = false"
          ></van-picker>
        </van-popup>
        <!-- 活动备注 -->
        <van-field
          label="活动备注："
          v-model="basicForm.remarks"
          placeholder="如没有备注信息，请填无！"
          :rules="[{ required: true, message: '请填写活动备注！' }]"
        >
        </van-field>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-row type="flex" justify="center">
        <van-button type="info" round style="width: 9rem;" @click="doSubmitActBaseInfo">下一步</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { categoryList, levelList, organizationId, submitActBaseInfo, organizationList } from '@/api/applyAct'
export default {
  data() {
    return {
      organizationId: '',
      //   organizationName: this.userData.adminInStuVO.organizationName,
      organizationName: '',
      category: '',
      categoryList: ['校级活动', '长期活动', '短期活动', '班级活动', '假期个人活动', '其他'],
      categoryPicker: false,
      categoryMap: new Map(),
      level: '',
      levelList: [],
      levelPicker: false,
      activityId: '',
      basicForm: {
        activityName: '',
        activityAddress: '',
        remarks: ''
      },
      showCalendar: false,
      activityTime: '   ',
      activityStartTime: '',
      activityEndTime: '',
      minDate: new Date(2000, 1, 1),
      maxDate: new Date(2099, 1, 1),
      organizationPicker: false,
      organizations: [],
      organizationMap: new Map(),
      cates: [
        {
          categoryId: 0,
          text: '其他',
          children: []
        },
        {
          categoryId: 1,
          text: '总队',
          children: []
        },
        {
          categoryId: 2,
          text: '院队',
          children: []
        },
        {
          categoryId: 3,
          text: '学生组织',
          children: []
        }
      ]
      // columns 应为两列
    }
  },
  computed: {
    ...mapState(['platform', 'userData'])
    // organizationName: function() {
    //   if (this.userData.adminTag !== 0) {
    //     return this.userData.adminInStuVO.organizationName
    //   } else {
    //     return ''
    //   }
    // }
  },
  mounted() {
    this.getOrganisationId()
    this.getCategoryList()
    this.getLevelList()
    this.getOrganizationList()
  },
  methods: {
    // 选择上级组织的picker事件
    // 阻止默认弹出手机键盘
    noBomBox(event) {
      document.activeElement.blur()
    },
    // 获取非管理员的organizationId 如果不是管理员 不会走这里
    async getOrganisationId() {
      if (this.$store.getters.userData.adminTag === 0) {
        console.log('该用户不是管理员!')
        return
      }
      await organizationId().then(res => {
        console.log(res)
        this.organizationId = res.data.id
        this.organizationName = this.userData.adminInStuVO.organizationName
      })
    },
    // 获取活动分类
    async getCategoryList() {
      await categoryList().then(res => {
        const list = res.data
        for (let i = 0; i < list.length; i++) {
          this.categoryMap.set(list[i].activityCategoryName, list[i].activityCategoryId)
        }
      })
    },
    // 活动分类picker
    categoryConfirm(value) {
      this.category = value
      this.categoryPicker = false
    },
    // 获取届别list
    async getLevelList() {
      await levelList().then(res => {
        this.levelList = res.data.map(item => {
          return item.level
        })
      })
    },
    // 活动列表picker
    levelConfirm(value) {
      this.level = value
      this.levelPicker = false
    },
    // 提交活动基本信息
    async doSubmitActBaseInfo() {
      if (this.category === '') {
        this.$toast('请选择活动分类！')
        return
      }
      if (this.activityStartTime === '') {
        this.$toast('请选择活动时间！')
        return
      }
      if (this.basicForm.activityName === '') {
        this.$toast('请填写活动名称！')
        return
      }
      if (this.basicForm.activityAddress === '') {
        this.$toast('请填写活动地点！')
        return
      }
      if (this.basicForm.remarks === '') {
        this.$toast('请填写活动备注！')
        return
      }
      if (this.organizationName === '') {
        this.$toast('请选择上级组织！')
        return
      }
      const data = {
        organizationId: this.organizationMap.get(this.organizationName),
        activityName: this.basicForm.activityName,
        activityStartTime: this.activityStartTime,
        activityEndTime: this.activityEndTime,
        activityAddress: this.basicForm.activityAddress,
        remarks: this.basicForm.remarks,
        level: this.level,
        activityCategoryId: this.categoryMap.get(this.category)
      }
      if (this.category === '其他') {
        this.$toast('暂未开放！')
        return
      }
      console.log(data)
      await submitActBaseInfo(data).then(res => {
        console.log(res)
        this.activityId = res.data.activityId
      })
      const _planForm = {
        activityName: this.basicForm.activityName,
        activityStartTime: this.activityStartTime,
        activityEndTime: this.activityEndTime,
        activityTime: this.activityTime,
        activityAddress: this.basicForm.activityAddress
      }
      // 重置策划案 清空其他表
      this.$store.dispatch('doSetPlanForm', _planForm)
      this.$store.dispatch('doSetApplyForm', {})
      this.$store.dispatch('doSetRegisterForm', {})
      this.$store.dispatch('doSetSpaceForm', {})
      this.$store.dispatch('doSetBaseForm', {})
      if (this.category === '班级活动') {
        this.$store.dispatch('doSetClassForm', _planForm)
        this.$router.push(`/classApply/${this.activityId}`)
      } else if (this.category === '假期个人活动') {
        this.$store.dispatch('doSetPersonForm', _planForm)
        this.$router.push(`/personApply/${this.activityId}`)
      } else if (this.category === '校级活动' || this.category === '短期活动' || this.category === '长期活动') {
        // 根据category判断跳转到哪个填表逻辑
        this.$store.dispatch('doSetPlanForm', _planForm)
        this.$router.push(`/applyActForm/${this.activityId}/${this.category}`)
      }
    },
    // 将日期转换为字符串
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    // 时间段选择
    calendarConfirm(date) {
      const [start, end] = date
      this.activityStartTime = `${this.formatDate(start)}`
      this.activityEndTime = `${this.formatDate(end)}`
      const day = this.activityStartTime.slice(5)
      day < '09-08' ? (this.level = start.getFullYear() - 1) : (this.level = start.getFullYear())
      this.activityTime = `从 ${this.formatDate(start)} 至 ${this.formatDate(end)}`
      this.showCalendar = false
    },
    // 获取组织列表
    async getOrganizationList() {
      const res = await organizationList()
      const temp = res.data
      console.log(temp)
      temp.forEach(item => this.organizationMap.set(item.organizationName, item.organizationId))
      for (let i = 0; i < this.cates.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          if (this.cates[i].categoryId === temp[j].categoryId) {
            this.cates[i].children.push({
              organisationId: temp[j].organizationId,
              text: temp[j].organizationName
            })
          }
        }
      }
      console.log(this.cates)
      //   console.log('temp' + temp)
    },
    // 选择上级组织的confirm
    organizationConfirm(value) {
      //   this.$set(this.organizationName, value[1])
      this.organizationName = value[1]
      //   this.organizationName = value
      this.organizationPicker = false
    }
  }
}
</script>

<style lang="scss">
.wrap {
  min-height: 14rem;
}
.act_category {
  padding: 0.3rem;
  .van-cell::after {
    border: 0;
  }
}
</style>
