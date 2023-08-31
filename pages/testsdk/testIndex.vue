<template>
	<view class="bgView">
		<z-nav-bar title="心电图">
		</z-nav-bar>
		<view>
                <Lt-ECG :ecgArr="ecgArr" :pageNum="0"></Lt-ECG>
		</view>
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="startConnect()">开始连接</view>
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="showReport()">显示心电图记录</view>
		<view><text>状态监听：{{stateData}}</text></view>

		<view><text>数据监听：{{eventData}}</text></view>
	</view>
</template>

<script>
	let ecgView = null;
	export default {
		data() {
			return {
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
					this.ecgArr = res.data.value.split(",").map(Number)
					const divider = 2;
					this.ecgArr = this.ecgArr.map((num) => (num-2000) / divider);
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