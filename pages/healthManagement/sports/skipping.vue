<template>
	<view class="contaner">
		<z-nav-bar title="跳绳">

		</z-nav-bar>
		<public-module></public-module>

		<!-- 内容区域 -->
		<view class="content">
			<!-- 切换tab 历史和检测 -->
			<view class="tab-container d-flex j-center ">
				<view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">历史
				</view>
				<view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">检测</view>
			</view>


			<!-- 历史页面 -->
			<view class="historyCard" v-if="currentTab === 'tab1'">
				<!-- 时间区间 -->
				<view class="date-range">
					<uni-datetime-picker v-model="range" type="daterange" :border="false" :clear-icon="false"
						@maskClick="maskClick" />
				</view>
				<!-- 运动记录项 -->
				<view class="record-item">
					<view class="record-content" v-for="(item, index) in recordList" :key="index">
						<view class="date">
							<text>{{item.time}}</text>
							
							<text v-if="item.type === 0">自由跳</text>
							<text v-else-if="item.type === 1">倒计时</text>
							<text v-else>倒计数</text>
						</view>
						<view class="line">
							<text class="title">跳绳次数</text>
							<text class="result">{{item.value}}</text>
						</view>
						<view class="line">
							<text class="title">消耗热量（kcal）</text>
							<text class="result">{{item.burned}}</text>
						</view>
						<view class="line">
							<text class="title">跳绳时长</text>
							<text class="result">{{item.elapsed_time}}</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 检测页面 -->
			<view class="checkCard" v-else>
				

				<view v-if="showFreeJump" class="devices-warp mt-2">
					<FreeJump></FreeJump>
				</view>
				<view v-else-if="showCountdown" class="devices-warp mt-2">
					<CountDownJump></CountDownJump>
				</view>
				<view v-else-if="showCountdownNumber" class="devices-warp mt-2">
					<CountDownNumberJump></CountDownNumberJump>
				</view>
				<view v-else class="devices-warp mt-2">
					<u-grid :border="false" col="4">
						<u-grid-item class="item" v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex"
							@tap="handleItemClick(baseListItem)">
							<image style="width: 130rpx; height: 130rpx;" :src="baseListItem.img" mode="aspectFit">
							</image>
							<text class="grid-text mt-2">{{ baseListItem.title }}</text>
						</u-grid-item>
					</u-grid>
					<view class="device-state">
						<u-text color="#01b09a"
							:text="deviceStatus === 0 ? '设备状态：未连接' : '设备状态：已连接' + '(' + deviceId + ')'">
						</u-text>
					</view>
				</view>
			</view>
			<view>
				<u-picker mode="selector" :columns="citys" :show="show0" close-on-click-overlay @cancel="cancel0" @close="close0"
					@confirm="confirm0">
					<!-- <u-select v-model="show0" mode="single-column" :list="citys" @confirm="confirm0"></u-select> -->
					<!-- 在确定和取消事件中间添加文本 -->
					<template #cancel>
						<div>倒计时 - 取消</div>
					</template>
					<template #confirm>
						<div>倒计时 - 确定</div>
					</template>
				</u-picker>
			</view>
			<view>
				<u-picker mode="selector" :columns="counts" :show="show1" close-on-click-overlay @cancel="cancel1" @close="close1"
					@confirm="confirm1">
					<!-- 在确定和取消事件中间添加文本 -->
					<template #cancel>
						<div>倒计数 - 取消</div>
					</template>
					<template #confirm>
						<div>倒计数 - 确定</div>
					</template></u-picker>
			</view>
		</view>
	</view>
</template>

<script>
	const bluethModule = uni.requireNativePlugin('plugin-BtModule');
	import HealthHeader from '../components/healthHeader.vue'
	import FreeJump from '../components/freeJump.vue'
	import CountDownJump from '../components/countDownJump.vue'
	import CountDownNumberJump from '../components/countDownNumberJump.vue'
	import UPicker from "../../../uni_modules/uview-ui/components/u-picker/u-picker.vue";
	export default {
		components: {
			HealthHeader,
			FreeJump,
			CountDownJump,
			CountDownNumberJump,
			UPicker
		},
		data() {
			return {
				username: '', //登录的名字
				showFreeJump: false,
				showCountdown: false,
				showCountdownNumber: false,
				showComponent: false, // 初始状态不显示组件
				handleItemClick(item) {
					// 处理列表项点击事件
					if (item.title === '自由跳') {
						this.showFreeJump = true;
						this.showCountdown = false;
						this.showCountdownNumber = false;
					} else if (item.title === '倒计时') {
						this.show0 = true;
					} else if (item.title === '倒计数') {
						this.show1 = true;
						// this.showFreeJump = false;
						// this.showCountdown = false;
						// this.showCountdownNumber = true;
					}
				},
				currentTab: 'tab1', //但前选项卡
				baseList: [{
						img: require('@/static/icon/healthManagement/sportsRecord.png'),
						title: '自由跳',

					},
					{
						img: require('@/static/icon/healthManagement/skipping.png'),
						title: '倒计时',

					},
					{
						img: require('@/static/icon/healthManagement/sportsReport.png'),
						title: '倒计数',

					},

				],
				deviceStatus: 0,
				deviceId: uni.getStorageSync('tsDeviceId'), // 蓝牙设备的id
				// 日期范围
				range: [this.getFirstDayOfMonth().format('yyyy-MM-dd'), this.getLastDayOfMonth().format('yyyy-MM-dd')],
				recordList: [
				
				],
				macAddr: uni.getStorageSync('macAddr'),
				name: uni.getStorageSync('name'),
				communicationType: uni.getStorageSync('communicationType'),
				dataResult: '',
				show0: false,
				show1: false,
				citys: [
					["半分钟",
					"一分钟",
					"五分钟",
					"十分钟",]
				],
				counts: [
					["30","60","120","自定义"],
				],
			};
		},
		watch: {
			range(newval) {
				console.log('范围选:', this.range);
				this.getSkipData();
			},
		},
		async onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			console.log(111111,this.uid)
			this.getUserInfo()
			this.initPrinter()
			this.timer = setTimeout(() => {
				this.connectedDevice()
			}, 2000)
			this.getSkipData();
		},
		
		//页面显示
		onShow() {
			uni.$on('backWithData', (data) => {
			    this.uid = data.uid;
			    this.username = data.name;
			});
			console.log(111111,this.uid)
		},
		mounted() {
			this.getSkipData();
		},
		//方法
		methods: {
			getUserInfo(){
				this.$http.post('/user/info', {
					id: this.uid,
				}).then(res => {
					this.username = res.data.fullname
				})
			},
			handleMyUser() {
				uni.navigateTo({
					url: '/pages/homePage/myUsers?type=select' // 跳转到指定的目标页面
				});
			},
			/* 初始化 */
			initPrinter() {
				bluethModule.initBluetooth((res) => {
					if (res.code === 200) {
						console.log(`bluethModule---`, JSON.stringify(res));
						this.stateMsg = res['data'];
					}
				});
			},
			/* 连接设备 */
			connectedDevice() {
				const _this = this
				const params = {
					macAddr: this.macAddr,
					name: this.name,
					communicationType: this.communicationType,
				};
				if (this.deviceId != '') {
					_this.deviceStatus = 1
				}
			},
			toggleComponent() {
				// 切换显示状态
				this.showComponentA = !this.showComponentA;
			},
			gotoReport() {
				console.log('跳到营养分析报告页面')
				uni.navigateTo({
					url: '/pages/healthManagement/diet/nutritionReport'
				})
			},
			click(url, name) {
				if (!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});;
			},
			// 时间区域
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			cancel0() {
				this.show0 = false
			},
			close0() {
				this.show0 = false
			},
			confirm0(e) {
				// this.city = e.value[0]
				this.showFreeJump = false;
				this.showCountdown = true;
				this.showCountdownNumber = false;
				this.show0 = false;
			},
			cancel1() {
				this.show1 = false
			},
			close1() {
				this.show1 = false
			},
			confirm1(e) {
				// this.city = e.value[0]
				this.showFreeJump = false;
				this.showCountdown = false;
				this.showCountdownNumber = true;
				this.show1 = false;
			},
			getSkipData(){
				this.$http.post('/skip/index', {
					uid: this.uid,
					start_date: this.range[0],
					end_date: this.range[1]
				}).then(res => {
					this.recordList = res.data;
				})
			},
			// 获取当前月的最后一天
			getLastDayOfMonth() {
				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1; // 月份从0开始，需要加1
				const lastDay = new Date(year, month, 0).getDate(); // 0表示上一个月的最后一天，即当前月的最后一天
				const lastDayOfMonth = new Date(year, month - 1, lastDay);
				return lastDayOfMonth;
			},
			// 获取当前月的第一天
			getFirstDayOfMonth() {
				const today = new Date();
				const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				return firstDayOfMonth
			},
		},
	}
</script>

<style lang="scss">
	.contaner {

		// overflow-y: hidden;
		.analysis-report {
			font-size: 28rpx;
		}

		.content {
			border-top: 1rpx solid #ececec;
			height: calc(100vh - 88rpx);
			font-size: 30rpx;

			.tab-container {
				background-color: white;

				.tab {
					padding: 18rpx;
					width: 100%;
					text-align: center;
					font-weight: 400;
					cursor: pointer;

					&.active {
						background-color: white;
						font-weight: 600;
						border-bottom: #01b09a 6rpx solid;
						color: #01b09a;
					}
				}
			}

			.historyCard {
				border-top: 1rpx solid #ececec;

				.date-range {
					background-color: #fff;
					padding: 10px;
					border-bottom: #01b09a 2rpx solid;
				}

				.record-item {
					margin: 10rpx 0;
					font-size: 29rpx;

					.record-content {
						padding: 10rpx;
						margin-top: 10rpx;
						background-color: white;

						.date {
							border-bottom: 1rpx solid #ececec;
							padding: 16rpx;
							display: flex;
							justify-content: space-between;
						}

						.line {
							padding: 10rpx 20rpx;
							display: flex;
							justify-content: space-between;

							.title {}

							.result {}
						}
					}

				}
			}

			.checkCard {
				border-top: 1rpx solid #ececec;
				padding: 20rpx;
				background-color: white;
				height: calc(100vh - 188rpx);
				display: flex;
				flex-direction: column; // Stack children vertically

				.devices-warp {
					display: flex;
					flex-wrap: wrap;

					.item {
						flex-basis: 40%;
						padding: 30rpx;
						margin: 30rpx;
						width: 180rpx !important;
						border-radius: 20rpx;
						background-color: #effffe !important;
						box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);

						&:nth-child(5n) {
							margin-right: 0;
						}

						.grid-text {
							// font-size: 30rpx;
						}
					}
				}

				.device-state {
					display: flex;
					margin: 0 auto; // 使用自动边距来水平居中
					align-items: center; // 垂直居中内容
					margin-top: 10px; // 添加上边距与 .devices-warp 分隔开
					justify-content: center;
				}
			}

		}
	}

	// .active {
	//   color: #20c49f;
	// }
</style>