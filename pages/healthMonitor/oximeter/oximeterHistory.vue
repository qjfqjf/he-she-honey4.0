<template>
	<view class="container">
		<z-nav-bar title="血氧历史"></z-nav-bar>
		<public-module></public-module>


		<!-- 正文内容 -->
		<view class="content-body" v-for="(item, index) in historyList" :key="item.id">
			<u-read-more :toggle="true" :closeText="'查看更多'" :text="item"></u-read-more>
			<view class="item">
				<view class="date"
					v-if="index === 0 || item.test_time.split(' ')[0] !== historyList[index - 1].test_time.split(' ')[0]">
					<!-- <text>{{item.test_time.split(" ")[0]}}</text> -->
					<text>{{item.test_time}}</text>
				</view>
				<view class="flex">
					<view class="line">
						<text class="title">血氧</text>
						<text class="result right">{{item.blood_oxygen}}</text>
					</view>
					<view class="line">
						<text class="title">脉率</text>
						<text class="result">{{item.pulse_rate}}</text>
					</view>
					<view class="line">
						<text class="title">PI</text>
						<text class="result">{{item.pi}}</text>
					</view>
					<view class="line">
						<text class="title">分析结果</text>
						<text class="result">
							<!-- {{item.result}} -->
							脉搏节律未见异常
						</text>
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
				historyList: [
					// {
					// 	date: '2022-03-11 23:34',
					// 	bloodOxygen: '97',
					// 	pi: '9.8',
					// 	pulseRate: 10,
					// 	result: '脉搏节律未见异常'
					// },
					// {
					// 	date: '2022-03-11 23:34',
					// 	bloodOxygen: '97',
					// 	pi: '9.8',
					// 	pulseRate: 10,
					// 	result: '脉搏节律未见异常'
					// }, {
					// 	date: '2022-03-11 23:34',
					// 	bloodOxygen: '97',
					// 	pi: '9.8',
					// 	pulseRate: 10,
					// 	result: '脉搏节律未见异常'
					// }, {
					// 	date: '2022-03-11 23:34',
					// 	bloodOxygen: '97',
					// 	pi: '9.8',
					// 	pulseRate: 10,
					// 	result: '脉搏节律未见异常'
					// },
					// {
					// 	date: '2022-03-11 23:34',
					// 	bloodOxygen: '97',
					// 	pi: '9.8',
					// 	pulseRate: 10,
					// 	result: '脉搏节律未见异常'
					// }
				],
			};
		},

		methods: {
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},
			//查询血氧历史记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "oximeter",
					fields: [
						"name",
						"numbers",
						"owner",
						"blood_oxygen",
						"pi",
						"pulse_rate",
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
	.right {
		text-align: right;
	}

	.container {
		font-size: 30rpx;

		.regular {
			font-size: 26rpx;
		}

		.content-body {
			.item {
				padding: 10rpx;
				margin-top: 10rpx;
				background-color: white;

				.date {
					border-bottom: 1rpx solid #ececec;
					padding: 16rpx;
				}

				.flex {
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
	}
</style>