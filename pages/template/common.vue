<template>
	<view>
		<z-nav-bar backState="2000" title="我的"></z-nav-bar>
		<u-gap
			height="10"
			bgColor="#fff"
		></u-gap>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-cell-group>
			<u-cell size="large" class="message" icon="account" url="/pages/template/editInfo" title="我的资料"></u-cell>
			<u-cell size="large" class="message" icon="integral-fill" url="/pages/user/bindPhone" title="我的设备"></u-cell>
			<u-cell size="large" class="message" icon="rmb-circle" url="/pages/user/bindPhone" title="我的积分"></u-cell>
			<u-cell size="large" class="message" icon="integral-fill" url="/pages/user/bindPhone" title="我的评价"></u-cell>	
			<u-cell size="large" class="message" icon="integral-fill" url="/pages/user/bindPhone" title="订单记录"></u-cell>
		</u-cell-group>
		<u-gap
			height="10"
		></u-gap>
		<u-cell-group>
			<u-cell size="large" class="message" icon="setting" url="/pages/user/bindPhone" title="设置"></u-cell>
			<u-cell size="large" class="message" icon="bell" url="/pages/user/bindPhone" title="帮助"></u-cell>
		</u-cell-group>	
		<u-gap
			height="50"
		></u-gap>
		<view class="but">
			<u-button
				text="退出"
				size="normal"
				type="error"
				shape="circle"
				style="height: 100rpx; width:660rpx"
			></u-button>
		</view>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
export default {
	data() {
		return {};
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
		},
		onTokenJump(url) {
			this.judgeLogin(() => {
				// 这里写登录后的代码，未登录不会到这里来，会自动提示去登录
				uni.navigateTo({
					url: url
				});
			});
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
@import '@/style/mixin.scss';
.message{
	background-color: #fff;
}
.but {
	display: flex; 
	justify-content: center;
}
</style>
