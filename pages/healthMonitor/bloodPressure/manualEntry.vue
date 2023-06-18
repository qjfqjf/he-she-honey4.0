<template>
	<view>
		<z-nav-bar title="手动录入"></z-nav-bar>
		<public-module></public-module>
		<view class="content mt-3">
			<view class="top d-flex flex-column a-center">
				<view class="value">
					{{scrollSYSLeftNow}}
				</view>
				<text class="unit">
					mmHg
				</text>
			</view>
			<scroll-choose @scroll="scrollSYS" :scrollStart="scrollStart" :scrollEnd="scrollEnd"
				:scrollLeft="scrollSYSLeft" :maginL="maginL"></scroll-choose>
			<view class="desc text-center">高压(收缩压)</view>

		</view>
		<view class="content mt-3">
			<view class="top d-flex flex-column a-center">
				<view class="value">
					{{scrollDIALeftNow}}
				</view>
				<text class="unit">
					mmHg
				</text>
			</view>
			<scroll-choose @scroll="scrollDIA" :scrollStart="scrollStart" :scrollEnd="scrollEnd"
				:scrollLeft="scrollDIALeft" :maginL="maginL"></scroll-choose>
			<view class="desc text-center">低压(舒张压)</view>

		</view>
		<view class="PUL d-flex a-center mt-2 p-2">
			<text class="font-md">心率: </text>
			<u--input type="number" placeholder="请输入心率" border="bottom" clearable @change="change"></u--input>
			<text class="font-md">次分</text>
		</view>

		<!-- tab切换 -->
		<view class="tab-container d-flex j-center my-3 mb-5">
			<view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">左侧</view>
			<view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">右侧</view>
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
				currentTab: 'tab1', //但前选项卡
				pulValue: 0, // 心率
				scrollDIALeftNow: 86, // 低压页面显示
				scrollSYSLeftNow: 128,
				scrollDIALeft: 86, //低压初始值
				scrollSYSLeft: 128,
				scrollStart: 50, //滚动区域起始值
				scrollEnd: 250, //滚动区域终止值
				maginL: 15, //线间距
				userInfo: '',
				uid:0,
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
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			/**
			 * 滑动时触发
			 */
			scrollDIA(val) {
				this.scrollDIALeftNow = val;
			},
			scrollSYS(val) {
				this.scrollSYSLeftNow = val;
			},
			// 输入框值变化
			change(val) {
				this.pulValue = val
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
			handleSaveInfo(){
				if(this.scrollSYSLeft != 0 && this.scrollDIALeft != 0){
					this.$http.post('/platform/dataset/call_kw', {
						model: "sphygmomanometer.jiakang",
						method: "create",
						args: [
							[{
								"name": "血压计 (静态血压计)",
								"numbers":"001",
								"owner":this.uid,
								"systolic_blood_pressure":this.scrollSYSLeft,
								"tensioning_pressure":this.scrollDIALeft,
								"heart_rate":this.pulValue,
								"input_type":"hend",
								"test_time":this.time
							}]
						],
						kwargs:{}
					}).then(res => {
						if(this.pulValue != 0){
							this.$refs.uToast.show({
								message: '保存成功',
								type: 'success',
							})
						}
					})
				}else{
					this.$refs.uToast.show({
						message: '保存失败',
						type: 'error',
					})
				}
			},
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

	.tab {
		padding: 10rpx;
		width: 160rpx;
		text-align: center;
		font-weight: 400;
		border: 2rpx solid #01b09a;
		border-radius: 12rpx;
		color: #20c49f;
		cursor: pointer;

		&.active {
			background-color: #01b09a;
			color: #fff;
		}

		&+.tab {
			border-left: none;
			margin-left: -16rpx;
		}


	}
</style>
