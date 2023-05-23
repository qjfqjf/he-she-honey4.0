<template>
  <view class="container">
    <z-nav-bar title="血氧历史"></z-nav-bar>
    <public-module></public-module>


    <!-- 正文内容 -->
    <view class="content-body">
      <u-read-more :toggle="true" closeText="查看更多">
        <view class="item" v-for="(item, index) in historyList" :key="index">
          <view class="date">
            <text>{{item.date}}</text>
          </view>
          <view class="flex">
            <view class="line">
              <text class="title">血氧</text>
              <text class="result right">{{item.bloodOxygen}}</text>
            </view>
            <view class="line">
              <text class="title">脉率</text>
              <text class="result">{{item.pulseRate}}</text>
            </view>
            <view class="line">
              <text class="title">PI</text>
              <text class="result">{{item.pi}}</text>
            </view>
            <view class="line">
              <text class="title">分析结果</text>
              <text class="result">{{item.result}}</text>
            </view>
          </view>
        </view>
      </u-read-more>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        historyList: [{
            date: '2022-03-11 23:34',
            bloodOxygen: '97',
            pi: '9.8',
            pulseRate: 10,
            result: '脉搏节律未见异常'
          },
          {
            date: '2022-03-11 23:34',
            bloodOxygen: '97',
            pi: '9.8',
            pulseRate: 10,
            result: '脉搏节律未见异常'
          }, {
            date: '2022-03-11 23:34',
            bloodOxygen: '97',
            pi: '9.8',
            pulseRate: 10,
            result: '脉搏节律未见异常'
          }, {
            date: '2022-03-11 23:34',
            bloodOxygen: '97',
            pi: '9.8',
            pulseRate: 10,
            result: '脉搏节律未见异常'
          },
          {
            date: '2022-03-11 23:34',
            bloodOxygen: '97',
            pi: '9.8',
            pulseRate: 10,
            result: '脉搏节律未见异常'
          }
        ],
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
  .right {
    text-align: right;
  }

  .container {
    font-size: 30rpx;
    .regular {
      font-size: 26rpx;
    }

    .content-body {
      .item {
        padding: 10rpx;
        margin-top: 10rpx;
        background-color: white;

        .date {
          border-bottom: 1rpx solid #ececec;
          padding: 16rpx;
        }

        .flex {
          .line {
            padding: 10rpx 20rpx;
            display: flex;
            justify-content: space-between;

            .title {}

            .result {}
          }
        }

      }
    }
  }
</style>