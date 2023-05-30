<template>
  <view class="content">
    <z-nav-bar title="心理咨询"></z-nav-bar>
    <public-module></public-module>

    <!--  空记录  -->
    <view class="nothing" v-if="baseList.length === 0">
      <EmptyState :title="title"></EmptyState>
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
        baseList: [],
        title:""
      };
    },
    //方法
    methods: {
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