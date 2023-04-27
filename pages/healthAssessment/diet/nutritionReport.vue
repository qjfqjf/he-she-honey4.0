<template>
  <view class="container">
    <z-nav-bar title="营养分析报告"></z-nav-bar>
    <public-module></public-module>

    <!-- 时间选择器 -->
    <view class="show-time">
      <view class="select-time">
        <text @click="changeDate('subtract')">
          < </text>
            <text class="date" @click="()=> show=true">{{selectTime}}</text>
            <text @click="changeDate('add')">></text>
      </view>
      <u-datetime-picker :show="show" v-model="time" mode="date" closeOnClickOverlay @confirm="confirm" @cancel="cancel"
        @close="close"></u-datetime-picker>
    </view>

    <!-- 营养素含量 -->
    <view class="nutrientContent">
      <view class="nutrient-content">
        <view class="title">营养素含量</view>
        <!-- checkbox -->
        <u-radio-group v-model="radiovalue1" class="checkbox">
          <u-radio activeColor="#04af96" shape="square" v-for="(item, index) in radiolist1" :key="index"
            :label="item.name" :name="item.name" @change="radioChange"></u-radio>

        </u-radio-group>
        <!--营养素 -->
        <view class="content">
          <view class="item">
            <view class="title">热量(345.8kcal)</view>
            <view class="slide">
              <text> 890</text>
              <view class="slider">
                <u-line-progress :percentage="percentageValue" height="14" :showText="false" activeColor="#1ec4a1">

                </u-line-progress>
              </view>
              <text class="right">{{percentageValue}}%</text>
            </view>
          </view>
          <view class="item">
            <view class="title">热量(345.8kcal)</view>
            <view class="slide">
              <text> 234.8</text>
              <view class="slider">
                <u-line-progress :percentage="percentageValue" height="14" :showText="false" activeColor="#1ec4a1">
                </u-line-progress>
              </view>
              <text class="right">{{percentageValue}}%</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 营养元素 -->
      <view class="vitamin">
        <view class="item ">
          <text class="nutrient-title">营养元素</text>
          <text>当前/推荐</text>
        </view>
        <view class="item">
          <text>维生素A(800微克)</text>
          <text>0</text>
        </view>
        <view class="item">
          <text>胡萝卜素(60微克)</text>
          <text>0</text>
        </view>
        <view class="item">
          <text>维生素A(800微克)</text>
          <text>0</text>
        </view>
        <view class="item">
          <text>维生素A(800微克)</text>
          <text>0</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    data
  } from '../../../uni_modules/uview-ui/libs/mixin/mixin';
  export default {
    data() {
      return {
        show: false,
        time: new Date().format('yyyy-MM-dd'),
        selectTime: new Date().format('yyyy-MM-dd'),
        // 基本案列数据
        radiolist1: [{
            name: '当前',
            disabled: false
          },
          {
            name: '推荐',
            disabled: false
          },
        ],
        // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
        radiovalue1: '当前',
        sliderHeight: 100,
        percentageValue: 70,

      };
    },
    methods: {
      changeDate(action) {
        // 将日期字符串转换为日期对象
        const date = new Date(this.time);
        // 根据action参数增加或减少一天
        if (action === 'add') {
          date.setDate(date.getDate() + 1);
        } else if (action === 'subtract') {
          date.setDate(date.getDate() - 1);
        } else {
          throw new Error('Invalid action. Use "add" or "subtract".');
        }

        // 将更新后的日期对象转换为字符串
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        // 返回新的日期字符串
        this.selectTime = `${year}-${month}-${day}`;
        this.time = this.selectTime;
      },

      confirm(time) {
        console.log(time)
        this.show = false
        this.selectTime = new Date(time.value).format('yyyy-MM-dd')
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
      // 处理保存
      handleSaveInfo() {
        console.log(111)  
      },
      groupChange(n) {
        console.log('groupChange', n);
      },
      radioChange(n) {
        console.log('radioChange', n);
      }
    }
  }
</script>

<style lang="scss">
  .right {
    text-align: right;
  }

  .container {
    padding: 0 20rpx;
    font-size: 28rpx;

    .show-time {
      .select-time {
        display: flex;
        padding: 12rpx 160rpx;
        justify-content: space-around;
        align-items: center;

        .date {
          font-size: 32rpx;
        }

        text {
          font-size: 40rpx
        }
      }
    }

    .nutrientContent {
      color: #19a99b;

      .nutrient-content {
        padding: 14rpx;
        background-color: #fff;

        .title {
          text-align: center;
          font-size: 32rpx;
        }

        .checkbox {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10rpx;
        }

        .content {
          .item {
            padding: 10rpx 0;

            .title {
              text-align: left;
            }

            .slide {
              display: flex;
              align-items: center;
              justify-content: space-between;

              text {
                width: 100rpx;
              }

              .slider {
                width: 58%;

                .u-percentage-slot {
                  padding: 1px 5px;
                  background-color: #c0c4cc;
                  color: #fff;
                  border-radius: 100px;
                  font-size: 10px;
                  margin-right: -5px;
                }
              }
            }
          }
        }

      }

      .vitamin {
        background-color: #fff;
        padding: 10rpx;
        color: #19a99b;
        margin-top: 10rpx;

        .item {
          display: flex;
          justify-content: space-between;
          padding: 14rpx;
          border-bottom: 1rpx solid #eeeeec;

          .nutrient-title {
            font-weight: 600;
          }
        }

      }
    }



  }
</style>