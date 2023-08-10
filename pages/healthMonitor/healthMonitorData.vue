<template>
	<view class="content p-2">
		<z-nav-bar title="检测数据一览"></z-nav-bar>
		<public-module></public-module>
		<!-- 正文内容 -->
		<view class="content-body">
			<view class="item">
				<view class="date">
					<text>项目</text>
					<text>时间</text>
					<text>数值</text>
					<text>评价</text>
				</view>
			</view>
		</view>
		<view class="content-body" v-for="(item,index) in dataList" :key="index">
			<view class="item">
				<view class="flex">
					<view class="line">
						<text class="title">{{item.name}}</text>
					</view>
					<view class="line">
						<text class="title">{{item.updatetime}}</text>
					</view>
					<view class="line">
						<text class="title">{{item.value }}</text>
					</view>
					<view class="line">
						<text class="title">{{item.eval}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		data
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				uid: 0,
				userInfo: '',
				dataList: [

				],
			};
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo.uid;	
			this.getAllHistoryList();
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {

			// 查询最新所有历史记录
			getAllHistoryList() {
				this.$http.post('/monitor/index', {
					uid: this.uid,
				}).then(res => {
					this.dataList = res.data.data
				})
			}

		}


	}
</script>

<style lang="scss">
	.content-body {
		/* 添加需要的样式属性 */

		.item {
			margin-top: 10rpx;
			background-color: white;

			.date {
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				color: #28be9e;
				border-bottom: 1rpx solid #ececec;
				// padding: 16rpx;
				align-items: center;
				font-size: 26px;

				text {
					flex: 1;
					text-align: center;
				}
			}

			.flex {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;

				.line {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;

					.title {
						font-size: 16px;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}

					.result {
						/* 添加需要的样式属性 */
					}
				}
			}
		}
	}
</style>