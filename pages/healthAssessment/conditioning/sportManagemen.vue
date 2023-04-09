<template>
  <view>
    <z-nav-bar title="运动管理">

    </z-nav-bar>
    <public-module></public-module>


    <!-- 内容 -->
    <view class="container">
      <view class="nothing" v-if="baseList.length === 0">
        <empty-state :description="'暂无数据'"  />
      </view>
      <view class="item" v-for="(item, index) in baseList" :key="index" v-else>
        <text class="date">{{item.date}}</text>
        <view class="delete">
          <button plain="true" type="default" @click="deleteReport">删除</button>
        </view>
      </view>
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
        baseList: [{
          date: '2022-12-1415:32:47'
        }]
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