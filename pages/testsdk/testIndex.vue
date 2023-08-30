<template>
	<view class="bgView">
		<br><br><br><br>
		<My-ECGView ref="ecgView" style="height: 500rpx;width: 750rpx;" />
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
				stateData: "",
				eventData: ""
			}
		},
		mounted() {

			ecgView = this.$refs.ecgView;
			console.log(111111111111111111, ecgView);

			


		},
		methods: {
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