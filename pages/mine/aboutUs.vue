<template>
	<view class="protocol_page">
		<z-nav-bar title="关于我们" bgColor="#ffffff"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="textBox">
			<text class="fontStyle">
				通过医学循证和数据驱动下的健康管理与疾病预防。为小微健康服务机构提供慢病管理、身体指标远程监测、健康指导、健康咨询、医养结合服务。
			</text>
		</view>
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
.protocol_page {
	background-color: #fff;
	padding: 30upx
}

.textBox{
	margin-bottom: 24rpx;
}
.fontStyle{
	font-size: 32rpx;
}
</style>
