<template>
	<view class="content p-2">
		<z-nav-bar title="绑定设备"></z-nav-bar>
		<public-module></public-module>
		<view class="deviceInfo d-flex j-sb mt-1 p-2">
			<view class="left">
				<view class="name">
					血压计(倍泰静态/动态血压计)
				</view>
				<text class="deviceId">
					{{this.deviceId||'未绑定'}}
				</text>
			</view>
			<view class="right">
				<u-button style="color: #333;" color="#f6f6f6" @click="cancelBind">取消绑定</u-button>
			</view>
		</view>

		<view class="deviceList">
			<view class="header d-flex j-sb a-center">
				<view class="desc">
					可用设备
				</view>
				<view class="" @click="resetDevice">
					<image src="@/static/icon/device/reset.png" style="width: 40rpx;height: 40rpx;" mode="aspectFit">
					</image>
				</view>
			</view>
			<view class="item d-flex a-center" v-for="item in blueDeviceList" @click="connect(item)" :key="item.name">
				<view class="mr-3 mt-2">
					<image style="width: 60rpx;height: 60rpx;" src="@/static/icon/device/ble.png" mode="aspectFit">
					</image>
				</view>
				<view>
					{{ item.name }}
				</view>
			</view>
		</view>
		<!-- 		<scroll-view scroll-y class="box">
			<view class="item" v-for="item in blueDeviceList" @click="connect(item)" :key="item.name">
				<view>.
					<text>id: {{ item.deviceId }}</text>
				</view>
				<view>
					<text>name: {{ item.name }}</text>
				</view>
			</view>
		</scroll-view> -->

		<!-- 	<button @click="discovery">2 搜索附近蓝牙设备</button>

		<button @click="getServices">3 获取蓝牙服务</button>

		<button @click="getCharacteristics">4 获取特征值</button>
		<button @click="notify">5 开启消息监听</button> -->
		<!-- <button @click="clear">8 清空蓝牙列表</button> -->
		<!-- 		<view class="heat">
			<view class="">
				数据：{{value}}
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		handleJKBPData
	} from '@/pages/healthMonitor/bloodPressure/bloodpressure.js'
	export default {
		propos: {
			deviceName: {
				type: String,
				default: ''
			},
			deviceID: {
				type: String,
				default: ''
			},
			serviceId: {
				type: String,
				default: ''
			},
			characteristicId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				timer: null,
				blueDeviceList: [],
				deviceId: uni.getStorageSync('jkDeviceId'), // 蓝牙设备的id
				serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
				characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值

			};
		},
		onLoad(e) {
			console.log(e)
			console.log(111)
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('deviceInfo', {
				data: 'data from test page'
			});
			
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('deviceInfo', function(data) {
				console.log(data,1)
			})
			this.initBlue()
			this.discovery()
		
		},
		onUnload() {
			this.stopDiscovery()
		},
		methods: {
			// 取消绑定
			cancelBind() {
				uni.closeBLEConnection({
					deviceId: this.deviceId,
					success: function(res) {
						console.log('取消蓝牙连接成功');
					},
					fail: function(err) {
						console.log('取消蓝牙连接失败：' + JSON.stringify(err));
					}
				});
				this.deviceId = ''
				uni.removeStorageSync('jkDeviceId')
			},
			// 重新搜索设备
			resetDevice() {
				this.discovery()

			},
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
				clearTimeout(this.timer)
				this.blueDeviceList = []
				uni.startBluetoothDevicesDiscovery({
					success(res) {
						console.log('开始搜索')
						// 开启监听回调
						console.log(res)
						uni.onBluetoothDeviceFound(function(devices) {
							console.log(devices)
							if (devices.devices[0].name) {
								_this.blueDeviceList.push(devices.devices[0])
							}

						})
						// const arr = new Set(_this.blueDeviceList)
						// _this.blueDeviceList = Array.from(arr)
					},
					fail(err) {
						console.log('搜索失败')
						console.error(err)
					}
				})
				// 30s秒后停止搜索
				this.timer = setTimeout(() => {
					_this.stopDiscovery()
				}, 60000)
			},
			// 【3】找到新设备就触发该方法
			found(res) {
				console.log(res)
				this.blueDeviceList.push(res.devices[0])

			},

			// 【4】连接设备
			connect(data) {
				if (this.deviceId) {
					this.cancelBind()
				}
				console.log(data)
				const _this = this
				this.deviceId = data.deviceId
				uni.setStorageSync('jkDeviceId', data.deviceId);
				uni.createBLEConnection({
					deviceId: this.deviceId,
					success(res) {
						console.log('连接成功')
						console.log(res)
						// 停止搜索
						_this.stopDiscovery()
						uni.showToast({
							title: '绑定成功'
						})
					},
					fail(err) {
						console.log('连接失败')
						console.error(err)
						if (err.errCode !== -1) {
							uni.showToast({
								title: '连接失败',
								icon: 'error'
							})
						}

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

	.content {
		.deviceInfo {
			background-color: #fff;

			.left {
				.deviceId {
					font-size: 14px;
					color: #999;
				}
			}
		}

		.deviceList {
			margin-top: 30rpx;
			padding: 20rpx;
			background-color: #fff;

			.header {
				.desc {

					font-weight: 500;
				}
			}
		}
	}
</style>
