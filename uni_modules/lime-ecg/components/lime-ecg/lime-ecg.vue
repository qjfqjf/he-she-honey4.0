<template>
	<demo-block title="心电图">
		<view style="height: 350rpx;">
			<l-ecg ref="ecgRef"></l-ecg>
		</view>
		<button @click="resume">播放</button>
		<button @click="pause">暂停</button>
	</demo-block>
</template>
<script>
	import {ref, onMounted, defineComponent } from '../l-ecg/vue';
	const value = []
	export default defineComponent({
		props: {
			ecgList: {
				type: Array,
				required: true
			}
		},
		setup(props) {
			const ecgRef = ref(null)
			onMounted(() => {
				console.log('ecgList',props.ecgList)
				ecgRef.value.init({
					// 小格和大格的border color
					lineColor: ['#c7dff5', '#63b3f8'],
					ampTime: 'Amp: 10mm/mv  Time: 25mm/sec',
					textColor: '#000',
					wave: {
						// ecg
						// 1秒多少个点
						frameSize: 250,
						yMax: 250,
						waveHeight: 100,
						// 每次画几个点
						step: 10,
						// 扫纸速度，1 默认 表示 25mm/s (1秒25个小格子 每个小格子0.04s)。 0.5表示扫纸速度为 12.5mm/s。2表示扫纸速度为 50mm/s。
						speedRatio: 1,
						lineColor: 'red'
					},
					// wave: {
					// 	// resp
					// 	// 1秒多少个点
					//  yMax: 250,
					// 	frameSize: 250,
					// 	yOffset: 50,
					// 	// 每次画几个点
					// 	step: 10,
					// 	// 扫纸速度，1 默认 表示 25mm/s (1秒25个小格子 每个小格子0.04s)。 0.5表示扫纸速度为 12.5mm/s。2表示扫纸速度为 50mm/s。
					// 	speedRatio: 0.5,
					// 	lineColor: 'red'
					// },
					// wave: {
					// 	// spo2
					// 	// 1秒多少个点
					// 	frameSize: 100,
					// 	// Y值最大值
					// 	yMax: 250,
					// 	yOffset: 50, // 200
					// 	// 每次画几个点
					// 	step: 10,
					// 	// 扫纸速度，1 默认 表示 25mm/s (1秒25个小格子 每个小格子0.04s)。 0.5表示扫纸速度为 12.5mm/s。2表示扫纸速度为 50mm/s。
					// 	speedRatio: 1,
					// 	lineColor: 'red'
					// }
				})
			})
			const resume = () => {
				ecgRef.value.update(props.ecgList)
				ecgRef.value.resume()
				setInterval(() => {
					ecgRef.value.update(props.ecgList)
				}, 1000)
			}
			const pause = () => {
				ecgRef.value.pause()
			}
			
			return {
				ecgRef,
				resume,
				pause
			}
		}
	})
	
	
</script>
<style>
</style>
