<template>
	<view class="content p-2">
		<z-nav-bar title="血氧趋势">

		</z-nav-bar>
		<public-module></public-module>
		<TimeRage></TimeRage>
	</view>
</template>

<script>
	import TimeRage from '../components/timeRage/TimeRage.vue'
	export default{
		components: {
			TimeRage
		},
	}
</script>

<style>
</style>