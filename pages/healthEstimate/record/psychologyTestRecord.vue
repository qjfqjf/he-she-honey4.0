<template>
  <view>
    <z-nav-bar title="心理测评"></z-nav-bar>
    <public-module></public-module>
    <image class="img" src="/static/icon/healthEstimate/bigpsy.png"></image>
    <view class="title">
    	{{json.title}}
    </view>
	<view class="content">
		{{json.content}}
	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        json : {
			title : '你们之间互有好感，不可能有纯友谊',
			content : '你和好朋友变成恋人的几率很大，你们会先经由互相了解，才慢慢开始产生爱情的感觉。只要你们之间有足够单独发展的机会，你就会和麻吉朋友从青涩的关系，逐渐地情不自禁产生好感，慢慢发展成彼此间无话不谈的知己，一旦捅破了友谊那层纸，你们就会转变成爱情。'
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
</style>
