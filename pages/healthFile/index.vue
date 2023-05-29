<template>
	<view class="content p-2" style="background-color: #ffffff; height: 100%;">
		<z-nav-bar title="健康档案"></z-nav-bar>
		<public-module></public-module>
		<view class="title">
			<span>健康档案</span>
		</view>
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<image style="width: 60rpx;height: 60rpx;" :src="baseListItem.img" mode="aspectFit"></image>
					<text class="grid-text mt-2 font-md">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<u-gap
			height="20"
		></u-gap>
		<view class="title">
			<span>医疗档案</span>
		</view>
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(item,index) in medicalList" :key="index"
					@click="click(item.url,item.title)">
					<image style="width: 60rpx;height: 60rpx;" :src="item.img" mode="aspectFit"></image>
					<text class="grid-text mt-2 font-md">{{item.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<u-gap
			height="20"
		></u-gap>
		<view class="title">
			<span>体检档案</span>
		</view>
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(item,index) in healthCheckList" :key="index"
					@click="click(item.url,item.title)">
					<image style="width: 60rpx;height: 60rpx;" :src="item.img" mode="aspectFit"></image>
					<text class="grid-text mt-2 font-md">{{item.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
						img: require('@/static/icon/healthFile/basicFile.png'),
						title: '基础档案',
						url: '/pages/healthFile/basicFile/basicFile'
					},
					{
						img: require('@/static/icon/healthFile/physiologicalIndex.png'),
						title: '生理指标',
						url: '/pages/healthFile/quota/index'
					},
					{
						img: require('@/static/icon/healthFile/healthStatus.png'),
						title: '健康状况',
						url: '/pages/healthFile/status/index'
					},
					{
						img: require('@/static/icon/healthFile/habit.png'),
						title: '生活习惯',
						url: '/pages/healthFile/habit/habit'
					},
					{
						img: require('@/static/icon/healthFile/healthReport.png'),
						title: '健康报告', 
						url: '/pages/healthFile/healthReport/healthReport'
					},
				],
				medicalList: [{
						img: require('@/static/icon/healthFile/outpatientArchives.png'),
						title: '门诊档案',
						url: '/pages/healthFile/outpatientArchives/outpatientArchives'
					},
					{
						img: require('@/static/icon/healthFile/inpatientRecords.png'),
						title: '住院档案',
						url: '/pages/healthFile/inpatientRecords/inpatientRecords'
					},
					{
						img: require('@/static/icon/healthFile/publicHealth.png'),
						title: '基本公卫',
						url: ''
					},
				],
				
				healthCheckList: [{
						img: require('@/static/icon/healthFile/medicalExam.png'),
						title: '体检档案',
						url: ''
					},
				],
			}
		},
		methods: {
			
			click(url, name) {
				if(!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		.title {
			span {
				padding-left: 20rpx;
				border-left: 8rpx #28be9e solid;
				font-weight: bold;
			}
		}
		.devices-warp {
			.item {
				padding: 20rpx;
				margin: 10rpx;
				width: 160rpx !important;
				border-radius: 16rpx;
				background-color: #fff !important;
				box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);
				&:nth-child(4n){
					margin-right: 0;
				}
			}
		}
	}
</style>


