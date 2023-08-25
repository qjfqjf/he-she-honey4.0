<template>
	<view class="p-2">
		<z-nav-bar title="血糖"></z-nav-bar>
		<public-module></public-module>
		<HealthHeader :username="username" @myUser="handleMyUser"></HealthHeader>
		<MyCircle style="margin: 100rpx 0 20rpx 0" :value="value.length === 0 ? 0 : value" unit="mmol/L"
			color="#ff8575">
		</MyCircle>
		<TipInfo title="血糖趋势" @trend="handleBloodSugarTrend"></TipInfo>
		<view class="d-flex j-sb flex-wrap mb-3 py-2 tags">
			<view class="m-1 tag-item" v-for="(item, index) in radios" :key="index">
				<u-tag :text="item.text" shape="circle" :color="!item.checked ? '#02b19b' : '#fff'"
					border-color="#01b09a" :bg-color="item.checked ? '#01b09a' : ''" :plain="!item.checked"
					:name="index" @click="radioClick">
				</u-tag>
			</view>
		</view>
		<u--text class="d-flex j-center" color="#01b09a"
			:text="deviceStatus === 0 ? '设备状态：未连接' : '设备状态：已连接' + '(' + currentDeviceId + ')'"></u--text>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSaveSugar"></u-button>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleDevelop">
		</u--text>
		<!-- <BottomNavigation page="bloodSugar/sugarManualEntry"></BottomNavigation> -->
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
	import HealthHeader from '../components/healthHeader/HealthHeader.vue'
	import TipInfo from '../components/tipInfo/TipInfo.vue'
	import BottomNavigation from '../components/bottomNav/BottomNavigation.vue'
	import MyCircle from '../components/circle/Circle.vue'
	import {
		BeneCheckEntity,
		mul,
		div
	} from '@/plugins/parseBeneCheck'
	export default {
		components: {
			HealthHeader,
			TipInfo,
			BottomNavigation,
			MyCircle,
		},
		data() {
			return {
				radios: [{
						text: '空腹',
						checked: false,
						category: 1,
					},
					{
						text: '早餐后',
						checked: false,
						category: 2,
					},
					{
						text: '午餐前',
						checked: false,
						category: 3,
					},
					{
						text: '午餐后',
						checked: false,
						category: 4,
					},
					{
						text: '晚餐前',
						checked: false,
						category: 5,
					},
					{
						text: '晚餐后',
						checked: false,
						category: 6,
					},
					{
						text: '睡前',
						checked: false,
						category: 7,
					},
					{
						text: '睡后',
						checked: false,
						category: 8,
					},
				],
				connectYtDeviceTimer: null,
				connectJKDeviceTimer: null,
				deviceStatus: 0,
				deviceCode: 0,
				btnColor: '#dadada',
				value: new Int8Array(), //数据
				blueDeviceList: [],
				currentDeviceId: '',
				currentDeviceType: 0, //0家康设备，1一体机设备
				deviceInfoList: [
					{
						//家康血糖仪
						dName: 'jkxtDeviceId',
						deviceId: uni.getStorageSync('jkxtDeviceId'), // 蓝牙设备的id
						serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
						characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
					},
					{
						//三合一
						dName: 'ytDeviceId',
						deviceId: uni.getStorageSync('ytDeviceId'), // 蓝牙设备的id
						serviceId: '00001000-0000-1000-8000-00805F9B34FB', //设备的服务值
						characteristicId: '00001002-0000-1000-8000-00805F9B34FB', // 设备的特征值
					},
				],

				// 底部工具栏
				page: '',
				userInfo: '',
				uid: 0, //用户选择的id
				username: '', //登录的名字
				toolList: [
					{
						img: require('@/static/icon/select_docter.png'),
						title: '找医生',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
					},
					{
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
				selectedCategory: 0,
			}
		},
		onLoad(e) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			console.log(111111,this.uid)
			this.getUserInfo()
			this.initBlue()
			if (
				(this.deviceInfoList[0].deviceId || this.deviceInfoList[1].deviceId) &&
				this.deviceStatus === 0
			) {
				this.createInterval()
			}
			console.log('---------------------------------load----------------------------------------------')
		},
		//页面显示
		onShow() {
			uni.$on('backWithData', (data) => {
			    this.uid = data.uid;
			    this.username = data.name;
			});
			console.log(111111,this.uid)
		},
		onUnload() {
			// 在组件销毁前移除事件监听
			uni.$off('updateDeviceM')
			uni.$off('updateDeviceStatus')

			clearInterval(this.connectYtDeviceTimer)
			clearInterval(this.connectJKDeviceTimer)
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
			handleDeviceStatusUpdate(deviceStatus) {
				this.deviceStatus = 0
				this.deviceStatus = deviceStatus

				console.log(deviceStatus, '--------------------------------------------取消---------------------------')
			},
			handleDeviceUpdate(deviceInfo) {
				console.log(deviceInfo)
				this.currentDeviceId = uni.getStorageSync(item.dName)
				this.deviceStatus = 1
				console.log(this.currentDeviceId,
					'--------------------------------------------我是handleDeviceUpdateM---------------------------')
				this.deviceInfoList.forEach((item) => {
					if (item.dName === deviceInfo.dName) {
						item = deviceInfo
						this.currentDeviceId = uni.getStorageSync(item.dName)
						console.log(item)
					}
				})


			},
			connectTimer() {
			
			},
			radioClick(name) {
				this.radios.map((item, index) => {
					item.checked = index === name ? true : false
				})
				this.selectedCategory = name + 1
			},
			handleSaveSugar() {
				if (this.value != '0' && this.value != '' && this.selectedCategory != 0) {
					this.$http
						.post('/blood_sugar/create', {
							uid: this.uid,
							category: this.selectedCategory,
							value: this.value,
							time: this.formatDate(new Date()),
							type: 1,
						})
						.then((res) => {
							if (this.value != 0) {
								this.$refs.uToast.show({
									message: '保存成功',
									type: 'success',
								})
								this.btnColor = '#dadada'
								this.value = 0
							} else {
								this.$refs.uToast.show({
									message: '保存失败',
									type: 'error',
								})
								this.btnColor = '#dadada'
								this.value = 0
							}
						})
				} else if (this.selectedCategory === 0) {
					this.$refs.uToast.show({
						message: '请选择类型',
						type: 'error',
					})
					this.btnColor = '#dadada'
					this.value = 0
				} else {
					this.$refs.uToast.show({
						message: '保存失败，请检查网络',
						type: 'error',
					})
					this.btnColor = '#dadada'
					this.value = 0
				}
			},
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/bloodSugarHistory?uid=' + this.uid,
				})
			},
			// 由于蓝牙设备的特殊性，需要使用时才能连接，所以在这里使用定时器进行连接
			createInterval() {
				this.listenConnectState()

				this.connectYtDeviceTimer = setInterval(() => {
					if (this.deviceCode == 0) {
						this.connect(
							this.deviceInfoList[1].deviceId,
							this.deviceInfoList[1].serviceId,
							this.deviceInfoList[1].characteristicId,
							1
						)
					}
				}, 1000)
				this.connectJKDeviceTimer = setInterval(() => {
					if (this.deviceCode == 0) {
						this.connect(
							this.deviceInfoList[0].deviceId,
							this.deviceInfoList[0].serviceId,
							this.deviceInfoList[0].characteristicId,
							0

						)
					}
				}, 1500)
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
					},
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
							res.devices.forEach((device) => {
								if (device.name && device.name.length > 0) {
									_this.blueDeviceList.push(device)
								}
							})
						})
					},
					fail(err) {
						console.log('搜索失败')
						console.error(err)
					},
				})
			},
			// 【3】找到新设备就触发该方法
			found(res) {
				console.log(res)
				this.blueDeviceList.push(res.devices[0])
			},

			// 【4】连接设备
			connect(deviceId, serviceId, characteristicId, deviceType) {
				// console.log(this.deviceInfoList[0].deviceId)
				console.log(deviceId)

				const _this = this
				if (deviceId.length !== 0) {
					uni.createBLEConnection({
						deviceId: deviceId,
						success(res) {
							console.log('连接成功')
							console.log(res)
							_this.deviceStatus = 1
							_this.deviceCode = 1
							_this.notify(deviceId, serviceId, characteristicId, deviceType)
						},
						fail(err) {
							console.log('连接失败')
							console.error(err)
							if (err.errCode === -1) {
								_this.deviceStatus = 1
								_this.deviceCode = 1
								_this.notify(deviceId, serviceId, characteristicId, deviceType)
								return
							}
						},
					})
					//   this.deviceId = data.deviceId
				}
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
					},
				})
			},

			// 【6】获取服务
			getServices() {
				uni.getBLEDeviceServices({
					deviceId: this.deviceId,
					success(res) {
						console.log(res)
						uni.showToast({
							title: '获取服务成功',
						})
					},
					fail(err) {
						console.error(err)
						uni.showToast({
							title: '获取服务失败',
							icon: 'error',
						})
					},
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
							title: '获取特征值成功',
						})
					},
					fail(err) {
						console.error(err)
						uni.showToast({
							title: '获取特征值失败',
							icon: 'error',
						})
					},
				})
			},

			// 【8】开启消息监听
			notify(deviceId, serviceId, characteristicId, deviceType) {
				const _this = this
				uni.notifyBLECharacteristicValueChange({
					deviceId: deviceId,
					serviceId: serviceId,
					characteristicId: characteristicId,
					success(res) {
						console.log(res)
						_this.currentDeviceType = deviceType
						_this.currentDeviceId = deviceId
						_this.listenValueChange()
						// uni.showToast({
						// 	title: '已开启监听'
						// })
					},
					fail(err) {
						console.error(err)
						// uni.showToast({
						// 	title: '监听失败',
						// 	icon: 'error',
						// })
						_this.notify(deviceId, serviceId, characteristicId)
					},
				})
			},
			// ArrayBuffer转16进度字符串示例
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
					return ('00' + bit.toString(16)).slice(-2)
				})
				const resHex = hexArr.join('')
				return [hexArr, resHex]
			},
			// 【9】监听消息变化
			listenValueChange() {
				uni.onBLECharacteristicValueChange((res) => {
					console.log(res)
					const [hexArr, resHex] = this.ab2hex(res.value)
					if (this.currentDeviceType === 1) {
						// 一体机处理
						this.processSugar(hexArr)
					} else if (this.currentDeviceType === 0) {
						// 家康设备血糖处理
						this.processData(res.value)
					}

					console.log(resHex)
				})
			},
			// 监听蓝牙的连接状态
			listenConnectState() {
				uni.onBLEConnectionStateChange((res) => {
					console.log(res)

					if (!res.connected) {
						this.deviceStatus = 0
						this.deviceCode = 0
						this.createInterval()
						uni.showToast({
							title: '连接已断开',
							icon: 'error',
						})
					} else {
						this.deviceStatus = 1
						this.deviceCode = 1
						this.currentDeviceId = res.deviceId
						clearInterval(this.connectYtDeviceTimer)
						clearInterval(this.connectJKDeviceTimer)

					}
				})
			},
			// 处理血糖数据
			processData(buffer) {
				const data = new Int8Array(buffer)
				// 找到需要的value数组
				if (this.value.length > 0 && this.value.length < 24) {
					console.log('1------开始-------')
					this.value = new Int8Array([...this.value, ...data])
					if (this.value.length > 24) {
						this.value = this.value.slice(0, this.value.findIndex((num) => num === -2) + 1)
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
			// 处理一体机的血糖
			processSugar(hexArray) {
				// 使用formatArray函数解析设备数据
				// 将每个十六进制字符串转换为十进制数值
				const decimalArray = hexArray.map((hex) => parseInt(hex, 16))
				const parsedData = BeneCheckEntity.formatArray(decimalArray)
				this.value = parsedData.value
				// 输出解析后的数据
				console.log(parsedData, 1111111)
				this.btnColor = '#01b09a'


			},
			onPageJump(url) {
				uni.navigateTo({
					url: url,
				})
			},
			handleBloodSugarTrend() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/bloodSugarTrend?uid=' + this.uid, // 跳转到指定的目标页面
				})
			},
			
			//时间格式转换
			formatDate(date) {
				var y = date.getFullYear()
				var m = date.getMonth() + 1
				m = m < 10 ? '0' + m : m
				var d = date.getDate()
				d = d < 10 ? '0' + d : d
				var h = date.getHours()
				h = h < 10 ? '0' + h : h
				var minute = date.getMinutes()
				minute = minute < 10 ? '0' + minute : minute
				var second = date.getSeconds()
				second = second < 10 ? '0' + second : second
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
			},
			
			onPageSelectDocter() {
				uni.navigateTo({
					url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
				})
			},
			onPageMonth() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/bloodSugarMonth?uid=' + this.uid,
				})
			},
			onPageDevice() {
				uni.navigateTo({
					url: '/pages/mine/myDevice',
				})
			},
			onPageWrite() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/sugarManualEntry?uid=' + this.uid,
				})
			},
		},
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