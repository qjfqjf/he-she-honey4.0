<template>
    <view class="in-content">
        <!-- 导航栏上下分割 -->
        <view style="height: 20rpx;background-color: #f5f5f5">
        </view>
        <view class="in-content">
            <!-- 1、分类 -->
            <view class="cate">
                <text class="cate-text">{{addObj.choiceTitle}}</text>
            </view>
            <view class="switch">
                <u-subsection :list="addObj.list" :current="addObj.curNow" font-size="15" @change="sectionChange" mode="subsection" inactive-color="#20c6a2" active-color="#20c6a2"></u-subsection>
            </view>

            <view style="height: 40rpx"></view>

            <!-- 2、上传照片 -->
            <view class="uploadImage">
                <text class="cate-text">{{addObj.uploadImgText}}</text>
                <view style="height: 20rpx"></view>
                <view class="example-body">
                    <uni-file-picker limit="9" :image-styles="addObj.imageStyles"></uni-file-picker>
                </view>
                <text class="tip">（友情提示：最多添加9张图片）</text>
            </view>

            <!-- 3、备注和时间 -->
            <view class="remarks">
                <text class="cate-text" style="">{{addObj.remarksText}}</text>
                <view style="height: 20rpx"></view>
                <u-input style="background-color: #f5f5f5" :placeholder="addObj.placeholder1" border="false"></u-input>
                <u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 50rpx 0" border="false"></u-textarea>

            </view>

            <!-- 4、日期 -->
            <view class="date-body">
                <text class="cate-text">日期</text>
                <view style="height: 20rpx"></view>
                <view class="picker">
                    <uni-datetime-picker class="time-picker" :show-icon="true" :border="false" v-model="addObj.selectedDate"
                                         :clearIcon="false"/>
                    <uni-icons type="forward" size="15"></uni-icons>
                </view>
            </view>

            <view class="save-box">
                <!-- 保存按钮 -->
                <button class="saveBtn" @click="saveRecords()">保存</button>
            </view>
        </view>
    </view>
</template>

<script>


export default {
    name: "addTemplate",
    props:["addObj"],
    data(){
        return{

        }
    },
    methods:{
        sectionChange(index) {
            this.addObj.curNow = index;
        },
        change(e) {
            console.log("e:", e);
        },
        saveRecords(recordId){
            console.log('点击保存', recordId);
            uni.navigateTo({
                //保存跳转路由（待开发
                url:''
            })
        }
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
    padding: 30rpx;
    height: 450rpx;
    .textarea {
      height: 200rpx;
      font-size: 28rpx;
    }
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