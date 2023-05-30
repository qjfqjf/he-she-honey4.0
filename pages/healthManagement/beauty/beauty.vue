<template>
  <view class="content">
    <z-nav-bar title="美容管理"></z-nav-bar>
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
          url: '/pages/healthManagement/sports/addSportsRecord'
        })
      },
    },
  }
</script>

<style lang="scss">
.content{
  background-color: #FFFFFF;
  height: 100%;
  .nothing{
    text-align: center;
    padding-top: 300rpx;
    width: 400rpx;
    margin: 0 auto;
  }
}
</style>