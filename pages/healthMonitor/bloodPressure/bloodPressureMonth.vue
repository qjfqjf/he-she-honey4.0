<template>

	<view class="b-content p-2">
		<z-nav-bar title="血压月报">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<TimeRage></TimeRage>
		<view class="historyCard mb-3" v-for="(item,index) in dataList" :key="index">
			<view class="top d-flex j-sb mb-2">
				<view class="time">
					{{item.test_time}}
				</view>
				<view class="position">
					监测部位：左侧
					<!-- 监测部位：{{item.position}} -->
				</view>
			</view>
			<view class="data d-flex j-sb">
				<view class="SYS">
					收缩压：{{item.systolic_blood_pressure}}↑
				</view>
				<view class="DIA">
					舒张压：{{item.tensioning_pressure}} ↑
				</view>
				<view class="PUL">
					<!-- ↓ -->
					心率：{{item.heart_rate}}
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
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// },
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// },
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// },
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// }
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
			//查询血压月报记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "sphygmomanometer.jiakang",
					fields: [
						"name",
						"numbers",
						"owner",
						"systolic_blood_pressure",
						"tensioning_pressure",
						"heart_rate",
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

				.SYS,
				.DIA {

					color: #ffd661;

				}
			}
		}
	}
</style>