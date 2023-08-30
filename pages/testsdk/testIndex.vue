<template>
	<view class="bgView">
		<My-ECGView ref="ecgView" style="height: 500rpx;width: 750rpx;" />
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="startConnect()">开始连接</view>
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="showReport()">显示心电图记录</view>
		<view><text>状态监听：{{stateData}}</text></view>
		<view><text>数据监听：{{eventData}}</text></view>
	</view>
</template>

<script>
	// let ecgView = null;
	export default {
		data() {
			return {
				stateData: "",
				eventData: ""
			}
		},
		async mounted() {
		const MyECGView = uni.requireNativePlugin('My-ECGView');
		  // 使用$refs获取对ecgView组件的引用
		  // const ecgView = this.$refs.ecgView;
		
		  // 为onConnectState事件设置事件监听器
		  MyECGView.onConnectState(result => {
		    this.stateData = JSON.stringify(result);
		  });
		
		  // 为onEventInfo事件设置事件监听器
		  MyECGView.onEventInfo(async result => {
		    this.eventData = JSON.stringify(result);
		    const { type } = result;
		
		    // 在这里处理不同的事件类型，可以包含异步操作
		    switch (type) {
		      case 'BATTERY_POWER':
		        // 处理电池电量事件，可以包含异步操作
		        await someAsyncFunction();
		        break;
		      case 'BATTERY_ZERO':
		        // 处理电量过低事件，可以包含异步操作
		        await anotherAsyncFunction();
		        break;
		      case 'ECG_STATUS_CHANGE':
		        // 处理心电状态变化事件，可以包含异步操作
		        await yetAnotherAsyncFunction();
		        break;
		      // 根据需要为其他事件类型添加更多的情况
		    }
		  });
		},
		methods: {
			startConnect: function() {

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