<template>
	<view>
		<!-- #ifndef H5 -->
		<z-nav-bar title="图片上传"></z-nav-bar>
		<!-- #endif -->
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	//方法
	methods: {
		onPageJump(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '~@/style/mixin.scss';
</style>
