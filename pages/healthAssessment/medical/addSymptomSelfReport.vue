<template>
  <view>
    <z-nav-bar title="症状自述"></z-nav-bar>
    <public-module></public-module>

    <view class="container">
      <view class="self-report">
        <textarea class="textarea" v-model="remarksValue" placeholder="症状自述" />
      </view>
      <button plain="true" @click="saveReport">保存</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        remarksValue:''
      };
    },
    //方法
    methods: {
      saveReport(selfReportId) {
        console.log('save self report')
        uni.navigateTo({
          url:'/pages/healthAssessment/medical/symptomSelfReport?selfReportId=' + JSON.stringify(selfReportId)
        })
      },
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });

        ;
      }

    },
  }
</script>

<style lang="scss">
  .container {
    .self-report {
      background-color: white;
      border-top: 1rpx solid #ececec;
      padding: 36rpx;
      background-color: white;

      .textarea {
        font-weight: 600;
        height: 200rpx;
        font-size: 28rpx;
      }

    }

    button {
      color: white;
      background-color: #20c6a2;
      border-radius: 50rpx;
      margin: 30rpx;
      border: none;
    }
    
  }
</style>