<template>
	<view class="content p-2">
		<view class="bar">
			<view class="bar-left">
				<image class="img" src="/static/demo/back2.png" style="width: 16px;height: 16px;" shape="circle"
					mode="aspectFill" @click="goDiet"></image>
			</view>
			<view class="bar-center">
				饮食管理
			</view>
			<view class="bar-right">
				分析报告
			</view>
		</view>
		<public-module></public-module>

		<!-- 健康板块 -->
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url, baseListItem.title)">
					<image style="width: 130rpx;height: 130rpx;" :src="baseListItem.img" mode="aspectFit"></image>
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
						img: require('@/static/icon/healthManagement/nutritionScale.png'),
						title: '营养秤',
						url: '/pages/healthManagement/diet/nutritionScale'
					},
					{
						img: require('@/static/icon/healthManagement/dietRecords.png'),
						title: '饮食记录',
						url: '/pages/healthManagement/diet/dietRecords'
					},

				],
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
			goDiet(){
				uni.navigateTo({
					url: '/pages/healthManagement/index'
				})
			}

		},
		onLoad(e) {
			uni.removeStorageSync('foodName')
			uni.removeStorageSync('indexList')
		},
		//页面显示
		onShow() {
			uni.removeStorageSync('foodName')
			uni.removeStorageSync('indexList')
		},
	};
</script>

<style lang="scss">
	.content {
		height: 100vh;
		background-color: white;

		.title {
			span {
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
				margin-top: 20px;
			}
		}

		.devices-warp {
			display: flex;
			justify-content: space-around;

			.item {
				padding: 30rpx;
				margin: 0 30rpx;
				width: 240rpx !important;
				border-radius: 16rpx;
				background-color: #fff !important;
				box-shadow: 0px 3px 9px hsla(0, 0, 0, 0.1);

				&:nth-child(4n) {
					margin-right: 0;
				}

				.grid-text {
					// font-size: 30rpx;
				}
			}
		}
	}
</style>