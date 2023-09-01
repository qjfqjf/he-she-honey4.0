<template>
	<view class="container">
		<z-nav-bar title="心电图历史"></z-nav-bar>
		<public-module></public-module>


		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item" v-for="(item, index) in historyList" :key="index" @click="gotoEcgInfo(item.id)">
				<view class="date"
					v-if="index === 0 || item.time.split(' ')[0] !== historyList[index - 1].time.split(' ')[0]">
					{{item.time.split(" ")[0]}}</view>
				<view class="record">
					<text>{{item.time.split(" ")[1]}}</text>
					<!-- <text>{{item.category}}</text> -->
					<text>分析结果</text>
					
					<view >
						<text class="text">{{item.result_cn}}</text>
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
				uid: 0,
				userInfo: '',

				historyList:[]
				
			};
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// this.uid = this.userInfo
			// 获取URL参数
			const uid = options.uid;
			if (uid == 0) {
				this.uid = this.userInfo
			} else {
				this.uid = uid
			}
			console.log(111111,this.uid)
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
			//查询心电图历史记录
			getHistoryList() {
				this.$http.post('/ecg/index', {
					uid: this.uid,
				}).then(res => {
					this.historyList = res.data
					console.log(this.historyList);
				})
			},
			gotoEcgInfo(id){
				console.log(id)
				
				uni.navigateTo({
					url: `/pages/testsdk/index?id=${id}&uid=${this.uid}`,
					
				})
			}
		},
	}
</script>

<style lang="scss">
	.container {
		font-size: 30rpx;

		.regular {
			font-size: 26rpx;
		}

		.content-body {
			.item {
				.date {
					padding: 26rpx;
				}
		
				.record {
					display: flex;
					background-color: white;
					padding: 30rpx 20rpx;
					border-top: 1rpx solid #ddd;
					box-sizing: border-box;
		
					text {
						margin-right: 40rpx;
					}
		
					.index {
						margin-left: 20rpx;
		
						.text {
							margin-right: 10rpx;
						}
		
						.arrow {
							font-weight: 700;
						}
					}
		
					.up {
						color: #f10000;
					}
		
					.down {
						color: #ffa053;
					}
		
					.write-by-hand {
						color: #01b09a;
					}
				}
			}
		}
	}
</style>