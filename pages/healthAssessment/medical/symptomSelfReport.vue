<template>
  <view>
    <z-nav-bar title="症状自述">
      <view slot="right" class="p-2" @click="addRecords">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthAssessment/addRecords.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>


    <!-- 内容 -->
    <view class="container">
      <view class="item" v-for="(item, index) in baseList" :key="index">
        <text class="date">{{item.date}}</text>
        <view class="delete">
          <button plain="true" type="default" @click="deleteReport">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList: [{
          date: '2022-12-1415:32:47'
        }]
      };
    },
    methods: {
      addRecords(){
        uni.navigateTo({
          url:'/pages/healthAssessment/medical/addSymptomSelfReport'
        })
      },
      deleteReport(id){
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