<template>
	<view>
		<z-nav-bar backState="2000" title="健康服务"></z-nav-bar>
		<view class="u-demo-block">
			<u-swiper
				:list="wisperImage"
				indicator
				indicatorMode="line"
				circular
				height="150"
			></u-swiper>
		</view>
		<u-cell-group>
			<u-cell size="large" v-for="(item, index) in baseList" :key="index" class="message"  @click="click(item.url)" :title="item.title"></u-cell>
		</u-cell-group>
		<u-toast ref="uToast"></u-toast>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	import { wisperImage } from "../../static/js/serve/staticData";
	export default {
		data() {
			return {
				wisperImage,
				baseList: [{
						title: '医院服务',
						url: ''
					},
					{
						title: '药店服务',
						url: ''
					},
					{
						title: '体检服务',
						url: ''
					},
					{
						title: '医养服务',
						url: ''
					},
					{
						title: '心理咨询服务',
						url: ''
					},
					{
						title: '医学/生活美容服务',
						url: ''
					},
				],
			}
		},
		methods: { 
			click(url) {
				if(url === '') {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style>

</style>
