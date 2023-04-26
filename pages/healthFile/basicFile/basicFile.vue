<template>
	<view>
		<z-nav-bar title="基础档案"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="background">
			<view class="per">
				<view class="left">
					<u-avatar 
						:src="avatar"
						size="60"
						class="avatar"
					></u-avatar>
					<view class="name">{{ name }}</view>
				</view>
				<view class="right">
					<view class="center">
						<view class="msg">
							<view class="title">性别</view>
							<view class="msg2">{{ gender }}</view>
						</view>
						<view class="msg">
							<view class="title">身高(cm)</view>
							<view class="msg2">{{ height }}</view>
						</view>
						<view class="msg">
							<view class="title">年龄</view>
							<view class="msg2">{{ age }}</view>
						</view>
						<view class="msg">
							<view class="title">体重(kg)</view>
							<view class="msg2">{{ weight }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="u-demo-block__content">
			<u-subsection
				:list="list"
				mode="button"
				:current="current"
				activeColor="rgb(57,185,105)"
				bgColor="#ffffff"
				@change="change"
			></u-subsection>
		</view>
	</view>
</template>
0
<script>
	export default {
		data() {
			return {
				current: 0,
				avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
				name: '彭老师',
				gender: '男',
				height: 173,
				age: '60岁',
				weight: 73,
				list:['签约信息', '基本信息', '既往史', '家族史'],
			}
		}, 
		methods: {
			change(index) {
				this.current = index
			},
		}
	}
</script>  

<style>
	.background{
		position: relative;
		background-image: url('../../../static/icon/healthFile/background.png');
		height: 420upx;
		width: 100%;
		background-size: cover;
		
	}
	.per{
		background-color: #ffffff;
		height:200upx;
		width: 100%;
		position: absolute;
		bottom: 0;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		}
	.left {
	  float: left;
	  width: 25%;
	  height: 100%;
	  
	}
	
	.right {
	  float: right;
	  width: 75%;
	  height: 100%;
	  display: flex;
	  justify-content: center;
	  padding-top: 70upx;
	}
	.avatar {
	position: absolute;
	left: 15px;
	top: -26px;
	}
	
	.name {
	  margin-top: 92upx;
	  text-align: center;
	  font-weight: bold;
	}

	.center {
	  height: 120upx;
	  width: 100%;
	  display: flex;
	  justify-content: left;
	}
	
	.msg{
		height: 100%;
		width: 25%;
		display: flex;
		flex-direction: column;
	}
	.title{
		margin: 0 auto;
		font-size: 24upx;
	}
	.msg2{
		margin: 10upx auto;
		font-weight: bold;
	}
</style>
