<template>

	<view class="b-content p-2">
		<z-nav-bar title="血压月报">
			<view slot="right" class="p-2" @click="handleWarningRule">预警规则</view>
		</z-nav-bar>
		<public-module @getDate="getDate"></public-module>
		<TimeRage @getDate="getDate"></TimeRage>
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
				allDataList:[
				
				],
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
		created() {
			dayjs.extend(isBetween)
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if(uid == 0){
				this.uid = this.userInfo.uid
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
				this.getDataList();
			},
			handleWarningRule(){
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
			// handleWarningRule() {
			// 	this.$refs.uToast.show({
			// 		message: '开发中...'
			// 	})
			// },
			//查询血压月报记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "sphygmomanometer.jiakang",
					domain:[["owner.id","=",this.uid]],
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
					this.allDataList = res.result.records
					this.getDataList();
				})
				
			},
			//筛选数据
			getDataList(){
				for(var i in this.allDataList){
					//判断数据是否在所选日期范围内
					if(dayjs(new Date(this.allDataList[i].test_time).format('yyyy-MM-dd')).isBetween(this.date.startTime,this.date.endTime, 'day', '[]')){
						this.dataList.push(this.allDataList[i])
					}
				}
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