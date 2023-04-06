<template>
	<view>
		<z-nav-bar title="消息"></z-nav-bar>
			<u-search class="m-3" margin="30" input-align="center" :show-action="false" shape="square" placeholder="搜索" v-model="keyword" bg-color="#ffffff"></u-search>
		<view class="u-page">
			<u-list
					@scrolltolower="scrolltolower"
			>
				<u-list-item
						v-for="(item, index) in messageIcons"
						:key="index"
						class="py-2"
				>
				<navigator :url="item.path">
					<u-cell
							:title="item.name"
							label="测试数据"
					>
						<u-avatar
								slot="icon"
								shape="circle"
								size="60"
								:src="item.icon"
								customStyle="margin: -3px 5px -3px 0"
						></u-avatar>
<!--						<u&#45;&#45;text class="" slot="value" type ="info" text="我用十年青春,赴你最后之约"></u&#45;&#45;text>-->
					</u-cell>
				</navigator>
				</u-list-item>
			</u-list>
		</view>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
	import UList from "../../uni_modules/uview-ui/components/u-list/u-list.vue";
	import UListItem from "../../uni_modules/uview-ui/components/u-list-item/u-list-item.vue";
	import UCell from "../../uni_modules/uview-ui/components/u-cell/u-cell.vue";
	import UAvatar from "../../uni_modules/uview-ui/components/u-avatar/u-avatar.vue";
	import USearch from "../../uni_modules/uview-ui/components/u-search/u-search.vue";
	import {messageIcons} from "static/js/message/staticData.js"
	import ZNavigation from "../../components/z-navigation/z-navigation.vue";
	export default {
		components: {ZNavigation, USearch, UAvatar, UCell, UListItem, UList, ZNavBar},
		data() {
			return {
				keyword: "",
				messageIcons
			}
		},
		methods: {
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
