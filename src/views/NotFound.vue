<template>
  <div class="jwc_error">
    <van-empty image="error" :description="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '本地未检测到教务系统,\n请先在本应用内登录教务系统'
    };
  }
};
</script>

<style lang="scss" scoped>
.jwc_error {
  margin-top: 2.5rem;
  min-height: 13rem;
}
/deep/ .van-empty__description {
  font-size: 0.42rem;
  color: #6e6e6e;
  text-align: center;
}
</style>
