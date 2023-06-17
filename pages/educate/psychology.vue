<template>
    <view class="content">
      <z-nav-bar title="心理健康服务"></z-nav-bar>
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
            "心理咨询服务","中医情志服务","睡眠管理服务","脑波检测服务","康复设备服务","智能ai服务"
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