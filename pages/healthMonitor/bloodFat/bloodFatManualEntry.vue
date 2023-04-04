<template>
	<view>
		<z-nav-bar title="手动录入"></z-nav-bar>
		<public-module></public-module>

		<view class="content mt-3 mb-5" v-for="(item,index) in data" :key="item.name">
			<view class="d-flex">
				<view class="value d-flex flex-column j-end pl-2" style="width: 45%;">
					{{item.name}}
				</view>
				<view class="top d-flex flex-column a-center">
					<view class="value">
						{{item.scrollLeftNow}}
					</view>
					<text class="unit">
						umol/L
					</text>
				</view>
			</view>

			<scroll-choose @scroll="(val)=>scroll(val,index)" :scrollStart="scrollStart" :scrollEnd="scrollEnd"
				:scrollLeft="scrollLeft" :maginL="maginL" :isPoint="true" :pointNum="1">
			</scroll-choose>
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
				data: [{
					scrollLeftNow: 8.2, // 页面显示
					name: 'CHOL'
				}, {
					scrollLeftNow: 8.2,
					name: 'HDL'
				}, {
					scrollLeftNow: 8.2,
					name: 'TRIG'
				}, {
					scrollLeftNow: 8.2,
					name: 'LDL'
				}],

				scrollLeft: 8.2, //初始值
				scrollStart: 0, //滚动区域起始值
				scrollEnd: 35, //滚动区域终止值
				maginL: 50, //线间距


			};
		},
		methods: {

			/**
			 * 滑动时触发
			 */
			scroll(val, index) {
			
				this.data[index].scrollLeftNow = val
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

				console.log(111)
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
