<template>
	<view class="content p-2">
		<z-nav-bar title="我的设备"></z-nav-bar>
		<public-module></public-module>
		<view class="d-flex j-sb flex-wrap">

			<view class="bg-purple-light m-2" v-for="(item, index) in baseList"
				@click="click(item.url, (item.title+item.detail),item.deviceInfo)" :key="index">
				<u-badge class="mb-2" numberType="overflow" :type="item.deviceInfo.deviceId?'success':'error'"
					:value="item.deviceInfo.deviceId?'已绑定':'未绑定'"></u-badge>
				<u--image :src="item.img" width="80px" height="80px"></u--image>
				<text class="text" text-anchor="middle">{{item.title}}</text>
				<text class="text2" text-anchor="middle">{{item.detail}}</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	export default {

		data() {
			return {
				baseList: []
			};
		},
		method:{
			onShow() {
				console.log(111)
			},
			onLoad(val) {
				console.log(val)
			},
		},

		mounted() {
			this.baseList = [{
					img: require('@/static/icon/device/BTBP.png'),
					title: '血压计',
					detail: '(倍泰静态/动态血压计)',
					url: '/pages/healthMonitor/bloodPressure/device/bloodPressureDevice1',
					deviceInfo: {
						deviceId: uni.getStorageSync('btDeviceId'),
						dName: 'btDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}


				},
				{
					img: require('@/static/icon/device/JKBP.png'),
					title: '血压计',
					detail: '(佳康静态血压计)',
					url: '/pages/healthMonitor/bloodPressure/device/bloodPressureDevice2',
					deviceInfo: {
						deviceId: uni.getStorageSync('jkDeviceId'),
						dName: 'jkDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},

				{
					img: require('@/static/icon/device/JKBGM.png'),
					title: '血糖仪',
					detail: '(佳康静态血糖仪)',
					url: '/pages/template/deviceConnection',
					deviceInfo: {
						deviceId: uni.getStorageSync('jkxtDeviceId'),
						dName: 'jkxtDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/yitiji.png'),
					title: '血糖尿酸',
					detail: '胆固醇一体机',
					url: '/pages/template/deviceConnection',
					deviceInfo: {
						deviceId: uni.getStorageSync('ytDeviceId'),
						dName: 'ytDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/tizhi.png'),
					title: '体脂秤',
					detail: '',
					url: '/pages/template/BodyFatConnection',
					deviceInfo: {
						deviceId: uni.getStorageSync('tzDeviceId'),
						dName: 'tzDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/ewenqiang.png'),
					url: '/pages/template/deviceConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('frDeviceId'),
						dName: 'frDeviceId',
						serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
						characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
					},
					title: '额温枪',
				},
				{
					img: require('@/static/icon/device/xuezhi.png'),
					title: '血脂四项仪',
					url: '/pages/template/deviceConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('xzDeviceId'),
						dName: 'xzDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/xindiantu.png'),
					title: '心电图仪',
					url: '/pages/template/deviceConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('xdDeviceId'),
						dName: 'xdDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				}, {
					img: require('@/static/icon/device/shouhuan.png'),
					title: '心电记录仪',
					url: '/pages/template/deviceConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('xdjlDeviceId'),
						dName: 'xdjlDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/xueyang.png'),
					title: '血氧仪',
					url: '/pages/template/deviceConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('xyDeviceId'),
						dName: 'xyDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/tiaosheng.png'),
					title: '跳绳',
					url: '/pages/template/JumpRopeConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('tsDeviceId'),
						dName: 'tsDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
				{
					img: require('@/static/icon/device/nutritionScale.png'),
					title: '营养秤',
					url: '/pages/template/KitchenDeviceConnection',
					detail: '',
					deviceInfo: {
						deviceId: uni.getStorageSync('yycDeviceId'),
						dName: 'yycDeviceId',
						serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
						characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
					}
				},
			]
		},
		//方法
		methods: {

			async click(url, name, deviceInfo) {
				if (!url) {
					return this.$refs.uToast.default('开发中...')
				}
				await uni.navigateTo({
					url: url + '?info=' +
						JSON.stringify({
							name,
							...deviceInfo
						}),
					// events: {
					// 	// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					// 	deviceInfo: function(data) {
					// 		console.log(data)
					// 	},
					// },
					// success: function(res) {
					// 	// 通过eventChannel向被打开页面传送数据
					// 	res.eventChannel.emit('deviceInfo', {
					// 		data: {
					// 			name,
					// 			...deviceInfo
					// 		}
					// 	})
					// }
				});
				// console.log(name, url)
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

	.text {
		font-size: 30rpx;
	}

	.text2 {
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

				&:nth-child(4n) {
					margin-right: 0;
				}
			}
		}
	}
</style>
