<template>
	<view class="content p-2">
		<z-nav-bar title="检测数据一览"></z-nav-bar>
		<public-module></public-module>
		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item">
				<view class="date">
					<text>项目</text>
					<text>时间</text>
					<text>数值</text>
					<text>评价</text>
				</view>
			</view>
		</view>
		<view class="content-body" v-for="(item,index) in dataList" :key="index">
			<view class="item">
				<view class="flex">
					<view class="line">
						<text class="title">{{item.name}}</text>
					</view>
					<view class="line">
						<text class="title">{{item.test_time}}</text>
					</view>
					<view class="line">
						<text class="title">{{item.value }}</text>
					</view>
					<view class="line">
						<text class="title">{{item.alert}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		data
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				uid: 0,
				userInfo: '',
				dataList: [

				],
			};
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// await this.getOximeterHistoryList()
			// await this.getForeheadThermometerHistoryList()
			// await this.getBloodPressureHistoryList()
			// await this.getBloodSugarHistoryList()
			// this.sortDataListByTestTime()
			uni.$on('callTargetMethod', () => {
				this.allQuery();
			});
			this.allQuery();

		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			allQuery() {
				this.getOximeterHistoryList()
				this.getForeheadThermometerHistoryList()
				this.getBloodPressureHistoryList()
				this.getBloodSugarHistoryList()
				// uni.setStorageSync('firstData', this.dataList[0]);
				setTimeout(() => {
					console.log(this.dataList[0])
					uni.setStorageSync('firstData', this.dataList[0]);
				}, 4000)
			},

			// 查询血氧历史记录
			getOximeterHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "oximeter",
					domain: [
						["owner.id", "=", this.userInfo.uid]
					],
					fields: [
						"name",
						"blood_oxygen",
						"pi",
						"pulse_rate",
						"test_time"
					]
				}).then(res => {
					const records = res.result.records;
					if (records.length > 0) {
						const latestRecord = records[records.length - 1]; // 获取最后一条数据
						const dataItem = {
							name: latestRecord.name,
							test_time: latestRecord.test_time,
							value: latestRecord.blood_oxygen,
							alert: '正常',
						};
						this.dataList.push(dataItem);
						this.sortDataListByTestTime();
					}
				});
			},
			//查询额温枪历史记录
			getForeheadThermometerHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "forehead.temperature.gun",
					domain: [
						["owner.id", "=", this.userInfo.uid]
					],
					fields: [
						"name",
						"temperature",
						"test_time"
					]
				}).then(res => {
					const records = res.result.records;
					if (records.length > 0) {
						const latestRecord = records[records.length - 1]; // 获取最后一条数据
						const dataItem = {
							name: latestRecord.name,
							test_time: latestRecord.test_time,
							value: `${latestRecord.temperature}°C`,
							alert: '正常',
						};
						this.dataList.push(dataItem);
						this.sortDataListByTestTime();
					}
				})
			},
			// 查询血压历史记录
			getBloodPressureHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "sphygmomanometer.jiakang",
					domain: [
						["owner.id", "=", this.userInfo.uid]
					],
					fields: [
						"name",
						"systolic_blood_pressure",
						"tensioning_pressure",
						"heart_rate",
						"test_time"
					]
				}).then(res => {
					const records = res.result.records;
					if (records.length > 0) {
						const latestRecord = records[records.length - 1]; // 获取最后一条数据
						const dataItem = {
							name: latestRecord.name,
							test_time: latestRecord.test_time,
							value: `收缩压${latestRecord.systolic_blood_pressure}H 舒张压${latestRecord.tensioning_pressure}Hg`,
							alert: '正常',
						};
						this.dataList.push(dataItem);
						// 执行时间差计算和查找最接近时间的代码
						this.sortDataListByTestTime();
					}
				});
			},
			//查询血糖历史记录
			getBloodSugarHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "blood.glucose.meter",
					domain: [
						["owner.id", "=", this.userInfo.uid]
					],
					fields: [
						"name",
						"oml_l",
						"test_time"
					]
				}).then(res => {
					const records = res.result.records;
					if (records.length > 0) {
						const latestRecord = records[records.length - 1]; // 获取最后一条数据
						const dataItem = {
							name: latestRecord.name,
							test_time: latestRecord.test_time,
							value: `${latestRecord.oml_l}mmol/L`,
							alert: '正常',
						};
						this.dataList.push(dataItem);
						this.sortDataListByTestTime();
						// console.log(this.dataList[0])

					}
				})
			},
			sortDataListByTestTime() {
				this.dataList.sort((a, b) => {
					return new Date(b.test_time) - new Date(a.test_time);
				});

			}
		},

	}
</script>

<style lang="scss">
	.content-body {
		/* 添加需要的样式属性 */

		.item {
			margin-top: 10rpx;
			background-color: white;

			.date {
				display: flex;
				justify-content: space-between;
				color: #28be9e;
				border-bottom: 1rpx solid #ececec;
				padding: 16rpx;

				text {
					flex: 1;
					text-align: center;
				}
			}

			.flex {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-top: 10px;

				.line {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 10rpx 20rpx;
					justify-content: space-between;

					.title {
						/* 添加需要的样式属性 */
					}

					.result {
						/* 添加需要的样式属性 */
					}
				}
			}
		}
	}
</style>