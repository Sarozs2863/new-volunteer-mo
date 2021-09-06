<template>
  <div class="wrap">
    <div class="plan_form">
      <van-field
        label="活动名称："
        class="disabled"
        :rules="[{ required: true, message: '请填写活动名称！' }]"
        v-model="planForm.activityName"
      ></van-field>
      <van-field
        label="活动内容："
        type="textarea"
        rows="4"
        autosize
        :rules="[{ required: true, message: '请填写活动内容！' }]"
        v-model="planForm.activityContent"
      />
      <van-cell-group title="活动时间与地点">
        <van-field
          readonly
          clickable
          name="calendar"
          :value="planForm.activityTime"
          label="活动日期："
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
        <van-field
          label="活动地点："
          v-model="planForm.activityAddress"
          :rules="[{ required: true, message: '请填写活动地点！' }]"
        ></van-field>
        <van-field
          label="活动时长："
          v-model="planForm.activityDuration"
          :rules="[{ required: true, message: '请填写活动时长！' }]"
        ></van-field>
      </van-cell-group>
      <van-cell-group title="活动责任单位">
        <van-field
          label="活动主办方："
          v-model="planForm.sponsor"
          :rules="[{ required: true, message: '请填写活动主办方！' }]"
        ></van-field>
        <van-field
          label="活动承办方："
          v-model="planForm.contractor"
          :rules="[{ required: true, message: '请填写活动承办方！' }]"
        ></van-field>
      </van-cell-group>
      <van-cell-group title="活动对象">
        <van-field
          label="活动对象："
          v-model="planForm.activityObject"
          :rules="[{ required: true, message: '请填写活动对象！' }]"
        ></van-field>
        <van-field
          label="参与人员："
          v-model="planForm.activityParticipants"
          :rules="[{ required: true, message: '请填写参与人员！' }]"
        ></van-field>
        <van-field
          label="活动人数："
          v-model="planForm.activityParticipantsNumber"
          type="digit"
          :rules="[{ required: true, message: '请填写活动人数！' }]"
        ></van-field>
      </van-cell-group>
      <van-number-keyboard
        v-model="planForm.activityFunds"
        :show="numKeyBoardshow"
        :maxlength="6"
        @blur="numKeyBoardshow = false"
      />
      <van-cell-group title="活动背景、目的与意义">
        <van-field
          label="活动目的:"
          :rules="[{ required: true, message: '请填写活动目的！' }]"
          v-model="planForm.activityPurpose"
        >
        </van-field>
        <van-field
          label="活动背景:"
          :rules="[{ required: true, message: '请填写活动背景！' }]"
          v-model="planForm.activityBackground"
        ></van-field>
        <van-field
          label="活动意义:"
          :rules="[{ required: true, message: '请填写活动意义！' }]"
          v-model="planForm.activitySignificance"
        ></van-field>
      </van-cell-group>
      <van-cell-group title="活动经费">
        <van-field
          label="经费预算："
          v-model="planForm.activityFunds"
          type="digit"
          placeholder="单位为元"
          :rules="[{ required: true, message: '请填写经费预算！' }]"
        />
      </van-cell-group>
      <van-cell-group title="活动资源">
        <van-cell title="服务队自行解决物资："> </van-cell>
        <div class="table">
          <table>
            <tr class="title">
              <td>物资名称</td>
              <td>数量</td>
            </tr>
            <tr v-for="(item, index) in ownResource" :key="index">
              <td><input type="text" v-model="item.name" /></td>
              <td><input type="text" v-model="item.number" onkeyup="value=value.replace(/[^\d]/g,'')" /></td>

              <van-icon name="close" @click="delOne(ownResource, index)" />
            </tr>
            <tr>
              <!-- 占位 -->
              <td></td>
              <van-row type="flex" justify="end">
                <van-button type="info" @click="addOne(ownResource)" class="add">添加物资</van-button>
              </van-row>
            </tr>
          </table>
        </div>
        <div>
          <van-cell title="需总队协调解决物资："></van-cell>
        </div>
        <div class="table">
          <table>
            <tr class="title">
              <td>物资名称</td>
              <td>数量</td>
            </tr>
            <tr v-for="(item, index) in helpResource" :key="index">
              <td><input type="text" v-model="item.name" /></td>
              <td><input v-model="item.number" type="tel" onkeyup="value=value.replace(/[^\d]/g,'')" /></td>

              <van-icon name="close" @click="delOne(helpResource, index)" />
            </tr>
            <tr>
              <td></td>
              <van-row type="flex" justify="end">
                <van-button type="info" @click="addOne(helpResource)" class="add">添加物资</van-button>
              </van-row>
            </tr>
          </table>
        </div>
      </van-cell-group>
      <van-cell-group title="活动开展">
        <van-field
          label="活动准备阶段："
          label-width="2.7rem"
          type="textarea"
          rows="2"
          autosize
          :rules="[{ required: true, message: '请填写活动准备阶段！' }]"
          v-model="planForm.activityProcess"
        />
        <van-field
          label="活动举办阶段："
          type="textarea"
          label-width="2.7rem"
          rows="2"
          autosize
          :rules="[{ required: true, message: '请填写活动举办阶段！' }]"
          v-model="planForm.activityProcessHolding"
        />
        <van-field
          label="活动后续阶段："
          type="textarea"
          label-width="2.7rem"
          rows="2"
          autosize
          :rules="[{ required: true, message: '请填写活动后续阶段！' }]"
          v-model="planForm.activityLaterPhases"
        />
        <van-field
          label="活动安全："
          type="textarea"
          rows="3"
          autosize
          :rules="[{ required: true, message: '请填写活动安全！' }]"
          v-model="planForm.activitySafe"
        />
      </van-cell-group>
    </div>
    <div class="btns">
      <van-row type="flex" justify="space-around">
        <van-col v-if="tag != 2">
          <van-button type="info" round @click="savePlan">保存策划案</van-button>
        </van-col>
        <van-col>
          <van-button type="info" round @click="nextStep">下一步</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { applyAct, tableInfo } from '@/api/applyAct'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      //   planForm: $store.getters.planForm,
      // 不能向上面的做法直接赋值 要用computed 用不用辅助函数的两种做法应该都可以
      //   planForm: {},
    //   activityTime: '',
      showCalendar: false,
      minDate: new Date(2000, 1, 1),
      maxDate: new Date(2099, 1, 1),
      ownResource: [{ name: '', number: '' }],
      helpResource: [{ name: '', number: '' }]
    }
  },
  computed: {
    ...mapState(['planForm', 'applyForm', 'registerForm', 'spaceForm', 'baseForm'])
  },
  props: {
    activityId: '',
    childActive: {},
    tag: '',
    category: ''
    // activityName: ''
  },
  mounted() {
    // 如果有tag 则说明是从草稿箱中过来的
    this.tag && this.getPlan()
    // this.planForm.activityName = this.name
    // this.disabledChange()
  },
  methods: {
    nextStep: function() {
      // 0-策划案 1-申请表 2-登记表
      //   console.log('向父组件传值!')
      this.childActive++
      this.$emit('changeActive', this.childActive)
      //   this.savePlan()
    },
    // 将日期转换为字符串
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    // 时间段选择
    calendarConfirm(date) {
      const [start, end] = date
      this.planForm.activityStartTime = `${this.formatDate(start)}`
      this.planForm.activityEndTime = `${this.formatDate(end)}`
      this.planForm.activityTime = `从 ${this.formatDate(start)} 至 ${this.formatDate(end)}`
      this.showCalendar = false
    },
    // 提交前每项都不为空
    validateForm() {
      if (this.planForm.activityName === '') {
        this.$toast('请填写活动名称！')
        return false
      }
      if (this.planForm.activityContent === '') {
        this.$toast('请填写活动内容！')
        return false
      }
      if (this.category === '') {
        this.$toast('请选择活动类型！')
        return false
      }
      if (this.planForm.activityTime === '') {
        this.$toast('请填写活动日期！')
        return false
      }
      if (this.planForm.activityAddress === '') {
        this.$toast('请填写活动地点！')
        return false
      }
      if (this.planForm.activityDuration === '') {
        this.$toast('请填写活动时长！')
        return false
      }
      if (this.planForm.sponsor === '') {
        this.$toast('请填写活动主办方！')
        return false
      }
      if (this.planForm.contractor === '') {
        this.$toast('请填写活动承办方！')
        return false
      }
      if (this.planForm.activityObject === '') {
        this.$toast('请填写活动对象！')
        return false
      }
      if (this.planForm.activityParticipants === '') {
        this.$toast('请填写参与人员！')
        return false
      }
      if (this.planForm.activityParticipantsNumber === '') {
        this.$toast('请填写活动人数！')
        return false
      }
      if (this.planForm.activityBackground === '') {
        this.$toast('请填写活动背景！')
        return false
      }
      if (this.planForm.activityBackground === '') {
        this.$toast('请填写活动目的！')
        return false
      }
      if (this.planForm.activitySignificance === '') {
        this.$toast('请填写活动意义！')
        return false
      }
      if (this.planForm.activityFunds === '') {
        this.$toast('请填写经费预算！')
        return false
      }

      if (this.planForm.activityProcess === '') {
        this.$toast('请填写活动准备阶段！')
        return false
      }
      if (this.planForm.activityProcessHolding === '') {
        this.$toast('请填写活动举办阶段！')
        return false
      }

      if (this.planForm.activityLaterPhases === '') {
        this.$toast('请填写活动后续阶段！')
        return false
      }
      if (this.planForm.activitySafe === '') {
        this.$toast('请填写活动安全！')
        return false
      }

      return true
    },
    // 删除物资
    delOne(arr, index) {
      arr.splice(index, 1)
    },
    // 添加物资
    addOne(arr) {
      arr.push({ name: '', number: '' })
    },
    // 阻止默认弹出手机键盘
    noBomBox(event) {
      document.activeElement.blur()
    },
    // 提交活动策划案
    // 可能这里的逻辑有问题吗
    async savePlan() {
      if (!this.validateForm()) {
        return
      }
      this.planForm.activityId = this.activityId
      this.planForm.activityResource = this.ownResource
      this.planForm.activityResourceNeed = this.helpResource
      const data = this.planForm
      console.log(data)
      await applyAct(data)
        .then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$toast('保存成功！')
            this.$store.dispatch('doSetPlanForm', this.planForm)
            //   这里不对 js中的深拷贝 和 浅拷贝 改变applyForm同时也改变了planForm
            // 用Object.assign({}, variant)
            if (JSON.stringify(this.applyForm) === '{}') {
              this.$store.dispatch('doSetApplyForm', this.planForm)
              // this.applyForm = Object.assign({}, this.planForm)
            }
            if (JSON.stringify(this.registerForm) === '{}') {
              this.$store.dispatch('doSetRegisterForm', this.planForm)
            }
            if (JSON.stringify(this.spaceForm) === '{}') {
              this.$store.dispatch('doSetSpaceForm', this.planForm)
            }
          } else {
            this.$toast('返回异常！')
          }
        })
        .catch(err => {
          this.$toast('返回异常！')
          console.log(err)
        })
    },
    async getPlan() {
      const params = {
        activityId: this.activityId,
        tableId: 1
      }
      await tableInfo(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          //   this.planForm = res.data
          //   活动日期和物资需要一个转化
          this.planForm.activityTime = `从 ${this.formatDate(res.data.activityStartTime)} 至 ${this.formatDate(
            res.data.activityEndTime
          )}`
          this.ownResource = JSON.parse(res.data.activityResource)
          this.helpResource = JSON.parse(res.data.activityResourceNeed)
          // 这里没必要放在 store
          //   但是没办法渲染
          this.$store.dispatch('doSetPlanForm', res.data)
        } else if (res.code === 10000) {
          this.$store.dispatch('doSetPlanForm', {})
          this.$toast(res.msg)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    }
    // disabledChange () {
    //   let inputs = document.getElementsByTagName('input')
    //   let textareas = document.getElementsByTagName('textarea')
    //   //   inputs.forEach(item => item.className = 'disabled');
    //   inputs.forEach(item => {
    //     item.setAttribute('disabled', 'true')
    //     // item.classList.add('van-field__control')
    //   });
    //   //   inputs[0].setAttribute('disabled', 'true')
    //   console.log(inputs)
    //   console.log(textareas)
    // }
  }
}
</script>

<style lang="scss">
/deep/ .van-nav-bar--fixed {
  z-index: 1000000;
}

.btns {
  .van-button {
    width: 4rem;
  }
  margin: 0.4rem 0;
}
// .wrap {
//   //   padding: 3rem;
// }
.table {
  width: 100%;
  //   padding-left: 0.43rem;
  table {
    font-size: 0.31rem;
    width: 100%;
  }
  tr {
    width: 80%;
  }
  td {
    width: 40%;
    text-align: center;
  }
  input {
    text-align: center;
  }
  .add {
    width: 2rem;
    height: 0.6rem;
    font-size: 0.31rem;
    padding: 0;
    position: relative;
    right: 0;
  }
}
</style>
