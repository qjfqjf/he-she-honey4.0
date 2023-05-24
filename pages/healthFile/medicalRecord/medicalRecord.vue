<template>
	<view class="content">
	  <z-nav-bar :title="title">
	    <view slot="right" class="p-2" @click="addMedicalRecord">
	      <text style="font-size: 20rpx;">添加档案</text>
	    </view>
	  </z-nav-bar>
	  <public-module></public-module>

	  <!--  记录  -->
		<view class="nothing" v-if="dataList.length === 0">
			<u-image src="../../../../static/icon/healthFile/listEmpty.png" width="400rpx" height="400rpx" shape="circle"></u-image>
			<view class="first-text">
				<text >暂无数据</text>
			</view>
			<view class="second-text">
				<text style="font-size: 30rpx">
					当前暂无{{title}}记录，
				</text>
				<text style="font-size: 30rpx;color: #5ac725" @click="addMedicalRecord">
					点击前去添加
				</text>
			</view>
		</view>
		<view class="medical-records" v-else>

		</view>
	</view>
	  
</template>

<script>

	export default {

		data() {
			return {
				dataList:[],
				title:'门诊病例'
			}
		},
		methods: {
			addMedicalRecord(){
				alert(111)
			}
		}
	}
</script>

<style lang="scss">
	.nothing{
		text-align: center;
		padding-top: 300rpx;
		width: 400rpx;
		height: 400rpx;
		margin: 0 auto;
		u-image{
			//光晕效果未加
			Filter: Chroma(Color = #000000) Glow(Color=#00FF00, Strength=20);
		}
		.first-text{
			margin-top: 40rpx;
		}
		.second-text{
			margin-top: 40rpx;
		}
	}
</style>
