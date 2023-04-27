<template>
	<view>
		<z-nav-bar title="我的评价"></z-nav-bar>
		<view style="background-color: #ffffff;">
			<u-search
				placeholder="请输入关键字"
				v-model="keyword"
				:show-action="false"
				@change="change"
			></u-search>
		</view>
		
		<uni-list >
			<uni-list :border="true">
				<!-- 显示圆形头像 -->
				<uni-list-chat v-for="(item, index) in list" :key="index" :avatar-circle="true" :title="item.title" :avatar="item.avatarUrl" :note="item.note" :time="item.time" :to="item.url"></uni-list-chat>
				<!-- 右侧带角标 -->
			</uni-list>
		</uni-list>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				list: [{
					title: '张奇誉',
					note: '666666',
					time: '2023-02-02 20:20',
					avatarUrl: 'https://img.36krcdn.com/20200410/v2_224a699a06504292804e4bdf70ca87bb_img_png',
					url: '/pages/mine/commentDetail',
					},
					{
					title: '肖子杨',
					note: '666666',
					time: '2023-02-02 20:20',
					avatarUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
					url: '/pages/mine/commentDetail',
					},
					{
					title: '翔子',
					note: '666666',
					time: '2023-02-02 20:20',
					avatarUrl: 'https://cdn.uviewui.com/uview/album/3.jpg',
					url: '/pages/mine/commentDetail',
					},
					{
					title: '朱朱侠',
					note: '666666',
					time: '2023-02-02 20:20',
					avatarUrl: 'https://cdn.uviewui.com/uview/album/7.jpg',
					url: '/pages/mine/commentDetail',
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
