<template>
	<view class="container">
		<z-nav-bar title="体脂率历史"></z-nav-bar>
		<public-module></public-module>

		<!-- <view class="data-item j-sb" >
			<view class="left d-flex a-center">
				<view class="icon">
					<image :src="icon" style="width: 60rpx;height: 60rpx;" mode="aspectFit"></image>
				</view>
				<view class="name">
					体重
					<!-- {{item.height}} -->
				<!-- </view>
			</view>
			<view class="right d-flex">
				<view class="desc">
					{{item.state}}
				</view>
				<view class="value">
					{{item.weight}}
				</view>
			</view>
		</view>
		<view class="data-item j-sb" >
			<view class="left d-flex a-center">
				<view class="icon">
					<image :src="icon" style="width: 60rpx;height: 60rpx;" mode="aspectFit"></image>
				</view>
				<view class="name">
					BMI -->
					<!-- {{item.height}} -->
				<!-- </view>
			</view>
			<view class="right d-flex">
				<view class="desc">
					{{item.state}}
				</view>
				<view class="value">
					{{item.bmi}}
				</view>
			</view> -->
		<!-- </view> -->

		<!-- 正文内容 -->
		<view class="content-body " >
			<view class="data-item j-sb" v-for="(item,index) in historyList" :key="index">
				<view class="left d-flex a-center">
					<view class="icon">
						<image :src="item.icon" style="width: 60rpx;height: 60rpx;" mode="aspectFit"></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
				<view class="right d-flex">
					<view class="desc">
						{{item.desc}}
					</view>
					<view class="value">
						{{item.value}}
					</view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: [
					{
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '体重',
						desc: '标准',
						value: '73.0kg'
					},
					{
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: 'BMI',
						desc: '超重',
						value: '24.4'
					},
					{
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '体脂率',
						desc: '严重超重',
						value: '31.7%'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '肌肉率',
						desc: '偏低',
						value: '63.6%'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '去脂体重',
						desc: '偏低',
						value: '49.9kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '皮下脂肪',
						desc: '偏高',
						value: '22.6%'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '内脏脂肪',
						desc: '标准',
						value: '9.0'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '体水分',
						desc: '偏低',
						value: '50%'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '骨骼肌率',
						desc: '偏低',
						value: '38.1%'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '肌肉量',
						desc: '偏低',
						value: '46.4kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '骨量',
						desc: '偏低',
						value: '3.3kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '蛋白质',
						desc: '偏低',
						value: '13.6%'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '基础代谢',
						desc: '偏低',
						value: '1445kacl'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '身体年龄',
						desc: '偏高',
						value: '63.0'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '脂肪量',
						desc: '严重超重',
						value: '23.1kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '含水量',
						desc: '偏低',
						value: '36.5kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '蛋白量',
						desc: '偏低',
						value: '9.9kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '标准体重',
						desc: '',
						value: '65.9kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '肥胖等级',
						desc: '偏高',
						value: ''
					}, {
						icon: require('@/static/icon/bodyFat/weight2.png'),
						name: '体型',
						desc: '偏肥胖',
						value: ''
					}
				]
			};
		},

		methods: {
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},

			//查询血压历史记录
			getHistoryList() {
				uni.request({
					url: 'http://106.14.140.92:8881/platform/dataset/search_read',
					method: 'post',
					data: {
						params: {
							model: "body.fat.scale",
							token: "8c2a647f6745ee4c96bf889427e77cf9",
							uid: '2',
							fields: [
								"name",
								"numbers",
								"owner",
								"height",
								"weight",
								"bmi",
								"state",
								"input_type",
								"test_time"
							]
						}
					},
					success: (res) => {
						this.historyList = res.data.result.records
					}
				})
			}
		},
		onLoad() {
			// this.getHistoryList();
		},

	}
</script>

<style lang="scss">
	.right {
		text-align: right;
	}

	.container {
		font-size: 28rpx;


		.content-body {
			background-color: white;
			padding: 30rpx;
			font-size: 30rpx;

			.data-item {
				border-top: 1rpx solid #eee;
				display: flex;
				align-items: center;

				.left {
					padding: 10rpx;

					.name {
						margin-left: 20rpx;
					}
				}

				.right {
					.desc {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>