<template>
	<view class="content p-2" style="background-color: #ffffff; height: 100%;">
		<z-nav-bar title="门诊档案"></z-nav-bar>
		<public-module></public-module>
		<view class="title">
			<span>门诊档案</span>
		</view>
		<view class="devices-warp mt-2">
			<u-grid :border="false" col="4">
				<u-grid-item class="item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="click(baseListItem.url,baseListItem.title)">
					<image style="width: 60rpx;height: 60rpx;" :src="baseListItem.img" mode="aspectFit"></image>
					<text class="grid-text mt-2 font-md">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
						img: require('@/static/icon/healthFile/medicalRecord.png'),
						title: '门诊病历',
						url: '/pages/healthFile/outpatientArchives/medicalRecord/medicalRecord'
					},
					{
						img: require('@/static/icon/healthFile/record.png'),
						title: '用药记录',
						url: '/pages/healthFile/outpatientArchives/getMedicineRecord/getMedicineRecord'
					},
					{
						img: require('@/static/icon/healthFile/laboratoryExamination.png'),
						title: '化验验查',
						url: '/pages/healthFile/outpatientArchives/laboratoryExamination/laboratoryExamination'
					},
					{
						img: require('@/static/icon/healthFile/imagingExamination.png'),
						title: '影像检查',
						url: '/pages/healthFile/outpatientArchives/imagingExamination/imagingExamination'
					},
					{
						img: require('@/static/icon/healthFile/operation.png'),
						title: '门诊手术', 
						url: '/pages/healthFile/outpatientArchives/operation/operation'
					},
					{
						img: require('@/static/icon/healthFile/consultation.png'),
						title: '转诊会诊', 
						url: '/pages/healthFile/outpatientArchives/consultation/consultation'
					}
				],
			}
		},
		methods: {
			click(url, name) {
				if(!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		.title {
			span {
				padding-left: 20rpx;
				border-left: 8rpx #28be9e solid;
				font-weight: bold;
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