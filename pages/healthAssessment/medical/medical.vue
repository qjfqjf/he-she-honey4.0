<template>
  <view>
    <z-nav-bar title="医疗管理"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="content">
      <view class="item doctor-advice" @click="gotoDoctorAdvice">
        <text>医嘱管理</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item self-report" @click="gotoSymptomSelfReport">
        <text>症状自述</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item medical-assessment">
        <text>医疗管理</text>
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
      gotoDoctorAdvice(){
        uni.navigateTo({
          url:'/pages/healthAssessment/medical/doctorAdvice'
        })
      },
      gotoSymptomSelfReport(){
        uni.navigateTo({
          url:'/pages/healthAssessment/medical/symptomSelfReport'
        })
      }
    }
  }
</script>

<style lang="scss">
.content{
  background-color: #fff;
  border-top: 1rpx solid #ececec;
  // padding: 10rpx;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
      
    padding: 26rpx;
    border-bottom: 1rpx solid #ececec;
    font-size: 28rpx;
  }
  .doctor-advice{
    
  }
  .self-report{
    
  }
  .medical-assessment{
    
  }
}
</style>
