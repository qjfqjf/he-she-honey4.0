<template>
	<view>
		<view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center">
				<image src="@/static/icon/bloodPressure/doctor.png" style="width: 100rpx; height: 100rpx;"
					mode="aspectFit"></image>
				<text>找医生</text>
			</view>
			<view class="d-flex flex-column a-center">
				<image src="@/static/icon/bloodPressure/month.png" style="width: 100rpx; height: 100rpx;"
					mode="aspectFit"></image>
				<text>月报</text>
			</view>
			<view class="d-flex flex-column a-center">
				<image src="@/static/icon/bloodPressure/device.png" style="width: 100rpx; height: 100rpx;"
					mode="aspectFit"></image>
				<text>设备</text>
			</view>
			<view class="d-flex flex-column a-center">
				<image src="@/static/icon/bloodPressure/write.png" style="width: 100rpx; height: 100rpx;"
					mode="aspectFit"></image>
				<text>手动录入</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '我是名字'
			}
		},
		data() {
			return {
				user: '王大大'
			};
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
		}
	}
</script>

<style lang="scss">
	.tip {

		.trend {
			text-align: center;
		}

		.notice {
			padding-right: 20rpx;
			text-align: center;

		}
	}
</style>
