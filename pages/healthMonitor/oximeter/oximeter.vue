<template>
	<view class="content p-2">
		<z-nav-bar title="血氧"> 
			<view slot="right" class="p-2" @click="handleWarningRule">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader :name="name" :username="username" @myUser="handleMyUser"></HealthHeader>
		<view class="mt-3 mb-3" style="height: 350rpx">
			<l-ecg ref="ecgRef"></l-ecg>
		</view>
		<!-- <u-button type="primary" @click="resume">测试</u-button>
    <view class="mb-3"> </view>
    <u-button type="primary" @click="pause">暂停</u-button> -->
		<view class="mt-5"> </view>
		<TipInfo title="血氧趋势" @trend="handleOximeterTrend"></TipInfo>
		<u--text class="d-flex j-center mb-3" color="#01b09a"
			:text="deviceStatus === 0 ? '设备状态：未连接' : '设备状态：已连接' + '(' + deviceId + ')'"></u--text>
		<view class="d-flex j-center my-2" v-if="result"> {{ result }} </view>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSave"></u-button>
		<view class="mb-3"> </view>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleDevelop">
		</u--text>

		<view class="data d-flex j-sb">
			<view class="item text-center" v-for="(item, index) in oxData" :key="item.name">
				<view class="value">
					{{ item.value || '--' }}
				</view>
				<view class="name">
					{{ item.name }}
				</view>
			</view>
		</view>
		<!-- <BottomNavigation page="bloodSUA/suaManualEntry"></BottomNavigation> -->
		<!-- <view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center" v-for="item in toolList" :key="item.title"
				@click="onPageJump(item.url)">
				<image :src="item.img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ item.title }}</text>
			</view>
		</view> -->
		<view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center"
				@click="onPageSelectDocter">
				<image :src="this.toolList[0].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[0].title }}</text>
			</view>
			<view class="d-flex flex-column a-center"
				@click="onPageMonth">
				<image :src="this.toolList[1].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[1].title }}</text>
			</view>
			<view class="d-flex flex-column a-center"
				@click="onPageDevice">
				<image :src="this.toolList[2].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[2].title }}</text>
			</view>
			<!-- <view class="d-flex flex-column a-center"
				@click="onPageWrite">
				<image :src="this.toolList[3].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[3].title }}</text>
			</view> -->
		</view>
		
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// import {
	// 	defineComponent,
	// 	ref,
	// 	onMounted
	// } from '@vue/composition-api'
	import HealthHeader from '../components/healthHeader/HealthHeader.vue'
	import TipInfo from '../components/tipInfo/TipInfo.vue'
	import BottomNavigation from '../components/bottomNav/BottomNavigation.vue'
	export default {
		components: {
			HealthHeader,
			BottomNavigation,
			TipInfo,
		},
		data() {
			return {
				oxData: [{
						value: 0,
						name: '血氧',
					},
					{
						value: 0,
						name: 'PI',
					},
					{
						value: 0,
						name: '脉率',
					},
				],
				btnColor: '#dadada',
				deviceStatus: 0,
				deviceCode: 0,
				ecgRef: null,
				userInfo: '',
				// 51, 51, 51, 51, 50, 50, 50, 49, 49, 49, 49, 50, 51, 52, 54, 55, 56, 56, 56, 56, 56, 183,
				//   55, 54, 54, 53, 53, 53, 52, 52, 52, 51, 51, 51, 50, 50, 50, 50, 49, 49, 49, 49, 49, 49,
				//   48, 48, 48, 48, 48, 48, 48, 49, 50, 51, 53, 55, 56, 57, 57, 57, 61, 68, 73, 79, 84, 85,
				//   82, 78, 76, 73, 70, 66, 63, 60, 57, 56, 55, 56, 57, 60, 63, 65, 67, 67, 66, 64, 60, 57,
				//   54, 52, 55, 61, 71, 83, 94, 101, 106, 107, 105,
				value: [],
				waveData: [],
				// 测量结果
				result: '',
				uid:0,//用户id
				name:'',//选择之后的名字
				username:'',//登录开始的名字
				time: null,
				connectTime: null,
				// 底部工具栏
				page: '',
				toolList: [
					{
						img: require('@/static/icon/select_docter.png'),
						title: '找医生',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
					},
					{
						img: require('@/static/icon/bloodPressure/month.png'),
						title: '月报',
						url: '/pages/healthMonitor/oximeter/oximeterMonth',
					},
					{
						img: require('@/static/icon/bloodPressure/device.png'),
						title: '设备',
						url: '/pages/mine/myDevice',
					},
					{
						img: require('@/static/icon/bloodPressure/write.png'),
						title: '手动录入',
						url: '/pages/healthMonitor/' + this.page,
					},
				],
				deviceId: uni.getStorageSync('xyDeviceId'), // 蓝牙设备的id
				serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
				characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
			}
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.username = this.userInfo.name;
			this.uid = this.userInfo.uid
			this.initBlue()
			// console.log(this.deviceId, this.deviceStatus)
			if (this.deviceId && this.deviceStatus === 0) {
				this.createInterval()
			}
			
		},
		mounted() {
			this.$refs.ecgRef.init({
				// 小格和大格的border color
				lineColor: ['rgba(0,0,0,0)', '#63b3f8'],
				// ampTime: 'Amp: 10mm/mv  Time: 25mm/sec',
				textColor: '#000',
				wave: {
					// ecg
					// 1秒多少个点
					frameSize: 200,
					yMax: 100,
					waveHeight: 100,
					yOffset: 50,
					// 每次画几个点
					step: 10,
					// 扫纸速度，1 默认 表示 25mm/s (1秒25个小格子 每个小格子0.04s)。 0.5表示扫纸速度为 12.5mm/s。2表示扫纸速度为 50mm/s。
					speedRatio: 0.5,
					lineColor: 'red',
				},
			})
		},
		onDestory() {
			clearInterval(this.connectTime)
		},
		//页面显示
		onShow() {
			this.initBlue()
			uni.$on('backWithData', (data) => {
			    this.uid = data.uid;
			    this.name = data.name;
			});
		},

		methods: {
			handleWarningRule(){
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
			// 由于蓝牙设备的特殊性，需要使用时才能连接，所以在这里使用定时器进行连接
			createInterval() {
				this.listenConnectState()
				this.connectTime = setInterval(() => {
					if (this.deviceCode != -1) {
						this.connect()
					}
				}, 1000)
			},
			initBlue() {
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
						uni.onBluetoothDeviceFound(function(devices) {
							console.log(devices)
							_this.blueDeviceList.push(devices.devices[0])
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
			connect(data) {
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

						// 停止搜索
						// _this.stopDiscovery()
						// uni.showToast({
						// 	title: '连接成功'
						// })
					},
					fail(err) {
						console.log('连接失败')
						console.error(err)
						if (err.errCode === -1) {
							_this.deviceCode = -1
							_this.deviceStatus = 1
							_this.notify()
							return
						} else {
							_this.deviceCode = 0
						}
					},
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
			notify() {
				const _this = this
				uni.notifyBLECharacteristicValueChange({
					deviceId: this.deviceId,
					serviceId: this.serviceId,
					characteristicId: this.characteristicId,
					success(res) {
						console.log(res)
						_this.listenValueChange()
						// _this.resume()
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
					},
				})
			},

			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
					return ('00' + bit.toString(16)).slice(-2)
				})

				return hexArr.join('')
				
			},
			// 解析血氧数据
			processMeasureData(resHex) {
				if (resHex.slice(6, 8) == '08' && resHex.slice(8, 10) == '01') {
					const bytes = []
					for (let i = 0; i < resHex.length; i += 2) {
						bytes.push(parseInt(resHex.substr(i, 2), 16))
					}
					console.log(bytes)
					// aa550f08016358002300c0d7
					// 血氧
					this.oxData[0].value = bytes[5]
					// 脉率
					this.oxData[1].value = (bytes[7] << 8) | bytes[
						6] // Combine two bytes into a single integer using little-endian format
					// PI
					this.oxData[2].value = bytes[8] / 10

					// console.log('---------开始-----------')
					// console.log(`Spo2: ${this.oxData[0].value}, PR: ${this.oxData[1].value}, PI: ${this.oxData[2].value}`)

					// console.log(resHex)
					// console.log('---------结束-----------')
				} else if (resHex.slice(6, 8) == '07' && resHex.slice(8, 10) == '02') {
					// 		`aa550f070213161e29389a`,血氧波形数据上传频率：50Hz，每包发送 5 个波形数据，即每 1 秒发送 10 包波
					// 形数据；
					// 2. Wave[n]：脉搏搏动标志+波形数据（D7 + D6~D0）.
					// D7: 脉搏搏动标志 0 无搏动 1 有搏动
					//  D6~D0: 波形数据， 范围（0~127）。脉搏柱状图可使用归一化的波形数据，
					// 建议使用（波形数据/8），范围为（0~15）
					// 3. 校验：未提供
					const bytes = []

					// console.log('---------波形开始-----------')
					for (let i = 0; i < resHex.length; i += 2) {
						bytes.push(parseInt(resHex.substr(i, 2), 16))
					}
					// console.log(bytes)
					// if (this.waveData.length >= 250) {
					//   this.waveData = []
					// }
					for (let i = 0; i < bytes.length; i++) {
						if (i >= 5 && i <= 9 && bytes[i] <= 127) {
							this.waveData.push(bytes[i])
						}
					}

					// console.log(this.waveData)
					// console.log('---------波形结束-----------')
					// aa550f070213161e29389a
					this.$refs.ecgRef.update(this.waveData)
					this.$refs.ecgRef.resume()
					//分析结果
				} else if (
					resHex.slice(6, 8) == '06' &&
					resHex.slice(8, 10) == '21' &&
					resHex.slice(12, 14) == '04'
				) {
					this.$refs.ecgRef.pause()
					// aa550f062101050000f8,
					//  包头：AA 55
					// - 令牌：0F
					// - 长度：06
					// - 类型：21
					// x04 脉率分析结果
					// 0x 0 脉搏节律未见异常 // 0x 1 疑似脉率稍快 // 0x 2 疑似脉率过快 // 0x 3 疑似阵发性脉率过快 // 0x 4 疑似脉率稍缓
					// 0x 5 疑似脉率过缓// 0x 6 疑似偶发脉搏间期缩短 // 0x 7 疑似脉搏间期不规则 // 0x 8 疑似脉率稍快伴有偶发脉搏间期缩短
					// 0x 9 疑似脉率稍缓伴有偶发脉搏间期缩短 // 0x 0a 疑似脉率稍缓伴有脉搏间期不规则 // 0xFF 信号质量差请重新测量
					// 脉率分析结果
					const res = resHex.slice(14, 16)
					switch (res) {
						case '00':
							this.result = '脉搏节律未见异常'
							break
						case '01':
							this.result = '疑似脉率稍快'
							break
						case '02':
							this.result = '疑似脉率过快'
							break
						case '03':
							this.result = '疑似阵发性脉率过快'
							break
						case '04':
							this.result = '疑似脉率稍缓'
							break
						case '05':
							this.result = '疑似脉率过缓'
							break
						case '06':
							this.result = '疑似偶发脉搏间期缩短'
							break
						case '07':
							this.result = '疑似脉搏间期不规则'
							break
						case '08':
							this.result = '疑似脉率稍快伴有偶发脉搏间期缩短'
							break
						case '09':
							this.result = '疑似脉率稍缓伴有偶发脉搏间期缩短'
							break
						case '0a':
							this.result = '疑似脉率稍缓伴有脉搏间期不规则'
							break
						case 'ff':
							this.result = '信号质量差请重新测量'
							break
						default:
							this.result = ''
							break
					}
					console.log(this.result)
					if(this.result != ''){
						this.btnColor = '#01b09a'
					}
				}
			},
			// 【9】监听消息变化
			listenValueChange() {
				uni.onBLECharacteristicValueChange((res) => {
					// console.log(res)
					let resHex = this.ab2hex(res.value)
					console.log(resHex)
					this.processMeasureData(resHex)
					// this.changeOption(this.measureResult.pressure)
					// console.log(resHex)
				})
			},
			// 监听蓝牙的连接状态
			listenConnectState() {
				uni.onBLEConnectionStateChange((res) => {
					console.log(res)
					if (!res.connected) {
						this.deviceStatus = 0
						this.deviceCode = 0
						this.pause()
						uni.showToast({
							title: '连接已断开',
							icon: 'error',
						})
					}
				})
			},
			resume() {
				// this.$refs.ecgRef.update(this.value)
				this.$refs.ecgRef.update(this.waveData)
				this.$refs.ecgRef.resume()
				this.time = setInterval(() => {
					this.$refs.ecgRef.update(this.waveData)
					// this.$refs.ecgRef.update(this.value)
				}, 1000)
			},
			pause() {
				this.$refs.ecgRef.pause()
				clearInterval(this.time)
			},
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/oximeter/oximeterHistory?uid='+this.uid,
				})
			},
			handleOximeterTrend() {
				uni.navigateTo({
					url: '/pages/healthMonitor/oximeter/oximeterTrend?uid='+this.uid, // 跳转到指定的目标页面
				});
			},
			handleMyUser() {
				uni.navigateTo({
					url: '/pages/homePage/myUsers?type=select' // 跳转到指定的目标页面
				});
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
			handleSave() {
				if(this.result != '' && this.result != '信号质量差请重新测量'){
					this.$http.post('/platform/dataset/call_kw', {
						model: "oximeter",
						method: "create",
						args: [
							[{
								"name": "血氧仪",
								"numbers": this.serviceId,
								"owner": this.uid,
								"blood_oxygen": this.oxData[0].value,
								"pi": this.oxData[1].value,
								"pulse_rate": this.oxData[2].value,
								"input_type": "equipment",
								"test_time":this.formatDate(new Date())
							}]
						],
						kwargs: {}
					}).then(res => {
						if (this.oxData[0].value != 0) {
							this.$refs.uToast.show({
								message: '保存成功',
								type: 'success',
					
							})
							this.btnColor = '#dadada'
							this.oxData[0].value = 0
							this.oxData[1].value = 0
							this.oxData[2].value = 0
							this.value = []
							this.waveData = []
							this.result = ''
							this.ecgRef = null
							
						} else {
							this.$refs.uToast.show({
								message: '保存失败',
								type: 'error',
							})
							this.btnColor = '#dadada'
							this.oxData[0].value = 0
							this.oxData[1].value = 0
							this.oxData[2].value = 0
							this.value = []
							this.waveData = []
							this.result = ''
							this.ecgRef = null
						}
					})
				}else{
					this.$refs.uToast.show({
						message: '保存失败，请检查网络',
						type: 'error',
					})
					this.btnColor = '#dadada'
					this.oxData[0].value = 0
					this.oxData[1].value = 0
					this.oxData[2].value = 0
					this.value = []
					this.waveData = []
					this.result = ''
					this.ecgRef = null
				}
			},
			onPageJump(url) {
				uni.navigateTo({
					url: url,
				})
			},
			onPageSelectDocter(){
				uni.navigateTo({
					url:'/pages/healthAdvisory/treatmentMethod/treatmentMethod',
				})
			},
			onPageMonth(){
				uni.navigateTo({
					url: '/pages/healthMonitor/oximeter/oximeterMonth?uid='+this.uid,
				})
			},
			onPageDevice(){
				uni.navigateTo({
					url: '/pages/mine/myDevice',
				})
			},
			onPageWrite(){
				uni.navigateTo({
					url: '/pages/healthMonitor/' + this.page,
				})
			},
		},
	}
</script>

<style lang="scss">
	.content {
		.data {
			padding: 60rpx 80rpx 0 80rpx;

			.item {
				.value {
					color: #55b880;
				}

				.name {
					font-size: 16px;
				}
			}
		}
	}
</style>