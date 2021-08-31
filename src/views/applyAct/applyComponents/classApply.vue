<template>
  <div class="wrap">
    <div>
      <van-nav-bar
        title="班级活动申请"
        left-text="返回"
        fixed
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="onClickRight"
        :style="{ display: platform === 'android' ? '' : 'none' }"
      />
    </div>
    <div class="class_apply_form">
      <van-cell-group title="活动班级">
        <div v-if="typeof tag === 'undefined' || tag === 0">
          <van-field label="学院：" v-model="college" @click="collegePicker = true" @focus="noBomBox"> </van-field>
        </div>
        <van-popup v-model="collegePicker" position="bottom">
          <van-picker
            :columns="collegeList"
            @confirm="collegeConfirm"
            show-toolbar
            @cancel="collegePicker = false"
          ></van-picker>
        </van-popup>

        <div v-if="typeof tag === 'undefined' || tag === 0">
          <van-field label="年级：" @click="levelPicker = true" v-model="level" @focus="noBomBox"> </van-field>
        </div>
        <van-popup v-model="levelPicker" position="bottom">
          <van-picker
            :columns="levelList"
            @confirm="levelConfirm"
            show-toolbar
            @cancel="levelPicker = false"
          ></van-picker>
        </van-popup>
        <van-field label="班级：" @click="classPicker = true" v-model="_class" @focus="noBomBox"> </van-field>
        <van-popup v-model="classPicker" position="bottom">
          <van-picker
            :columns="classList"
            @confirm="classConfirm"
            show-toolbar
            @cancel="classPicker = false"
          ></van-picker>
        </van-popup>
      </van-cell-group>
      <van-cell-group title="基本信息">
        <div>
          <van-field
            label="活动名称："
            :rules="[{ required: true, message: '请填写活动名称！' }]"
            placeholder="请和上一页面填入的活动名一致！"
            v-model="applyForm.activityName"
          ></van-field>
        </div>
        <div>
          <van-field
            label="活动内容："
            :rules="[{ required: true, message: '请填写活动内容！' }]"
            v-model="applyForm.activityContent"
          ></van-field>
        </div>
        <div>
          <van-field
            label="活动人数："
            type="digit"
            :rules="[{ required: true, message: '请填写活动内容！' }]"
            v-model="applyForm.activityParticipantsNumber"
          ></van-field>
        </div>
        <div v-if="tag === 1">
          <van-cell title="是否长期：" :value="applyForm.activityTermTag === 1 ? '长期' : '短期'"> </van-cell>
        </div>
        <div v-if="typeof tag === 'undefined' || tag === 0">
          <van-field name="radio" label="是否长期：">
            <template #input>
              <van-radio-group v-model="applyForm.activityTermTag" direction="horizontal">
                <van-radio name="1">长期</van-radio>
                <van-radio name="2">短期</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
      </van-cell-group>
      <van-cell-group title="活动时间与地点">
        <div>
          <van-field
            readonly
            clickable
            name="calendar"
            :value="activityTime"
            label="活动日期："
            placeholder="点击选择日期"
            :rules="[{ required: true, message: '请选择活动日期！' }]"
            @click="showCalendar = true"
          />
        </div>
        <van-calendar
          v-model="showCalendar"
          @confirm="calendarConfirm"
          type="range"
          color="#1989fa"
          allow-same-day
          :min-date="minDate"
          :max-date="maxDate"
        />
        <div>
          <van-field
            label="活动地点："
            v-model="applyForm.activityAddress"
            :rules="[{ required: true, message: '请填写活动地点！' }]"
          ></van-field>
        </div>
        <van-field
          label="活动时长："
          v-model="applyForm.activityDuration"
          placeholder="如：2h/班，3班/天"
          :rules="[{ required: true, message: '请填写活动时长！' }]"
        ></van-field>
      </van-cell-group>
    </div>

    <div v-if="typeof tag === 'undefined' || tag === 0">
      <!-- 不存在tag 则显示 -->
      <!-- <div class="tip"
           style="text-align: center; color: #969799; font-size: 0.37333rem; margin-top: 0.3rem;">
        提交申请前请暂存申请哦！
      </div> -->
      <div class="class_apply_btn">
        <van-button type="info" round @click="saveClassApply()">暂存申请</van-button>
        <van-button type="info" round @click="doSubmitFullApply()">{{
          tag === 0 ? '修改申请' : '提交申请'
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { levelList, collegeList, classList, submitClassApply, submitFullApply, tableInfo } from '@/api/applyAct'

export default {
  data() {
    return {
      applyForm: {},
      //   childActive: '',
      level: '',
      levelPicker: false,
      levelList: [],
      collegeList: [],
      college: '',
      collegeMap: new Map(),
      collegePicker: false,
      _class: '',
      classMap: new Map(),
      classList: '',
      classPicker: false,
      showCalendar: false,
      activityTime: '',
      minDate: new Date(2000, 1, 1),
      maxDate: new Date(2099, 1, 1)
      // 用来控制查看详情的时候是否禁用
    }
  },
  props: {
    id: '',
    tag: ''
  },
  computed: {
    ...mapState(['platform'])
  },
  // 载入学院列表 班级列表
  mounted() {
    this.getLevelList()
    this.getCollegeList()
    this.getClassList()
    this.tag && this.getClassApply()
  },
  watch: {
    level() {
      this.getClassList()
    },
    college() {
      this.getClassList()
    }
  },
  methods: {
    async getLevelList() {
      await levelList().then(res => {
        this.levelList = res.data.map(item => {
          return item.level
        })
      })
    },
    // 获取学院列表
    async getCollegeList() {
      await collegeList().then(res => {
        const list = res.data // 从后天获取到的是对象数组
        // 建立键值的映射关系
        for (let i = 0; i < list.length; i++) {
          this.collegeMap.set(list[i].collegeName, list[i].collegeId)
        }
        // 把所有的学院名字取出来
        this.collegeList = res.data.map(item => {
          return item.collegeName
        })
        // console.log(this.collegeList)
      })
    },
    // 获取班级列表
    async getClassList() {
      // 在届别和学院都不为空时执行
      if (this.level !== '' && this.college !== '') {
        const params = {
          level: this.level,
          collegeId: this.collegeMap.get(this.college)
        }
        // console.log(params);
        await classList(params).then(res => {
          const list = res.data.list
          for (let i = 0; i < list.length; i++) {
            this.classMap.set(list[i].className, list[i].classId)
          }
          this.classList = res.data.list.map(item => {
            return item.className
          })
        })
      }
    },
    // 保存活动申请表
    async saveClassApply() {
      const data = this.applyForm
      data.classId = this.classMap.get(this._class)
      data.activityId = this.id
      // 班级活动的时间变成开始时间和结束时间
      console.log(data)
      await submitClassApply(data).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$toast('暂存成功！')
          //   this.$router.push('/applyActList')
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    // 提交活动申请
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
    async getClassApply() {
      const params = {
        activityId: this.id,
        tableId: 3
      }
      await tableInfo(params).then(res => {
        if (res.code === 0) {
          this.applyForm = res.data
          this._class = res.data.className
          this.activityTime = `从 ${this.formatDate(res.data.activityStartTime)} 至 ${this.formatDate(
            res.data.activityEndTime
          )}`
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('系统异常！')
        }
      })
    },
    // 活动列表picker
    collegeConfirm(value) {
      this.college = value
      this.collegePicker = false
    },
    levelConfirm(value) {
      this.level = value
      this.levelPicker = false
    },
    classConfirm(value) {
      this._class = value
      this.classPicker = false
    },
    // 将日期转换为字符串
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    // 时间段选择
    calendarConfirm(date) {
      const [start, end] = date
      this.applyForm.activityStartTime = `${this.formatDate(start)}`
      this.applyForm.activityEndTime = `${this.formatDate(end)}`
      this.activityTime = `从 ${this.formatDate(start)} 至 ${this.formatDate(end)}`
      this.showCalendar = false
    }
  }
}
</script>

<style lang="scss">
.wrap {
  padding: 0.3rem;
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
