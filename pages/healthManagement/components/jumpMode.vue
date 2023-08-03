<template>
	<view class="container">
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url, baseListItem.title)">
					<image style="width: 130rpx;height: 130rpx;" :src="baseListItem.img" mode="aspectFit">
					</image>
					<text class="grid-text mt-2">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		
		<view class="device-state">
			<u--text class="d-flex j-center" color="#01b09a"
				:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>
		</view>
	</view>
</template>

<script>
	const bluethModule = uni.requireNativePlugin('plugin-BtModule');
	export default{
		data() {
			return {
				currentTab: 'tab1', //但前选项卡
				baseList: [{
						img: require('@/static/icon/healthManagement/sportsRecord.png'),
						title: '自由跳',
						url: '/pages/healthManagement/sports/freeJump'
					},
					{
						img: require('@/static/icon/healthManagement/skipping.png'),
						title: '倒计时',
						url: '/pages/healthManagement/sports/demo'
					},
					{
						img: require('@/static/icon/healthManagement/sportsReport.png'),
						title: '倒计数',
						url: '/pages/healthManagement/sports/demo'
					},
		
				],
				deviceStatus: 0,
				deviceId: uni.getStorageSync('tsDeviceId'), // 蓝牙设备的id
				// 日期范围
				range: ['2021-02-1', '2021-3-28'],
				recordList: [{
					date: '2022-03-11 23:34',
					skippingType: '自由跳',
					skippingCount: 103,
					skippingKcal: 6,
					takeTime: '00:30'
				}, {
					date: '2022-03-11 23:34',
					skippingType: '自由跳',
					skippingCount: 103,
					skippingKcal: 6,
					takeTime: '00:30'
				}, {
					date: '2022-03-11 23:34',
					skippingType: '自由跳',
					skippingCount: 103,
					skippingKcal: 6,
					takeTime: '00:30'
				}, {
					date: '2022-03-11 23:34',
					skippingType: '自由跳',
					skippingCount: 103,
					skippingKcal: 6,
					takeTime: '00:30'
				}, {
					date: '2022-03-11 23:34',
					skippingType: '自由跳',
					skippingCount: 103,
					skippingKcal: 6,
					takeTime: '00:30'
				}, ],
				macAddr: uni.getStorageSync('macAddr'),
				name: uni.getStorageSync('name'),
				communicationType: uni.getStorageSync('communicationType'),
				dataResult: '',
			};
		},
		
		async onLoad() {
			this.initPrinter()
			this.timer = setTimeout(() => {
				this.connectedDevice()
			}, 2000)
		
		},
		//方法
		methods: {
			/* 初始化 */
			initPrinter() {
				bluethModule.initBluetooth((res) => {
					if (res.code === 200) {
						console.log(`bluethModule---`, JSON.stringify(res));
						this.stateMsg = res['data'];
					}
				});
			},
			/* 连接设备 */
			connectedDevice() {
				const _this = this
				const params = {
					macAddr: this.macAddr,
					name: this.name,
					communicationType: this.communicationType,
				};
				console.log(111111111111,params)
				_this.deviceStatus = 1
				bluethModule.connectedDevice(params, (result) => {
					if (result && result.code === 200) {
						if (result.message === 'device-result') {
							this.dataResult = result.data; // 设备结果
							console.log("返回的数据",this.dataResult)
							// this.getValue(this.dataResult)
						}
					}
				});
			},
			gotoReport() {
				console.log('跳到营养分析报告页面')
				uni.navigateTo({
					url: '/pages/healthManagement/diet/nutritionReport'
				})
			},
			click(url, name) {
				if (!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});;
			},
			// 时间区域
			maskClick(e) {
				console.log('maskClick事件:', e);
			}
		
		},
		
	}
</script>

<style lang="scss">
	.contaner {

		// overflow-y: hidden;
		.analysis-report {
			font-size: 28rpx;
		}

		.content {
			border-top: 1rpx solid #ececec;
			height: calc(100vh - 88rpx);
			font-size: 30rpx;

			.tab-container {
				background-color: white;

				.tab {
					padding: 18rpx;
					width: 100%;
					text-align: center;
					font-weight: 400;
					cursor: pointer;

					&.active {
						background-color: white;
						font-weight: 600;
						border-bottom: #01b09a 6rpx solid;
						color: #01b09a;
					}
				}
			}

			.historyCard {
				border-top: 1rpx solid #ececec;

				.date-range {
					background-color: #fff;
					padding: 10px;
					border-bottom: #01b09a 2rpx solid;
				}

				.record-item {
					margin: 10rpx 0;
					font-size: 29rpx;

					.record-content {
						padding: 10rpx;
						margin-top: 10rpx;
						background-color: white;

						.date {
							border-bottom: 1rpx solid #ececec;
							padding: 16rpx;
							display: flex;
							justify-content: space-between;
						}

						.line {
							padding: 10rpx 20rpx;
							display: flex;
							justify-content: space-between;

							.title {}

							.result {}
						}
					}

				}
			}

			.checkCard {
				border-top: 1rpx solid #ececec;
				padding: 20rpx;
				background-color: white;
				height: calc(100vh - 188rpx);

				.devices-warp {
					display: flex;
					flex-wrap: wrap;

					.item {
						flex-basis: 40%;
						padding: 30rpx;
						margin: 30rpx;
						width: 180rpx !important;
						border-radius: 20rpx;
						background-color: #effffe !important;
						box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);

						&:nth-child(5n) {
							margin-right: 0;
						}

						.grid-text {
							// font-size: 30rpx;
						}
					}
				}

				.device-state {
					display: flex;
					justify-content: center;

					text {
						margin-top: 20rpx;
						font-size: 26rpx
					}
				}
			}
		}
	}

	// .active {
	//   color: #20c49f;
	// }
</style>