<template>
  <view class="content ">
    <z-nav-bar title="健康服务"></z-nav-bar>
    <public-module></public-module>
    
    <view class="u-demo-block">
    	<u-swiper
    		:list="wisperImage"
    		indicator
    		indicatorMode="line"
    		circular
    		height="150"
    	></u-swiper>
    </view>
    <!-- 设备板块 -->
    <view class="devices-warp mt-2 p-2">
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
        wisperImage: [
          '/static/icon/healthServices/healthServiceSwiper.png'
        ],
        baseList: [{
            img: require('@/static/icon/healthServices/institutionalIntroduction.png'),
            title: '机构介绍',
            url: '/pages/healthServices/institutionalIntroduction/institutionalIntroduction'
          },
          {
            img: require('@/static/icon/healthServices/serviceItems.png'),
            title: '服务项目',
            url: '/pages/healthServices/serviceItems/serviceItems'
          },
          {
            img: require('@/static/icon/healthServices/expertIntroduction.png'),
            title: '专家介绍',
            url: '/pages/healthServices/expertIntroduction/expertIntroduction'
          },
          {
            img: require('@/static/icon/healthServices/productIntroduction.png'),
            title: '产品介绍',
            url: '/pages/healthServices/productIntroduction/productIntroduction'
          },
          {
            img: require('@/static/icon/healthServices/therapeuticEffects.png'),
            title: '疗效实例',
            url: '/pages/healthServices/therapeuticEffects/therapeuticEffects'
          },
          {
            img: require('@/static/icon/healthServices/imageAndTextVideo.png'),
            title: '图文视频',
            url: '/pages/healthServices/imageAndTextVideo/imageAndTextVideo'
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
    background-color: #fff;
    height: 100vh;
    .u-demo-block{
      
    }
   

    .devices-warp {
      .item {
        padding: 18rpx 10rpx;
        margin: 12rpx 34rpx;
        width: 160rpx !important;
        border-radius: 16rpx;
        background-color: #fff !important;
        box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);

        &:nth-child(3n) {
          margin-right: 0;
        }
        .grid-text {
          font-size: 29rpx;
        }
      }
    }
  }
</style>
