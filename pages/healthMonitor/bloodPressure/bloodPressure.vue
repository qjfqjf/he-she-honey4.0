<template>
	<view class="b-content p-2">
		<z-nav-bar title="血压">
			<view slot="right" class="p-2" @click="handleWarningRule">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader  :username="username" @myUser="handleMyUser"></HealthHeader>
		<!-- tab切换 -->
		<view class="tab-container d-flex j-center my-3">
			<view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">左侧</view>
			<view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">右侧</view>
		</view>

		<view class="echarts-content">
			<!-- #ifdef APP-PLUS || H5 -->
			<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts"
				class="echarts">
			</view>
			<!-- #endif -->

			<!-- #ifndef APP-PLUS || H5 -->
			<view>非 APP、H5 环境不支持</view>
			<!-- #endif -->
		</view>
		<TipInfo title="血压趋势" @trend="handleBloodPressureTrend"></TipInfo>
		<u--text class="d-flex j-center" color="#01b09a"
			:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSavePressure"></u-button>
		<u--text class="d-flex j-center mt-2" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleJump()">
		</u--text>
		<view class="measureData">
			<!-- <u--text class="pb-2" text="血压数值"></u--text> -->
			<view class="d-flex j-sb">
				<view class="data-box-SYS">
					<view class="text-content">
						<view class="value">
							{{measureResult.SYS}}
						</view>
						<view class="desc">
							收缩压mmHg
						</view>
					</view>
				</view>
				<view class="data-box-DIA">
					<view class="text-content">
						<view class="value">
							{{measureResult.DIA}}
						</view>
						<view class="desc">
							舒张压mmHg
						</view>
					</view>
				</view>
				<view class="data-box-PUL">
					<view class="text-content">
						<view class="value">
							{{measureResult.PUL}}
						</view>
						<view class="desc">
							心率bpm
						</view>
					</view>
				</view>
			</view>
		</view>
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
	import baseUrl from '@/config/baseUrl.js'
	export default {
		components: {
			HealthHeader,
			TipInfo,
			BottomNavigation
		},
		data() {
			return {
				user: '王大大',
				currentTab: 'tab1', //但前选项卡
				deviceStatus: 0,
				option: {
					animation: false,
					tooltip: {
						formatter: '{a} <br/>{b} : {c}%'
					},
					series: [{
						name: 'Pressure',
						type: 'gauge',
						min: 0, //起始最小刻度值
						max: 300, //最大刻度值
						axisLine: {
							lineStyle: {
								width: 3, //仪表盘宽度
								color: [
									[1, '#20c6a2'],

								],
							}
						},
						progress: {
							show: true
						},
						detail: {
							valueAnimation: false,
							formatter: '{value}'
						},
						data: [{
							value: 0,
							// name: '血压'
						}]
					}]
				},
				measureResult: {
					pressure: 0, //动态血压
					SYS: 0, // 收缩压值
					DIA: 0, // 舒张压值
					PUL: 0, // 脉搏值
				},
				btnColor: '#dadada',
				lastReceivedData: null,
				value: new Int8Array(), // 接收到设备的传输结果
				blueDeviceList: [],
				deviceId: uni.getStorageSync('jkDeviceId'), // 蓝牙设备的id
				serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
				characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
				userInfo: '',
				uid: 0, //用户选择的id
				username: '', //登录的名字
				// 底部工具栏
				page: '',
				toolList: [{
						img: require('@/static/icon/select_docter.png'),
						title: '找医生',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
					},
					{
						img: require('@/static/icon/bloodPressure/month.png'),
						title: '月报',
						url: '/pages/healthMonitor/bloodPressure/bloodPressureMonth'
					},
					{
						img: require('@/static/icon/bloodPressure/device.png'),
						title: '设备',
						url: '/pages/mine/myDevice'
					},
					{
						img: require('@/static/icon/bloodPressure/write.png'),
						title: '手动录入',
						url: '/pages/healthMonitor/bloodPressure/manualEntry'
					},
				],
				tag:'left'
			};
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			console.log(111111,this.uid)
			this.getUserInfo()
			this.initBlue()
			if (this.deviceId && this.deviceStatus === 0) {
				this.connect()
			}
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
			// 数据发生变化时
			changeOption(value) {
				const data = this.option.series[0].data
				data[0].value = value
				this.measureResult.pressure = value
			},
			onViewClick(options) {
				console.log(options)
			},

			handleWarningRule() {
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
			handleBloodPressureTrend() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodPressure/bloodPressureTrend?uid=' + this.uid, // 跳转到指定的目标页面
				});
			},
			handleJump() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodPressure/bloodpressureHistory?uid=' + this.uid,
				});
			},
			handleSavePressure() {
				if(this.measureResult.pressure != 0 && this.measureResult.SYS != 0){
					if(this.currentTab === 'tab1'){
						this.tag = 'left'
					}else{
						this.tag = 'right'
					}
					this.$http.post('/blood_pressure/create', {
						uid: this.uid,
						systolic_pressure: this.measureResult.SYS,
						diastolic_pressure: this.measureResult.DIA,
						pulse: this.measureResult.PUL,
						tag: this.tag,
						time: this.formatDate(new Date()),
						type: 1
					}).then(res => {
						if (this.measureResult.pressure != 0) {
							this.$refs.uToast.show({
								message: '保存成功',
								type: 'success',
							})
							this.btnColor = '#dadada'
							this.measureResult.SYS = 0
							this.measureResult.DIA = 0
							this.measureResult.PUL = 0
							this.measureResult.pressure = 0
							this.option.series[0].data[0].value = 0
						}else{
							this.$refs.uToast.show({
								message: '保存失败',
								type: 'error',
							})
							this.btnColor = '#dadada'
							this.measureResult.SYS = 0
							this.measureResult.DIA = 0
							this.measureResult.PUL = 0
							this.measureResult.pressure = 0
							this.option.series[0].data[0].value = 0
						}
					})
				}else{
					this.$refs.uToast.show({
						message: '保存失败，请检查网络',
						type: 'error',
					})
					this.btnColor = '#dadada'
					this.measureResult.SYS = 0
					this.measureResult.DIA = 0
					this.measureResult.PUL = 0
					this.measureResult.pressure = 0
					this.option.series[0].data[0].value = 0
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
				return hexArr
			},
			// 【9】监听消息变化
			listenValueChange() {
				uni.onBLECharacteristicValueChange(res => {
					// console.log(res)
					let resHex = this.ab2hex(res.value)
					this.processMeasureData(res.value, resHex)
					// this.changeOption(this.measureResult.pressure)
					// console.log(resHex)
				})
			},
			processMeasureData(buffer, hexArr) {
				const data = new Int8Array(buffer);
				//处理动态血压
				if (data.length === 6 && data[0] === -2 && data[1] === -124 && data[5] === 4) {
					const dataString = hexArr.join('')
					if (this.lastReceivedData !== dataString) {
						this.changeOption(parseInt(hexArr.join('').slice(4, 8), 16))
						this.lastReceivedData = dataString;
					}
				}
				// 处理最终结果
				if (this.value.length > 0 && this.value.length < 24) {

					// this.startValue = this.value
					this.value = new Int8Array([...this.value, ...data])
					// this.value.set(this.startValue)
					// this.value.set(data, this.startValue.length)
					if (this.value.length > 24) {
						this.value = this.value.slice(0, this.value.findIndex(num => num === -2) + 1)

					}

				}
				if (data[0] == -1 && data.length >= 1) {
					this.value = data
				}
				if (this.value.length >= 24) {
					this.measureResult.SYS = this.value[10] & 0xff
					this.measureResult.DIA = this.value[11] & 0xff
					this.measureResult.PUL = this.value[12] & 0xff
					this.btnColor = '#01b09a'
				}
			},

			onPageJump(url) {
				uni.navigateTo({
					url: url
				});

			},

			onPageSelectDocter() {
				uni.navigateTo({
					url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
				})
			},
			onPageMonth() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodPressure/bloodPressureMonth?uid=' + this.uid,
				})
			},
			onPageDevice() {
				uni.navigateTo({
					url: '/pages/mine/myDevice',
				})
			},
			onPageWrite() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodPressure/manualEntry?uid=' + this.uid,
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

		},
	}
</script>
<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/js/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
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

	.b-content {
		background-color: #fff;

		// .header {
		// 	position: relative;

		// 	.left {
		// 		sppan {
		// 			color: #424242;
		// 		}
		// 	}

		// 	.member {
		// 		color: #20c49f;

		// 		&::after {
		// 			content: '';
		// 			position: absolute;
		// 			// right: 12rpx;
		// 			top: 50%;
		// 			transform: translateY(-50%);
		// 			width: 20rpx;
		// 			height: 20rpx;
		// 			background: url('@/static/icon/bloodPressure/arrow-right.png') no-repeat center/cover;

		// 		}
		// 	}
		// }

		.tab {
			padding: 10rpx;
			width: 160rpx;
			text-align: center;
			font-weight: 400;
			border: 2rpx solid #01b09a;
			border-radius: 12rpx;
			color: #20c49f;
			cursor: pointer;

			&.active {
				background-color: #01b09a;
				color: #fff;
			}

			&+.tab {
				border-left: none;
				margin-left: -16rpx;
			}


		}

		.echarts-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.echarts {
				margin-top: 20rpx;
				width: 100%;
				height: 600rpx;
			}
		}



		.data-box-SYS {
			position: relative;
			width: 220rpx;
			height: 292rpx;
			text-align: center;
			border-radius: 16rpx;
			background: url('@/static/icon/bloodPressure/SYS.png') no-repeat center/cover;

			.text-content {
				position: absolute;
				top: 45%;
				left: 12%;


			}
		}

		.data-box-DIA {
			position: relative;
			width: 220rpx;
			height: 292rpx;
			text-align: center;
			border-radius: 16rpx;
			background: url('@/static/icon/bloodPressure/DIA.png') no-repeat center/cover;

			.text-content {
				position: absolute;
				top: 45%;
				left: 12%;



			}
		}

		.data-box-PUL {
			position: relative;
			width: 220rpx;
			height: 292rpx;
			text-align: center;
			border-radius: 16rpx;
			background: url('@/static/icon/bloodPressure/PUL.png') no-repeat center/cover;

			.text-content {
				position: absolute;
				top: 45%;
				left: 25%;



			}
		}

		.value {
			font-size: 24px;
			font-weight: 700;
			color: #01b09a;
		}

		.desc {
			font-size: 14px;
			color: #3cc0b0;
		}

	}
</style>