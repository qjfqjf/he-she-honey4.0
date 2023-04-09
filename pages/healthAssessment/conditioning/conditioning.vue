<template>
  <view>
    <z-nav-bar title="调理管理"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="content">
      <view class="item conditioning" @click="gotoConditioningManagemen">
        <text>调理管理</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item diet" @click="gotoDietManagemen">
        <text>饮食管理</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item sport" @click="gotoSportManagemen">
        <text>运动管理</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item sleep" @click="gotoSleepManagemen">
        <text>睡眠管理</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      gotoConditioningManagemen(){
        uni.navigateTo({
          url:'/pages/healthAssessment/conditioning/conditioningManagemen'
        })
      },
      gotoDietManagemen(){
        uni.navigateTo({
          url:'/pages/healthAssessment/conditioning/dietManagemen'
        })
      },
      gotoSportManagemen(){
        uni.navigateTo({
          url:'/pages/healthAssessment/conditioning/sportManagemen'
        })
      },
      gotoSleepManagemen(){
        uni.navigateTo({
          url:'/pages/healthAssessment/conditioning/sleepManagemen'
        })
      },
    }
  }
</script>

<style lang="scss">
.content{
  background-color: #fff;
  border-top: 1rpx solid #ececec;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
      
    padding: 26rpx;
    border-bottom: 1rpx solid #ececec;
    font-size: 28rpx;
  }
  .conditioning{
    
  }
  .diet{
    
  }
  .sport{
    
  }
  .sleep{
    
  }
}
</style>
