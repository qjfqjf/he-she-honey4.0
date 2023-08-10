<template>
	<view class="container">
		<z-nav-bar :title="name">
		</z-nav-bar>
		<public-module></public-module>
		<u-list @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in indexList" :key="index" >
				
				<u-cell :title="item.name" @click="foodInfo(item.cid)"></u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid: 0,
				name: '',
				indexList: [],
				icon:''
			}
		},
		created() {

		},
		onLoad(options) {
			const cid = options.cid;
			const name = options.name;
			const icon = options.icon;
			this.cid = cid
			this.name = name
			this.icon = icon
			this.getFoodIndex();
		},
		methods: {
			getFoodIndex() {
				this.$http.post('/food/index', {
					cid: this.cid
				}).then(res => {
					this.indexList = res.data.data;
				})
			},
			scrolltolower() {
				this.loadmore()
			},
			foodInfo(cid){
				uni.navigateTo({
					url: `/pages/healthManagement/diet/foodInfo?cid=${cid}&value=${this.name}&icon=${this.icon}`,
				})
			}
		}
	}
</script>

<style>
	.container{
		background-color: white;
	}
</style>