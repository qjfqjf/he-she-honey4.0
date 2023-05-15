<template>
  <view class="container">
    <z-nav-bar title="心电图历史"></z-nav-bar>
    <public-module></public-module>


    <!-- 正文内容 -->
    <view class="content-body">
     <view class="item" v-for="(item, index) in historyList" :key="index">
       <image :src="item.img" mode="aspectFill"></image>
       <view class="personal-info">
         <view class="info-item">
           <text>姓名：{{item.info.name}}</text>
           <text>性别：{{item.info.sex}}</text>
         </view>
         <view class="info-item">
           <text>出生日期：{{item.info.birth}}</text>
         </view>
         <view class="info-item">
           <text>身高(cm)：{{item.info.height}}</text>
           <text>体重(kg)：{{item.info.weight}}</text>
         </view>
         <view class="info-item">
           <text>时间：{{item.info.time}}</text>
           <text>心率：{{item.info.heartRate}}</text>
         </view>
         <view class="info-item">
           <text>分析结果：{{item.info.result}}</text>
         </view>
       </view>
     </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        historyList: [{
          img: require('@/static/img/ergometer/ergometer.jpg'),
          info: {
            name: '鹏辉',
            sex: '男',
            birth: '1967-08-09',
            height: '1.78',
            weight: '78.0',
            time: '2022-09-09 20:50:10',
            heartRate: '92',
            result: '波形未见异常'
          }
        }],
      };
    },

    methods: {
      handleDevelop() {
        uni.navigateTo({
          url: '/pages/healthMonitor/bloodSugar/warningRules'
        })
      }
    }
  }
</script>

<style lang="scss">
  .container {
    font-size: 30rpx;

    .regular {
      font-size: 26rpx;
    }

    .content-body {
      .item {
        image{
          width: 100%;
        }
        .personal-info{
          background-color: white;
          border-bottom: 1rpx solid #ddd;
          padding: 40rpx;
          .info-item{
            text{
              margin-right: 30rpx;
              line-height: 50rpx;
            }
          }
        }
        
      }
    }
  }
</style>