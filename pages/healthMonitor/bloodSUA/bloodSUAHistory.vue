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
					v-if="index === 0 || item.test_time.split(' ')[0] !== historyList[index - 1].test_time.split(' ')[0]">
					{{item.test_time.split(" ")[0]}}</view>
				<view class="record">
					<text>{{item.test_time.split(" ")[1]}}</text>
					<!-- <text>{{item.category}}</text> -->
					<text>血尿酸</text>
					<view class="index up" v-if="item.oml_l > targetIndex">
						<text class="text">{{item.oml_l}}</text>
						<text class="arrow">{{arrowUp}}</text>
					</view>
					<view class="index down" v-else>
						<text class="text">{{item.oml_l}}</text>
						<text class="arrow">{{arrowDown}}</text>
					</view>
		
					<!-- 手动录入 -->
					<text class="write-by-hand" v-if="item.input_type=='equipment'">设备输入</text>
					<text class="write-by-hand" v-else="item.input_type=='hend'">手动输入</text>
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
					// {
					// date: '2021-02-24',
					// record: [
				// 		{
				// 		time: '07:23:30',
				// 		state: '血尿酸',
				// 		index: '478',
				// 		writeByHand: '手动录入'
				// 	}, {
				// 		time: '07:23:30',
				// 		state: '血尿酸',
				// 		index: '389',
				// 		writeByHand: ''
				// 	}, ]
				// }, {
				// 	date: '2021-02-24',
				// 	record: [{
				// 		time: '07:23:30',
				// 		state: '血尿酸',
				// 		index: '455',
				// 		writeByHand: ''
				// 	}, {
				// 		time: '07:23:30',
				// 		state: '血尿酸',
				// 		index: '390',
				// 		writeByHand: '手动录入'
				// 	}, ]
				// }, {
				// 	date: '2021-02-24',
				// 	record: [{
				// 		time: '07:23:30',
				// 		state: '血尿酸',
				// 		index: '478',
				// 		writeByHand: '手动录入'
				// 	}, {
				// 		time: '07:23:30',
				// 		state: '血尿酸',
				// 		index: '389',
				// 		writeByHand: ''
				// 	}, ]
				// }, 
				],
			};
		},

		methods: {
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},
			//查询血尿酸历史记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "blood.glucose.uric.acid.cholesterol",
					fields: [
						"name",
						"numbers",
						"owner",
						"category",
						"oml_l",
						"input_type",
						"test_time"
					]
				}).then(res => {
					this.historyList = res.result.records
				})
			}
		},
		onLoad() {
			this.getHistoryList();
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