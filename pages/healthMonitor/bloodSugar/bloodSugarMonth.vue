<template>

	<view class="b-content p-2">
		<z-nav-bar title="血糖月报">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<TimeRage></TimeRage>
		<view class="historyCard mb-3" v-for="(item,index) in dataList" :key="index">
			<view class="top d-flex j-sb mb-2">
				<view class="time">
					{{item.test_time}}
				</view>
			</view>
			<view class="data d-flex j-sb">
				<view class="state">
					<text v-if="item.category=='kf'">饮食状态：空腹</text>
					<text v-else-if="item.category=='wch2'">饮食状态：晚餐前</text>
					<text v-else-if="item.category=='lc'">饮食状态：凌晨</text>
					<text v-else="item.category=='wch1'">饮食状态：晚餐后</text>
				</view>
				<view class="bloodSugar" v-if="item.oml_l > targetIndex">
					<!-- ↓ -->
					血糖：{{item.oml_l}}
					<text class="up">{{arrowUp}}</text>
				</view>
				<view class="bloodSugar" v-else>
					<!-- ↓ -->
					血糖：{{item.oml_l}}
					<text class="down">{{arrowDown}}</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import TimeRage from '../components/timeRage/TimeRage.vue'
	export default {
		components: {
			TimeRage
		},
		data() {
			return {
				targetIndex: 7,
				arrowUp: '↑',
				arrowDown: '↓',
				dataList: [
					{
						time: "2023-3-29 15:30:50",
						state: '空腹',
						bloodSugar: 7.1
					},
					{
						time: "2023-3-29 15:30:50",
						state: '晚餐后',
						bloodSugar: 8.1
					},
					{
						time: "2023-3-29 15:30:50",
						state: '午餐后',
						bloodSugar: 6.1
					},
					{
						time: "2023-3-29 15:30:50",
						state: '晚餐后',
						bloodSugar: 6.1
					}
				]
			};
		},
		onLoad() {
			this.getHistoryList();
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			//查询血糖月报
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "blood.glucose.meter",
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
					this.dataList = res.result.records
				})
			}
		},


	}
</script>

<style lang="scss">
	.b-content {
		.timeRange {
			.startTime {
				color: #2fa290;
			}

			.endTime {
				color: #2fa290;
			}
		}

		.historyCard {
			padding: 40rpx;
			border-radius: 16rpx;
			background-color: #fff;
			box-shadow: inset 0 3px 0 hsla(0, 0, 0, 0), 0 3px 3px hsla(0, 0, 0, .2);

			.top {
				.position {
					font-size: 36rpx;
					font-weight: 700;
				}

				.time {
					color: #666;


				}
			}

			.data {
				.state {

					color: #ffd661;

				}

				.bloodSugar {
					.up {
						color: #f10000;
						font-size: 40rpx;
					}

					.down {
						color: #ffa053;
						font-size: 40rpx;
					}
				}

			}
		}
	}
</style>