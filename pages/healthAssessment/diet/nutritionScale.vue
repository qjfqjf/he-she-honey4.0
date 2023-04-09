<template>
  <view class="contaner">
    <z-nav-bar title="营养秤">
      <view slot="right" class="p-2" @click="gotoReport()">
        <text class="analysis-report">分析报告</text>
      </view>
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
              <!-- <image :src="item.img" mode=""></image> -->
            </view>
            <view class="line">
              <text class="title">名称</text>
              <text class="result">{{item.name}}</text>
            </view>
            <view class="line">
              <text class="title">数量</text>
              <text class="result">{{item.count}} g</text>
            </view>
            <view class="line">
              <text class="title">热量</text>
              <text class="result">{{item.heal}} kcal</text>
            </view>
          </view>
        </view>
      </view>


      <!-- 检测页面 -->
      <view class="checkCard" v-else>
        <view class="top">
          <!-- 切换会员 -->
          <HealthHeader></HealthHeader>
          <!-- 设备状态 -->
          <view class="device-state">
            <text>设备状态：{{deviceState}}</text>
          </view>
          <view class="food">
            <!-- 重置 -->
            <view class="reset">
              <uni-icons class="icon" type="refreshempty" size="16"></uni-icons>
            </view>
            <view class="input">
              <input type="text" v-model="inputValue" placeholder="0" />g
              <!-- <text> g</text> -->
            </view>
            <button @click="selectFood">选择食物</button>
          </view>
          <!-- 单位、保存 -->
          <view class="btns">
            <button class="units">单位：g</button>
            <button class="save" @click="save">保存</button>
          </view>
        </view>


        <!-- 营养素含量 -->
        <view class="nutrientContent">
          <text class="nutrition-title" style="padding-top: 100rpx;">营养素含量</text>
          <!-- 当前，当天 -->
          <view class="current">

          </view>
          <!-- 含量 -->
          <view class="content">
            <view class="item">
              <view class="title">热量(345.8kcal)</view>
              <view class="slide">
                <text> 0</text>
                <view class="slider">
                  <slider value="22" block-size="12" @change="sliderChange" show-value />
                </view>
              </view>
            </view>
            <view class="item">
              <view class="title">热量(345.8kcal)</view>
              <view class="slide">
                <text> 0</text>
                <view class="slider">
                  <slider value="22" block-size="12" @change="sliderChange" show-value />
                </view>
              </view>
            </view>
          </view>
         
        </view>
        <!-- 维生素 -->
        <view class="vitamin">
          <view class="item">
            <text>维生素A(800微克)</text>
            <text>0</text>
          </view><view class="item">
            <text>胡萝卜素(60微克)</text>
            <text>0</text>
          </view><view class="item">
            <text>维生素A(800微克)</text>
            <text>0</text>
          </view><view class="item">
            <text>维生素A(800微克)</text>
            <text>0</text>
          </view>
        </view>
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
        // 日期范围
        range: ['2021-02-1', '2021-3-28'],
        // 设备状态
        deviceState: '未连接',
        recordList: [{
          date: '2022-03-11 23:34',
          img: '@/static/icon/healthSeeseement/egg.png',
          name: '煎蛋',
          count: 10,
          heal: 67
        }, {
          date: '2022-03-11 23:34',
          img: '@/static/icon/healthSeeseement/egg.png',
          name: '煎蛋',
          count: 10,
          heal: 67
        }, {
          date: '2022-03-11 23:34',
          img: '@/static/icon/healthSeeseement/egg.png',
          name: '煎蛋',
          count: 10,
          heal: 67
        }, ],
        inputValue: ''
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
      },

      sliderChange(e) {
        console.log('value 发生变化：' + e.detail.value)
      },
      save(){
        console.log('save====')
      },
      
      selectFood(){
        console.log('选择食物')
      }
      
    },
  }
</script>

<style lang="scss">
  .contaner {
    .analysis-report {
      font-size: 28rpx;
    }

    .content {
      border-top: 1rpx solid #ececec;
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

              image {
                width: 100rpx;
                height: 100rpx;
              }
            }

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

      .checkCard {
        border-top: 1rpx solid #ececec;

        .top {
          background-color: white;
          padding: 20rpx;

          .device-state {
            display: flex;
            justify-content: center;

            text {
              margin-top: 20rpx;
              font-size: 26rpx
            }
          }

          .food {
            margin-top: 20rpx;
            display: flex;
            flex-direction: column;
            align-items: center;

            .reset {
              width: 100rpx;
              height: 40rpx;
              background-color: gainsboro;
              text-align: center;
              border-radius: 20rpx;
              margin-bottom: 20rpx;
            }
            .input {
              display: flex;
              align-items: center;
            
              input {
                border-bottom: #999 1rpx solid;
                width: 200rpx;
                text-align: center;
              }
            }

            button {
              width: 400rpx;
              font-size: 20rpx;
              border: #01b09a 2rpx solid;
              border-radius: 50rpx;
              margin-top: 30rpx;
              color: #01b09a;
            }
          }

          .btns {
            margin-top: 30rpx;
            padding: 0;
            display: flex;
            justify-content: center;

            button {
              width: 300rpx;
              font-size: 20rpx;
              border-radius: 50rpx;
              color: white;
              margin: 0 20rpx;
            }

            .units {
              background-color: #01b09a;
            }

            .save {
              background-color: #d3d3d5;
            }
          }
        }




        .nutrientContent {
          background-color: #fff;
          margin: 10rpx;
          color: #19a99b;
          // display: flex;
          // justify-content: center;
          .nutrition-title {
            margin-left: 300rpx;
          }

          .current {}
          .content {
            .item{
              border-top: 1rpx solid #ececec;
              padding: 20rpx;
              .title{
                
              }
              .slide{
                display: flex;
                align-items: center;
                text{
                }
                .slider{
                  width: 100%;
                }
              }
            }
          }
        }
        
        .vitamin{
          background-color: #fff;
          padding: 14rpx;
          color: #19a99b;
          .item{
            display: flex;
            justify-content: space-between;
            padding: 14rpx;
            border-bottom: 1rpx solid #eeeeec;
          }
        }
      }
    }
  }

  // .active {
  //   color: #20c49f;
  // }
</style>