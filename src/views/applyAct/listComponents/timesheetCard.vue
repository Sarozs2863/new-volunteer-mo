<template>
  <div>
    <div class="list">
      <van-cell-group v-for="(item, index) in timeSheetList"
                      :key="index">
        <div class="timesheet_card">
          <van-cell title="工时表 id "
                    :value="item.volunteerCheckId" />
          <van-cell title="日期"
                    :value="item.participateDate" />
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['']
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0.3rem;
  min-height: 10rem;
}
.timesheet_card {
  margin: 0.2rem 0;
}
</style>