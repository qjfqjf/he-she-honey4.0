<template>
	<view>
		<z-nav-bar title="手动录入"></z-nav-bar>
		<public-module></public-module>
		<view class="content mt-3 mb-5">
			<view class="top d-flex flex-column a-center">
				<view class="value">
					{{scrollLeftNow}}
				</view>
				<text class="unit">
				°C
				</text>
			</view>
			<scroll-choose @scroll="scroll" :scrollStart="scrollStart" :scrollEnd="scrollEnd" :scrollLeft="scrollLeft"
				:maginL="maginL" :isPoint="true"></scroll-choose>


		</view>
		<view style="margin-top: 80rpx;">

		</view>
		<u-gap height="8" bgColor="#bbb"></u-gap>
		<view class="writeTime d-flex j-sb p-2 mt-3" @click="()=> show=true">
			<text>时间：{{selectTime}}</text>
			<view>
				>
			</view>
		</view>
		<view class="p-3">
			<u-button class="mt-4" type="primary" text="确定" @click="handleSaveInfo"></u-button>
		</view>
 
		<u-datetime-picker :show="show" v-model="time" mode="datetime" closeOnClickOverlay @confirm="confirm"
			@cancel="cancel" @close="close"></u-datetime-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import scrollChoose from '@/components/scroll-choose/scroll-choose.vue'
	export default {
		components: {
			scrollChoose,
		},
		data() {
			return {
				show: false,
				time: new Date().format('yyyy-MM-dd hh:mm'),
				selectTime: new Date().format('yyyy-MM-dd hh:mm'),
				scrollLeftNow: 36.4, // 页面显示
				scrollLeft: 36.4, //初始值
				scrollStart: 20, //滚动区域起始值
				scrollEnd: 45, //滚动区域终止值
				maginL: 50, //线间距
				userInfo: '',
			};
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {

			/**
			 * 滑动时触发
			 */
			scroll(val) {
				this.scrollLeftNow = val;
			},


			confirm(time) {
				console.log(time)
				this.show = false
				this.selectTime = new Date(time.value).format('yyyy-MM-dd hh:mm')

			},
			cancel() {
				this.show = false
			},
			close() {
				this.show = false
			},
			// 处理保存
			handleSaveInfo() {
				this.$http.post('/platform/dataset/call_kw', {
					model: "forehead.temperature.gun",
					method: "create",
					args: [
						[{
							"name": "额温枪",
							"numbers":"001",
							"owner":this.userInfo.uid,
							"temperature":this.scrollLeftNow,
							"input_type":"hend",
						}]
					],
					kwargs:{}
				}).then(res => {
					if(this.scrollLeft != 0){
						this.$refs.uToast.show({
							message: '保存成功',
							type: 'success',
						})
						this.btnColor = '#dadada'
						this.scrollLeft = 0
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.desc {
		font-size: 30rpx;
		color: #999;
	}

	.content {
		.top {
			.value {
				font-size: 44rpx;
				font-weight: 500;
				color: #4d90ab;
			}

			.unit {
				font-size: 20rpx;
			}
		}
	}

	.tags {
		tag-item {
			width: 60rpx;
		}

		&::after {
			content: '';
			width: 320rpx;
		}
	}
</style>
