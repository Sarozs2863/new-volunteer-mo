<template>
  <div class="wrap">
    <div class="top_nav">
      <van-nav-bar
        title="草稿箱"
        left-text="返回"
        left-arrow
        placeholder
        @click-left="$router.go(-1)"
        v-if="platform === 'android'"
        fixed
      >
      </van-nav-bar>
    </div>
    <div>
      <van-empty v-if="draftsList.length === 0" description="草稿箱中空空如也~"></van-empty>
      <van-list v-else :finished="finished" finished-text="已到达草稿箱的尽头~" @load="getDraftList" v-model="loading">
        <div class="card" v-for="(item, index) in draftsList" :key="index">
          <van-cell title="活动名称" :value="item.activityName"></van-cell>
          <van-cell title="活动类型" :value="item.categoryName"></van-cell>
          <van-cell title="上交组织" :value="item.organizationName"></van-cell>
          <div class="btn">
            <van-button type="info" round @click="jump(item)">
              查看详情
            </van-button>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { drafts } from '@/api/applyAct'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      draftsList: [],
      finished: false,
      pageNum: 1,
      loading: false
    }
  },
  computed: {
    ...mapState(['platform'])
  },
  mounted() {
    this.getDraftList()
    // list列表此处不加mounted！！！
  },
  methods: {
    async getDraftList() {
      const params = {
        currPage: this.pageNum
      }
      await drafts(params).then(res => {
        this.loading = false
        const list = res.data.list
        if (this.pageNum > 1) {
          this.draftsList = [...this.draftsList, ...list]
        } else {
          this.draftsList = list
        }
        // // 0条数据 直接结束
        // if (res.data.list.length === 0) {
        //   this.finished === true
        // }
        if (res.data.totalPage > res.data.currPage) {
          this.pageNum++
        } else if (res.data.totalPage <= res.data.currPage) {
          this.finished = true
        }
      })
    },
    jump(item) {
      if (item.categoryName === '班级活动') {
        this.$router.push(`/classApply/${item.activityId}`)
      } else if (item.categoryName === '假期个人活动') {
        // 1进入草稿箱
        this.$router.push(`/personApply/${item.activityId}/1`)
      } else {
        this.$router.push(`/applyActForm/${item.activityId}/${item.categoryName}/1`)
      }
    }
  }
}
</script>

<style lang="scss">
.wrap {
  padding: 0.3rem;
}
.van-list:first-child {
  margin-top: 0;
}
.card:nth-of-type(1) {
  margin: 0;
}
.card {
  margin: 0.5rem 0;
  background-color: #fff;
  padding: 0.2rem 0 0.3rem 0;
  .van-cell::after {
    border: 0;
  }
}

.btn {
  display: flex;
  justify-content: center;
  .van-button {
    width: 8rem;
    height: 1rem;
    margin: 0.2rem 0;
  }
}
</style>
