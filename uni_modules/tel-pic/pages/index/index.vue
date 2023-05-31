<template>
	<view class="content">
		<telPic :imageArr="arr" :lineNum="lineNum" :spacingNumber="spacingNumber"></telPic>
	</view>
</template>
<script>
	import telPic from "../../components/tel-pic.vue"
	export default {
		components: {
			telPic
		},
		data() {
			return {
				arr: [],
				lineNum: 6, //行数 备注：修改此数据时 一定要修改底部css伪类样式  修改此字段必须修改css样式第70行代码
				spacingNumber: 5, //行间距单位px
			}
		},
		onLoad() {
			for (var i = 0; i < 510; i++) {
				var urls = 'https://picsum.photos/450/450?random=' + i;
				this.arr.push(urls)
			}
		},
		methods: {}
	}
</script>

<style>

</style>
