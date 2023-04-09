<template>
  <view>
    <view class="header d-flex j-sb">
      <view class="left">
        当前会员：<span>{{user}}</span>
      </view>
      <view class="member pr-2" @click="switchMembers">
        切换会员
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        user: '彭老师'
      };
    },
    methods: {
      switchMembers() {
        this.$refs.uToast.show({
          message: '开发中...'
        })
      },
    }
  }
</script>

<style lang="scss">
  .header {
    position: relative;

    .left {
      span {
        color: #424242;
      }
    }

    .member {
      color: #20c49f;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        // right: 12rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 20rpx;
        height: 20rpx;
        background: url('@/static/icon/bloodPressure/arrow-right.png') no-repeat center/cover;

      }
    }
  }
</style>