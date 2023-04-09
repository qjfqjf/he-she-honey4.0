<template>
  <view class="content">
    <z-nav-bar title="健身管理"></z-nav-bar>
    <public-module></public-module>

    <!--饮食记录  -->
    <view class="nothing" v-if="baseList.length === 0">
      <empty-state :description="'暂无数据'" />
    </view>
    <view class="sports-records" v-for="(item, index) in baseList" :key="index" v-else>
      {{item}}
    </view>

  </view>
</template>

<script>
  import EmptyState from '../components/emptyState.vue'
  export default {
    components: {
      EmptyState
    },
    data() {
      return {
        baseList: []
      };
    },
    //方法
    methods: {
      addSportsRecord() {
        uni.navigateTo({
          url: '/pages/healthAssessment/sports/addSportsRecord'
        })
      },
    },
  }
</script>

<style lang="scss">
  .content {
    .sports-records {}
  }
</style>