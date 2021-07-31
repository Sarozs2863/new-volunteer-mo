<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      helperToken: '',
      environment: ''
    };
  },
  methods: {
    // 判断环境
    testEnvironment() {
      if (this.$cookies.get('cookie')) {
        this.xxx = '';
        return 'andriod';
      } else if (this.$router.query) {
        // ...
      } else if (this.xxx) {
        // 小程序
        // ...
      }
    },
    getHelperToken() {
      let env = this.testEnvironment();
      switch (env) {
        case 'andriod':
          this.$toast('android');
          break;
        default:
          this.$toast('test failed');
          break;
      }
      // 获取volunteerToken，传递...
      // this.$store.dispatch('get')
    }
  },
  mounted() {
    this.getHelperToken();
  }
};
</script>
<style lang="scss" scoped></style>
