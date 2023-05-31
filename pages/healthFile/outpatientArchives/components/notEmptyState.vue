<template>
    <view class="in-content">
        <!-- 导航栏上下分割 -->
        <view style="height: 20rpx;background-color: #f5f5f5">
        </view>
        <view class="in-content" v-for="item in dataList" >


            <!-- 1、日期 -->
            <view class="remarks">
                <view class="cate">
                    <text class="cate-text">日期</text>
                </view>
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
                    <text style="font-size: 30rpx">{{item.selectedDate}}</text>
                </view>
            </view>



            <!-- 2、门诊类别 -->
            <view class="remarks">
                <text class="cate-text" style="">{{showObj.typeText}}</text>
                <view style="height: 20rpx"></view>
                <view style="width: 200rpx;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
                    <text>{{item.type}}</text>
                </view>
            </view>


            <!-- 3、疾病诊断 -->
            <view class="remarks">
                <text class="cate-text" style="">{{showObj.remarksText}}</text>
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
                    <text>{{item.illName}}</text>
                </view>
            </view>
            <!-- 4、情况描述 -->
            <view class="remarks">
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 200rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
                    <text>{{item.illDiscription}}</text>
                </view>
            </view>

            <!-- 5、图片展示 -->

            <view style="height: 20rpx"></view>

            <view class="remarks">
                <text class="cate-text" style="margin-left: 20rpx">{{showObj.ImgText}}</text>
                <view style="height: 20rpx"></view>
                <view class="showImage" style="display:flex; align-items: center; flex-wrap: wrap-reverse;">
                    <view class="example-body" v-for="img in item.imgs" style="width: 150rpx;height: 150rpx;margin-left: 50rpx;margin-bottom: 50rpx;" >
                        <view style="">
                            <image style="width: 150rpx;height: 150rpx; " :src="img"></image>
                        </view>
                    </view>
                </view>
            </view>

<!--                <view>-->
<!--                    <uni-file-picker limit="9" :autoUpload="false" mode="grid"-->
<!--                                     file-mediatype="image" :image-styles="showObj.imageStyles"-->
<!--                                     v-model="dataList.imgs" -->
<!--                                     del-icon="false"-->
<!--                    ></uni-file-picker>-->
<!--                </view>-->

            <!-- 6、分割线 -->
            <u-divider style="margin-top: 50rpx" text="分割线" text-size="10" textColor="#1fc7a3"></u-divider>

        </view>
    </view>
</template>

<script>





export default {
    name: "notEmptyState",
    components: {},

    props:["dataList","showObj"],
    data(){
        return{
            imageStyles:{
                width:90,
                height:90
            },
        }
    },
    methods:{

    },
}
</script>

<style lang="scss">
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
  }

  .showImage {
    padding: 20rpx;

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