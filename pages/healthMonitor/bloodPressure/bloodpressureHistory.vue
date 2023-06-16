<template>

	<view class="b-content p-2">
		<z-nav-bar title="血压历史">
			<view slot="right" class="p-2" @click="handleWarningRule">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<!-- 	<view class="time d-flex j-sb">
			<view class="startTime">
				开始时间：
			</view>
			<view class="endTime">
				结束时间：
			</view>
		</view> -->
		<view class="historyCard mb-3" v-for="(item,index) in dataList" :key="index">
			<view class="top d-flex j-sb mb-2">
				<view class="time">
					{{item.test_time}}
				</view>
				<view class="position">
					监测部位：左侧
					<!-- {{item.position}} -->
				</view>
				
			</view>
			<view class="data d-flex j-sb">
				<view class="SYS">
					收缩压：{{item.systolic_blood_pressure}}↑
				</view>
				<view class="DIA">
					舒张压：{{item.tensioning_pressure}} ↑
				</view>
				<view class="PUL">
					<!-- ↓ -->
					心率：{{item.heart_rate}}
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
				dataList: [
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// },
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// },
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// },
					// {
					// 	position: "左侧",
					// 	time: "2023-3-29 15:30",
					// 	SYS: 168,
					// 	DIA: 98,
					// 	PUL: 81
					// }
				]
			};
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			//查询血压历史记录
			getHistoryList() {
				this.$http.post('/platform/dataset/search_read', {
					model: "sphygmomanometer.jiakang",
					domain:[["owner.id","=",this.uid]],
					fields: [
						"name",
						"numbers",
						"owner",
						"systolic_blood_pressure",
						"tensioning_pressure",
						"heart_rate",
						"input_type",
						"test_time"
					]
				}).then(res => {
					this.dataList = res.result.records
				})
			},
			handleWarningRule(){
				uni.navigateTo({
					url: '/pages/healthMonitor/warningRule/warningRule' // 跳转到指定的目标页面
				});
			},
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
	}
</script>

<style lang="scss">
	.historyCard {
		padding: 40rpx;
		border-radius: 16rpx;
		background-color: #fff;
		box-shadow: inset 0 3px 0 hsla(0, 0, 0, 0), 0 3px 3px hsla(0, 0, 0, .2);

		.top {
			.position {
				font-size: 36rpx;
				font-weight: 700;
			}

			.time {
				color: #666;
			}
		}

		.data {

			.SYS,
			.DIA {

				color: #ffd661;

			}
		}
	}
</style>