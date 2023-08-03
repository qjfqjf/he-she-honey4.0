

#### bluetooth

1、插件说明
 
 蓝牙api封装 

2、代码示例


```javascript

<template>
	<view class="su-section">
		<view class="su-contain">
			<button type="primary" plain="true" @click="initPrinter">初始化蓝牙sdk</button>
		</view>
		<view class="su-contain">
			<button type="primary" plain="true" @click="enableScanning">开启扫描</button>
		</view>
		<view class="su-contain">
			<button type="primary" plain="true" @click="ceaseScanning">停止扫描</button>
		</view>
		<view class="hd-dataResult" v-if="dataResult" @click="connectedDevice(item)">{{ dataResult }}</view>
	</view>
</template>

<script>
// #ifdef APP-PLUS
let printerPlugin = uni.requireNativePlugin('plugin-BtModule');
// #endif
export default {
	data() {
		return {
			dataResult: ''
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		printerPlugin.bluetoothCallback((res) => {
			this.dataResult = res.data;
			if(res['message'] === 'connect'){ // 连接状态
				
			}
			if(res['message'] === 'removeDevice'){ // 断开设备
				
			}
			this.$forceUpdate(); // 全局返回监听
		});
		// #endif
	},
	methods: {
		/* 初始化 */
		initPrinter() {
			printerPlugin.initBluetooth((res) => {
				if (res.code === 200) {
					console.log(`printerPlugin---`, JSON.stringify(res));
					uni.showModal({
						title: '温馨提示',
						content: JSON.stringify(res),
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							}
						}
					});
				}
			});
		},
		/* 开启扫描 */
		enableScanning() {
			printerPlugin.enableScanning((res) => {
				this.dataResult = res.data;
				uni.showModal({
					title: '温馨提示',
					content: JSON.stringify(res),
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			});
		},
		/* 连接设备 */
		connectedDevice(item) {
			const params = {
				macAddr: item['macAddr'],
				name: item['name'],
				communicationType: item['communicationType']
			};
		},
		ceaseScanning() {
			printerPlugin.ceaseScanning((res) => {
				this.dataResult = res.data;
				uni.showModal({
					title: '温馨提示',
					content: JSON.stringify(res),
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			});
		}
	}
};
</script>

<style lang="scss"></style>



```

##### 作者 wx:petalmailo qq: 860987228