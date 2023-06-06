<template>
	<view class="p-2">
		<z-nav-bar title="血糖"></z-nav-bar>
		<public-module></public-module>
		<HealthHeader></HealthHeader>
		<MyCircle style="margin: 100rpx 0 20rpx 0;" :value="value.length===0?0:value" unit="mmol/L" color="#ff8575">
		</MyCircle>
		<TipInfo title="血糖趋势"></TipInfo>
		<view class="d-flex j-sb flex-wrap mb-3 py-2 tags">
			<view class="m-1 tag-item" v-for="(item, index) in radios" :key="index">
				<u-tag :text="item.text" shape="circle" :color="!item.checked?'#02b19b':'#fff'" border-color="#01b09a"
					:bg-color="item.checked?'#01b09a':''" :plain="!item.checked" :name="index" @click="radioClick">
				</u-tag>
			</view>
		</view>

		<u--text class="d-flex j-center" color="#01b09a"
			:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSaveSugar"></u-button>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleDevelop">
		</u--text>
		<!-- <BottomNavigation page="bloodSugar/sugarManualEntry"></BottomNavigation> -->
		<view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center" v-for="item in toolList" :key="item.title"
				@click="onPageJump(item.url)">
				<image :src="item.img" style="width: 100rpx; height: 100rpx;" mode="aspectFit"></image>
				<text class="mt-1">{{item.title}}</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import HealthHeader from "../components/healthHeader/HealthHeader.vue"
	import TipInfo from '../components/tipInfo/TipInfo.vue'
	import BottomNavigation from '../components/bottomNav/BottomNavigation.vue'
	import MyCircle from '../components/circle/Circle.vue'
	export default {
		components: {
			HealthHeader,
			TipInfo,
			BottomNavigation,
			MyCircle
		},
		data() {
			return {
				radios: [{
						text: '空腹',
						checked: false
					},
					{
						text: '早餐后',
						checked: false
					},
					{
						text: '午餐前',
						checked: false
					},
					{
						text: '午餐后',
						checked: false
					},
					{
						text: '晚餐前',
						checked: false
					},
					{
						text: '晚餐后',
						checked: false
					},
					{
						text: '睡前',
						checked: false
					}, {
						text: '睡后',
						checked: false
					}
				],
				deviceStatus: 0,
				btnColor: '#dadada',
				value: new Int8Array(), //数据
				blueDeviceList: [],
				deviceId: '90:E2:02:22:CD:D5', // 蓝牙设备的id
				serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
				characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
				// 底部工具栏
				page: '',
				userInfo: '',
				toolList: [{
						img: require('@/static/icon/bloodPressure/month.png'),
						title: '月报',
						url: '/pages/healthMonitor/bloodSugar/bloodSugarMonth'
					},
					{
						img: require('@/static/icon/bloodPressure/device.png'),
						title: '设备',
						url: '/pages/mine/myDevice'
					},
					{
						img: require('@/static/icon/bloodPressure/write.png'),
						title: '手动录入',
						url: '/pages/healthMonitor/bloodSugar/sugarManualEntry'
					},
				],

			};
		},
		onLoad(e) {
			this.initBlue()
			if (this.deviceId && this.deviceStatus === 0) {
				this.connect()
			}
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			radioClick(name) {
				this.radios.map((item, index) => {
					item.checked = index === name ? true : false

				})
			},
			handleSaveSugar() {
				this.$http.post('/platform/dataset/call_kw', {
					model: "blood.glucose.meter",
					method: "create",
					args: [
						[{
							"name": "血糖仪 (静态血糖仪)",
							"numbers":this.serviceId,
							"owner":this.userInfo.uid,
							"category":"kf",
							"oml_l":this.value,
							"input_type":"equipment",
						}]
					],
					kwargs:{}
				}).then(res => {
					if (this.value.length > 0) {
						this.$refs.uToast.show({
							message: '保存成功',
							type: 'success',
						})
						this.btnColor = '#dadada'
						this.value = 0
					}
				})
			},
			handleDevelop() {
				// this.$refs.uToast.show({
				// 	message: '开发中...'
				// })
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/bloodSugarHistory'
				})
			},
			// 初始化蓝牙
			initBlue() {
				const _this = this
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
						uni.onBluetoothDeviceFound(function(res) {
							console.log(res)
							res.devices.forEach(device => {
								if (device.name && device.name.length > 0) {
									_this.blueDeviceList.push(device)
								}
							});

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
				console.log(111)
				console.log(data)
				const _this = this
				if (this.deviceId.length === 0) {
					this.deviceId = data.deviceId
				}

				uni.createBLEConnection({
					deviceId: this.deviceId,
					success(res) {
						console.log('连接成功')
						console.log(res)
						_this.deviceStatus = 1
						setTimeout(() => {
							_this.notify()
						}, 1000)

					},
					fail(err) {
						console.log('连接失败')
						console.error(err)
						if (err.errCode === -1) {
							_this.deviceStatus = 1
							_this.notify()
							return
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
						// uni.showToast({
						// 	title: '已开启监听'
						// })
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
					this.processData(res.value)
					let resHex = this.ab2hex(res.value)
					console.log(resHex)

				})
			},
			// 处理血糖数据
			processData(buffer) {
				const data = new Int8Array(buffer);
				// 找到需要的value数组
				if (this.value.length > 0 && this.value.length < 24) {
					console.log('1------开始-------')
					this.value = new Int8Array([...this.value, ...data])
					if (this.value.length > 24) {
						this.value = this.value.slice(0, this.value.findIndex(num => num === -2) + 1)
						console.log(this.value)
					}
					console.log('------结束-------')
				}
				if (data[0] == -1 && data.length > 1) {
					this.value = data
					console.log(data)
				}
				if (this.value.length >= 24) {
					// [-1, 1, 1, 0, 0, 2, 2, 0, 12, -128, 0, 30, 5, 1, 17, 13, 25, 0, 0, 0, 0, -37, 0, -2,] 1.6
					const v = ((this.value[10] & 0xff) << 8) + (this.value[11] & 0xff)
					this.divideWithPrecision(v, 18, 1)
				}


			},
			// 处理结果,要被除的数值v、除数divisor和保留的小数位数decimalPlaces
			divideWithPrecision(v, divisor, decimalPlaces) {
				const result = v / divisor
				const scaleFactor = Math.pow(10, decimalPlaces)
				this.value = Math.floor(result * scaleFactor) / scaleFactor
			},

			onPageJump(url) {
				uni.navigateTo({
					url: url
				});

			},


		}
	}
</script>

<style lang="scss">
	.tags {
		tag-item {
			width: 60rpx;
		}

		&::after {
			content: '';
			width: 240rpx;
		}
	}
</style>