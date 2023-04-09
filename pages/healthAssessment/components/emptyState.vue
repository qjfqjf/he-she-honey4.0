<template>
  <div class="empty-state">
    <div class="empty-state-description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '当前列表数据为空，请添加数据。'
    },
  }
}
</script>

<style lang="scss">
.empty-state {
  display: flex;
  justify-content: center;
  
  padding: 600rpx 0;
  .empty-state-description {
    font-size: 28rpx;
  }
}

</style>
