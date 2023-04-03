<template>
	<view>
		<z-nav-bar title="我的积分"></z-nav-bar>
		<view class="count-wrapper">
		  <view class="count">
		    <u-count-to ref="uCountTo" :fontSize="fontSize" bold :endVal="endVal"></u-count-to>
		  </view>
		  <view class="text-wrapper">
		    <text class="count-text">积分</text>
		  </view>
		</view>
		<u-gap
			height="10"
		></u-gap>
		<u-toast ref="uToast"></u-toast>
		<u-cell-group>
			<u-cell v-for="(item, index) in list" :key="index" size="large" class="message" 
			titleStyle="padding-left:20rpx" :icon="item.iconUrl" :title="item.title" @click="showToast(item)"></u-cell>
		</u-cell-group>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				endVal: 100,
				fontSize: '40px',
				list: [{
						type: 'error',
						icon: false,
						title: '积分列表',
						message: "页面尚未开发",
						iconUrl: '../../static/icon/integral/col.png'
					},
					{
						type: 'error',
						icon: false,
						title: '积分规则',
						message: "页面尚未开发",
						iconUrl: '../../static/icon/integral/rule.png'
					},{
						type: 'error',
						icon: false,
						title: '积分兑换',
						message: "页面尚未开发",
						iconUrl: '../../static/icon/integral/exchange.png'
					}
				],
			}
		},
		methods: {
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				})
			}
		}
	}
</script>

<style>
.message{
	background-color: #ffffff;
}
.count-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 300rpx;
}
.text-wrapper {
  display: flex;
  align-items: center;
}
.count{
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.count-text {
  margin-left: 5px;
}
</style>
