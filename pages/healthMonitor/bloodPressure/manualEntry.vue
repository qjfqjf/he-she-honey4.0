<template>
	<view>
		<z-nav-bar title="手动录入"></z-nav-bar>
		<public-module></public-module>
		<view class="content">
			<scroll-choose @scroll="scroll" :scrollStart="scrollStart" :scrollEnd="scrollEnd" :scrollLeft="scrollLeft"
				:maginL="maginL"></scroll-choose>
			<view>
				{{scrollLeftNow}}
			</view>
		</view>


	</view>
</template>

<script>
	import scrollChoose from '@/components/scroll-choose/scroll-choose.vue'
	export default {
		components: {
			scrollChoose,
		},
		data() {
			return {
				scrollLeftNow: 36.5, //页面显示
				scrollLeft: 36.5, //初始值
				scrollStart: 30, //滚动区域起始值
				scrollEnd: 45, //滚动区域终止值
				maginL: 30, //线间距
			};
		},
		methods: {
			/**
			 * 滑动时触发
			 */
			scroll(val) {
				this.scrollLeftNow = val;
			}
		}
	}
</script>

<style lang="scss">

</style>
