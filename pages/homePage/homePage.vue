<template>
	<view class="container h-100 w-100 flex-column d-flex">
		<public-module></public-module>
		<z-nav-bar home title="数字健康管理" class="HomeNavBar" bg-color="#bef1d0" fontColor="black">
			<img slot="left" :src="homePageIcons.Scanning.icon" class="small-icon p-2" alt="" @click="handleScan" />
			<img slot="right" :src="homePageIcons.Location.icon" class="small-icon p-2" alt="" />
		</z-nav-bar>
		<view class="status-bar d-flex m-3 bg-white rounded-20">
			<view class="f-grow-1 flex-column h-50 px-2 py-1">
				<view class="d-flex j-sb a-center">
					<div class="d-flex j-center a-center ">
						<img :src="homePageIcons.Bp.icon" class="medium-icon" alt="">
						<span class="mx-1">
							<h4 style="font-size: 30upx">{{ this.currentData.name }}</h4>
						</span>
					</div>
					<img :src="homePageIcons.ArrowUp.icon" style="width: 20upx" height="10upx" alt="">
				</view>
			</view>
			<view class="f-grow-1 flex-column h-50 px-2 py-1">
				<view class="d-flex j-sb a-center">
					<div class="d-flex j-center a-center">
						<img :src="homePageIcons.Glu.icon" class="medium-icon" alt="">
						<span class="mx-1">
							<h6 style="color: green">{{ this.currentData.value }}</h6>
						</span>
					</div>
					<img :src="homePageIcons.ArrowDown.icon" style="width: 20upx" height="10upx" alt="">
				</view>
			</view>
			<view class="f-grow-1 flex-column h-50 px-2 py-1">
				<view class="d-flex j-sb a-center">
					<div class="d-flex j-center a-center">
						<img :src="homePageIcons.UricAcid.icon" class="medium-icon" alt="">
						<span class="mx-1">
							<h4 style="font-size: 30upx">{{ this.currentData.eval }}</h4>
						</span>
					</div>
				</view>
			</view>
		</view>
		<view class="top-bar d-flex j-sb w-100 a-center mb-2 h-100">
			<u-button class="leftRoundButton shadow h-100 shadow-lg border"
				@click="onPageJump('/pages/homePage/myUsers')" style="z-index: 1">
				<view class="rounded-circle bg-primary-dark m-1 w-50 h-50 roundButton d-flex a-center j-center"
					style="background-color: rgb(6,158,193); color: aliceblue;"><span>用户</span></view>
			</u-button>

			<view class="scroll-container">
				<HeadImgList :defaultSelect="defaultSelect" v-on:change="changeHeadImg" :imgs="userList"></HeadImgList>
			</view>

			<u-button class="rightRoundButton shadow-lg border" @click="toCalendar" style="z-index: 1">
				<view class="rounded-circle bg-success-dark m-1 w-50 h-50 roundButton d-flex a-center j-center"
					style="background-color: #18b566; color: aliceblue;">提醒</view>
			</u-button>
		</view>

		<view class=" p-1">
			<view class="w-100 rounded-20 " style="background-color: white">
				<swiper :indicator-dots="true" class="swiper">
					<swiper-item v-for="(page,index) in appFeature" :key="index">
						<view class="d-flex">
							<view class="d-flex f-grow-1 flex-column a-center j-center p-1" v-for="(item,index) in page"
								:key="index">
								<view @click="selectImg(page[index])"><img :src="item.icon" class="big-icon" alt="" />
								</view>
								<view>
									{{ item.name }}
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<u-swiper class=" m-1" :list="wisperImage" indicator indicatorMode="line" circular :autoplay="false" radius="5"
			bgColor="#ffffff">
		</u-swiper>
		<view class="m-1 rounded-20 bg-white pb-3">
			<u-gap height="10"></u-gap>

			<view class="m-1 rounded-20 bg-white">
				<u-grid :border="false" col="3">
					<u-grid-item v-for="(listItem,listIndex) in appManage" :key="listIndex">
						<navigator :url="listItem.path">
							<u--image class="appManeger_block_icon" :src="listItem.icon"
								:customStyle="{paddingLeft:15+'rpx'}" height="100upx" width="100upx">
							</u--image>
							<u--text :text="listItem.name" align="center"></u--text>
						</navigator>
					</u-grid-item>
				</u-grid>

				<u-gap height="20"></u-gap>
				<u-grid :border="false" col="2">
					<u-grid-item v-for="(listItem, listIndex) in otherFunction" :key="listIndex">
						<div style="position: relative; display: inline-block;" @click="dev">
							<u-image class="appManeger_block_icon" :src="listItem.icon" height="150upx" width="330upx"
								style="border-radius: 10px;">
							</u-image>
							<text align="left" style="position: absolute; top: 44rpx;
							left: 20rpx; font-weight: bold; font-size: 30rpx; color: black;">{{ listItem.name }}
							</text>
							<button
								style="position: absolute; border-radius: 10px;
							height:40rpx ;width: 120rpx ;top: 110rpx; left: 20rpx;
							font-size: 10rpx; color: rgb(0, 234, 141); background-color:rgb(189, 240, 207);  border: none;">{{ listItem.discription }}
							</button>
						</div>
					</u-grid-item>
				</u-grid>
				<u-toast ref="uToast" />
			</view>
		</view>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	import {
		wisperImage,
		appManage,
		appFeature,
		homePageIcons,
		otherFunction,
	} from "../../static/js/homePage/staticData";
	import UImage from "../../uni_modules/uview-ui/components/u--image/u--image.vue";
	import home from "../template/home.vue";
	import UButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue";
	import $http from '@/config/requestConfig.js';
	import HeadImgList from "@/components/head-img/head-img.vue";


	export default {

		computed: {
			home() {
				return home
			}
		},
		data() {
			return {
				savedData: null,
				wisperImage,
				appManage,
				appFeature,
				homePageIcons,
				otherFunction,
				token: uni.getStorageSync('access-token'),
				uid: '',
				doctorId: 0,
				userInfo: '',
				defaultSelect: 0, //默认选中下标，从0开始
				userList: [{
						images: 'https://img2.baidu.com/it/u=1834432083,2460596852&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '张淑芳'
					},
					{
						images: '../../static/logo.png',
						name: '王立群'
					},
				],
				// 当前用户
				currentUser: {},
				dataList: [], // Your list of data items
				currentIndex: 0,
				currentData: {},
				loginUrl: '',
				createUrl: '',

			};
		},
		components: {
			UButton,
			UImage,
			HeadImgList,
		},
		//第一次加载
		onLoad(e) {
			console.log(uni.getStorageSync('userInfo'), 111)
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			console.log('onLoad', this.uid)
			// 隐藏原生的tabbar
			uni.hideTabBar();
			// console.log('appManage', this.appManage[4]);
			//拿到用户列表
			// this.getRelationList()
			// console.log(this.userList)
			if (!this.token) {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			}
			// console.log('onLoad', e);
		},
		//页面显示
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			console.log('onshow', this.userInfo)
			// 隐藏原生的tabbar
			uni.hideTabBar();
			this.getAllHistoryList();
			this.getUserList();
			//判断蓝牙是否开启
			this.openBlue();

		},

		mounted() {
			this.startTimer();
		},

		//方法
		methods: {
			startTimer() {
				this.updateData();
				this.timer = setInterval(this.updateData, 3000); // 每隔五秒更新数据
			},
			updateData() {
				if (this.dataList[0] != undefined) {
					this.currentData = this.dataList[this.currentIndex];
					this.currentIndex = (this.currentIndex + 1) % this.dataList.length; // 循环切换数据
				} else {
					this.currentData = {
						name: '未测量',
						value: '未测量',
						eval: '未测量'
					}
				}

			},
			// 查询最新所有历史记录
			getAllHistoryList() {
				this.$http.post('/monitor/index', {
					uid: uni.getStorageSync('userInfo'),
				}).then(res => {
					this.dataList = res.data.data
				})
			},
			getUserList() {
				const uid = JSON.parse(uni.getStorageSync('userInfo'))
				if (uid === '') {
					console.log('未查找到用户')
				} else {
					this.$http.post('/user/index', {
						uid: uid,
					}).then(res => {
						this.userList = res.data.data
						console.log('userList', this.userList)
					})
				}

			},
			selectImg(e) {
				console.log('e', e);
				this.appManage[4].icon = "/" + e.icon
				this.appManage[4].name = e.name;
				this.appManage[4].path = e.path;
				this.appManage[4].name = this.appManage[4].name + "服务"
				console.log('appManage', this.appManage[4]);
			},
			toCalendar() {
				uni.navigateTo({
					url: "/pages/calendar/calendar",
				})
			},
			openBlue() {
				console.log('--------------------检查蓝牙是否开启--------------------');
				if (plus.os.name == 'Android') {
					//引入java蓝牙类
					let BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");

					const blueadapter = BluetoothAdapter.getDefaultAdapter(); //拿到默认蓝牙适配器方法

					if (blueadapter) {
						// 判断蓝牙是否开启
						if (blueadapter.isEnabled()) {
							// 已开启
							console.log("蓝牙已开启")
						} else {
							// 未开启弹出提示框
							uni.showModal({
								title: '提示',
								content: '蓝牙尚未打开，是否打开蓝牙',
								showCancel: true,
								cancelText: '取消',
								confirmText: '确定',
								success(res) {
									// 点击确定后通过系统打开蓝牙
									if (res.confirm) {
										const blueadapter = BluetoothAdapter.getDefaultAdapter();
										if (blueadapter != null) {
											return blueadapter.enable();
										}
									} else {
										// 点击取消
										uni.showToast({
											title: "请尽快打开蓝牙！",
											icon: 'none'
										})
									}
								}
							})
						}
					}
				}

			},


			bindUser() {
				console.log()
			},
			//开发中。。。
			dev() {
				uni.showToast({
					title: "开发中...",
					icon: "none"
				})
			},
			async handleScan() {
				const _this = this
				await uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						_this.doctorId = res.result
						uni.showModal({
							title: '提示',
							content: '确定要关注该医生吗？',
							success: function(res) {
								if (res.confirm) {
									_this.$http.post('/bindDockerUser', {
										uid: _this.userInfo.uid,
										did: _this.doctorId,
									}).then((res) => {
										console.log(res)
										if (res.result.code == 200) {
											uni.showToast({
												title: '绑定成功',
												icon: 'none',
												duration: 2000,
											})
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});

					}
				})
				// console.log(this.doctorId)

			},
			// changeHeadImg(index) {
			// 	console.log(this.currentUser)
			// 	console.log('当前选中' + index)
			// 	this.currentUser = this.userList[index]
			// 	uni.setStorageSync('userInfo', this.currentUser.user_id)
			// 	this.uid = uni.getStorageSync('userInfo')
			// 	this.getAllHistoryList()
			// },
			changeHeadImg(index) {
				console.log(this.currentUser)
				console.log('当前选中' + index)
				this.currentUser = this.userList[index]
				uni.setStorageSync('userInfo', this.currentUser.user_id)
				console.log('userInfo', uni.getStorageSync('userInfo'))
				this.$http.post('/user/sig', {
						uid: this.currentUser.user_id
					}).then((res) => {
						console.log(res)
						if (res.code == 20000) {
							// uni.setStorageSync('access-token', res.data)
							console.log('token', uni.getStorageSync('access-token'))
							this.getAllHistoryList()
							// uni.showToast({
							// 	title: '切换成功',
							// 	duration: 2000,
							// 	success: () => {
							// 		setTimeout(() => {
							// 			uni.switchTab({
							// 				url: '/pages/homePage/homePage',
							// 				success: (res) => {
							// 					console.log(res)
							// 				},
							// 				fail: (err) => {
							// 					console.log(err)
							// 				},
							// 			})
							// 		}, 1000)
							// 	},
							// })
						} else {
							uni.showToast({
								title: '切换失败',
								icon: 'none',
								duration: 2000,
							})
						}
					})
					.catch((error) => {
						console.log(error)
					})
			},


			addUser() {
				this.$http.post('/platform/dataset/call_kw', {
					model: "res.users",
					method: "create",
					args: [
						[{
							"name": "赵六",
							"gender": '0',
							"login": "zhaoliu",
							"user_type": '0'
						}],

					],
					kwargs: {}
				}).then(res => {
					console.log(res)
				})
			},

			onPageJump(url) {
				uni.navigateTo({
					url: url
				});
				console.log(111)
			},
			onTokenJump(url) {
				this.judgeLogin(() => {
					uni.navigateTo({
						url: url
					});
				});
			},
			onPrivacyAgreement() {
				// #ifdef H5
				window.open("https://ask.dcloud.net.cn/article/36937");
				// #endif
				// #ifndef H5
				this.$store.commit("setWebViewUrl", "https://ask.dcloud.net.cn/article/36937");
				uni.navigateTo({
					url: '/pages/template/webView'
				});
				// #endif
			},
		},

		//页面隐藏
		onHide() {},
		//页面卸载
		onUnload() {},
		//页面下来刷新
		onPullDownRefresh() {},
		//页面上拉触底
		onReachBottom() {},
		//用户点击分享
		onShareAppMessage(e) {
			return this.wxShare();
		},

	};
</script>
<style lang="scss" scoped>
	.top-bar {
		left: 0;
		right: 0;
		top: 0;
		z-index: 999;
	}

	.scroll-container {
		display: flex;
		flex: 1;
		justify-content: center;
		overflow: hidden;
	}



	.HomeNavBar {
		background-color: rgba(255, 255, 255, 0);
	}

	.small-icon {
		height: 40upx;
		width: 40upx;
	}

	.medium-icon {
		height: 60upx;
		width: 60upx;
	}

	.big-icon {
		height: 120upx;
		width: 120upx;
	}

	.statusBar {
		border-radius: 30%;
		background-color: white;
	}

	.leftRoundButton {
		height: 120upx;
		width: 160upx;
		border-bottom-right-radius: 50px;
		border-top-right-radius: 50px;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.rightRoundButton {
		height: 120upx;
		width: 160upx;
		border-bottom-left-radius: 50px;
		border-top-left-radius: 50px;
		background-color: rgba(255, 255, 255, 0.5);

	}

	.roundButton {
		height: 80upx;
		width: 80upx;
	}

	.scrollAvatar {
		width: 50%;
		height: 80upx;
	}

	.appFeature {
		border-radius: 50px;
		padding: 10px;

		&_Row {
			margin-top: 1px;
			margin-bottom: 1px;
		}

		.appFeatureBLock {
			border: 2px white;
			height: 120upx;
			border-radius: 5px;

		}
	}

	.container {
		background-color: #bef1d0;
	}

	.swiper {
		border-radius: 5px;
		height: 260rpx !important;
	}

	.appManeger {
		&_block {
			height: 180upx;

			&_icon {
				padding-top: 20rpx;
				padding-bottom: 15upx;
			}

			&_name {}
		}
	}

	.swiper {
		height: 150px;
	}

	.unit {
		font-size: 12upx;
	}
</style>