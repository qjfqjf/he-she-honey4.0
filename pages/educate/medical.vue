
<template>
    <view class="content">
      <z-nav-bar title="医疗服务"></z-nav-bar>
      <public-module></public-module>
      <view class="body">
        <view class="view">
          <image src="/static/img/service/Internet hospitals.png" alt="" @tap="addSportsRecord(1)" style="width: 100px; height: 100px;">
          </image>
            <text>互联网医院</text>
        </view>
        <view class="view">
          <image src="/static/img/service/Traditional Chinese Medicine Services.png" alt="" @tap="addSportsRecord(2)" style="width: 100px; height: 100px;">
          </image>
            <text>中医服务</text>
        </view>
        <view class="view">
          <image src="/static/img/service/public health.png" alt="" @tap="addSportsRecord(3)" style="width: 100px; height: 100px;">
          </image>
            <text>基本公共卫生</text>
        </view>
      </view>
      
      

  
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
        addSportsRecord(e) {
          console.log(e);
        },
      },
    }
  </script>
  
  <style lang="scss">
  .content{
    background-color: #FFFFFF;
    height: 100%;
  }
  .body {
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
  }
  .view {
    width: calc((100% - 10px) / 2);
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 820px) {
    .view {
      margin-right: 0;
    }

    .view:nth-child(2n) {
      margin-right: 0;
    }
  }
    </style>