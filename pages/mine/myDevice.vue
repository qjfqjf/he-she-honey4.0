<template>
	<view class="content p-2">
		<z-nav-bar title="我的设备"></z-nav-bar>
		<public-module></public-module>
		<view class="d-flex j-sb flex-wrap">
			<view class="bg-purple-light m-2" v-for="(item, index) in baseList" @click="click(item.url, item.title)">
				<u--image :src="item.img" width="80px" height="80px"></u--image>
				<text class="text" text-anchor="middle">{{item.title}}</text>
				<text class="text2" text-anchor="middle">{{item.detail}}</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
						img: require('@/static/icon/device/BTBP.png'),
						title: '血压计',
						detail: '(倍泰静态/动态血压计)',
					},
					{
						img: require('@/static/icon/device/JKBP.png'),
						title: '血压计',
						detail: '(佳康静态血压计)',
					},
					{
						img: require('@/static/icon/device/JKBGM.png'),
						title: '血糖仪',
						detail: '(佳康静态血糖仪)',
					},
					{
						img: require('@/static/icon/device/yitiji.png'),
						title: '血糖尿酸',
						detail: '胆固醇一体机',
					},
					{
						img: require('@/static/icon/device/tizhi.png'),
						title: '体脂秤',
					},
					{
						img: require('@/static/icon/device/ewenqiang.png'),
						title: '额温枪'
					},
					{
						img: require('@/static/icon/device/xuezhi.png'),
						title: '血脂四项仪'
					},
					{
						img: require('@/static/icon/device/xindiantu.png'),
						title: '心电图仪'
					},{
						img: require('@/static/icon/device/shouhuan.png'),
						title: '心电记录仪'
					},
					{
						img: require('@/static/icon/device/xueyang.png'),
						title: '血氧仪'
					},
					{
						img: require('@/static/icon/device/tiaosheng.png'),
						title: '跳绳'
					},
					{
						img: require('@/static/icon/device/nutritionScale.png'),
						title: '营养秤'
					},
				]
			};
		},
		//方法
		methods: {

			click(url, name) {
				uni.navigateTo({
					url: url
				});
				console.log(name, url)
			}

		},
		onLoad(e) {

		},
		//页面显示
		onShow() {},
	};
</script>

<style lang="scss">
	.demo-layout {
			display: flex;
			justify-content: space-between;
	    }	

	.bg-purple-light {
		background-color: #ffffff;
		height: 160px;
		width: 150px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.text{
		font-size: 30rpx; 
	}
	.text2{
		font-size: 20rpx; 
	}
	.content {
		.title {
			span {
				border-left: 8rpx #28be9e solid;
				padding-left: 20rpx;
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