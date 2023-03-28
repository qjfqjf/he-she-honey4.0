<template>
	<view class="container h-100 w-100 flex-column d-flex">
		<public-module></public-module>
		<z-nav-bar home bgColor="#C8E6C9" title="数字健康管理" class="HomeNavBar">
			<view slot="left" class="QRCodeImage"></view>
			<view slot="right" class="locationImage"></view>
		</z-nav-bar>
		<view class="topbar d-flex j-sb w-100 a-center py-1" style="background-color: #C8E6C9;">
			<view>
				<u-button class="leftRoundButton">用户</u-button>
			</view>
			<view class="d-flex a-end w-50">
				<div>
					<u--image class="roundAvatar mx-5" shape="circle" height="80upx" width="80upx">lorem</u--image>
					<h3 class="text-center">Lorem.</h3>
				</div>
				<div>
					<u--image class="roundAvatar mx-5" shape="circle" height="80upx" width="80upx">lorem</u--image>
					<h3 class="text-center">Lorem.</h3>
				</div>

			</view>
			<view>
				<u-button class="rightRoundButton">提醒</u-button>
			</view>
		</view>
		<view class="appFeature w-100 h-100 mx-1">
			<u-row class="appFeature_Row" justify="space-between" gutter="0" v-for="rowBlock in featureBlog">
				<u-col span="2" class="appFeatureBLock d-flex a-end j-center h-100" v-for="block in rowBlock"
					:style="{'background-color': block.color}">
					<view class="">
						<u--text :text="block.name" align="center"></u--text>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-swiper class="swiper mx-1" :list="wisperImage"></u-swiper>
		<view class="appManeger w-100 h-100 m-1">
			<u-row justify="space-between " class="appManeger_row" v-for="row in appManage" gutter="5">
				<u-col span="4" class="appManeger_block d-flex flex-column j-center a-center" v-for="block in row">
					<u--image class="appManeger_block_icon" :src="block.icon" height="120upx" width="120upx">
					</u--image>
					<u--text type="info" :text="block.name" class="appManeger_block_name" align="center">
					</u--text>
				</u-col>
			</u-row>
		</view>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wisperImage: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				featureBlog: [
					[{
							name: "医疗",
							color: "#FF5722"
						},
						{
							name: "医疗",
							color: "#1976D2"
						},
						{
							name: "医疗",
							color: "#7E57C2"
						},
						{
							name: "医疗",
							color: "#43A047"
						},
						{
							name: "医疗",
							color: "#FFB300"
						}
					],
					[{
							name: "医疗",
							color: "#FFB300"
						},
						{
							name: "医疗",
							color: "#43A047"
						},
						{
							name: "医疗",
							color: "#7E57C2"
						},
						{
							name: "医疗",
							color: "#1976D2"
						},
						{
							name: "医疗",
							color: "#FF5722"
						}
					]

					,
					[{
							name: "医疗",
							color: "#FF5722"
						},
						{
							name: "医疗",
							color: "#1976D2"
						},
						{
							name: "医疗",
							color: "#7E57C2"
						},
						{
							name: "医疗",
							color: "#43A047"
						},
						{
							name: "医疗",
							color: "#FFB300"
						}
					]
				],
				appManage: [
					[{
							name: "健康检测",
							icon: "https://cdn.uviewui.com/uview/swiper/swiper3.png"
						},
						{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
						{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
					],
					[{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
						{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
						{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
					],
					[{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
						{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
						{
							name: "健康检测",
							icon: "@/static/icon/homePage/Glu.png"
						},
					],
				]
			};
		},
		components: {
		
		},
		//第一次加载
		onLoad(e) {
			// 隐藏原生的tabbar
			uni.hideTabBar();
		},
		//页面显示
		onShow() {
			// 隐藏原生的tabbar
			uni.hideTabBar();
		},
		//方法
		methods: {
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
			}
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
		}
	};
</script>
<style lang="scss" scoped>

	.QRCodeImage{
		background-image: url('@/static/icon/homePage/Scaning.png');
	}
	.locationImage{
		background-image: url('@/static/icon/homePage/Location.png');
	}
	.leftRoundButton {
		width: 150upx;
		border-bottom-right-radius: 50px;
		border-top-right-radius: 50px;
	}

	.rightRoundButton {
		width: 150upx;
		border-bottom-left-radius: 50px;
		border-top-left-radius: 50px;
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

	.swiper {
		border-radius: 5px;
		height: 180upx;
	}

	.appManeger {
		&_block {

			height: 180upx;

			&_icon {}

			&_name {}
		}
	}
</style>