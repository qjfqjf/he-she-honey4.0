<template>
  <view>
    <z-nav-bar title="测评记录"></z-nav-bar>
    <public-module></public-module>
    <image class="img" src="/static/icon/healthEstimate/bigpsy.png"></image>
    <view class="title">
    	{{json.title}}
    </view>
	<view class="content">
		{{json.content}}
	</view>
	<view class="tag">专家建议：</view>
	<view class="content">
		{{json.advise}}
	</view>
	<view class="tag">生活管理：</view>
	<view class="content">
		{{json.manage}}
	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        json : {
			title : '中度风险',
			content : '您目前可能已存在动脉粥样硬化，为避免进一步加重甚至引起急性表现与出现并发症，建议就医治疗注:本测试及结果仅供参考，不能作为诊断及诊疗的依据。',
			advise : '1.前往正规医院的心内科或血管外科就医接受检查如血管超声、心脏超声、肾下肢血管超声、生化检验指标等，配合医生结合自身病情选择合适的治疗方式。2.如患有糖尿病或高血压等慢性疾病，日常监测血压、血糖等变化，适时反馈给医生调整治疗方案。3.日常检测病情，注意四大生命体征，以及血压，适时反馈给医生调整治疗方案。4.及时随诊，定期复查。',
			manage : '1.进食清淡、易消化饮食，少摄入含胆固醇多的食物，如控制肉类及动物内脏的摄入。 2.生活规律，保持乐观、愉悦的情绪，避免过度劳累的情绪激动 3.参加一定的体力劳动和体育活动，预防肥胖、锻炼 循环系统功能。 4.提倡戒烟限酒 5.积极控制与本病相关的危险因素，如高血压、糖尿病、血脂异常、肥胖等。 6.家人或陪护督促治疗的进行，提高依从性',
		}
      };
    }
  }
</script>

<style lang="scss">
	.img{
		height: 400rpx;
		width: 100%;
	}
	.title{
		font-size: 40rpx;
		font-weight:bolder;
		margin-top: 30rpx;
		text-align: center;
	}
	.content{
		margin-top: 10rpx;
		padding: 10rpx;
	}
	
	.tag{
		font-size: 40rpx;
		font-weight:bolder;
		margin-top: 30rpx;
	}
</style>
