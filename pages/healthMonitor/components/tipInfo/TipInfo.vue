<template>
	<view>
		<view class="tip d-flex j-sb">
			<view class="trend d-flex a-center" @click="handleDevelop">
				<image style="width: 100rpx; height: 100rpx;margin-top: 20rpx;"
					src="@/static/icon/bloodPressure/trend.png" mode="aspectFit"></image>
				<text>{{title}}</text>
			</view>
			<view class="notice d-flex a-center" @click="handleDevelop">
				<image style="width: 58rpx; height: 58rpx;margin-right: 18rpx"
					src="@/static/icon/bloodPressure/notice.png" mode="scaleToFill"></image>
				<text>语音播报</text>
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
