<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts">
		</view>
		<button @click="changeOption">更新数据</button>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {
					tooltip: {
						formatter: '{a} <br/>{b} : {c}%'
					},
					series: [{
						name: 'Pressure',
						type: 'gauge',
						min: 0, //起始最小刻度值
						max: 300, //最大刻度值
						progress: {
							show: true
						},
						detail: {
							valueAnimation: true,
							formatter: '{value}'
						},
						data: [{
							value: 0,
							name: '血压'
						}]
					}]
				}
			}
		},
		onLoad() {

		},
		methods: {
			changeOption() {
				const data = this.option.series[0].data
				// 随机更新示例数据
				data.forEach((item, index) => {
					item.value = item.value + 10
				})
			},
			onViewClick(options) {
				console.log(options)
			}
		}
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

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		margin-top: 100px;
		width: 100%;
		height: 300px;
	}
</style>
