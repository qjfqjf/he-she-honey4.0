<template>

	<view class="container">
		<view class="jump-count">
			{{JumpRoleDataValue}}
		</view>
		<view class="jump-time">
			{{JumpRoleTimeMinute}}:{{JumpRoleTimeSecond}}
		</view>

		<view class="jump-content">
			<view class="jump-count-left">
				<view class="jump-content-top">
					{{Calories}} kcal
				</view>
				<view class="jump-content-buttom">
					热量消耗
				</view>
			</view>
			<view class="jump-count-right">
				<view class="jump-count-top">
					{{FatBurn}} kcal/hr
				</view>
				<view class="jump-count-buttom">
					燃脂效率
				</view>
			</view>
		</view>
		<view class="device-state">
			<u-text color="#01b09a" :text="deviceStatus === 0 ? '设备状态：未连接' : '设备状态：已连接' + '(' + deviceId + ')'">
			</u-text>
		</view>

		<button class="button" @click="save">结束</button>
	</view>
</template>

<script>
	const bluethModule = uni.requireNativePlugin('plugin-BtModule');
	export default {
		data() {
			return {
				// 设备状态
				deviceStatus: 0,
				deviceId: uni.getStorageSync('tsDeviceId'), // 蓝牙设备的id
				macAddr: uni.getStorageSync('macAddr'),
				name: uni.getStorageSync('name'),
				communicationType: uni.getStorageSync('communicationType'),
				dataResult: '',
				JumpRoleDataValue: "0",
				JumpRoleTimeMinute: "00",
				JumpRoleTimeSecond: "00",
				Calories: "0",
				FatBurn: "0",
				type:0,
				setting:0,
				time:0,
				avg_freq:90,
				fastest_freq:90,
				freqs:'[{"duration":8, "skip_count":12}]',
				freq_count:0,
				most_jump:12,
				burned:1.0,
				efficiency:450.0,
			}
		},
		mounted() {
			this.initPrinter(); // 等待 initPrinter 函数完成
			this.timer = setTimeout(async () => {
				this.connectedDevice(); // 等待 connectedDevice 函数完成
			}, 2000);
		},
		//方法
		methods: {
			save(){
				this.$http.post('/skip/create', {
					uid: 355,
					type:this.type,
					setting:0,
					elapsed_time:30,
					value:30,
					avg_freq:this.avg_freq,
					fastest_freq:this.fastest_freq,
					freqs:this.freqs,
					freq_count:this.freq_count,
					most_jump:this.most_jump,
					burned:this.burned,
					efficiency:this.efficiency,
					time:this.formatDate(new Date()),

					// uid: this.uid,
					// type:this.type,
					// setting:this.setting,
					// elapsed_time:this.time,
					// value:this.JumpRoleDataValue,
					// avgFreq:this.avg_freq,
					// fastest_freq:this.fastest_freq,
					// freqs:this.freqs,
					// freq_count:this.freq_count,
					// most_jump:this.most_jump,
					// burned:this.burned,
					// efficiency:this.efficiency,
					// time:this.formatDate(new Date()),
				}).then(res => {
					this.$refs.uToast.show({
						message: '保存成功',
						type: 'success',
					})
				})
			},
			test() {
				console.log("方法被调用");
			},
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
				console.log(111111111111, params)
				if (this.deviceId != '') {
					_this.deviceStatus = 1
					bluethModule.connectedDevice(params, (result) => {
						if (result && result.code === 200) {
							if (result.message === 'device-result') {
								this.dataResult = result.data; // 设备结果
								console.log("返回的数据", this.dataResult)
								this.getValue(this.dataResult)
							}
						}
					});
				}
			},
			getValue(dataResult) {
				const startIndexUnit = dataResult.indexOf('mode=');
				const endIndexUnit = dataResult.indexOf(',', startIndexUnit); // 使用 startIndexUnit
				const mode = dataResult.substring(startIndexUnit + 5, endIndexUnit);
				if (mode === 'ICSkipModeFreedom') {
					const startSkipCountIndex = dataResult.indexOf('skip_count=');
					const endSkipCountIndex = dataResult.indexOf(',', startSkipCountIndex);
					const skipCount = dataResult.substring(startSkipCountIndex + 11, endSkipCountIndex);
					this.JumpRoleDataValue = skipCount
					const startTimeIndex = dataResult.indexOf('actual_time=');
					const endTimeIndex = dataResult.indexOf(',', startTimeIndex);
					const Time = dataResult.substring(startTimeIndex + 12, endTimeIndex);
					this.time = Time;
					this.formatStringNumberToTime(Time)
					const startCaloriesIndex = dataResult.indexOf('calories_burned=');
					const endCaloriesIndex = dataResult.indexOf(',', startCaloriesIndex);
					const Calories = dataResult.substring(startCaloriesIndex + 16, endCaloriesIndex);
					this.Calories = Calories
					const startFatBurnIndex = dataResult.indexOf('fat_burn_efficiency=');
					const endFatBurnIndex = dataResult.indexOf(',', startFatBurnIndex);
					const FatBurn = dataResult.substring(startFatBurnIndex + 20, endFatBurnIndex);
					this.FatBurn = FatBurn
				} else {
					this.JumpRoleDataValue = "未查找到设备"
				}
			},
			formatStringNumberToTime(strNumber) {
				const number = parseInt(strNumber, 10);
				const minutes = Math.floor(number / 60);
				const seconds = number % 60;

				const formattedMinutes = String(minutes).padStart(2, '0');
				const formattedSeconds = String(seconds).padStart(2, '0');
				this.JumpRoleTimeMinute = formattedMinutes
				this.JumpRoleTimeSecond = formattedSeconds
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

<style>
	/* CSS 代码 */
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		width: 100%;
	}


	.jump-count {
		width: 100%;
		height: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 100rpx;
		/* 调整字体大小为60rpx，可以根据需要调整 */
	}

	.jump-time {
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 60rpx;
		/* 调整字体大小为60rpx，可以根据需要调整 */
	}

	.jump-count,
	.jump-time,
	.jump-content,
	.device-state,
	.button {
		margin: 5px;
		/* 可以调整子元素之间的间距 */
	}


	/* CSS 代码 */
	.jump-content {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.jump-count-left {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 让子元素在垂直方向上居中 */
		height: 120rpx;

		justify-content: center;
	}

	.jump-content-top,
	.jump-content-buttom {
		/* 这里可以添加其他样式，根据需要调整 */
		text-align: center;
		/* 让文本内容水平居中 */
		margin-top: 20rpx;
	}


	.jump-count-right {
		/* 这里可以添加其他样式，根据需要调整 */
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 120rpx;
		justify-content: center;
	}

	.jump-count-top,
	.jump-count-buttom {
		/* 这里可以添加其他样式，根据需要调整 */
		text-align: center;
		/* 让文本内容水平居中 */
		margin-top: 20rpx;
	}

	.device-state {
		margin-top: 40rpx;
		height: 40rpx;
	}

	.button {
		height: 80rpx;
		background-color: rgb(32, 198, 162);
		color: aliceblue;
		display: flex;
		align-items: center;
		width: 90%;
		justify-content: center;
		border-radius: 45rpx;
	}
</style>