<template>
  <div>
    <van-nav-bar
      :title="(id ? '修改' : '新建') + '策划'"
      left-text="返回"
      fixed
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
      :style="{ display: platform === 'android' ? '' : 'none' }"
    />
    <activity-type></activity-type>
    <!-- <activity-planning></activity-planning> -->
    <copyright></copyright>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { actDetail, applyAct, categoryList, collegeList, classList, organizationId } from '@/api/applyAct'
import Copyright from '@/components/Copyright.vue'
import activityType from './applyComponents/activityType'
// import activityPlanning from './applyComponents/activityPlanning'

export default {
  name: 'ApplyAct',
  props: {
    id: {} // 动态路由接收参数
  },
  data() {
    return {
      active: 1,
      activityTime: '',
      applyForm: {
        organizationId: '',
        level: '',
        activityCategoryId: '',
        classOrCollegeId: '',
        activityInPlanningForm: {
          activityName: '',
          activityStartTime: '', // 格式为2020-02-02
          activityEndTime: '', // 格式为2020-02-02
          activityAddress: '',
          activityPurpose: '',
          activityBackground: '',
          activitySignificance: '',
          activityParticipants: '',
          activityParticipantsNumber: '',
          activityObject: '',
          activityContent: '',
          activityResource: '',
          activityProcess: '',
          activityProcessHolding: '',
          activityLaterPhases: '',
          activityFunds: '',
          activitySafe: '',
          sponsor: '武汉科技大学青年志愿者总队',
          contractor: ''
        }
      },
      actObject: '',
      participant: '',
      showCalendar: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 0, 1),
      numKeyBoardshow: false,
      categoryPicker: false,
      category: '',
      categoryList: [],
      stuLevel: '',
      stuLevelPicker: false,
      stuLevelList: ['2016', '2017', '2018', '2019', '2020'],
      levelPicker: false,
      levelList: [],
      level: '',
      collegePicker: false,
      college: '',
      collegeList: [],
      collegeMap: new Map(),
      categoryMap: new Map(),
      classMap: new Map(),
      classPicker: false,
      classList: [],
      theClass: '',
      ownResource: [
        {
          name: '',
          number: ''
        },
        {
          name: '',
          number: ''
        }
      ],
      helpResource: [
        {
          name: '',
          number: ''
        },
        {
          name: '',
          number: ''
        }
      ]
    }
  },
  computed: {
    ...mapState(['platform'])
  },
  components: {
    Copyright,
    activityType
    // activityPlanning
  },
  watch: {
    stuLevel() {
      this.getClassList()
    },
    college() {
      this.getClassList()
    }
  },
  mounted() {
    // this.id && this.getActDetail()
    // this.getCategoryList();
    // this.getCollegeList();
    // this.getOrganisationId()
  },
  methods: {
    // 阻止默认弹出手机键盘
    noBomBox(event) {
      document.activeElement.blur()
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    // 获取活动详情
    async getActDetail() {
      await actDetail(this.$route.params.id).then(res => {
        this.applyForm.activityInPlanningForm = res.data
        this.activityTime = `从 ${this.formatDate(res.data.activityStartTime)} 至 ${this.formatDate(
          res.data.activityEndTime
        )}`
        this.applyForm.level = moment(res.data.activityStartTime).year()
        this.ownResource = JSON.parse(res.data.activityResource)
        this.helpResource = JSON.parse(res.data.activityResourceNeed)
      })
    },
    // 时间段选择
    calendarConfirm(date) {
      const [start, end] = date
      this.applyForm.activityInPlanningForm.activityStartTime = `${this.formatDate(start)}`
      this.applyForm.activityInPlanningForm.activityEndTime = `${this.formatDate(end)}`
      // 取第一个横杠后面的字符串 把月份截出来
      const day = this.formatDate(start).slice(5)
      if (day < '09-08') {
        this.applyForm.level = start.getFullYear() - 1 // 开始日期在9月8号之前 取上一年的年份
      }
      if (day >= '09-08') {
        this.applyForm.level = start.getFullYear() // 活动开始日期在9月8号之后 取该年年份
      }
      this.activityTime = `从 ${this.formatDate(start)} 至 ${this.formatDate(end)}`
      this.showCalendar = false
    },
    // 提交活动策划
    async confirmApplyList() {
      console.log(this.applyForm)
      if (!this.validateForm()) {
        return
      }
      this.applyForm.activityCategoryId = this.categoryMap.get(this.category)
      this.applyForm.activityInPlanningForm.activityResource = this.ownResource
      this.applyForm.activityInPlanningForm.activityResourceNeed = this.helpResource
      if (this.theClass === '') {
        // 如果班级为空 就传学院id 此处即为collegeId
        this.applyForm.classOrCollegeId = this.collegeMap.get(this.college)
      } else {
        this.applyForm.classOrCollegeId = this.classMap.get(this.theClass)
      }
      console.log(this.applyForm)
      await applyAct(this.applyForm).then(res => {
        if ((res.code === 0)) {
          this.$toast('申请策划提交成功！即将跳转至活动申请首页！')
          setTimeout(() => {
            this.$router.push('/applyActList')
          }, 2000)
        } else {
          res.msg ? this.$toast(res.msg) : this.$toast('返回异常！')
        }
      })
    },
    // 提交前每项都不为空
    validateForm() {
      if (this.applyForm.activityInPlanningForm.activityName === '') {
        this.$toast('请填写活动名称！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityContent === '') {
        this.$toast('请填写活动内容！')
        return false
      }
      if (this.category === '') {
        this.$toast('请选择活动类型！')
        return false
      }
      if (this.activityTime === '') {
        this.$toast('请填写活动日期！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityAddress === '') {
        this.$toast('请填写活动地点！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityDuration === '') {
        this.$toast('请填写活动时长！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.sponsor === '') {
        this.$toast('请填写活动主办方！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.contractor === '') {
        this.$toast('请填写活动承办方！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityObject === '') {
        this.$toast('请填写活动对象！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityParticipants === '') {
        this.$toast('请填写参与人员！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityParticipantsNumber === '') {
        this.$toast('请填写活动人数！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityBackground === '') {
        this.$toast('请填写活动背景！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityBackground === '') {
        this.$toast('请填写活动目的！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activitySignificance === '') {
        this.$toast('请填写活动意义！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityFunds === '') {
        this.$toast('请填写经费预算！')
        return false
      }

      if (this.applyForm.activityInPlanningForm.activityProcess === '') {
        this.$toast('请填写活动准备阶段！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activityProcessHolding === '') {
        this.$toast('请填写活动举办阶段！')
        return false
      }

      if (this.applyForm.activityInPlanningForm.activityLaterPhases === '') {
        this.$toast('请填写活动后续阶段！')
        return false
      }
      if (this.applyForm.activityInPlanningForm.activitySafe === '') {
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
    // 获取活动分类
    async getCategoryList() {
      await categoryList().then(res => {
        const list = res.data
        for (let i = 0; i < list.length; i++) {
          this.categoryMap.set(list[i].activityCategoryName, list[i].activityCategoryId)
        }
        this.categoryList = res.data.map(item => {
          return item.activityCategoryName
        })
      })
    },
    categoryConfirm(value) {
      this.category = value
      this.categoryPicker = false
    },
    collegeConfirm(value) {
      this.college = value
      this.collegePicker = false
    },
    stuLevelConfirm(value) {
      this.stuLevel = value
      this.stuLevelPicker = false
    },
    classConfirm(value) {
      this.theClass = value
      this.classPicker = false
    },
    // 获取学院列表
    async getCollegeList() {
      await collegeList().then(res => {
        const list = res.data // 从后台获取到的是对象数组
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
    // 获取organisationId
    async getOrganisationId() {
      await organizationId().then(res => {
        console.log(res)
        this.applyForm.organizationId = res.data.id
      })
    },
    // 获取班级列表
    async getClassList() {
      if (this.stuLevel !== '' && this.college !== '') {
        const params = {
          level: this.stuLevel,
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
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0.2rem 0;
}
.apply_form {
  padding: 0 0.3rem;
}

// 取消van-cell 的下边框
/deep/.van-cell::after {
  border-bottom: 0;
}
.text_style {
  padding: 0 0.3rem;
}

.commit_btn {
  width: 8rem;
  margin: 0.5rem 0;
}

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
