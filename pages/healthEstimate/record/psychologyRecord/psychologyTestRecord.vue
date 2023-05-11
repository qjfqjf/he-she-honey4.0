<template>
  <view>
    <z-nav-bar title="心理测评"></z-nav-bar>
    <public-module></public-module>
    <!-- 内容 -->
    <view class="container">
      <view class="image">
        <image :src="report.img" mode="aspectFill"></image>
        <view class="text">
          <text class="title">{{report.title}}</text>
        </view>
      </view>
      <view class="content">
        <view class="result">
          {{report.result}}
        </view>
        <view class="content-detail">
          {{report.content}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        report: {
          img: require('@/static/demo/1.jpg'),
          title: '测试你们之间有纯友谊吗?',
          result: '你们之间互有好感，不可能有纯友谊',
          content: '你和好朋友变成恋人的几率很大，你们会先经由互相了解，才慢慢开始产生爱情的感觉。只要你们之间有足够单独发展的机会，你就会和麻吉朋友从青涩的关系，逐渐地情不自禁产生好感，慢慢发展成彼此间无话不谈的知己，一旦捅破了友谊那层纸，你们就会转变成爱情。'
        }
      };
    }
  }
</script>

<style lang="scss">
  .container {
    background-color: #fff;
    height: 93vh;
    .image {
      width: 100%;
      position: relative;

      image {
        width: 100%;
        height: 300rpx;
      }

      .text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        .title {
          position: absolute;
          font-weight: 600;
          color: #fff;
        }
      }
    }
    .content {
      padding: 28rpx;
      .result {
        text-align: center;
        font-weight: 600;
      }

      .content-detail {
        font-size: 26rpx;
        line-height: 42rpx;
      }
    }
  }
</style>