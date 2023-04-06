<template>
	<view class="content p-2">
		<z-nav-bar title="健康监测"></z-nav-bar>
		<public-module></public-module>
		<view class="title">
			<span>健康监测</span>
		</view>
		<!-- 设备板块 -->
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<image style="width: 80rpx;height: 80rpx;" :src="baseListItem.img" mode="aspectFit"></image>
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
						img: require('@/static/icon/health/bloodPressure.png'),
						title: '血压',
						url: '/pages/healthMonitor/bloodPressure/bloodPressure'
					},
					{
						img: require('@/static/icon/health/bloodSugar.png'),
						title: '血糖',
						url: '/pages/healthMonitor/bloodSugar/bloodSugar'
					},
					{
						img: require('@/static/icon/health/bloodSua.png'),
						title: '血尿酸',
						url: '/pages/healthMonitor/bloodSUA/bloodSUA'
					},
					{
						img: require('@/static/icon/health/bloodFat.png'),
						title: '血脂',
						url: '/pages/healthMonitor/bloodFat/bloodFat'
					},
					{
						img: require('@/static/icon/health/heart.png'),
						title: '心电图',
						url:'/pages/healthMonitor/ergometer/ergometer'
					},
					{
						img: require('@/static/icon/health/bodyFat.png'),
						title: '体脂率',
						url:'/pages/healthMonitor/bodyFat/bodyFat'
					},
					{
						img: require('@/static/icon/health/cholesterol.png'),
						title: '胆固醇',
						url: '/pages/healthMonitor/cholesterol/cholesterol'
					},
					// {
					// 	img: require('@/static/icon/health/AI.png'),
					// 	title: 'AI'
					// },
					{
						img: require('@/static/icon/health/heat.png'),
						title: '额温枪',
						url: '/pages/healthMonitor/foreheadThermometer/foreheadThermometer'
					},
					{
						img: require('@/static/icon/health/bloodOx.png'),
						title: '血氧',
						url: '/pages/healthMonitor/oximeter/oximeter'
					},
					
				]
			};
		},
		//方法
		methods: {

			click(url, name) {
				if(!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});
				
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
