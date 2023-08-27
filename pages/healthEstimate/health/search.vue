<template>
	<view class="content p-2">
		<z-nav-bar title="搜索界面"></z-nav-bar>
		<public-module></public-module>
		<view class="top">
			<u-search
				class="search-left" 
				placeholder="请输入搜索内容" 
				v-model="searchText" 
				borderColor="#dadada"
				:showAction="false"
				>
			</u-search>
			<view class="search-right" @click="search">搜索</view>
		</view>
		
		
		<view class="content" v-for="(item, index) in searchResult" :key="index">
			<view class="content-one">
				<view class="content-top">
					<view class="left">
						<view class="top">{{ item.name }}</view>
						<view class="buttom">{{ item.desc }}</view>
					</view>
					<view class="right">
						<image class="imgtest" :src="item.imgUrl" mode="aspectFit" />
					</view>
				</view>
				<view class="content-buttom"></view>
			</view>
		</view>
		
		<u-toast ref="uToast" style=""></u-toast>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: '',
				searchResult: [],
				List: [
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
					// {
					// 	title: '综合心理健康测评',
					// 	description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
					// 	imgUrl: '/static/icon/healthEstimate/brain.png',
					// },
				],
			}
		},
		methods: {
		    search() {
				// 调用搜索接口，传入搜索关键字


				this.$http.get('/mmpt_question/index', {
						name: this.searchText,
						// area_type: 2
					})
					.then(res => {
						console.log('res',res);
						if (res.data.data && res.data.data.length) {
						// 如果有搜索结果，更新数据
						this.searchResult = res.data.data;
						for (var record of this.searchResult){
						if(record.name.length > 7) record.name = record.name.slice(0,7)
						if(record.desc.length > 30) record.desc = record.desc.slice(0,30)
					}
						console.log('searchResult',this.searchResult);
						} else {
							uni.showToast({
								title: "搜索成功"
							})
						}
					})
					.catch(error=> {
						console.error('请求发生错误', error);
					});


			// 	uni.request({
		    //     url: 'https://example.com/search',
		    //     method: 'GET',
		    //     data: {
			// 		keyword: this.searchText,
		    //     },
		    //     success: res => {
			// 		if (res.data && res.data.length) {
		    //         // 如果有搜索结果，更新数据
		    //         this.searchResult = res.data
		    //     }else{
		    //         uni.showToast({
			// 			title: '没有搜索到结果',
			// 			icon: 'none',
		    //         })
		    //     }
		    //     },
		    //     fail: () => {
		    //       uni.showToast({
		    //         title: '搜索失败，请稍后再试',
		    //         icon: 'none',
		    //       })
		    //     },
		    //   })
		    },
		  },
	}
</script>

<style lang="scss">
	.top{
		display: flex;
		justify-content: space-between;
	}
	
	.search-left{
		width: 85%;
	}
	
	.search-right{
		width: 15%;
		font-size: 30rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		color: #1AB76C;
	}
	
	.content {
	}
	
	.content-one{
		display: flex;
		flex-direction: column;
		height: 190rpx;
	}
	.content-top{
		flex: 1;
		width: 100%;
		height: 155rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	
	
	.left {
		width: 70%;
		height: 160rpx;
		font-size: 10rpx;
		padding: 10rpx;
		margin: 10rpx 10rpx;
	}
	
	.top{
		font-size: 40rpx;
		overflow-wrap: break-word;
		word-break: break-all;
		width: 100%;
		height: 50%;
		display: flex;
		align-items: center; /* 垂直居中 */
	}
	
	.buttom{
		font-size: 27rpx;
		text-align: left;
		overflow-wrap: break-word;
		word-break: break-all;
		width: 100%;
		display: flex;
		align-items: center; /* 垂直居中 */
		height: 50%;
	}
	
	.right {
		width: 30%;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		height: 160rpx; /* 设置容器高度 */
	}
	
	.imgtest{
		width: 140rpx;
		height: 140rpx;
	}
	
	
	.content-buttom {
	    height: 2px;
		width: 100%;
	    background-color: #ebebeb;
		text-align: center;
	}
</style>