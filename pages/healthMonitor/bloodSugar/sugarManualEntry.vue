<template>
	<view>
		<z-nav-bar title="手动录入"></z-nav-bar>
		<public-module></public-module>
		<view class="content mt-3">
			<view class="top d-flex flex-column a-center">
				<view class="value">
					{{scrollLeftNow}}
				</view>
				<text class="unit">
					mmol/L
				</text>
			</view>
			<scroll-choose @scroll="scroll" :scrollStart="scrollStart" :scrollEnd="scrollEnd" :scrollLeft="scrollLeft"
				:maginL="maginL" :isPoint="true"></scroll-choose>


		</view>
		<view class="text-center">血糖类型</view>
		<view class="d-flex j-sb flex-wrap mb-5 py-2 tags">
			<view class="m-1 tag-item" v-for="(item, index) in radios" :key="index">
				<u-tag :text="item.text" shape="circle" :color="!item.checked?'#02b19b':'#fff'" border-color="#01b09a"
					:bg-color="item.checked?'#01b09a':''" :plain="!item.checked" :name="index" @click="radioClick">
				</u-tag>
			</view>
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
				scrollLeftNow: 5.6, // 页面显示
				scrollLeft: 5.6, //初始值
				scrollStart: 2, //滚动区域起始值
				scrollEnd: 28, //滚动区域终止值
				maginL: 50, //线间距
				radios: [{
						text: '空腹',
						checked: false
					},
					{
						text: '早餐后',
						checked: false
					},
					{
						text: '午餐前',
						checked: false
					},
					{
						text: '午餐后',
						checked: false
					},
					{
						text: '晚餐前',
						checked: false
					},
					{
						text: '晚餐后',
						checked: false
					},
					{
						text: '睡前',
						checked: false
					}, {
						text: '睡后',
						checked: false
					}
				],

			};
		},
		methods: {
			
			/**
			 * 滑动时触发
			 */
			scroll(val) {
				this.scrollLeftNow = val;
			},

	radioClick(name) {

				this.radios.map((item, index) => {
					item.checked = index === name ? true : false

				})
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
				if (this.pulValue === 0) {
					this.$refs.uToast.warning("请填写心率")
				}
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
