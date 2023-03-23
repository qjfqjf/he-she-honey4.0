<template>
	<view>
		<z-nav-bar title="血压"></z-nav-bar>
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
		<view class="pressure">
			<view class="">
				动态血压：{{measureResult.pressure}}
			</view>
			<view class="">
				收缩压：{{measureResult.SYS}}
			</view>
			<view class="">
				舒张压：{{measureResult.DIA}}
			</view>
			<view class="">
				心率：{{measureResult.PUL}}
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
				measureResult: {
					pressure: 0, //动态血压
					SYS: 0, // 收缩压值
					DIA: 0, // 舒张压值
					PUL: 0, // 脉搏值
				},
				lastReceivedData: null,
				value: new Int8Array(), // 接收到设备的传输结果
				blueDeviceList: [],
				deviceId: 'B0:7E:11:F4:4A:68', // 蓝牙设备的id
				serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
				characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值

			};
		},
		onLoad(e) {
			this.initBlue()
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
				const data = new Int8Array(buffer);
				//处理动态血压
				if (data.length === 6 && data[0] === -2 && data[1] === -124 && data[5] === 4) {
					const dataString = hexArr.join('')
					if (this.lastReceivedData !== dataString) {
						this.measureResult.pressure = parseInt(hexArr.join('').slice(4, 8), 16)
						this.lastReceivedData = dataString;
					}
				}
				// 处理最终结果
				if (this.value.length > 0 && this.value.length < 24) {
					console.log('1------开始-------')
					// this.startValue = this.value
					this.value = new Int8Array([...this.value, ...data])
					// this.value.set(this.startValue)
					// this.value.set(data, this.startValue.length)
					if (this.value.length > 24) {
						this.value = this.value.slice(0, this.value.findIndex(num => num === -2) + 1)
						console.log(this.value)
					}

					console.log('------结束-------')
				}
				if (data[0] == -1 && data.length >= 1) {
					this.value = data
				}

				// if (this.value[0] != -1 || (this.value.length >= 6 && (this.value[1] != 1 || this.value[2] != 1))) {
				// 	console.log('3------开始-------')
				// 	// this.value = new Int8Array()
				// 	console.log('------结束-------')
				// }
				if (this.value.length >= 24) {
					console.log(this.value)
					this.measureResult.SYS = this.value[10] & 0xff
					this.measureResult.DIA = this.value[11] & 0xff
					this.measureResult.PUL = this.value[12] & 0xff
				}

				return hexArr.join('')
			},
			// 【9】监听消息变化
			listenValueChange() {
				uni.onBLECharacteristicValueChange(res => {
					console.log(res)
					let resHex = this.ab2hex(res.value)
					console.log(resHex)
				})
			}

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
