<template>
  <div>
    <h1 class="text-center">工时概览界面</h1>
    <h1 class="text-center">已参加活动： {{ $store.state.hourView.activityJoined }}</h1>
    <h1 class="text-center">已认证工时： {{ $store.state.hourView.timePassed }}</h1>
    <h1 class="text-center">未认证工时： {{ $store.state.hourView.timeToBePassed }}</h1>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
