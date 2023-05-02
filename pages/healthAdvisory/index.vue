<template>
  <view class="content p-2" style="background-color: #ffffff; height: 100%;">
    <z-nav-bar title="健康咨询"></z-nav-bar>
    <public-module></public-module>
    <view class="title">
      <span>专家咨询</span>
    </view>
    <view class="devices-warp mt-2">
      <u-grid :border="false" col="4">
        <u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
          @click="click(baseListItem.url,baseListItem.title)">
          <image style="width: 60rpx;height: 60rpx;" :src="baseListItem.img" mode="aspectFit"></image>
          <text class="grid-text mt-2 font-md">{{baseListItem.title}}</text>
        </u-grid-item>
      </u-grid>
    </view>
    <u-gap height="20"></u-gap>
    <view class="title">
      <span>AI智能咨询</span>
    </view>
    <view class="devices-warp mt-2">
      <u-grid :border="false" col="4">
        <u-grid-item class="item" v-for="(item,index) in AIList" :key="index" @click="click(item.url,item.title)">
          <image style="width: 60rpx;height: 60rpx;" :src="item.img" mode="aspectFit"></image>
          <text class="grid-text mt-2 font-md">{{item.title}}</text>
        </u-grid-item>
      </u-grid>
    </view>


  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList: [{
            img: require('@/static/icon/healthAdvisory/seekingMedical.png'),
            title: '寻医问药',
            url: '/pages/healthAdvisory/seekingMedical/seekingMedical'
          },
          {
            img: require('@/static/icon/healthAdvisory/health.png'),
            title: '健康咨询',
            url: '/pages/healthAdvisory/health/health'
          },
          {
            img: require('@/static/icon/healthAdvisory/psychologicalCounseling.png'),
            title: '心理咨询',
            url: '/pages/healthAdvisory/psychologicalCounseling/psychologicalCounseling'
          },
          {
            img: require('@/static/icon/healthAdvisory/beauty.png'),
            title: '美容咨询',
            url: '/pages/healthAdvisory/beauty/beauty'
          },
          {
            img: require('@/static/icon/healthAdvisory/fitness.png'),
            title: '健身咨询',
            url: '/pages/healthAdvisory/fitness/fitness'
          },{
            img: require('@/static/icon/healthAdvisory/physicalExamination.png'),
            title: '体检咨询',
            url: '/pages/healthAdvisory/physicalExamination/physicalExamination'
          },{
            img: require('@/static/icon/healthAdvisory/diseaseControl.png'),
            title: '疾控咨询',
            url: '/pages/healthAdvisory/diseaseControl/diseaseControl'
          },
        ],
        AIList: [{
            img: require('@/static/icon/healthAdvisory/HumanMachineDialogue.png'),
            title: '人机对话',
            url: '/pages/healthAdvisory/HumanMachineDialogue/HumanMachineDialogue'
          },
        ],
      }
    },
    methods: {

      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });
      },
    }
  }
</script>

<style lang="scss">
  .content {
    .title {
      span {
        padding-left: 20rpx;
        border-left: 8rpx #28be9e solid;
        font-weight: bold;
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
      }
    }
  }
</style>