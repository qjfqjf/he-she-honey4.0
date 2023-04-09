<template>
  <view class="content">
    <z-nav-bar title="睡眠记录"></z-nav-bar>
    <public-module></public-module>
    <!-- 1、用餐分类 -->
    <view class="cate">
      <text class="cate-text">睡眠类别</text>
      <view class="select-list">
        <uni-data-select v-model="value" :localdata="range" :clear="false" @change="change"
          style="border: none;"></uni-data-select>
      </view>
    </view>

    <!-- 2、上传照片 -->
    <view class="uploadImage">
      <view class="example-body">
        <uni-file-picker limit="9" :image-styles="imageStyles"></uni-file-picker>
      </view>
      <text class="tip">（友情提示：最多添加9张图片）</text>
    </view>

    <!-- 3、备注和时间 -->
    <view class="remarks">
      <textarea class="textarea" v-model="remarksValue" placeholder="添加备注（睡着时间/总长/入睡方式/难度.中途醒来及时间.起床时间/状态）
" />

    </view>
    <!-- 4、日期 -->
    <view class="date-body">
      <text class="date">日期</text>
      <view class="picker">
        <uni-datetime-picker class="time-picker" :show-icon="true" :border="false" v-model="selectedDate"
          :clearIcon="false" />
        <uni-icons type="forward" size="15"></uni-icons>
      </view>
    </view>
    <!-- 保存按钮 -->
    <button class="saveBtn" @click="saveRecords()">保存</button>

  </view>
</template>

<script>
  import DatePopup from '../../../components/date-popup/date-popup.vue'
  export default {
    components: {
      DatePopup
    },
    data() {
      return {
        // 备注
        remarksValue: '',
        // 选择日期
        selectedDate: new Date(),
        imageStyles: {
          width: 90,
          height: 90,
          border: {
            color: "#bbb",
            width: 4,
            style: 'dashed',
            radius: '4px'
          }
        },
        value: 0,
        range: [{
            value: 0,
            text: "夜觉"
          },
          {
            value: 1,
            text: "午觉"
          },
        ],
      };
    },
    //方法
    methods: {
      change(e) {
        console.log("e:", e);
      },
      saveRecords(recordId){
        console.log('点击保存', recordId)
        uni.navigateTo({
          url:'/pages/healthAssessment/sleep/sleepRecord?recordId='+JSON.stringify(recordId)
        })
      }
    },
  }
</script>

<style lang="scss">
  .content {

    .cate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      padding: 20rpx;

      .cate-text {
        font-weight: 600;
      }

      .select-list {}
    }

    .uploadImage {
      margin-top: 14rpx;
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
      background-color: white;

      .textarea {
        height: 200rpx;
        font-size: 28rpx;
      }
    }

    .date-body {
      font-size: 30rpx;
      display: flex;
      align-items: center;

      background-color: white;
      padding: 24rpx;

      font-size: 28rpx;

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

    .saveBtn {
      background-color: #20c6a2;
      margin: 30rpx;
      padding: 12rpx;
      color: white;
      font-size: 26rpx;
    }
  }
</style>