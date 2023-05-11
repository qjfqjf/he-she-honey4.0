<template>
	<view>
	    <u-list class="list" >
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="content">
					<view class="left">
						<image class="imgtest" :src="item.icon" mode="aspectFit" />
					</view>
					<view class="right">{{ item.name }}</view>
				</view>
			</view>
	    </u-list>
	</view>
	
</template>

<script>
	export default {
	  data() {
	    return {
			list: [
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"心理健康"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"糖尿病防治"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"高血压防治"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"中医药知识"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"性学知识"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"传染病防治"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"药品知识"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"康复知识"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				{
					icon:"/static/icon/healthEstimate/brain.png",
					name:"养生保健"
				},
				
			  
			]
	    }
	  }
	}
</script>

<style>
	.list {
	  height: 100%;
	}
	.item {
	  height: 100rpx;
	  line-height: 100rpx;
	  text-align: center;
	  border-bottom: 2px solid #eee;
	}
	
	.imgtest{
		height: 50rpx;
		width: 50rpx;
		display: block;
		margin: 0 auto;
	}
	
	.content{
		display: flex;
		align-items: center; /*竖直居中*/
	}
	
	.left{
		width: 20%;
		align-items: center; /*竖直居中*/
	}
	
	.right{
		width: 80%;
		align-items: center; /*竖直居中*/
		text-align: left;
	}
</style>