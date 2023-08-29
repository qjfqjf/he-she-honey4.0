<template>
	<view>
		<z-nav-bar title="我的评价">
			
		</z-nav-bar>
		<view style="background-color: #ffffff;">
			<u-search
				placeholder="请输入关键字"
				v-model="keyword"
				:show-action="false"
				@change="change"
			></u-search>
		</view>
		
		<uni-list >
			<uni-list :border="true">
				<!-- 显示圆形头像 -->
				<uni-list-chat v-for="(item, index) in list" :key="index" :avatar-circle="true" :title="item.fullname" :avatar="item.headurl" :note="item.content" :time="item.createtime" :clickable="true" @click="onClick(item.did)"></uni-list-chat>
				<!-- 右侧带角标 -->
			</uni-list>
		</uni-list>
		<!-- <z-navigation></z-navigation> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				keyword: '',
				list: [],
			}
		},
		onLoad() {
			this.getComment();
		},
		methods: {
			getComment(){
				this.$http.post('/rating/index',{

				}).then((res)=>{
					console.log(res)
					res.data.data.forEach((element,index) => {
						if(element.content) this.list.push(element);
					});
				})
			},
			onClick(e){
				console.log(e);
				uni.navigateTo({
					url:'/pages/mine/commentDetail?did='+e
				})
			}
		}
	}
</script>

<style>

</style>
