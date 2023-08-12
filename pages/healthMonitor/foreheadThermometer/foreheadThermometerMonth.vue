<template>

	<view class="b-content p-2">
		<z-nav-bar title="额温枪月报">
			<view slot="right" class="p-2" @click="handleWarningRule">预警规则</view>
		</z-nav-bar>
		<public-module @getDate="getDate"></public-module>
		<TimeRage @getDate="getDate"></TimeRage>
		<view class="historyCard mb-3" v-for="(item,index) in dataList" :key="index">
			<view class="top d-flex j-sb mb-2">
				<view class="time">
					{{item.createtime}}
				</view>
			</view>
			<view class="data d-flex j-sb">
				<view class="name">
					<!-- 名称：{{item.name}} -->
					名称：额温
				</view>
				<view class="foreheadThermometer">
					<!-- ↓ -->
					数值：{{item.value}}℃
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
				uid:0,
				userInfo:'',
				date:{
					startTime:this.getFirstDayOfMonth().format('yyyy-MM-dd'),
					endTime:this.getLastDayOfMonth().format('yyyy-MM-dd'),
				},
				dataList: [
				]
			};
		},
		created() {
			dayjs.extend(isBetween)
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if(uid == 0){
				this.uid = this.userInfo
			}else{
				this.uid = uid
			}
			dayjs.extend(isBetween)
			this.getHistoryList();
		},
		methods: {
			//测试子组件传来的值是否是正确的
			test(){
				console.log("start"+this.date.startTime)
				console.log("end"+this.date.endTime)
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
			getDate(date){
				this.date = date;
				//清空数组内数据
				this.dataList = [];
				//筛选出符合条件的数据
				this.getHistoryList();
			},
			handleWarningRule(){
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
			//查询额温枪月报
			getHistoryList() {
				this.$http.post('/tem/index', {
					uid: this.uid,
					start_date: this.date.startTime,
					end_date: this.date.endTime
				}).then(res => {
					this.dataList = res.data
				})
			},
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