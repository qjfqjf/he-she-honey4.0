<template>
	<view class="b-content p-2">
		<z-nav-bar title="血氧趋势">

		</z-nav-bar>
		<public-module @getDate="getDate"></public-module>
		<TimeRage @getDate="getDate"></TimeRage>
		<view class="echarts-content">
			<!-- #ifdef APP-PLUS || H5 -->
			<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts"
				class="echarts">
			</view>
			<!-- #endif -->

			<!-- #ifndef APP-PLUS || H5 -->
			<view>非 APP、H5 环境不支持</view>
			<!-- #endif -->
		</view>


	</view>
</template>

<script>
	import TimeRage from '../components/timeRage/TimeRage.vue'
	import dayjs from "../utils/dayjs"
	import isBetween from "../utils/isBetween"
	export default {
		components: {
			TimeRage,
		},
		data() {
			return {
				uid: 0,
				userInfo: '',
				date: {
					startTime: this.getFirstDayOfMonth().format('yyyy-MM-dd'),
					endTime: this.getLastDayOfMonth().format('yyyy-MM-dd'),
				},
				allDataList: [
					// {
					// 	test_time: "2023-3-20 15:30:10",
					// 	blood_oxygen: 168,
					// 	pi: 98,
					// 	pulse_rate: 81
					// },
					// {
					// 	test_time: "2023-4-29 15:30:10",
					// 	blood_oxygen: 168,
					// 	pi: 98,
					// 	pulse_rate: 81
					// },
					// {
					// 	test_time: "2021-3-29 15:30:10",
					// 	blood_oxygen: 168,
					// 	pi: 98,
					// 	pulse_rate: 81
					// },
					// {
					// 	test_time: "2023-3-27 15:30:10",
					// 	blood_oxygen: 168,
					// 	pi: 98,
					// 	pulse_rate: 81
					// }
				],
				dataList: [

				],

				option: {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['血氧', '脉率', 'PI']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					// toolbox: {
					// 	feature: {
					// 		saveAsImage: {}
					// 	}
					// },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'category',
						reverse: false,
						// type:'value'
					},
					series: [{
							name: '脉率',
							type: 'line',
							stack: 'Total',
							data: [],
							lineStyle: {
								color: 'orange' // 设置脉率线条的颜色为橙色
							},
							label: {
								show: true,
								position: 'top',
								formatter: '{c}',
								color: 'orange'
							}
						},
						{
							name: 'PI',
							type: 'line',
							stack: 'Total',
							data: [],
							lineStyle: {
								color: 'green' // 设置PI线条的颜色为绿色
							},
							label: {
								show: true,
								position: 'top',
								formatter: '{c}',
								color: 'green'
							}
						},
						{
							name: '血氧',
							type: 'line',
							stack: 'Total',
							data: [],
							lineStyle: {
								color: 'red' // 设置血氧线条的颜色为红色
							},
							label: {
								show: true, // 显示标签
								position: 'top', // 标签位置，可以设置为 'top', 'bottom', 'left', 'right'
								formatter: '{c}', // 标签内容格式化，这里使用 {c} 表示显示数据值
								color: 'red' // 标签文本颜色
							}
						},
					]
				},
			}
		},
		created() {
			dayjs.extend(isBetween)
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if (uid == 0) {
				this.uid = this.userInfo.uid
			} else {
				this.uid = uid
			}
			dayjs.extend(isBetween);
			this.getHistoryList();
			// this.getDataList();
		},
		methods: {
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
				this.getDataList();
			},
			// 数据发生变化时
			changeOption(value) {
				const data = this.option.series[0].data
				data[0].value = value

			},
			onViewClick(options) {

				console.log(options)
			},
			//查询血氧历史记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "oximeter",
					domain: [
						["owner.id", "=", this.uid]
					],
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
					this.allDataList = res.result.records
					this.getDataList();
				})
			},

			getDataList() {
				this.option.xAxis.data = [];
				for (var i in this.allDataList) {
					//判断数据是否在所选日期范围内
					if (dayjs(new Date(this.allDataList[i].test_time).format('yyyy-MM-dd')).isBetween(this.date.startTime,
							this.date.endTime, 'day', '[]')) {
						this.dataList.push(this.allDataList[i])
						const item = this.allDataList[i];
						const dateTime = new Date(item.test_time);
						const month = dateTime.getMonth() + 1;
						const day = dateTime.getDate();
						const hour = dateTime.getHours();
						const minute = dateTime.getMinutes();
						this.option.xAxis.data.push(`${month}-${day} ${hour}:${minute}`);
					}
				}
				if (this.dataList.length > 0) {
					this.option.series[0].data = this.dataList.slice(-5).map(item => item.pulse_rate);
					this.option.series[1].data = this.dataList.slice(-5).map(item => item.pi);
					this.option.series[2].data = this.dataList.slice(-5).map(item => item.blood_oxygen);
				} else {
					this.option.xAxis.data = [];
					this.option.series[0].data = [];
					this.option.series[1].data = [];
					this.option.series[2].data = [];
				}
			},
		},
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/js/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style lang="scss">
	.b-content {
		background-color: #fff;


		.echarts-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.echarts {
				margin-top: 20rpx;
				width: 100%;
				height: 600rpx;
			}
		}

	}
</style>