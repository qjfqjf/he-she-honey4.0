<template>

	<view class="b-content p-2">
		<z-nav-bar title="额温枪月报">
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
				<view class="name">
					<!-- 名称：{{item.name}} -->
					名称：额温
				</view>
				<view class="foreheadThermometer">
					<!-- ↓ -->
					数值：{{item.temperature}}℃
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
				dataList: [
					// {
					//          time: "2023-3-29 15:30:50",
					//          name: '额温',
					//          foreheadThermometer: 36.7
					//        },
					//        {
					//          time: "2023-3-29 15:30:50",
					//          name: '额温',
					//          foreheadThermometer: 36.6
					//        },
					//        {
					//          time: "2023-3-29 15:30:50",
					//          name: '额温',
					//          foreheadThermometer: 37.5
					//        },
					//        {
					//          time: "2023-3-29 15:30:50",
					//          name: '额温',
					//          foreheadThermometer: 38
					//        }
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
			//查询额温枪月报
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "forehead.temperature.gun",
					fields: [
						"name",
						"numbers",
						"owner",
						"temperature",
						"input_type",
						"test_time"
					]
				}).then(res => {
					this.dataList = res.result.records
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
				.position {
					font-size: 36rpx;
					font-weight: 700;
				}

				.time {
					color: #666;


				}
			}

			.data {
				.name {

					color: #ffd661;

				}

				.foreheadThermometer {
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