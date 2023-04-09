<template>
  <view class="content">
    <z-nav-bar title="睡眠记录">
      <view slot="right" class="p-2" @click="addSleepRecord">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthAssessment/addRecords.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>

    <!--饮食记录  -->
    <view class="nothing" v-if="dataList.length === 0">
      <empty-state :description="'暂无数据'"  />
    </view>
    <view class="sports-records" v-else>
      
    </view>

  </view>
</template>

<script>
  import EmptyState from '../components/emptyState.vue'
  export default {
    components: {
      EmptyState
    },
    data() {
      return {
        dataList: [],
        baseList: []
      };
    },
    //方法
    methods: {
      addSleepRecord() {
        uni.navigateTo({
          url: '/pages/healthAssessment/sleep/addSleepRecord'
        })
      },
    },
  }
</script>

<style lang="scss">
  .content {
    .sports-records {
      .sports-item {
        background-color: white;
        border-top: 1rpx solid #ececec;
        padding: 30rpx;

        font-size: 26rpx;

        .title {
          color: #2bd1ae;
          font-weight: 700;
          margin-bottom: 12rpx;
        }

        .content {
          font-weight: 600;
          color: #313131;
        }

        image {
          width: 220rpx;
          height: 220rpx;
          margin-top: 22rpx;
        }

        .time {
          line-height: 60rpx;
        }
      }
    }
  }
</style>