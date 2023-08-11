<template>
	<view class="container">
		<z-nav-bar title="额温枪历史">
			<view slot="right" class="p-2" @click="handleDevelop()">
				<text class="regular" @click="handleWarningRule">预警规则</text>
			</view>
		</z-nav-bar>
		<public-module></public-module>
		<view class="content-body">
			<view class="item" v-for="(item, index) in historyList" :key="item.id">
				<view class="date"
				v-if="index === 0 || item.createtime.split(' ')[0] !== historyList[index - 1].createtime.split(' ')[0]">
					{{ item.createtime.split(' ')[0]}}
				</view>
				<view class="record">
					<text>{{ item.createtime.split(' ')[1]}}</text>
					<text>体温</text>
					<text class="text">{{ item.value}}℃</text>
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
				historyList: [],
				
			};
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
			//查询额温枪历史记录
			getHistoryList() {
				this.$http.post('/tem/index', {
					uid: this.uid,
				}).then(res => {
					this.historyList = res.data
				})
			},
			handleWarningRule(){
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
			sortDataListByTestTime() {
				this.historyList.sort((a, b) => {
					return new Date(b.test_time) - new Date(a.test_time);
				});
			},
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if(uid == 0){
				this.uid = this.userInfo
			}else{
				this.uid = uid
			}
			this.getHistoryList();
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
						margin-right: 80rpx;
					}

					.text {
						color: #01b09a;
					}
				}
			}
		}
	}
</style>