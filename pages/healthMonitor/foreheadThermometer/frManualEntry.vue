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
				time: new Date().format('yyyy-MM-dd hh:mm:ss'),
				selectTime: new Date().format('yyyy-MM-dd hh:mm:ss'),
				scrollLeftNow: 36.4, // 页面显示
				scrollLeft: 36.4, //初始值
				scrollStart: 20, //滚动区域起始值
				scrollEnd: 45, //滚动区域终止值
				maginL: 50, //线间距
				userInfo: '',
				uid: 0,
			};
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// 获取URL参数
			const uid = options.uid;
			if (uid == 0) {
				this.uid = this.userInfo
			} else {
				this.uid = uid
			}
			console.log(111111,this.uid)
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
				this.show = false
				this.selectTime = new Date(time.value).format('yyyy-MM-dd hh:mm:ss')
			},
			cancel() {
				this.show = false
			},
			close() {
				this.show = false
			},
			//时间格式转换
			formatDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			// 处理保存
			handleSaveInfo() {
				if (this.scrollLeftNow != 0) {
					this.$http.post('/tem/create', {
						uid: this.uid,					
						value: this.scrollLeftNow,
						time: this.selectTime,
						type: 2
					}).then(res => {
						if (this.scrollLeftNow != 0) {
							this.$refs.uToast.show({
								message: '保存成功',
								type: 'success',
							})
							this.btnColor = '#dadada'
							// this.scrollLeftNow = 0
						}else{
							this.$refs.uToast.show({
								message: '保存失败',
								type: 'error',
							})
							this.btnColor = '#dadada'
							// this.scrollLeftNow = 0
						}
					})
				} else {
					this.$refs.uToast.show({
						message: '保存失败，请检查网络',
						type: 'error',
					})
					this.btnColor = '#dadada'
					// this.scrollLeftNow = 0
				}
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