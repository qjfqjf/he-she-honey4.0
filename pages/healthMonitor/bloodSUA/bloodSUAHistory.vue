<template>
	<view class="container">
		<z-nav-bar title="血尿酸历史">
			<view slot="right" class="p-2" @click="handleDevelop()">
				<text class="regular">预警规则</text>
			</view>
		</z-nav-bar>
		<public-module></public-module>


		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item" v-for="(item, index) in historyList" :key="index">
				<view class="date"
					v-if="index === 0 || item.time.split(' ')[0] !== historyList[index - 1].time.split(' ')[0]">
					{{item.time.split(" ")[0]}}</view>
				<view class="record">
					<text>{{item.time.split(" ")[1]}}</text>
					<!-- <text>{{item.category}}</text> -->
					<text>血尿酸</text>
					
					<view class="index up">
						<text class="text" :style="getSugarColor(item.warning_level)">{{item.value}}</text>
						<text class="arrow" v-if="item.warning_level>0" :style="getSugarColor(item.warning_level)">{{arrowUp}}</text>
					</view>
					<!-- <view class="index up" v-if="item.value > targetIndex">
						<text class="text">{{item.value}}</text>
						<text class="arrow">{{arrowUp}}</text>
					</view>
					<view class="index down" v-else>
						<text class="text">{{item.value}}</text>
						<text class="arrow">{{arrowDown}}</text>
					</view> -->
		
					<!-- 手动录入 -->
					<text class="write-by-hand">{{item.type_cn}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				targetIndex: 400,
				arrowUp: '↑',
				arrowDown: '↓',
				historyList: [
					
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
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},
			//查询血尿酸历史记录
			getHistoryList() {
				this.$http.post('/blood_ua/index', {
					uid: this.uid,
				}).then(res => {
					this.historyList = res.data
					console.log(this.historyList)
				})
			},
			getSugarColor(suagrLevel) {
				switch (suagrLevel) {
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
		},

	}
</script>

<style lang="scss">
	.container {
		font-size: 30rpx;

		.regular {
			font-size: 26rpx;
		}

		.content-body {
			.item {
				.date {
					padding: 26rpx;
				}

				.record {
					display: flex;
					background-color: white;
					padding: 30rpx 20rpx;
					border-top: 1rpx solid #ddd;
					box-sizing: border-box;

					text {
						margin-right: 40rpx;
					}

					.index {
						margin-left: 20rpx;

						.text {
							margin-right: 10rpx;
						}

						.arrow {
							font-weight: 700;
						}
					}

					.up {
						color: #f10000;
					}

					.down {
						color: #ffa053;
					}

					.write-by-hand {
						color: #01b09a;
					}
				}
			}
		}
	}
</style>