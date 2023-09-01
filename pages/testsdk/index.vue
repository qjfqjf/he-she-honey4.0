<template>
	<view class="bgView">
		<z-nav-bar title="心电图">
		</z-nav-bar>
		<view style="height: 350rpx;">
		    <l-ecg ref="ecgRef"></l-ecg>
		</view>
		<button @click="resume">播放</button>
		<button @click="pause">暂停</button>
		<!-- <view>
                <Lt-ECG :ecgArr="ecgArr" :pageNum="0"></Lt-ECG>
		</view>
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="startConnect()">开始连接</view>
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="showReport()">显示心电图记录</view>
		<view><text>状态监听：{{stateData}}</text></view>

		<view><text>数据监听：{{eventData}}</text></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import VueCompositionAPI from '@vue/composition-api'
	Vue.use(VueCompositionAPI)
	let ecgView = null;
	export default {
		data() {
			return {
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
				ecgArr:[],
				stateData: "",
				eventData: "",
				id:10
			}
		},
		onLoad(options) {
			// this.uid = this.userInfo
			// 获取URL参数
			this.id = options.id
		},
		onMounted(() => {
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
		    })
		})
		mounted() {
			ecgView = this.$refs.ecgView;
			console.log(111111111111111111, ecgView);
			this.getEcg()
		},
		methods: {
			getEcg(){
				this.$http.post("/ecg/info",{
					id: this.id
				}).then((res)=>{
					if(res.data){
						this.ecgArr = res.data.value.split(",").map(Number)
						const divider = 2;
						this.ecgArr = this.ecgArr.map((num) => (num-2000) / divider);
					}
					
				})
				console.log('ecgArr',this.ecgArr);
			},
			startConnect: function() {
				console.log(1111)
				ecgView.connect();

			},
			showReport: function() {
				ecgView.showReport();
			}
		}
	}
</script>

<style>
	.bgView {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
</style>