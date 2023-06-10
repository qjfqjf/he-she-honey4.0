<template>
  <view class="content">
    <header-nav :title="title" :tourl="tourl" :addtext="addtext"></header-nav>
    <public-module></public-module>


    <!-- 内容 -->
    <view class="container">
      <view class="nothing" v-if="baseList.length === 0">
        <empty-state :title="title"></empty-state>
      </view>
      <view class="item" v-for="(item, index) in baseList" :key="index" v-else>
        {{item}}
        </view>
      </view>
    </view>
</template>

<script>
  import EmptyState from '../components/emptyState.vue'
  import headerNav from '../components/headerNav.vue';
  export default {
    components: {
      EmptyState,
      headerNav
    },
    data() {
      return {
        baseList: [],
        title:'健康自述',
        tourl:'pages/healthManagement/health/addHealth',
        addtext:'添加自述',
      };
    },
    methods: {
      deleteReport(id) {
        console.log('删除', id)
      }
    }
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
  .container {
    .item {
      background-color: white;
      border-top: 1rpx solid #ececec;
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 10rpx 0;
      padding-left: 20rpx;

      font-size: 30rpx;

      .date {}

      .delete {
        padding: 10rpx;

        button {
          width: 150rpx;
          font-size: 20rpx;
          border-radius: 50rpx;
          margin: 0 10rpx;
          border: #01b09a 1rpx solid;

          color: #01b09a;
          font-weight: 600;
        }
      }
    }
  }
</style>