<template>

	<view class="b-content p-2">
		<z-nav-bar title="血压历史">
			<view slot="right" class="p-2" @click="handleWarningRule">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<view class="history" v-for="(item,index) in dataList" :key="index">
			<view class="date">
				<view class="time">
					{{item.createtime}}
				</view>
				<view class="input-type">
					{{item.type_cn}}
				</view>
			</view>
			<view class="item">
				<view class="SYS">
					<view class="name">
						收缩压 (mmHg)
					</view>
					<view class="value" :style="getSystolicColor(item.systolic_level)">
						{{ item.systolic_pressure }}
					</view>

				</view>
				<view class="DIA">
					<view class="name">
						舒张压 (mmHg)
					</view>
					<view class="value" :style="getDiastolicColor(item.diastolic_level)">
						{{item.diastolic_pressure}}
					</view>
				</view>
				<view class="PUL">
					<view class="name">
						心率(次/分)
					</view>
					<view class="value" :style="getPulseColor(item.pulse_level)">
						{{item.pulse}}
					</view>
				</view>
				<view class="position">
					<view class="name">
						检测部位
					</view>
					<view class="value" v-if="item.tag === 'left'">
						左侧
					</view>
					<view class="value" v-else>
						右侧
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: 0,
				userInfo: '',
				dataList: [

				],
			};
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// this.uid = this.userInfo
			// 获取URL参数
			const uid = options.uid;
			if (uid == 0) {
				this.uid = this.userInfo
			} else {
				this.uid = uid
			}
			console.log(111111,this.uid)
			this.getHistoryList();
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},

			getHistoryList() {
				this.$http.post('/blood_pressure/index', {
					uid: this.uid,
				}).then(res => {
					this.dataList = res.data
				})
			},

			getSystolicColor(systolicLevel) {
				switch (systolicLevel) {
					case 0:
						return 'color: black';
					case 1:
						return 'color: rgb(234, 229, 170)';
					case 2:
						return 'color: rgb(255, 117, 112)';
					case 3:
						return 'color: orange';
					case 4:
						return 'color: red';
					default:
						return '';
				}
			},
			getDiastolicColor(diastolicLevel) {
				switch (diastolicLevel) {
					case 0:
						return 'color: black';
					case 1:
						return 'color: rgb(234, 229, 170)';
					case 2:
						return 'color: rgb(255, 117, 112)';
					case 3:
						return 'color: orange';
					case 4:
						return 'color: red';
					default:
						return '';
				}
			},
			getPulseColor(pulseLevel) {
				switch (pulseLevel) {
					case 0:
						return 'color: black';
					case 1:
						return 'color: rgb(234, 229, 170)';
					case 2:
						return 'color: rgb(255, 117, 112)';
					case 3:
						return 'color: orange';
					case 4:
						return 'color: red';
					default:
						return '';
				}
			},
			handleWarningRule() {
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
		},
		
	}
</script>

<style lang="scss">
	.history {
		.date {
			margin-top: 15rpx;
			background-color: rgb(255, 255, 255);
			display: flex;
			justify-content: space-between;
			padding-left: 15rpx;
			padding-right: 15rpx;
			height: 70rpx;
			align-items: center;
			font-size: 35rpx;
		}

		.item {
			margin-top: 5rpx;
			background-color: rgb(255, 255, 255);
			padding-left: 15rpx;
			padding-right: 15rpx;

			.SYS {
				display: flex;
				justify-content: space-between;
				// padding-left: 15rpx;
				padding-right: 15rpx;
				height: 65rpx;
				align-items: center;
				font-size: 30rpx;
			}

			.DIA {
				display: flex;
				justify-content: space-between;
				// padding-left: 15rpx;
				padding-right: 15rpx;
				height: 65rpx;
				align-items: center;
				font-size: 30rpx;
			}

			.PUL {
				display: flex;
				justify-content: space-between;
				// padding-left: 15rpx;
				padding-right: 15rpx;
				height: 65rpx;
				align-items: center;
				font-size: 30rpx;
			}

			.position {
				display: flex;
				justify-content: space-between;
				// padding-left: 15rpx;
				padding-right: 15rpx;
				height: 65rpx;
				align-items: center;
				font-size: 30rpx;
			}
		}
	}
</style>