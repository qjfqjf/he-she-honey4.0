<template>
	<view>
		<z-nav-bar title="添加朋友">
			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>

		</z-nav-bar>
		<view class="searchBar">
			<u-search input-align="center" :show-action="false" :clearabled="true" margin="30rpx" shape="round" placeholder="搜索" v-model="keyword" height="30"></u-search>

		</view>
		<view class="u-page">
			<u-list
					@scrolltolower="scrolltolower"
			>
				<u-list-item
						v-for="(item, index) in urls"
						:key="index"
						class=""
				>
					<u-cell
							:title="`列表长度-${index + 1}`"
					>
						<u-avatar
								slot="icon"
								shape="circle"
								size="40"
								:src="item"
								customStyle="margin: -3px 5px -3px 0"
						></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
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
				keyword: "",
			indexList: [],
					urls: [
				'https://cdn.uviewui.com/uview/album/1.jpg',
				'https://cdn.uviewui.com/uview/album/2.jpg',
				'https://cdn.uviewui.com/uview/album/3.jpg',
				'https://cdn.uviewui.com/uview/album/4.jpg',
				'https://cdn.uviewui.com/uview/album/5.jpg',
				'https://cdn.uviewui.com/uview/album/6.jpg',
				'https://cdn.uviewui.com/uview/album/7.jpg',
				'https://cdn.uviewui.com/uview/album/8.jpg',
				'https://cdn.uviewui.com/uview/album/9.jpg',
				'https://cdn.uviewui.com/uview/album/10.jpg',
			]
			}
		},
		methods: {
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

<style>

</style>
