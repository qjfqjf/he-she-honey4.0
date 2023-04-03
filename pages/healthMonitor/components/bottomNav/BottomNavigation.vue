<template>
	<view>
		<view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center" v-for="item in toolList" :key="item.title"
				@click="onPageJump(item.url)">
				<image :src="item.img" style="width: 100rpx; height: 100rpx;" mode="aspectFit"></image>
				<text class="mt-1">{{item.title}}</text>
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
			},
			page: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				user: '王大大',
				toolList: [
					// {
					// 	img: require('@/static/icon/bloodPressure/doctor.png'),
					// 	title: '找医生',
					// 	url: ''
					// },
					{
						img: require('@/static/icon/bloodPressure/month.png'),
						title: '月报',
						url: '/pages/healthMonitor/bloodPressure/bloodPressureMonth'
					},
					{
						img: require('@/static/icon/bloodPressure/device.png'),
						title: '设备',
						url: ''
					},
					{
						img: require('@/static/icon/bloodPressure/write.png'),
						title: '手动录入',
						url: '/pages/healthMonitor/' + this.page
					},
				],

			};
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			onPageJump(url) {
				uni.navigateTo({
					url: url
				});

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
