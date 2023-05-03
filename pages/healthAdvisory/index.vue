<template>
	<view class="content p-2">
		<z-nav-bar title="健康咨询"></z-nav-bar>
		<public-module></public-module>
		<view class="title">
			<span>健康咨询</span>
		</view>
		<!-- 设备板块 -->
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<image style="width: 80rpx;height: 80rpx;" :src="baseListItem.img" mode="aspectFit"></image>
					<text class="grid-text mt-2">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="title">
			<span>AI 智能查询</span>
		</view>
		<!-- 设备板块 -->
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in aiList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<image style="width: 80rpx;height: 80rpx;" :src="baseListItem.img" mode="aspectFit"></image>
					<text class="grid-text mt-2">{{baseListItem.title}}</text>
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
						img: require('./static/treatment.png'),
						title: '寻医问药',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod'
					},
					{
						img: require('./static/heathy.png'),
						title: '健康咨询',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod'
					},
					{
						img: require('./static/psychology.png'),
						title: '心理咨询',
						url: '/pages/healthAdvisory/psychologicalCounseling/psychologicalCounseling'
					},
					{
						img: require('./static/cosmetic.png'),
						title: '美容咨询',
						url: '/pages/healthAdvisory/beautyConsultation/beautyConsultation'
					},
					{
						img: require('./static/fitness.png'),
						title: '健身咨询',
						url: '/pages/healthAdvisory/fitnessConsultation/fitnessConsultation'
					},
					{
						img: require('./static/examination.png'),
						title: '体检咨询',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod'
					},
					{
						img: require('./static/cdc.png'),
						title: '疾控咨询',
						url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod'
					}
				],
				aiList:[{
					img: require('./static/ai.png'),
					title: '人机对话',
					url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod'
				}]
			};
		},
		//方法
		methods: {

			click(url, name) {
				if(!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});

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

		.devices-warp {
			.item {
				padding: 20rpx;
				margin: 10rpx;
				width: 160rpx !important;
				border-radius: 16rpx;
				background-color: #fff !important;
				box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);
				&:nth-child(4n){
					margin-right: 0;
				}
			}
		}
	}
</style>
