<template>
  <view class="content p-2">
    <z-nav-bar title="健康管理"></z-nav-bar>
    <public-module></public-module>
    <view class="title">
      <text>健康管理</text>
    </view>
    <!-- 设备板块 -->
    <view class="devices-warp mt-2">
      <u-grid :border="false" col="4">
        <u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
          @click="click(baseListItem.url,baseListItem.title)">
          <image style="width: 60rpx;height: 60rpx;" :src="baseListItem.img" mode="aspectFit"></image>
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
            img: require('@/static/icon/healthManagement/diet.png'),
            title: '饮食管理',
            url: '/pages/healthManagement/diet/diet'
          },
          {
            img: require('@/static/icon/healthManagement/sports.png'),
            title: '运动管理',
            url: '/pages/healthManagement/sports/sports'
          },
          {
            img: require('@/static/icon/healthManagement/sleep.png'),
            title: '睡眠管理',
            url: '/pages/healthManagement/sleep/sleepRecord'
          },
          {
            img: require('@/static/icon/healthManagement/medical.png'),
            title: '医疗管理',
            url: '/pages/healthManagement/medical/medical'
          },
          {
            img: require('@/static/icon/healthManagement/conditioning.png'),
            title: '调理管理',
            url: '/pages/healthManagement/conditioning/conditioning'
          },
          {
            img: require('@/static/icon/healthManagement/psychology.png'),
            title: '心理调适',
            url: '/pages/healthManagement/psychology/psychology'
          },
          {
            img: require('@/static/icon/healthManagement/health.png'),
            title: '健康自述',
            url: '/pages/healthManagement/health/health'
          },
          {
            img: require('@/static/icon/healthManagement/beauty.png'),
            title: '美容管理',
            url: '/pages/healthManagement/beauty/beauty'
          },
          {
            img: require('@/static/icon/healthManagement/bodyBuilding.png'),
            title: '健身管理',
            url: '/pages/healthManagement/bodyBuilding/bodyBuilding'
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
          font-size: 30rpx;
        }
      }
    }
  }
</style>
