<template>
	<view class="content p-2">
		<z-nav-bar title="健康监测"></z-nav-bar>
		<public-module></public-module>
		<view class="title">
			<span>健康监测</span>
		</view>
		<!-- 设备板块 -->
		<view class="devices-warp">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="baseListItem.name" :size="22"></u-icon>
					<text class="grid-text">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
						name: 'photo',
						title: '血压',
						url: '/pages/healthMonitor/bloodPressure/bloodPressure'
					},
					{
						name: 'lock',
						title: '血糖',
						url: '/pages/healthMonitor/bloodSugar/bloodSugar'
					},
					{
						name: 'star',
						title: '血尿酸',
						url: '/pages/healthMonitor/bloodSUA/bloodSUA'
					},
					{
						name: 'star',
						title: '血脂'
					},
					{
						name: 'star',
						title: '心电图'
					},
					{
						name: 'star',
						title: '体脂率'
					},
					{
						name: 'star',
						title: '胆固醇',
						url:'/pages/healthMonitor/cholesterol/cholesterol'
					},
					{
						name: 'star',
						title: 'AI'
					},
					{
						name: 'star',
						title: '额温枪',
						url: '/pages/healthMonitor/foreheadThermometer/foreheadThermometer'
					},
					{
						name: 'star',
						title: '血氧',
						url: '/pages/healthMonitor/oximeter/oximeter'
					},
					{
						name: 'star',
						title: '跳绳'
					},
					{
						name: 'star',
						title: '营养秤'
					},
				]
			};
		},
		//方法
		methods: {

			click(url, name) {
				uni.navigateTo({
					url: url
				});
				console.log(name, url)
			}

		},
		onLoad(e) {

		},
		//页面显示
		onShow() {},
	};
</script>

<style lang="scss">
	.content {
		.title {
			span {
				border-left: 8rpx #28be9e solid;
				padding-left: 20rpx;
			}
		}
	}
</style>
