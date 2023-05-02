<template>
  <view>
    <z-nav-bar title="测评记录"></z-nav-bar>
    <public-module></public-module>
    <!-- 内容 -->
    <view class="container">
      <view class="image">
        <image :src="report.img" mode="aspectFill"></image>
        <view class="text">
          <text class="title">{{report.title}}</text>
        </view>
      </view>
      <view class="content">
        <view class="result">
          {{report.result}}
        </view>
        <view class="content-detail">
          {{report.content}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        report: {
          img: require('@/static/demo/1.jpg'),
          title: '动脉粥样硬化风险自测',
          result: '中度风险',
          content: `
          【专家建议】
          医疗干预:
          1.前往正规医院的心内科或血管外科就医接受检查如血管超声、心脏超声、肾下肢血管超声、生化检验指标等，配合医生结合自身病情选择合适的治疗方式。2.如患有糖尿病或高血压等慢性疾病,日常监测血压、血糖等变化,适时反馈给医生调整治疗方案。
          3.日常检测病情,注意四大生命体征，以及血压，适时反馈给医生调整治疗方案。
          4.及时随诊，定期复查。
          生活管理:
          1.进食清淡、易消化饮食,少摄入含胆固醇多的食物，如控制肉类及动物内脏的摄入。
          2.生活规律,保持乐观、愉悦的情绪,避免过度劳累的情绪激动。
          3.参加一定的体力劳动和体育活动,预防肥胖、锻炼循环系统功能。
          4.提倡戒烟限酒。
          5.积极控制与本病相关的危险因素，如高血压、糖尿病、血脂异常、肥胖等。
          6.家人或陪护督促治疗的进行，提高依从性。
          `
        }
      };
    }
  }
</script>

<style lang="scss">
  .container {
    background-color: #fff;
    height: 93vh;

    .image {
      width: 100%;
      position: relative;

      image {
        width: 100%;
        height: 300rpx;
      }

      .text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;

        .title {
          position: absolute;
          font-weight: 600;
          color: #fff;
        }
      }
    }

    .content {
      padding: 28rpx;

      .result {
        text-align: center;
        font-weight: 600;
      }

      .content-detail {
        font-size: 26rpx;
        line-height: 42rpx;
      }
    }
  }
</style>