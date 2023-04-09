<template>
  <view class="content p-2">
    <z-nav-bar title="饮食管理"></z-nav-bar>
    <public-module></public-module>
   
    <!-- 健康板块 -->
    <view class="devices-warp mt-2">
      <u-grid :border="false" col="4">
        <u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
          @click="click(baseListItem.url, baseListItem.title)">
          <image style="width: 130rpx;height: 130rpx;" :src="baseListItem.img" mode="aspectFit"></image>
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
            img: require('@/static/icon/healthAssessment/nutritionScale.png'),
            title: '营养秤',
            url: '/pages/healthAssessment/diet/nutritionScale'
          },
          {
            img: require('@/static/icon/healthAssessment/dietRecords.png'),
            title: '饮食记录',
            url: '/pages/healthAssessment/diet/dietRecords'
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

      ;}

    },
    onLoad(e) {

    },
    //页面显示
    onShow() {},
  };
</script>

<style lang="scss">
  .content {
  height: 100vh;
  background-color: white;
    .title {
      span {
        border-left: 8rpx #28be9e solid;
        padding-left: 20rpx;
      }
    }

    .devices-warp {
      display: flex;
      justify-content: space-around;

      .item {
        padding: 30rpx;
        margin: 0 30rpx;
        width: 240rpx !important;
        border-radius: 16rpx;
        background-color: #fff !important;
        box-shadow: 0px 3px 9px hsla(0, 0, 0, 0.1);

        &:nth-child(4n) {
          margin-right: 0;
        }

        .grid-text {
          // font-size: 30rpx;
        }
      }
    }
  }
</style>
