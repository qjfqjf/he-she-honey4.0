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
					
				],
				date: {
					startTime: this.getFirstDayOfMonth().format('yyyy-MM-dd'),
					endTime: this.getLastDayOfMonth().format('yyyy-MM-dd'),
				},
			};
		},
		created() {
			dayjs.extend(isBetween)
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if (uid == 0) {
				this.uid = this.userInfo
			} else {
				this.uid = uid
			}
			console.log(111111,this.uid)
			dayjs.extend(isBetween)
			this.getHistoryList();
		},
		methods: {
			//测试子组件传来的值是否是正确的
			test() {
				console.log("start" + this.date.startTime)
				console.log("end" + this.date.endTime)
			},
			// 获取当前月的最后一天
			getLastDayOfMonth() {
				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1; // 月份从0开始，需要加1
				const lastDay = new Date(year, month, 0).getDate(); // 0表示上一个月的最后一天，即当前月的最后一天
				const lastDayOfMonth = new Date(year, month - 1, lastDay);
				return lastDayOfMonth;
			},
			// 获取当前月的第一天
			getFirstDayOfMonth() {
				const today = new Date();
				const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				return firstDayOfMonth
			},
			
			//从子组件获取开始和结束时间，并且更新数据
			getDate(date) {
				this.date = date;
				//清空数组内数据
				this.dataList = [];
				//筛选出符合条件的数据
				this.getHistoryList();
			},
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			getHistoryList() {
				this.$http.post('/ecg/index', {
					uid:this.uid,
					start_date: this.date.startTime,
					end_date: this.date.endTime
				}).then(res => {
					
					this.historyList = res.data
				})
			},
			gotoEcgInfo(id){
				console.log(id)
				uni.navigateTo({
					url: '/pages/testsdk/index?id='+id
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