<template>
  <view>
    <z-nav-bar title="寻医问药"></z-nav-bar>
    <public-module></public-module>

    <!-- 页面内容 -->
    <view class="container">
      <!-- 轮播图 -->
      <view class="swiper">
        <u-swiper :list="wisperImage" indicator indicatorMode="line" circular height="150"></u-swiper>
      </view>
      <!-- 我的医生、找医生 -->
      <view class="doctor">
        <view class="tab-container d-flex j-center ">
          <view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">我的医生</view>
          <view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">找医生</view>
        </view>
      </view>

      <!-- 筛选框 -->
      <view class="select-area">
          <uni-data-select class="select" :clear="false" v-model="location" :localdata="locationRange" @change="change"></uni-data-select>
          <uni-data-select class="select" :clear="false" v-model="institution" :localdata="institutionRange" @change="change"></uni-data-select>
          <uni-data-select class="select" :clear="false" v-model="department" :localdata="departmentRange" @change="change"></uni-data-select>
        <!-- <view class="item location">
          <u-picker :show="show" :columns="columns" :mode="mode1" @confirm="confirm" @change="changeHandler"></u-picker>
          <u-button @click="show = true">位置</u-button>
        </view>
        <view class="item institution">
          <u-picker :show="show" :columns="columns" :mode="mode2" @change="changeHandler"></u-picker>
          <u-button @click="show = true">机构</u-button>
        </view>
        <view class="item department">
          <u-picker :show="show" :columns="columns" :mode="mode3" @change="changeHandler"></u-picker>
          <u-button @click="show = true">科室</u-button>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wisperImage: [
          '/static/img/healthAdvisory/seekingMedical.png'
        ],
        currentTab: 'tab2', //但前选项卡；

        location: 0,
        institution:0,
        department:0,
        locationRange: [{
            value: 0,
            text: "位置"
          },
          {
            value: 1,
            text: "北京"
          },
          {
            value: 2,
            text: "上海"
          },
        ],
        institutionRange: [{
            value: 0,
            text: "机构"
          },
          {
            value: 1,
            text: "公里综合医院"
          },
          {
            value: 2,
            text: "公立专科医院"
          },
        ],
        departmentRange: [{
            value: 0,
            text: "科室"
          },
          {
            value: 1,
            text: "足球"
          },
          {
            value: 2,
            text: "游泳"
          },
        ],
        
        
        // show: false,
        // columns: [
        //   ['中国', '美国', '日本']
        // ],
        // mode1: '位置',
        // mode2: '机构',
        // mode3: '科室',
      };
    },
    methods: {
      change(e) {
        console.log("e:", e);
      },
      // changeHandler(e) {
      //   console.log(e)
      // },
      // // 回调参数为包含columnIndex、value、values
      // confirm(e) {
      //   console.log('confirm', e);
      //   this.show = false;
      //   this.mode1 = e.value;
      // }
    }
  }
</script>

<style lang="scss">
  .container {
    background-color: #fff;
    height: calc(100vh - 88rpx);
    .swiper {}

    .doctor {
      .tab-container {
        background-color: white;
        padding: 16rpx;
        margin-top: 10rpx;

        .tab {
          padding: 18rpx;
          width: 40%;
          text-align: center;
          cursor: pointer;
          border-radius: 16rpx;
          background-color: #e8fff1;
          color: #32b865;
          font-size: 32rpx;

          &.active {
            background-color: #25c166;
            color: white;
            // background-color: #01b09a;
            // color: white;
            // border-bottom: #01b09a 6rpx solid;
            // color: #01b09a;
          }
        }
      }
    }

    .select-area {
      display: flex;
      background-color: white;
      .select{
        // border-bottom: 1rpx solid #eee;
      }
      // .item {
      //   width: 33.3%;
      // }

      // .location {}

      // .institution {}

      // .department {}
    }
  }
</style>