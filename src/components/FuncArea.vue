<template>
  <div>
    <van-grid :column-num="3" clickable>
      <van-grid-item v-for="value in functions" :key="value.id" :icon="value.icon" :text="value.text" />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      functions: [
        {
          id: 1,
          icon: 'todo-list-o',
          text: '活动招募'
        },
        {
          id: 2,
          icon: 'smile-o',
          text: '信用等级'
        },
        {
          id: 3,
          icon: 'notes-o',
          text: '我参与的'
        },
        {
          id: 4,
          icon: 'warn-o',
          text: '违规举报'
        },
        {
          id: 5,
          icon: 'eye-o',
          text: '举报记录'
        },
        {
          id: 6,
          icon: 'edit',
          text: '活动策划'
        }
      ]
    };
  }
};
</script>

<style></style>
