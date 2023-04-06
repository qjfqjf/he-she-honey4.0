<template>
	<view class="content p-2">
		<z-nav-bar title="心电图">

		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader></HealthHeader>
		<view class="mt-3 mb-3" style="height: 350rpx;">
			<l-ecg ref="ecgRef"></l-ecg>
		</view>
		<u-button type="primary" @click="resume">测试</u-button>
		<view class="mb-3">
			
		</view>
		<u-button type="primary" @click="pause">暂停</u-button>
		<view class="mt-5">

		</view>
		<u--text class="d-flex j-center mb-3" color="#01b09a"
			:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSave"></u-button>
		<view class="mb-3">

		</view>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleDevelop">
		</u--text>
		<BottomNavigation></BottomNavigation>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// import {
	// 	defineComponent,
	// 	ref,
	// 	onMounted
	// } from '@vue/composition-api'
	import HealthHeader from "../components/healthHeader/HealthHeader.vue"
	import BottomNavigation from '../components/bottomNav/BottomNavigation.vue'
	export default {
		components: {
			HealthHeader,
			BottomNavigation
		},
		data() {
			return {
				btnColor: '#dadada',
				deviceStatus: 0,
				ecgRef: null,
				value: [122, 122, 122, 122, -122, -122, -122, -122, -122, -122, -122, -122, -122, -122, 122, 122, 122, 123,
					125, 127, 130, 133, 135, 137, 138, 139, 140, 140, 139, 138, 136, 134, 130, 127, 125, 124, 123, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 121, 119,
					116, 113, 111, 132, 151, 171, 190, 210, 229, 210, 190, 171, 151, 132, 112, 114, 117, 120, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 124, 126, 128, 131, 133, 134, 136, 140, 143, 144,
					146, 149, 150, 152, 153, 153, 154, 155, 156, 157, 156, 155, 153, 153, 152, 150, 149, 146, 145, 142,
					138, 135, 133, 129, 127, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
					122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122
				],
				time: null
			}
		},
		mounted() {
			this.$refs.ecgRef.init({
				// 小格和大格的border color
				lineColor: ['#c7dff5', '#63b3f8'],
				// ampTime: 'Amp: 10mm/mv  Time: 25mm/sec',
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

			})

		},
		methods: {
			resume() {
				// console.log(ecgRef.value)
				this.$refs.ecgRef.update(this.value)
				this.$refs.ecgRef.resume()
				this.time = setInterval(() => {
					this.$refs.ecgRef.update(this.value)
				}, 1000)
			},
			pause() {
				this.$refs.ecgRef.pause()
				clearInterval(this.time)
			},
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			handleSave() {
				console.log('提交')
			}
		},
	}
</script>

<style lang="scss">

</style>
