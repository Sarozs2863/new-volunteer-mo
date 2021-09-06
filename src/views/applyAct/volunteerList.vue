<template>
  <div>
    <van-nav-bar title="工时表详情"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)"
                 :style="{'display': platform == 'android' ? '':'none'}" />
    <span>
      {{volunteerCheckId}}
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      volunteerCheckId: this.$route.params.sheetId
    }
  },
  created () {

  },
  methods: {
    // 获取工时表详情

  }
}
</script>

<style lang="scss" scoped>
</style>