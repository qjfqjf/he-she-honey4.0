<template>
	<view>
		<z-nav-bar title="健康报告"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-cell-group>
			<u-cell size="large" class="message"  url="/pages/healthFile/quota/index" title="生理指标"></u-cell>
			<u-cell size="large" class="message"   url="/pages/healthFile/status/index" title="健康状况"></u-cell>
			<u-cell size="large" class="message" url="/pages/healthFile/habit/habit" title="生活习惯"></u-cell>
		</u-cell-group>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			click() {
				this.$refs.uToast.default('开发中...')
			},
		}
	}
</script>

<style>
.message{
	background-color: #fff;
}
</style>
