<template>
  <view>
    <z-nav-bar title="寻医问药"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 页面内容 -->
    <view class="container">
      <!-- 轮播图 -->
      <view class="swiper">
        <u-swiper
        	:list="wisperImage"
        	indicator
        	indicatorMode="line"
        	circular
        	height="150"
        ></u-swiper>
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
        <u-picker :show="show" ref="uPicker" :loading="loading" :columns="columns" @change="changeHandler"></u-picker>
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
      };
    }
  }
</script>

<style lang="scss">
.container{
  .swiper{
    
  }
  .doctor{
    .tab-container {
      // background-color: white;
      margin-top: 10rpx;
      .tab {
        padding: 18rpx;
        width: 40%;
        text-align: center;
        cursor: pointer;
        border-radius: 16rpx;
        background-color: #fff;
        font-size: 32rpx;
        &.active {
          background-color: #01b09a;
          color: white;
          // border-bottom: #01b09a 6rpx solid;
          // color: #01b09a;
        }
      }
    }
  }
  .select-area{
    
  }
}
</style>
