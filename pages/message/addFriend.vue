<template>
	<view>
		<z-nav-bar title="添加朋友">
			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>

		</z-nav-bar>
		<view class="searchBar">
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

		</view>
		<view class="u-page">
			<u-index-list
					@scrolltolower="scrolltolower"
			>
					<template v-for="(item, i) in newArr">
						<!-- #ifdef APP-NVUE -->
						<!--					<u-index-anchor :text="indexList[index]"></u-index-anchor>-->
						<!-- #endif -->
						<u-index-item>
							<u-index-anchor v-show="item.length>0" style="" ></u-index-anchor>
								<view class="d-flex j-center a-center my-1">
									<u--image shape="circle" :showLoading="true" :src="avatar" width="40px"
										height="40px"></u--image>
									<span class="list-cell">{{ item.fullname }}</span>
									<span class="list-cell-right" @click="addFriend(item)">添加好友</span>
							</view>
						</u-index-item>
					</template>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
	import UList from "../../uni_modules/uview-ui/components/u-list/u-list.vue";
	import UListItem from "../../uni_modules/uview-ui/components/u-list-item/u-list-item.vue";
	import UCell from "../../uni_modules/uview-ui/components/u-cell/u-cell.vue";
	import UAvatar from "../../uni_modules/uview-ui/components/u-avatar/u-avatar.vue";
	import USearch from "../../uni_modules/uview-ui/components/u-search/u-search.vue";
	import UIcon from "../../uni_modules/uview-ui/components/u-icon/u-icon.vue";

	export default {
		components: {UIcon, USearch, UAvatar, UCell, UListItem, UList, ZNavBar},
		data() {
			return {
				searchText: "",
				indexList: [],
				newArr:[],
				avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
			}
		},
		methods: {
			search() {
				this.$http.post('/friend/user', {
					name: this.searchText
				}).then((res) => {
					console.log(res);
					console.log(Array.isArray(this.newArr));
					if (Array.isArray(this.newArr)) {
					res.data.data.forEach((element, index) => {
						console.log('index', index);
						if (index >= 0) {
							console.log('element', element);
							this.newArr.push(element);
						}
					});
					}
					console.log('newArr', this.newArr);
				});
			},
			addFriend(e){
				console.log(e.user_id);
				this.$http.post('/friend/create', {
					uid: e.user_id
				}).then((res) => {
					console.log(res);
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						duration: 2000,
					})
				});

			},
			goBack(){
				uni.navigateBack({})
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < 30; i++) {
					this.indexList.push({
						url: this.urls[uni.$u.random(0, this.urls.length - 1)]
					})
				}
			}
		}
	}
</script>

<style lang="scss">
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
	.top{
		font-size: 40rpx;
		overflow-wrap: break-word;
		word-break: break-all;
		width: 100%;
		height: 50%;
		display: flex;
		align-items: center; /* 垂直居中 */
	}
	.list-cell {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 24rpx;
	overflow: hidden;
	color: #323233;
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
	}
	.list-cell-right{
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 24rpx;
	overflow: hidden;
	color: blue; /* 将字体颜色改为绿色 */
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
	justify-content: flex-end; /* 将内容靠右对齐 */
	}
</style>
