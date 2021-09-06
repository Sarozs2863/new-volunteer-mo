<template>
  <div>
    <div class="nav">
      <van-nav-bar
        title="活动申请"
        class="nav"
        left-text="返回"
        left-arrow
        placeholder
        @click-left="$router.push('/')"
        v-if="platform === 'android'"
        fixed
      >
        <!-- <template #right>
          <div class="right"
               @click="$router.push('/applyAct')">
            <van-col class="title">新建+</van-col>
          </div>
        </template> -->
      </van-nav-bar>
    </div>
    <!-- 分类菜单 -->
    <div class="menu">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="statu" :options="status" @change="getType" />
        <van-dropdown-item v-model="category" :options="categories" @change="getType" />
      </van-dropdown-menu>
    </div>
    <div class="list">
      <van-list :finished="finished" v-model="loading" @load="getApplyList()">
        <div class="apply_card">
          <div v-if="statu === 1">
            <passed-card :passedList="applyList"></passed-card>
          </div>
          <div v-if="statu === 2">
            <dispassed-card :dispassedList="applyList"></dispassed-card>
          </div>
          <div v-if="statu === 3">
            <review-card :reviewList="applyList"></review-card>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 新建申请按钮 -->
    <!-- <div class="new_apply">
      <van-icon class="add_btn"
                name="plus"
                @click="$router.push('/applyAct')" />
    </div> -->
    <div class="btns">
      <van-row type="flex" justify="space-around">
        <van-button type="info" round @click="$router.push('/draftsList')">草稿箱</van-button>
        <van-button type="info" round @click="$router.push('/applyAct')">新建申请</van-button>
      </van-row>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { applyActList } from '@/api/applyAct.js'
import passedCard from './listComponents/passedCard.vue'
import dispassedCard from './listComponents/dispassedCard.vue'
import reviewCard from './listComponents/reviewCard.vue'
import Copyright from '@/components/Copyright.vue'

export default {
  name: 'ApplyActList',
  data() {
    return {
      statu: 1,
      category: 2,
      applyList: [],
      //   active: 0,
      //   list: ['已通过', '被驳回', '审核中'],
      status: [
        { text: '已通过', value: 1 },
        { text: '被驳回', value: 2 },
        { text: '审核中', value: 3 }
      ],
      categories: [
        { text: '校级活动', value: 2 },
        { text: '长期活动', value: 6 },
        { text: '短期活动', value: 3 },
        { text: '班级活动', value: 4 },
        { text: '假期个人活动', value: 5 }
      ],
      pageNum: 1,
      finished: false,
      loading: false
    }
  },
  components: {
    passedCard,
    dispassedCard,
    reviewCard,
    Copyright
  },
  computed: {
    ...mapState(['platform'])
  },
  mounted() {
    // this.test()
  },
  activated() {
    this.getApplyList()
  },
  methods: {
    getType() {
      this.actList = []
      this.pageNum = 1
      this.finished = false
      // 一定要记得重置loading！！！
      this.loading = true
      this.getApplyList()
    },
    async getApplyList() {
      //   1 已通过 2 被驳回 3待审核
      const params = {
        currPage: this.pageNum,
        status: this.statu,
        category: this.category
      }
      await applyActList(params).then(res => {
        if (res.code === 0) {
          this.loading = false
          const list = res.data.list
          if (this.pageNum > 1) {
            this.applyList = [...this.applyList, ...list]
          } else {
            this.applyList = list
          }
          if (res.data.currPage === res.data.totalPage) {
            this.finished = true
          }
          if (res.data.list.length === 0) {
            this.finished = true
          }
          // 若是总页数大于当前页码，页码+1
          if (res.data.totalPage > res.data.currPage) {
            this.pageNum++
          }
        } else {
          this.finished = true
        }
        this.loading = false
        // else if (res.code === 1) {
        //   this.loading = false
        //   this.finished === true
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  .van-nav-bar {
    min-height: 1.22667rem;
  }
}
.right {
  //   margin-top: 3.3px;
  border: 1px solid #d9d9d9;
  // padding: 0.1rem;
  padding: 0.13rem 0.3rem;
  color: #b0afb7;
  line-height: 0.56rem;
  .title {
    // line-height: 0.57rem;
    font-size: 0.4rem;
  }
  //   .icon_plus {
  //     font-size: 0.4rem;
  //     line-height: 0.57rem;
  //     vertical-align: middle;
  //     margin-left: 0.1rem;
  //     margin-bottom: 0.1rem;
  //   }
}

.tabs {
  // 修改标签页底部的颜色
  /deep/.van-tabs__line {
    background-color: rgb(0, 110, 255);
  }
}
.van-empty {
  min-height: 10rem;
}
.new_apply {
  position: fixed;
  bottom: 1.5rem;
  right: 1rem;
  border-radius: 50%;
  background-color: #1989fa;
  border: #1989fa 3px solid;
  padding: 0.18rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .add_btn {
    font-size: 0.7rem;
    color: white;
  }
}
.btns {
  width: 100%;
  position: fixed;
  bottom: 0.75rem;
  .van-button {
    width: 4.2rem;
    z-index: 1000000;
  }
}

.apply_card {
  //   margin: 0 0.3rem;
  border-radius: 0.13333rem;
  padding: 0.1rem;
}
</style>
