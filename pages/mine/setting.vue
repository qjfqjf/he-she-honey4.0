<template>
	<view>
		<z-nav-bar  title="设置"></z-nav-bar>
		<public-module></public-module>
		<u-gap
			height="10"
		></u-gap>
		<u-cell-group>
			<u-cell size="large" class="message" icon="lock" url="/pages/template/setPassword" title="设置密码" isLink></u-cell>
			<u-cell size="large" class="message" icon="arrow-upward" url="/pages/sdkDemo/appUpdate" title="版本更新" isLink></u-cell>
			<u-gap
				height="10"
			></u-gap>
			<u-cell size="large" class="message" icon="order" url="/pages/user/protocol" title="用户协议与隐私政策" isLink></u-cell>
			<u-cell size="large" class="message" icon="chat" url="/pages/template/messageReminder" title="消息提醒" isLink></u-cell>	
			<u-cell size="large" class="message" icon="account-fill" url="/pages/template/aboutUs" title="关于我们" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.message{
	background-color: #fff;
}
</style>
