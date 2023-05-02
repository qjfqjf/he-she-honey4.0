<template>
  <view>
    <z-nav-bar title="评估记录"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="content">
      <view class="item emotion" @click="gotoEmotionRecord">
        <text>情绪认知</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item constitution" @click="gotoConstitutionRecord">
        <text>中医体质</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item psychology" @click="gotoPsychologyRecord">
        <text>心理测评</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
      <view class="item health" @click="gotoHealthRecord">
        <text>健康测评</text>
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
      gotoEmotionRecord(){
        uni.navigateTo({
          url:'/pages/healthEstimate/record/emotionRecord/emotionRecord'
        })
      },
      gotoConstitutionRecord(){
        uni.navigateTo({
          url:'/pages/healthEstimate/record/constitutionRecord/constitutionRecord'
        })
      },
      gotoPsychologyRecord(){
        uni.navigateTo({
          url:'/pages/healthEstimate/record/psychologyRecord/psychologyRecord'
        })
      },
      gotoHealthRecord(){
        uni.navigateTo({
          url:'/pages/healthEstimate/record/healthRecord/healthRecord'
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
  .emotion{
    
  }
  .constitution{
    
  }
  .psychology{
    
  }
  .health{
    
  }
}
</style>
