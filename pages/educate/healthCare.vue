<template>
    <view class="content">
      <z-nav-bar title="保健服务"></z-nav-bar>
      <public-module></public-module>
    <view v-for="info in baseList">
        <button type="default" @click="addSportsRecord(info)">{{ info }}</button>
    </view>
    
  
    </view>
  </template>
  
  <script>
    export default {
      components: {
        
      },
      data() {
        return {
          baseList: [
            "中医保健服务",
            "健康管理服务",
            "养生保健服务",
            "理疗康复服务",
            "足疗spa服务",
            "亚健康调理服务"
          ]
        };
      },
      //方法
      methods: {
        addSportsRecord(info) {
          console.log(info);
        },
      },
    }
  </script>
  
  <style lang="scss">
  .content{
    background-color: #ffffff;
    height: 100%;
    .nothing{
      text-align: center;
      padding-top: 300rpx;
      width: 400rpx;
      margin: 0 auto;
    }
  }
  </style>