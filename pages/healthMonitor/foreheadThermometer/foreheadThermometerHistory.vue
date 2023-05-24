<template>
	<view class="container">
		<z-nav-bar title="额温枪历史">
			<view slot="right" class="p-2" @click="handleDevelop()">
				<text class="regular">预警规则</text>
			</view>
		</z-nav-bar>
		<public-module></public-module>


		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item" v-for="(item,index) in historyList" :key="item.id">
				<view class="date">{{item.test_time.split(" ")[0]}}</view>
				<view class="record">
					<text>{{item.test_time.split(" ")[1]}}</text>
					<text>体温</text>
					<text class="text">{{item.temperature}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: [],
				// historyList: [
				// {
				// 	date: '2021-02-24',
				// 	record: [{
				// 		time: '07:23:30',
				// 		state: '体温',
				// 		index: '36.5℃',
				// 		writeByHand: '手动录入'
				// 	}, {
				// 		time: '07:23:30',
				// 		state: '体温',
				// 		index: '36.5℃',
				// 		writeByHand: ''
				// 	}, ]
				// }, {
				// 	date: '2021-02-24',
				// 	record: [{
				// 		time: '07:23:30',
				// 		state: '体温',
				// 		index: '36.5℃',
				// 		writeByHand: ''
				// 	}, {
				// 		time: '07:23:30',
				// 		state: '体温',
				// 		index: '36.5℃',
				// 		writeByHand: '手动录入'
				// 	}, ]
				// }, {
				// 	date: '2021-02-24',
				// 	record: [{
				// 		time: '07:23:30',
				// 		state: '体温',
				// 		index: '36.5℃',
				// 		writeByHand: '手动录入'
				// 	}, {
				// 		time: '07:23:30',
				// 		state: '体温',
				// 		index: '36.5℃',
				// 		writeByHand: ''
				// 	}, ]
				// }, 
				// ],
			};
		},

		methods: {
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},
			//查询额温枪历史记录
			getHistoryList() {
				uni.request({
					url: 'http://106.14.140.92:8881/platform/dataset/search_read',
					method: 'post',
					data: {
						params: {
							model: "forehead.temperature.gun",
							token: "f5164fb636982e4a43b28d09a99bb3b3",
							uid: '2',
							fields: [
								"name",
								"numbers",
								"owner",
								"temperature",
								"test_time"
							]
						}
					},
					success:(res) => {
						this.historyList = res.data.result.records;
						console.log(this.historyList)
					}
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
						margin-right: 80rpx;
					}

					.text {
						color: #01b09a;
					}
				}
			}
		}
	}
</style>