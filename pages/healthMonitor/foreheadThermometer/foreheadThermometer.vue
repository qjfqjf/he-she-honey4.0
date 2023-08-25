<template>
	<view class="fr p-2">
		<z-nav-bar title="额温枪">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader :username="username" @myUser="handleMyUser"></HealthHeader>
		<MyCircle style="margin: 100rpx 0 20rpx 0;" :value="heat" unit="°C" color="#2fba9c"></MyCircle>
		<TipInfo title="体温趋势" @trend="foreheadThermometerTrend"></TipInfo>
		<u--text class="d-flex j-center" color="#01b09a"
			:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>

		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSaveHeat"></u-button>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleJump()">
		</u--text>
		<!-- <BottomNavigation page="bloodSUA/suaManualEntry"></BottomNavigation> -->
		<view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center" @click="onPageSelectDocter">
				<image :src="this.toolList[0].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[0].title }}</text>
			</view>
			<view class="d-flex flex-column a-center" @click="onPageMonth">
				<image :src="this.toolList[1].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[1].title }}</text>
			</view>
			<view class="d-flex flex-column a-center" @click="onPageDevice">
				<image :src="this.toolList[2].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[2].title }}</text>
			</view>
			<view class="d-flex flex-column a-center" @click="onPageWrite">
				<image :src="this.toolList[3].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[3].title }}</text>
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
	import {
		formatDateTime
	} from '@/utils/date.js'
	import dayjs from "../utils/dayjs"
	import isBetween from "../utils/isBetween"
	export default {
		components: {
			HealthHeader,
			TipInfo,
			BottomNavigation,
			MyCircle
		},
		data() {
			return {
				uid: 0, //用户id
				name: '', //选择之后的名字
				username: '', //登录开始的名字
				btnColor: '#dadada',
				deviceStatus: 0,
				heat: 0, //测量温度
				blueDeviceList: [],
				owner: '2222',
				deviceId: uni.getStorageSync('frDeviceId'), // 蓝牙设备的id
				serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
				characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
				urlList: {
					history: '/pages/healthMonitor/foreheadThermometer/frHistory',
				},
				test_time: '',
				// 底部工具栏
				page: '',
				userInfo: '',
				toolList: [{
						img: require('@/static/icon/select_docter.png'),
						title: '找医生',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
					},
					{
						img: require('@/static/icon/bloodPressure/month.png'),
						title: '月报',
						url: '/pages/healthMonitor/foreheadThermometer/foreheadThermometerMonth'
					},
					{
						img: require('@/static/icon/bloodPressure/device.png'),
						title: '设备',
						url: '/pages/mine/myDevice'
					},
					{
						img: require('@/static/icon/bloodPressure/write.png'),
						title: '手动录入',
						url: '/pages/healthMonitor/foreheadThermometer/frManualEntry'
					},
				],

			};
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			console.log(111111,this.uid)
			this.getUserInfo()
			this.initBlue();
			if (this.deviceId && this.deviceStatus === 0) {
				this.connect()
			};
		},
		//页面显示
		onShow() {
			uni.$on('backWithData', (data) => {
			    this.uid = data.uid;
			    this.username = data.name;
			});
			console.log(111111,this.uid)
		},
		methods: {
			getUserInfo(){
				this.$http.post('/user/info', {
					id: this.uid,
				}).then(res => {
					this.username = res.data.fullname
				})
			},
			handleMyUser() {
				uni.navigateTo({
					url: '/pages/homePage/myUsers?type=select' // 跳转到指定的目标页面
				});
			},
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			foreheadThermometerTrend() {
				uni.navigateTo({
					url: '/pages/healthMonitor/foreheadThermometer/foreheadThermometerTrend?uid=' + this
					.uid, // 跳转到指定的目标页面
				});
			},
			handleJump() {
				uni.navigateTo({
					url: '/pages/healthMonitor/foreheadThermometer/foreheadThermometerHistory?uid=' + this.uid,
				});
			},

			handleSaveHeat() {
				if (this.heat != 0) {
					this.$http.post('/tem/create', {
						uid: this.uid,
						value: this.heat,
						time: this.formatDate(new Date()),
						type: 1
					}).then(res => {
						if (this.heat != 0) {
							this.$refs.uToast.show({
								message: '保存成功',
								type: 'success',
							})
							this.btnColor = '#dadada'
							this.heat = 0
						} else {
							this.$refs.uToast.show({
								message: '保存失败',
								type: 'error',
							})
							this.btnColor = '#dadada'
							this.heat = 0
						}
					})
				} else {
					this.$refs.uToast.show({
						message: '保存失败，请检查网络',
						type: 'error',
					})
					this.btnColor = '#dadada'
					this.heat = 0
				}

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
				const _this = this
				if (this.deviceId.length === 0) {
					this.deviceId = data.deviceId
				}

				uni.createBLEConnection({
					deviceId: this.deviceId,
					success(res) {
						console.log('连接成功')
						console.log(res)
						// 停止搜索

						setTimeout(() => {
							_this.notify()
						}, 1000)

					},
					fail(err) {
						console.log('连接失败')
						console.error(err)
						if (err.errCode === -1) {
							// 如果已经连接过则订阅通知
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
						_this.deviceStatus = 1
						_this.listenValueChange()

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
					this.processHeatData(res.value)
					console.log(resHex)
				})
			},
			// 处理温度
			processHeatData(buffer) {
				const data = new Int8Array(buffer);

				if (this.heat.length > 0 && this.heat.length < 8) {
					this.heat = new Int8Array([...this.heat, ...data]);
				} else if (data[0] === -81) {
					this.heat = data;
				}
				if (this.heat.length !== 8) return
				this.heat = (((this.heat[4] & 0xFF) << 8) + (this.heat[5] & 0xFF)) * 0.01;
				this.heat = Math.floor(parseFloat(this.heat) * 10) / 10;
				this.btnColor = '#01b09a'
			},
			onPageSelectDocter() {
				uni.navigateTo({
					url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
				})
			},
			onPageMonth() {
				uni.navigateTo({
					url: '/pages/healthMonitor/foreheadThermometer/foreheadThermometerMonth?uid=' + this.uid,
				})
			},
			onPageDevice() {
				uni.navigateTo({
					url: '/pages/mine/myDevice',
				})
			},
			onPageWrite() {
				uni.navigateTo({
					url: '/pages/healthMonitor/foreheadThermometer/frManualEntry?uid=' + this.uid,
				})
			},

			//时间格式转换
			formatDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
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
	.fr {
		background-color: #fff;
		height: 100%;
	}

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