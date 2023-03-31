<template>
	<view class="container h-100 w-100 flex-column d-flex">
		<public-module></public-module>
		<z-nav-bar home title="数字健康管理" class="HomeNavBar">
		<img slot="left" :src="homePageIcons.Scanning.icon" class="small-icon p-2" alt=""></img>
		<img slot="right" :src="homePageIcons.Location.icon" class="small-icon p-2" alt=""></img>
		</z-nav-bar>
    <view class="status-bar d-flex m-3" >
      <view class="f-grow-1 flex-column h-50 px-2 py-1">
        <view class="d-flex j-sb a-center">
          <div class="d-flex j-center a-center ">
            <img :src="homePageIcons.Bp.icon" class="medium-icon" alt="">
            <span class="mx-1"><h3>血压</h3></span>
          </div>
          <img :src="homePageIcons.ArrowUp.icon" style="width: 20upx" height="10upx" alt="">
        </view>
        <view class="d-flex j-sb a-center">
          <view class="d-flex j-center a-center"><h3 style="color: red">145</h3></view>
          <view class="unit">mmHg</view>
        </view>
      </view>

      <view class="f-grow-1 flex-column h-50 px-2 py-1">
        <view class="d-flex j-sb a-center">
          <div class="d-flex j-center a-center">
            <img :src="homePageIcons.Glu.icon" class="medium-icon" alt="">
            <span class="mx-1"><h3>血压</h3></span>
          </div>
          <img :src="homePageIcons.ArrowDown.icon" style="width: 20upx" height="10upx" alt="">
        </view>
        <view class="d-flex j-sb a-center">
          <view class="d-flex j-center a-center"><h3 style="color: green">145</h3></view>
          <view class="unit">mmHg</view>
        </view>
      </view>

      <view class="f-grow-1 flex-column h-50 px-2 py-1">
        <view class="d-flex j-sb a-center">
          <div class="d-flex j-center a-center">
            <img :src="homePageIcons.UricAcid.icon" class="medium-icon" alt="">
            <span class="mx-1"><h3>血压</h3></span>
          </div>
<!--          <img :src="homePageIcons.ArrowUp.icon" style="width: 20upx" height="10upx" alt="">-->
        </view>
        <view class="d-flex j-sb a-center">
          <view class="d-flex j-center a-center"><h3 >145</h3></view>
          <view class="unit">mmHg</view>
        </view>
      </view>

    </view>
		<view class="top-bar d-flex j-sb w-100 a-center py-1" >
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
<!-- 		    <u-scroll-list>
		        <view v-for="(item, index) in appFeature" :key="index">
		            <image :src="item.thumb"></image>
		        </view>
		    </u-scroll-list> -->

<!--
			<swiper :indicator-dots="true" class="swiper">
				<swiper-item>
					<u-grid :border="true" col="4" >
						<u-grid-item :customStyle="{width:220+'rpx',height:220+'rpx'}"
						 v-for="(item,index) in appFeature"
						 :index="index" :key="index">
							<u--image class="appManeger_block_icon" :src="item.icon" height="120upx" width="120upx">
							</u--image>
							<u--text :text="item.name" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</swiper-item>

				<swiper-item>
					<u-grid :border="true" col="4" >
						<u-grid-item :customStyle="{width:220+'rpx',height:220+'rpx'}"
							v-for="(item, index) in appFeature" :index="index + 8" :key="index">
							<u--image class="appManeger_block_icon" :src="item.icon" height="120upx" width="120upx">
							</u--image>
							<u--text :text="item.name" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</swiper-item>

			</swiper> -->

		<u-swiper class="swiper mx-1" :list="wisperImage" previousMargin="30" nextMargin="30" circular :autoplay="false"
			radius="5" bgColor="#ffffff"></u-swiper>
		<view class="m-1">
			<u-grid :border="false" col="3">
				<u-grid-item v-for="(listItem,listIndex) in appManage" :key="listIndex">
					<navigator :url="listItem.path">
						<u--image class="appManeger_block_icon" :src="listItem.icon" height="120upx" width="120upx">
						</u--image>
						<u--text :text="listItem.name" align="center"></u--text>
					</navigator>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
		<!-- 	<view class="appManeger w-100 h-100 m-1">
			<u-row justify="space-between " class="appManeger_row" v-for="row in appManage" gutter="5">
				<u-col span="4" class="appManeger_block d-flex flex-column j-center a-center" v-for="block in row">
					<u--image class="appManeger_block_icon" :src="block.icon" height="120upx" width="120upx">
					</u--image>
					<u--text type="info" :text="block.name" class="appManeger_block_name" align="center">
					</u--text>
				</u-col>
			</u-row>
		</view> -->
		<z-navigation></z-navigation>
	</view>
</template>

<script>

import {wisperImage,appManage,appFeature,homePageIcons} from "../../static/js/homePage/staticData";
import UImage from "../../uni_modules/uview-ui/components/u--image/u--image.vue";
import home from "../template/home.vue";
	export default {
    computed: {
      home() {
        return home
      }
    },
		data() {
			return {
				wisperImage,
				appManage,
				appFeature,
        homePageIcons
			};
		},
		components: {
      UImage

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
  .small-icon{
    height: 40upx;
    width: 40upx;
  }
  .medium-icon{
    height: 60upx;
    width: 60upx;
  }
  .statusBar{
    border-radius: 30%;
    background-color: white;
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

			&_icon {
				padding-top: 20rpx;
			}

			&_name {}
		}
	}
	.swiper{
		height: 150px;
	}
</style>
