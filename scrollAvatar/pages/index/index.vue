<template>
	<view class="content" style="width: 100%;">
		<swiper-list class="list" :list="list" :number="5" @change="switchChange" style="width: 100%;"></swiper-list>
	</view>
</template>

<script>
	import swiperList from '@/components/swiper-list/swiper-list.vue'
	export default {
		components: {
			swiperList
		},
		data() {
			return {
				title: 'Hello',
				list: [{
					name: 'Kuuga',
					code: 'Kuuga',
					desc: 'Kuuga',
					url: '../../static/img/1.jpg'
				},{
					name: '亚极陀',
					code: '亚极陀',
					desc: '亚极陀',
					url: '../../static/img/2.jpg'
				},{
					name: 'decade',
					code: 'decade',
					desc: 'decade',
					url: '../../static/img/3.jpg'
				},{
					name: 'uniapp',
					code: 'uniapp',
					desc: 'uniapp',
					url: '../../static/logo.png'
				},{
					name: 'Kuuga',
					code: 'Kuuga',
					desc: 'Kuuga',
					url: '../../static/img/1.jpg'
				},{
					name: '亚极陀',
					code: '亚极陀',
					desc: '亚极陀',
					url: '../../static/img/2.jpg'
				},{
					name: 'decade',
					code: 'decade',
					desc: 'decade',
					url: '../../static/img/3.jpg'
				},{
					name: 'uniapp',
					code: 'uniapp',
					desc: 'uniapp',
					url: '../../static/logo.png'
				},]
			}
		},
		onLoad() {

		},
		methods: {
			switchChange(index) {
				console.log("选中", index)
			}
		}
	}
</script>

<style scoped>
</style>
