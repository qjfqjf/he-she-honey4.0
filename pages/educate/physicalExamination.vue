<template>
    <view class="content">
      <z-nav-bar title="体检服务"></z-nav-bar>
      <public-module></public-module>
  

  
    </view>
  </template>
  
  <script>
    export default {
      components: {
        
      },
      data() {
        return {
          baseList: []
        };
      },
      //方法
      methods: {
        addSportsRecord() {
          uni.navigateTo({
            url: '/pages/healthManagement/sports/addSportsRecord'
          })
        },
      },
    }
  </script>
  
  <style lang="scss">
  .content{
    background-color: #FFFFFF;
    height: 100%;
    .nothing{
      text-align: center;
      padding-top: 300rpx;
      width: 400rpx;
      margin: 0 auto;
    }
  }
  </style>