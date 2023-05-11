<template>
  <view class="content p-2">
    <z-nav-bar title="健康评估"></z-nav-bar>
    <public-module></public-module>
    <view class="title">
      <text>健康评估</text>
    </view>
    <!-- 设备板块 -->
    <view class="devices-warp mt-2">
      <u-grid :border="false" col="4">
        <u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
          @click="click(baseListItem.url,baseListItem.title)">
          <image style="width: 80rpx;height: 80rpx;" :src="baseListItem.img" mode="aspectFit"></image>
          <text class="grid-text mt-2">{{baseListItem.title}}</text>
        </u-grid-item>
      </u-grid>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList: [{
            img: require('@/static/icon/healthEstimate/emotion.png'),
            title: '情绪认知',
            url: '/pages/healthEstimate/emotion/emotion'
          },
          {
            img: require('@/static/icon/healthEstimate/constitution.png'),
            title: '中医体质',
            url: '/pages/healthEstimate/constitution/constitution'
          },
          {
            img: require('@/static/icon/healthEstimate/psychology.png'),
            title: '心理测评',
            url: '/pages/healthEstimate/psychology/psychology'
          },
          {
            img: require('@/static/icon/healthEstimate/health.png'),
            title: '健康测评',
            url: '/pages/healthEstimate/health/health'
          },
          {
            img: require('@/static/icon/healthEstimate/infrared.png'),
            title: '红外测评',
            url: '/pages/healthEstimate/conditioning/conditioning'
          },
          {
            img: require('@/static/icon/healthEstimate/brain.png'),
            title: '脑波测评',
            url: '/pages/healthEstimate/conditioning/psychology'
          },
          {
            img: require('@/static/icon/healthEstimate/aiHealth.png'),
            title: 'AI智能评估',
            url: '/pages/healthEstimate/conditioning/health'
          },
          {
            img: require('@/static/icon/healthEstimate/record.png'),
            title: '评估记录',
            url: '/pages/healthEstimate/record/record'
          },
        ]
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

      }

    },
    onLoad(e) {

    },
    //页面显示
    onShow() {},
  };
</script>

<style lang="scss">
  .content {
    .title {
      text {
        border-left: 8rpx #28be9e solid;
        padding-left: 20rpx;
      }
    }

    .devices-warp {
      .item {
        padding: 20rpx;
        margin: 10rpx;
        width: 160rpx !important;
        border-radius: 16rpx;
        background-color: #fff !important;
        box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);

        &:nth-child(4n) {
          margin-right: 0;
        }

        .grid-text {
          font-size: 25rpx;
        }
      }
    }
  }
</style>
