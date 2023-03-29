<template>

	<view class="b-content p-2">
		<z-nav-bar title="血压历史">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
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
				<view class="position">
					监测部位：{{item.position}}
				</view>
				<view class="time">
					{{item.time}}
				</view>
			</view>
			<view class="data d-flex j-sb">
				<view class="SYS">
					收缩压：{{item.SYS}}↑
				</view>
				<view class="DIA">
					舒张压：{{item.DIA}} ↑
				</view>
				<view class="PUL">
					<!-- ↓ -->
					心率：{{item.PUL}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
						position: "左侧",
						time: "2023-3-29 15:30",
						SYS: 168,
						DIA: 98,
						PUL: 81
					},
					{
						position: "左侧",
						time: "2023-3-29 15:30",
						SYS: 168,
						DIA: 98,
						PUL: 81
					},
					{
						position: "左侧",
						time: "2023-3-29 15:30",
						SYS: 168,
						DIA: 98,
						PUL: 81
					},
					{
						position: "左侧",
						time: "2023-3-29 15:30",
						SYS: 168,
						DIA: 98,
						PUL: 81
					}
				]
			};
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
		}
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
