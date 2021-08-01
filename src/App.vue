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
      platformToken: ''
    };
  },
  methods: {
    // 判断环境
    testPlatform() {
      if (this.$cookies.get('cookie')) {
        this.platformToken = this.$cookies.get('cookie');
        return 'andriod';
      } else if (this.$router.query.token) {
        this.platformToken = this.$cookies.get('cookie');
        if (this.$router.query.platform === 'mp') {
          return 'mp';
        } else if (this.$router.query.platform === 'ios') {
          return 'ios';
        }
      }
    },
    getHelperToken() {
      // let platform = this.testPlatform();
      // this.$store.commit('setPlatform', platform);
      // this.$store.commit('setPlatformToken', this.platformToken);
      // this.$toast(platform);
    }
  },
  mounted() {
    // await this.getHelperToken();
    // await this.$store.dispatch('setVolunteerToken');
  }
};
</script>
<style lang="scss" scoped></style>
