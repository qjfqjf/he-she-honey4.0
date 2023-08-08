<template>
	<view class="container">
		<z-nav-bar title="血氧历史"></z-nav-bar>
		<public-module></public-module>


		<!-- 正文内容 -->
		<view class="content-body" v-for="(item, index) in historyList" :key="item.id">
			<u-read-more :toggle="true" :closeText="'查看更多'" :text="item"></u-read-more>
			<view class="item">
				<view class="date"
					>
					
					<text>{{item.time}}</text>
				</view>
				<view class="flex">
					<view class="line">
						<text class="title">血氧</text>
						<text class="result right">{{item.spo}}</text>
					</view>
					<view class="line">
						<text class="title">脉率</text>
						<text class="result">{{item.pr}}</text>
					</view>
					<view class="line">
						<text class="title">PI</text>
						<text class="result">{{item.pi}}</text>
					</view>
					<view class="line">
						<text class="title">分析结果</text>
						<text class="result">
							{{item.result_cn}}
							
						</text>
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
				uid:0,
				userInfo:'',
				historyList: [
					
				],
			};
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if(uid == 0){
				this.uid = this.userInfo.uid
			}else{
				this.uid = uid
			}
			this.getHistoryList();
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},
			//查询血氧历史记录
			getHistoryList() {
				this.$http.post('/pod/index', {
					uid: this.uid,
				}).then(res => {
					this.historyList = res.data
				})

			}
		},
		
	}
</script>

<style lang="scss">
	.right {
		text-align: right;
	}

	.container {
		font-size: 30rpx;

		.regular {
			font-size: 26rpx;
		}

		.content-body {
			.item {
				padding: 10rpx;
				margin-top: 10rpx;
				background-color: white;

				.date {
					border-bottom: 1rpx solid #ececec;
					padding: 16rpx;
				}

				.flex {
					.line {
						padding: 10rpx 20rpx;
						display: flex;
						justify-content: space-between;

						.title {}

						.result {}
					}
				}

			}
		}
	}
</style>