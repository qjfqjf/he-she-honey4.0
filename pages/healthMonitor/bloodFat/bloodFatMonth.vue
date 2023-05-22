<template>

  <view class="b-content p-2">
    <z-nav-bar title="血脂月报">
      <view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
    </z-nav-bar>
    <public-module></public-module>
    <TimeRage></TimeRage>
    <view class="historyCard mb-3" v-for="(item,index) in dataList" :key="index">
      <view class="top d-flex j-sb mb-2">
        <view class="time">
          {{item.time}}
        </view>
      </view>
      <view class="data d-flex j-sb">
        <view class="name">
          名称：{{item.name}}
        </view>
        <view class="bloodFat" v-if="item.bloodFat > targetIndex">
          <!-- ↓ -->
          血脂：{{item.bloodFat}}mmol/L
          <text class="up">{{arrowUp}}</text>
        </view>
        <view class="bloodFat" v-else-if="item.bloodFat < targetIndexMin">
          <!-- ↓ -->
          血脂：{{item.bloodFat}}mmol/L
          <text class="down">{{arrowDown}}</text>
        </view>
        <view class="bloodFat" v-else>
          <!-- ↓ -->
          血脂：{{item.bloodFat}}mmol/L
          <text class="down"></text>
        </view>
      </view>
    </view>


  </view>
</template>

<script>
  import TimeRage from '../components/timeRage/TimeRage.vue'
  export default {
    components: {
      TimeRage
    },
    data() {
      return {
        targetIndex: 1.27,
        targetIndexMin:0.45,
        arrowUp: '↑',
        arrowDown: '↓',
        dataList: [{
            time: "2023-3-29 15:30:50",
            name: '血脂',
            bloodFat: 1.28
          },
          {
            time: "2023-3-29 15:30:50",
            name: '血脂',
            bloodFat: 0.6
          },
          {
            time: "2023-3-29 15:30:50",
            name: '血脂',
            bloodFat: 1.39
          },
          {
            time: "2023-3-29 15:30:50",
            name: '血脂',
            bloodFat: 0.39
          }
        ]
      };
    },
    onLoad() {

    },
    methods: {
      handleDevelop() {
        this.$refs.uToast.show({
          message: '开发中...'
        })
      },

    }
  }
</script>

<style lang="scss">
  .b-content {
    .timeRange {
      .startTime {
        color: #2fa290;
      }

      .endTime {
        color: #2fa290;
      }
    }

    .historyCard {
      padding: 40rpx;
      border-radius: 16rpx;
      background-color: #fff;
      box-shadow: inset 0 3px 0 hsla(0, 0, 0, 0), 0 3px 3px hsla(0, 0, 0, .2);

      .top {
        .position {
          font-size: 36rpx;
          font-weight: 700;
        }

        .time {
          color: #666;


        }
      }

      .data {
        .name {

          color: #ffd661;

        }
        .bloodFat{
          .up {
            color: #f10000;
            font-size: 40rpx;
          }
          
          .down {
            color: #ffa053;
            font-size: 40rpx;
          }
        }
        
      }
    }
  }
</style>