<template>
	<view class="container">
		<z-nav-bar title="心电图历史"></z-nav-bar>
		<public-module></public-module>


		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item" v-for="(item, index) in historyList" :key="index">
				<image :src="'data:image/png;base64,'+item.electrocardiogram" mode="aspectFill"></image>
				<view class="personal-info">
					<view class="info-item">
						<text>姓名：{{item.owner[1]}}</text>
						<!-- <text>性别：{{item.info.sex}}</text> -->
					</view>
					<view class="info-item">
						<text>出生日期：1967-08-09</text>
					</view>
					<view class="info-item">
						<text>身高(cm)：1.78</text>
						<text>体重(kg)：78.0</text>
					</view>
					<view class="info-item">
						<text>时间：{{item.test_time}}</text>
						<text>心率：{{item.wavelength}}</text>
					</view>
					<view class="info-item">
						<text>分析结果：波形未见异常</text>
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
				// 	{
				// 	img: require('@/static/img/ergometer/ergometer.jpg'),
				// 	info: {
				// 		name: '鹏辉',
				// 		sex: '男',
				// 		birth: '1967-08-09',
				// 		height: '1.78',
				// 		weight: '78.0',
				// 		time: '2022-09-09 20:50:10',
				// 		heartRate: '92',
				// 		result: '波形未见异常'
				// 	}
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
			//查询心电图历史记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "electrocardiograph",
					fields: [
						"name",
						"numbers",
						"owner",
						"electrocardiogram",
						"wavelength",
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
				image {
					width: 100%;
				}

				.personal-info {
					background-color: white;
					border-bottom: 1rpx solid #ddd;
					padding: 40rpx;

					.info-item {
						text {
							margin-right: 30rpx;
							line-height: 50rpx;
						}
					}
				}

			}
		}
	}
</style>