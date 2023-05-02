<template>
  <view>
    <z-nav-bar title="评估记录"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="content">
      <view class="item doctor-advice" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex" @click="click(baseListItem.url, baseListItem.title)">
        <text>{{baseListItem.title}}</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList: [{
            title: '情绪认知',
            url: '/pages/healthAssessment/assessmentRecord/emotionalCognition/emotionalCognition'
          },
          {
            title: '中医体质',
            url: '/pages/healthAssessment/assessmentRecord/chineseMedicineConstitution/chineseMedicineConstitution'
          },{
            title: '心理测评',
            url: '/pages/healthAssessment/assessmentRecord/psychologicalAssessment/psychologicalAssessment'
            
          },{
            title: '健康测评',
            url: '/pages/healthAssessment/assessmentRecord/healthAssessment/healthAssessment'
          },
        
        ]
      };
    },
    methods: {
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });
      
      ;}
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
