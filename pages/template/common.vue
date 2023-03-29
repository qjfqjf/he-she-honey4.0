<template>
	<view>
		<z-nav-bar backState="2000" title="模板页面"></z-nav-bar>
		<u-gap
			height="10"
			bgColor="#fff"
		></u-gap>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-cell-group>
			<u-cell class="message" icon="account" url="/pages/template/editInfo" title="我的资料"></u-cell>
			<u-cell class="message" icon="integral-fill" url="/pages/user/bindPhone" title="我的设备"></u-cell>
			<u-cell class="message" icon="rmb-circle" url="/pages/user/bindPhone" title="我的积分"></u-cell>
			<u-cell class="message" icon="integral-fill" url="/pages/user/bindPhone" title="我的评价"></u-cell>
			<u-cell class="message" icon="integral-fill" url="/pages/user/bindPhone" title="订单记录"></u-cell>
			<u-cell class="message" icon="setting" url="/pages/user/bindPhone" title="设置"></u-cell>
			<u-cell class="message" icon="bell" url="/pages/user/bindPhone" title="帮助"></u-cell>
			<u-cell class="message" icon="share-square" url="/pages/user/bindPhone" title="退出"></u-cell>
		</u-cell-group>
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
	height: 86upx;
}
.nav_list {
	background-color: #fff;
	padding: 30upx;
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 10upx;
	&:active {
		background-color: #f5f5f5;
	}
	image {
		width: 38upx;
		height: 38upx;
		margin-left: 10upx;
	}
	text {
		font-size: 32upx;
		color: #333;
		margin-left: 10upx;
	}
	&::after {
		content: '';
		position: absolute;
		right: 30upx;
		top: 50%;
		transform: translateY(-50%);
		width: 40upx;
		height: 40upx;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
}
</style>
