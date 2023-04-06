<template>
    <view>
        <z-nav-bar title="系统通知">

            <u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>


<!--            <u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>-->

        </z-nav-bar>

            <view class="notification d-flex flex-column shadow border  m-1 p-4 bg-white" v-for="index in 5">
                <view class="notification_title my-1">
                    <h3>工单通知</h3>
                </view>
                <view class="notification_text serveName d-flex">
                    <u--text class="notification_text-label" type="info"  text="名称">名称</u--text>
                    <view class="notification_text-content">申请服务</view>
                </view>
                <view class="notification_text description d-flex">
                    <u--text class="notification_text-label"  type="info" text="描述">描述</u--text>
                    <view class="notification_text-content">申请服务</view>
                </view>
                <view class="notification_text createTime d-flex">
                    <u--text class="notification_text-label"  type="info" text="时间">时间</u--text>
                    <view class="notification_text-content">2022-03-07 18:00:26</view>
                </view>
            </view>

    </view>
</template>
<script>
import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
// export {goBack} from "./common"
export default {
    methods: {
        goBack(){
            uni.navigateBack({})
        }
    }
}
</script>
<style lang="scss" scoped>
  .notificationBox{

      &_title{
          font-size: 24rpx;
      }
      &_text{
          font-size: 12rpx;
          &-label{
              color: grey;
              font-size: 12rpx;
          }
          &-content{
              font-size: 12rpx;
          }
      }
  }


</style>
