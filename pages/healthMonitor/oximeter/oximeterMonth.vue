<template>
	<view class="b-content p-2">
		<z-nav-bar title="血氧月报">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<TimeRage @timeRangeSelected="handleTimeRangeSelected"></TimeRage>
		<view class="historyCard mb-3" v-for="(item, index) in filteredDataList" :key="index">
			<view class="top d-flex j-sb mb-2">
				<view class="time">
					{{ item.test_time }}
				</view>
			</view>
			<view class="data d-flex j-sb">
				<view class="bloodOxygen">
					血氧：{{ item.blood_oxygen }}
				</view>
				<view class="PI">
					PI：{{ item.pi }}
				</view>
				<view class="rate">
					<!-- ↓ -->
					脉率：{{ item.pulse_rate }}
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
				selectedTimeRange: null,
				dataList: [],
				filteredDataList: [],
			};
		},
		onLoad() {
			this.getHistoryList();
		},
		methods: {
			handleTimeRangeSelected(timeRange) {
				this.selectedTimeRange = timeRange;
				this.filterDataList();
			},

			filterDataList() {
				if (!this.selectedTimeRange) {
					this.filteredDataList = [...this.dataList]; // If no time range is selected, show all data
				} else {
					const {
						start,
						end
					} = this.selectedTimeRange;
					this.filteredDataList = this.dataList.filter(item => {
						const testTime = new Date(item.test_time);
						return testTime >= start && testTime <= end;
					});
				}
			},

			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
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
					this.dataList = res.result.records;
					this.filteredDataList = [...this.dataList];
				})
			}
		}
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

				.time {
					color: #666;


				}
			}

			.data {

				.bloodOxygen,
				.PI {

					color: #ffd661;

				}
			}
		}
	}
</style>