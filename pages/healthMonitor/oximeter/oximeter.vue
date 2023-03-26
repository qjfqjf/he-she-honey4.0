<template>
	<view>
		<z-nav-bar title="血氧仪"></z-nav-bar>
		<public-module></public-module>
		<scroll-view scroll-y class="box">
			<view class="item" v-for="item in blueDeviceList" @click="connect(item)">
				<view>
					<text>id: {{ item.deviceId }}</text>
				</view>
				<view>
					<text>name: {{ item.name }}</text>
				</view>
			</view>
		</scroll-view>

		<button @click="discovery">2 搜索附近蓝牙设备</button>

		<button @click="getServices">3 获取蓝牙服务</button>

		<button @click="getCharacteristics">4 获取特征值</button>
		<button @click="notify">5 开启消息监听</button>
		<!-- <button @click="clear">8 清空蓝牙列表</button> -->
		<view class="heat">
			<view class="">
				数据：{{value}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		handleJKBPData
	} from '@/pages/healthMonitor/bloodPressure/bloodpressure.js'
	export default {
		data() {
			return {
				value: '', //测量温度
				blueDeviceList: [],
				deviceId: 'E9:D1:6B:E3:29:1F', // 蓝牙设备的id
				serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
				characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值

			};
		},
		onLoad(e) {
			this.initBlue()
			// if (this.deviceId.length > 0) {
			// 	uni.createBLEConnection({
			// 		deviceId: this.deviceId,
			// 		success(res) {
			// 			console.log('连接成功')
			// 			console.log(res)
			// 			uni.showToast({
			// 				title: '连接成功'
			// 			})
			// 		},
			// 		fail(err) {
			// 			console.log('连接失败')
			// 			console.error(err)
			// 			uni.showToast({
			// 				title: '连接失败',
			// 				icon: 'error'
			// 			})
			// 		}
			// 	})
			// }
		},
		methods: {
			// 初始化蓝牙
			initBlue() {
				uni.openBluetoothAdapter({
					success(res) {
						console.log('初始化蓝牙成功')
						console.log(res)
					},
					fail(err) {
						console.log('初始化蓝牙失败')
						console.error(err)
					}
				})
			},
			// 开始搜寻附近设备
			discovery() {
				const _this = this
				uni.startBluetoothDevicesDiscovery({
					success(res) {
						console.log('开始搜索')
						// 开启监听回调
						console.log(res)
						uni.onBluetoothDeviceFound(function(devices) {
							console.log(devices)
							_this.blueDeviceList.push(devices.devices[0])
						})
					},
					fail(err) {
						console.log('搜索失败')
						console.error(err)
					}
				})
			},
			// 【3】找到新设备就触发该方法
			found(res) {
				console.log(res)
				this.blueDeviceList.push(res.devices[0])

			},

			// 【4】连接设备
			connect(data) {
				console.log(data)
				const _this = this
				this.deviceId = data.deviceId

				uni.createBLEConnection({
					deviceId: this.deviceId,
					success(res) {
						console.log('连接成功')
						console.log(res)
						// 停止搜索
						_this.stopDiscovery()
						uni.showToast({
							title: '连接成功'
						})
					},
					fail(err) {
						console.log('连接失败')
						console.error(err)
						uni.showToast({
							title: '连接失败',
							icon: 'error'
						})
					}
				})
			},

			// 【5】停止搜索
			stopDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					success(res) {
						console.log('停止成功')
						console.log(res)
					},
					fail(err) {
						console.log('停止失败')
						console.error(err)
					}
				})
			},

			// 【6】获取服务
			getServices() {
				uni.getBLEDeviceServices({
					deviceId: this.deviceId,
					success(res) {
						console.log(res)
						uni.showToast({
							title: '获取服务成功'
						})
					},
					fail(err) {
						console.error(err)
						uni.showToast({
							title: '获取服务失败',
							icon: 'error'
						})
					}
				})
			},



			// 【7】获取特征值
			getCharacteristics() {
				uni.getBLEDeviceCharacteristics({
					deviceId: this.deviceId,
					serviceId: this.serviceId,
					success(res) {
						console.log(res)
						uni.showToast({
							title: '获取特征值成功'
						})
					},
					fail(err) {
						console.error(err)
						uni.showToast({
							title: '获取特征值失败',
							icon: 'error'
						})
					}
				})
			},


			// 【8】开启消息监听
			notify() {
				const _this = this
				uni.notifyBLECharacteristicValueChange({
					deviceId: this.deviceId,
					serviceId: this.serviceId,
					characteristicId: this.characteristicId,
					success(res) {
						console.log(res)
						_this.listenValueChange()
						uni.showToast({
							title: '已开启监听'
						})
					},
					fail(err) {
						console.error(err)
						uni.showToast({
							title: '监听失败',
							icon: 'error'
						})
					}
				})
			},
			// ArrayBuffer转16进度字符串示例
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)

				return hexArr.join('')
			},
			// 【9】监听消息变化
			listenValueChange() {
				uni.onBLECharacteristicValueChange(res => {
					console.log(res)
					let resHex = this.ab2hex(res.value)
				
					console.log(resHex)
				})
			},
	

		}
	}
</script>

<style lang="scss">
	.box {
		width: 98%;
		height: 400rpx;
		box-sizing: border-box;
		margin: 0 auto 20rpx;
		border: 2px solid dodgerblue;
	}

	.item {
		box-sizing: border-box;
		padding: 10rpx;
		border-bottom: 1px solid #ccc;
	}

	button {
		margin-bottom: 20rpx;
	}

	.msg_x {
		border: 2px solid seagreen;
		width: 98%;
		margin: 10rpx auto;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.msg_x .msg_txt {
		margin-bottom: 20rpx;
	}
</style>
