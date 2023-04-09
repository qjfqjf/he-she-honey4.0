<template>
  <view class="contaner">
    <z-nav-bar title="跳绳">

    </z-nav-bar>
    <public-module></public-module>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 切换tab 历史和检测 -->
      <view class="tab-container d-flex j-center ">
        <view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">历史</view>
        <view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">检测</view>
      </view>


      <!-- 历史页面 -->
      <view class="historyCard" v-if="currentTab === 'tab1'">
        <!-- 时间区间 -->
        <view class="date-range">
          <uni-datetime-picker v-model="range" type="daterange" :border="false" :clear-icon="false"
            @maskClick="maskClick" />
        </view>
        <!-- 运动记录项 -->
        <view class="record-item">
          <view class="record-content" v-for="(item, index) in recordList" :key="index">
            <view class="date">
              <text>{{item.date}}</text>
              <text>{{item.skippingType}}</text>
            </view>
            <view class="line">
              <text class="title">跳绳次数</text>
              <text class="result">{{item.skippingCount}}</text>
            </view>
            <view class="line">
              <text class="title">消耗热量（kcal）</text>
              <text class="result">{{item.skippingKcal}}</text>
            </view>
            <view class="line">
              <text class="title">跳绳时长</text>
              <text class="result">{{item.takeTime}}</text>
            </view>
          </view>
        </view>
      </view>


      <!-- 检测页面 -->
      <view class="checkCard" v-else>
        <!-- 切换会员 -->
        <HealthHeader></HealthHeader>
        <view class="devices-warp mt-2">
          <u-grid :border="false" col="4">
            <u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
              @click="click(baseListItem.url, baseListItem.title)">
              <image style="width: 130rpx;height: 130rpx;" :src="baseListItem.img" mode="aspectFit"></image>
              <text class="grid-text mt-2">{{baseListItem.title}}</text>
            </u-grid-item>
          </u-grid>
        </view>
        <u-toast ref="uToast"></u-toast>

        <view class="device-state">
          <text>设备状态：{{deviceSatte}}</text> 
        </view>
        
          <!-- 提示 -->
          <view style="text-align: center;margin-top: 30rpx;font-weight: 700;">这里三张图片没有找到！！！！！</view>
      </view>
    </view>
  </view>
</template>

<script>
  import HealthHeader from '../components/healthHeader.vue'
  export default {
    components: {
      HealthHeader
    },
    data() {
      return {
        currentTab: 'tab1', //但前选项卡
        baseList: [{
            img: require('@/static/icon/healthAssessment/sportsRecord.png'),
            title: '自由跳',
            url: '/pages/healthAssessment/sports/demo'
          },
          {
            img: require('@/static/icon/healthAssessment/skipping.png'),
            title: '倒计时',
            url: '/pages/healthAssessment/sports/demo'
          },
          {
            img: require('@/static/icon/healthAssessment/sportsReport.png'),
            title: '倒计数',
            url: '/pages/healthAssessment/sports/demo'
          },

        ],
        // 设备状态
        deviceSatte: '未连接',
        // 日期范围
        range: ['2021-02-1', '2021-3-28'],
        recordList: [
          {
            date: '2022-03-11 23:34',
            skippingType:'自由跳',
            skippingCount: 103,
            skippingKcal: 6,
            takeTime:'00:30'
          },{
            date: '2022-03-11 23:34',
            skippingType:'自由跳',
            skippingCount: 103,
            skippingKcal: 6,
            takeTime:'00:30'
          },{
            date: '2022-03-11 23:34',
            skippingType:'自由跳',
            skippingCount: 103,
            skippingKcal: 6,
            takeTime:'00:30'
          },{
            date: '2022-03-11 23:34',
            skippingType:'自由跳',
            skippingCount: 103,
            skippingKcal: 6,
            takeTime:'00:30'
          },{
            date: '2022-03-11 23:34',
            skippingType:'自由跳',
            skippingCount: 103,
            skippingKcal: 6,
            takeTime:'00:30'
          },
        ]
      };
    },
    watch: {
      range(newval) {
        console.log('范围选:', this.range);
      },
    },
    //方法
    methods: {
      gotoReport() {
        console.log('跳到营养分析报告页面')
        uni.navigateTo({
          url: '/pages/healthAssessment/diet/nutritionReport'
        })
      },
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });;
      },
      // 时间区域
      maskClick(e) {
        console.log('maskClick事件:', e);
      }

    },
  }
</script>

<style lang="scss">
  .contaner {
    // overflow-y: hidden;
    .analysis-report {
      font-size: 28rpx;
    }

    .content {
      border-top: 1rpx solid #ececec;
      height: calc(100vh - 88rpx);
      font-size: 30rpx;

      .tab-container {
        background-color: white;

        .tab {
          padding: 18rpx;
          width: 100%;
          text-align: center;
          font-weight: 400;
          cursor: pointer;

          &.active {
            background-color: white;
            font-weight: 600;
            border-bottom: #01b09a 6rpx solid;
            color: #01b09a;
          }
        }
      }

      .historyCard {
        border-top: 1rpx solid #ececec;

        .date-range {
          background-color: #fff;
          padding: 10px;
          border-bottom: #01b09a 2rpx solid;
        }

        .record-item {
          margin: 10rpx 0;
          font-size: 29rpx;
          .record-content {
            padding: 10rpx;
            margin-top: 10rpx;
            background-color: white;
            .date {
              border-bottom: 1rpx solid #ececec;
              padding: 16rpx;
              display: flex;
              justify-content: space-between;
            }
            .line {
              padding: 10rpx 20rpx;
              display: flex;
              justify-content: space-between;
              
              .title {
              }

              .result {}
            }
          }

        }
      }

      .checkCard {
        border-top: 1rpx solid #ececec;
        padding: 20rpx;
        background-color: white;
        height: calc(100vh - 188rpx);
        .devices-warp {
          display: flex;
          flex-wrap: wrap;

          .item {
            flex-basis: 40%;
            padding: 30rpx;
            margin: 30rpx;
            width: 180rpx !important;
            border-radius: 20rpx;
            background-color: #effffe !important;
            box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);

            &:nth-child(5n) {
              margin-right: 0;
            }

            .grid-text {
              // font-size: 30rpx;
            }
          }
        }

        .device-state {
          display: flex;
          justify-content: center;

          text {
            margin-top: 20rpx;
            font-size: 26rpx
          }
        }
      }
    }
  }

  // .active {
  //   color: #20c49f;
  // }
</style>