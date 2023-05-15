<template>
  <view class="container">
    <z-nav-bar title="额温枪历史">
      <view slot="right" class="p-2" @click="handleDevelop()">
        <text class="regular">预警规则</text>
      </view>
    </z-nav-bar>
    <public-module></public-module>


    <!-- 正文内容 -->
    <view class="content-body">
      <view class="item" v-for="(item, index) in historyList" :key="index">
        <view class="date">{{item.date}}</view>
        <view class="record" v-for="(item2, index2) in item.record">
          <text>{{item2.time}}</text>
          <text>{{item2.state}}</text>
          <text class="text">{{item2.index}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        historyList: [{
          date: '2021-02-24',
          record: [{
            time: '07:23:30',
            state: '体温',
            index: '36.5℃',
            writeByHand: '手动录入'
          }, {
            time: '07:23:30',
            state: '体温',
            index: '36.5℃',
            writeByHand: ''
          }, ]
        }, {
          date: '2021-02-24',
          record: [{
            time: '07:23:30',
            state: '体温',
            index: '36.5℃',
            writeByHand: ''
          }, {
            time: '07:23:30',
            state: '体温',
            index: '36.5℃',
            writeByHand: '手动录入'
          }, ]
        }, {
          date: '2021-02-24',
          record: [{
            time: '07:23:30',
            state: '体温',
            index: '36.5℃',
            writeByHand: '手动录入'
          }, {
            time: '07:23:30',
            state: '体温',
            index: '36.5℃',
            writeByHand: ''
          }, ]
        }, ],
      };
    },

    methods: {
      handleDevelop() {
        uni.navigateTo({
          url: '/pages/healthMonitor/bloodSugar/warningRules'
        })
      }
    }
  }
</script>

<style lang="scss">
  .container {
    font-size: 30rpx;

    .regular {
      font-size: 26rpx;
    }

    .content-body {
      .item {
        .date {
          padding: 26rpx;
        }

        .record {
          display: flex;
          background-color: white;
          padding: 30rpx 20rpx;
          border-top: 1rpx solid #ddd;
          box-sizing: border-box;

          text {
            margin-right: 80rpx;
          }
          .text{
            color: #01b09a;
          }
        }
      }
    }
  }
</style>