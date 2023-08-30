<template>

	<view class="b-content p-2">
		<z-nav-bar title="心电图月报">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module @getDate="getDate"></public-module>
		<TimeRage @getDate="getDate"></TimeRage>
		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item" v-for="(item, index) in historyList" :key="index" @click="gotoEcgInfo(item.id)">
				<view class="date"
					v-if="index === 0 || item.time.split(' ')[0] !== historyList[index - 1].time.split(' ')[0]">
					{{item.time.split(" ")[0]}}</view>
				<view class="record">
					<text>{{item.time.split(" ")[1]}}</text>
					<!-- <text>{{item.category}}</text> -->
					<text>分析结果</text>
					
					<view >
						<text class="text">{{item.result_cn}}</text>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import TimeRage from '../components/timeRage/TimeRage.vue'
	import dayjs from "../utils/dayjs"
	import isBetween from "../utils/isBetween"
	export default {
		components: {
			TimeRage
		},
		data() {
			return {
				targetIndexMax: 100,
				targetIndexMin: 60,
				arrowUp: '↑',
				arrowDown: '↓',
				uid: 0,
				userInfo: '',
				
				historyList:[],
				dataList: [
					
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

				.ergometer {
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