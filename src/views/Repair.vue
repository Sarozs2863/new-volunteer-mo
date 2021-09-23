<template>
  <div class="maintenance">
    <van-empty style="text-align: center" class="maintenance" image="network" :description="text" />
  </div>
</template>

<script>
export default {
    name: 'Repair',
    data() {
        return{
            text: '志愿者工时系统紧急修复中,\n预计9月23日18:00维护完毕！'
        }
    }
}
</script>

<style lang="scss" scoped>
.maintenance {
  margin-top: 2.5rem;
}
/deep/ .van-empty__description {
  font-size: 0.42rem;
  color: #6e6e6e;
}
</style>