<template>
  <view class="contaner">
    <z-nav-bar title="营养分析报告"></z-nav-bar>
    <public-module></public-module>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    //方法
    methods: {
      
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });
    
      ;}
    
    },
  }
</script>

<style lang="scss">
.contaner{
  .analysis-report{
    font-size: 28rpx;
  }
  
  .content{
    .tab-container{
      .tab-header{
        display: flex;
        .tab-item{
          display: flex;
        }
      }
      .tab-content{
        
      }
    }
  }