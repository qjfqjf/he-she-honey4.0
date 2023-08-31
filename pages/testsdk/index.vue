<template>
	<view class="content">
		<view class="way" @click="checkWay()">进入</view>
	</view>
</template>

<script>
	const checkSdk=uni.requireNativePlugin("CL-CheckSdk")
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			checkWay:function(){	
				checkSdk.checkPri(result=>{
					if(result.code==1)
					{
						uni.navigateTo({
							url:"/pages/test/test"
						})
					}
					else{
						uni.showModal({
							content:JSON.stringify(result)
						})
					}
				})
				
			}

		}
	}
</script>

<style>
.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.way{
		height:100rpx;
		margin: 30rpx;
		background-color: #007AFF;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
