<template>
	<view>
	    <u-list class="list" >
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="content">
					<view class="top">{{ item.name }}</view>
					<view class="buttom">[官方] · {{item.time}}</view>
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
					name:'健康中国行动（2019-2030）',
					time:'2022-08-09 23:00:00',
				},
				{
					name:"心理健康",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"糖尿病防治",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"高血压防治",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"中医药知识",
					time:'2022-08-09 23:00:00',
				},
				{
					
					name:"性学知识",
					time:'2022-08-09 23:00:00',
				},
				{
					
					name:"养生保健",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"传染病防治",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"药品知识",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"康复知识",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"养生保健",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"养生保健",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"养生保健",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"养生保健",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"养生保健",
					time:'2022-08-09 23:00:00',
				},
				{
					name:"养生保健",
					time:'2022-08-09 23:00:00',
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
	  height: 120rpx;
	  /* line-height: 120rpx; */
	  /* text-align: center; */
	  /* align-items: center; */
	  border-bottom: 2px solid #eee;
	}
	.content{
		display: flex;
		flex-direction: column;
		height: 120rpx;
		/* align-items: center; */
	}
	.top{
		height: 50%;
		align-items: center;
		font-size: 35rpx;
		margin-left: 5%;
		margin-top: 10rpx;
	}
	.buttom{
		height: 50%;
		align-items: center;
		font-size: 20rpx;
		margin-left: 8%;
		color: #aaa;
	}
	
</style>