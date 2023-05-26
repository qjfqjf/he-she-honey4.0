<template>
    <view class="in-content">
        <!-- 导航栏上下分割 -->
        <view style="height: 20rpx;background-color: #f5f5f5">
        </view>
        <view class="in-content" v-for="item in dataList" :key>
            <!-- 1、日期 -->
            <view class="cate">
                <text class="cate-text">日期</text>
            </view>
            <view style="height: 20rpx"></view>
            <view class="date-box">
                <text style="margin-left:20rpx">{{item.selectedDate}}</text>
            </view>

            <view style="height: 40rpx"></view>

            <!-- 2、疾病诊断 -->
            <view class="remarks">
                <text class="cate-text" style="">{{showObj.remarksText}}</text>
                <view style="height: 20rpx"></view>
                <u-input style="background-color:#f5f5f5" :placeholder="item.illName" border="false" readonly="true"></u-input>
            </view>

            <!-- 3、门诊类别 -->
            <view class="" style="margin:0 20rpx">
                <text class="cate-text" style="">{{showObj.typeText}}</text>
                <view style="height: 20rpx"></view>
                <u-input style="width: 200rpx;background-color:#f5f5f5" :placeholder="item.type" border="false" readonly="true"></u-input>
            </view>

            <!-- 4、情况描述 -->
            <view class="" style="margin:0 20rpx">
                <view style="height: 20rpx"></view>
                <u-textarea :placeholder="item.illDiscription" style="margin: 20rpx 0;background-color:#f5f5f5 ;" border="false" disabled="true"></u-textarea>
            </view>


            <!-- 5、图片展示 -->
            <view class="uploadImage">
                <text class="cate-text">{{showObj.ImgText}}</text>
                <view style="height: 20rpx"></view>
                <view class="example-body" v-for="img in item.imgs"  flex-direction="row">
                    <image style="width: 200rpx;height: 200rpx" :src="img"></image>
                </view>
            </view>


            <!-- 6、分割线 -->
            <u-divider style="margin-top: 250rpx" text="分割线" text-size="10" textColor="#1fc7a3"></u-divider>

        </view>
    </view>
</template>

<script>


import UImage from "../../../../uni_modules/uview-ui/components/u--image/u--image.vue";
import UDivider from "../../../../uni_modules/uview-ui/components/u-divider/u-divider.vue";

export default {
    name: "notEmptyState",
    components: {UDivider, UImage},
    props:["dataList","showObj"],
    data(){
        return{
            imageStyles:{
                width:90,
                height:90
            }
        }
    },
    methods:{
        sectionChange(index) {
            this.showObj.curNow = index;
        },
        change(e) {
            console.log("e:", e);
        },
        test(src){
            console.log(src);
        }
    },
}
</script>

<style lang="scss">
input[readonly]{
    background-color: #1a1a1a;
}
.in-content {
  background-color: white;
  height: 100%;

  .in-content{
    padding: 0 10rpx;
  }
  .switch{
    width: 400rpx;
    margin-left: 20rpx;
  }
  .cate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 20rpx;
    .select-list {}
  }

  .uploadImage {
    padding: 20rpx;
    background-color: white;

    .tip {
      color: #e0584b;
      font-size: 24rpx
    }
  }

  .remarks {
    margin-top: 14rpx;
    padding: 20rpx;
  }
    .textarea {
        height: 200rpx;
        font-size: 28rpx;
    }
  .date-body {

    //display: flex;
    align-items: center;

    background-color: white;
    padding: 24rpx;



    .date {
      margin-right: 25rpx;
    }

    .picker {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;


      .time-picker {
        margin-right: 220rpx;
      }
    }
  }

  .save-box{
    margin-top: 100rpx;
    .saveBtn {
      background-color: #20c6a2;
      margin: 30rpx;
      padding: 12rpx;
      color: white;
      font-size: 35rpx;
    }
  }
}
</style>