<template>
	<view class="content p-2">
		<z-nav-bar title="健康教育"></z-nav-bar>
		<public-module></public-module>
		<view>
			<category :tab-list="tabList"/>
		</view>
	</view>
</template>

<script>
import category from "pages/healthEducation/componment/category.vue";
	export default {
		components:{
			category
		},
		data() {
			return {
				tabList: [{name:'新闻类'}, {name:'知识类'}]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content{
		background-color: #F5F5F5;
	}
	
</style>