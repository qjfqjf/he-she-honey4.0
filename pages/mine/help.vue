<template>
	<view class="content p-2">
		<z-nav-bar title="帮助"></z-nav-bar>
		<public-module></public-module>
		<view class="d-flex j-sb flex-wrap">
			<view class="bg-purple-light m-2" v-for="(item, index) in baseList" @click="click(item.url, item.title)">
				<u--image :src="item.img" width="60px" height="60px"></u--image>
				<text class="text" text-anchor="middle">{{item.title}}</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
						img: require('@/static/icon/help/account.png'),
						title: '账户相关',
					},
					{
						img: require('@/static/icon/help/transactionHistory.png'),
						title: '购买支付',
					},
					{
						img: require('@/static/icon/help/Logistics.png'),
						title: '物流配送',
					},
					{
						img: require('@/static/icon/help/AfterService.png'),
						title: '售后服务'
					},
					{
						img: require('@/static/icon/help/discount.png'),
						title: '优惠相关'
					},
					{
						img: require('@/static/icon/help/problem.png'),
						title: '常见问题'
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
		font-size: 34rpx;
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
