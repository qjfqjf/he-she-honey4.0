<template>
	<view class="content">
		<view class="bar">
			<view class="bar-left">
				<image class="img" src="/static/demo/back2.png" style="width: 16px;height: 16px;" shape="circle"
					mode="aspectFill" @click="goDiet"></image>
			</view>
			<view class="bar-center">
				健康管理
			</view>
			<view class="bar-right">

			</view>
		</view>
		<public-module></public-module>
		<view class="title">
			<text>健康管理</text>
		</view>
		<!-- 设备板块 -->
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<image style="width: 60rpx;height: 60rpx;" :src="baseListItem.img" mode="aspectFit"></image>
					<text class="grid-text mt-2">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
						img: require('@/static/icon/healthManagement/diet.png'),
						title: '饮食管理',
						url: '/pages/healthManagement/diet/diet'
					},
					{
						img: require('@/static/icon/healthManagement/sports.png'),
						title: '运动管理',
						url: '/pages/healthManagement/sports/sports'
					},
					{
						img: require('@/static/icon/healthManagement/sleep.png'),
						title: '睡眠管理',
						url: '/pages/healthManagement/sleep/sleepRecord'
					},
					{
						img: require('@/static/icon/healthManagement/medical.png'),
						title: '医疗管理',
						url: '/pages/healthManagement/medical/medical'
					},
					{
						img: require('@/static/icon/healthManagement/conditioning.png'),
						title: '调理管理',
						url: '/pages/healthManagement/conditioning/conditioning'
					},
					{
						img: require('@/static/icon/healthManagement/psychology.png'),
						title: '心理调适',
						url: '/pages/healthManagement/psychology/psychology'
					},
					{
						img: require('@/static/icon/healthManagement/health.png'),
						title: '健康自述',
						url: '/pages/healthManagement/health/health'
					},
					{
						img: require('@/static/icon/healthManagement/beauty.png'),
						title: '美容管理',
						url: '/pages/healthManagement/beauty/beauty'
					},
					{
						img: require('@/static/icon/healthManagement/bodyBuilding.png'),
						title: '健身管理',
						url: '/pages/healthManagement/bodyBuilding/bodyBuilding'
					},
				]
			};
		},
		//方法
		methods: {

			click(url, name) {
				if (!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});

			},
			goDiet() {
				uni.switchTab({
					url: '/pages/homePage/homePage',
				})
			}

		},
		onLoad(e) {

		},
		//页面显示
		onShow() {},
	};
</script>

<style lang="scss">
	.content {
		
		.title {
			margin-left: 10px;
			margin-top: 10px;
			text {
				border-left: 8rpx #28be9e solid;
				padding-left: 20rpx;
			}
		}

		.bar {
			display: flex;
			justify-content: space-between;
			/* 将子元素平分空间 */
			align-items: center;
			height: 70px;

			background-color: white;

			.bar-left {
				text-align: center;
				margin-left: 20px;
				width: 50px;
				margin-top: 20px;
			}

			.bar-center {
				display: flex;
				/* 使用 Flex 布局 */
				justify-content: center;
				/* 水平居中 */
				align-items: center;
				text-align: center;
				font-size: 17px;
				font-weight: bold;
				margin-top: 20px;
			}

			.bar-right {
				text-align: center;
				font-size: 15px;
				width: 60px;
			}
		}

		.devices-warp {
			margin-left: 10px;
			.item {
				padding: 20rpx;
				margin: 10rpx;
				width: 160rpx !important;
				border-radius: 16rpx;
				background-color: #fff !important;
				box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);

				&:nth-child(4n) {
					margin-right: 0;
				}

				.grid-text {
					font-size: 30rpx;
				}
			}
		}
	}
</style>