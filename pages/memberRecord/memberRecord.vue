<template>
	<view class="d-flex flex-column">
		<z-nav-bar title="我的会员"></z-nav-bar>
		<u-search placeholder="日照香炉生紫烟" class="searchBar my-1" v-model="searchWords" height="70"
			:clearabled="true"></u-search>
		<view class="d-flex a-center j-center buttonGrounp my-1">
			<u-button type="primary" text="管理会员" class="leftButton" :plain="isActiveButtonB"
				@click="activeButtonA"></u-button>
			<u-button type="primary" text="我的会员" class="rightButton" :plain="!isActiveButtonB"
				@click="activeButtonB"></u-button>
		</view>
<!-- 		<view class="d-flex a-center j-center buttonGrounp my-1">
			<u-button type="primary" text="管理会员" class="leftButton" :plain="isActiveButtonB"
				@click="activeButtonA"></u-button>
			<u-button type="primary" text="我的会员" class="rightButton" :plain="!isActiveButtonB"
				@click="activeButtonB"></u-button>
		</view> -->
		<view>
			<u-index-list :index-list="indexList">
				<template v-for="(item, index) in itemArr">
					<!-- #ifdef APP-NVUE -->
					<!-- 					<u-index-anchor :text="indexList[index]"></u-index-anchor> -->
					<!-- #endif -->
					<u-index-item>
						<!-- #ifndef APP-NVUE -->
						<u-index-anchor :text="indexList[index]"></u-index-anchor>
						<!-- #endif -->
						<view class="list-cell" v-for="(cell, index) in item">
							<view class="d-flex j-sb">
								<view class="d-flex a-center j-center">
									<u--image class="roundAvatar mx-5" shape="circle" height="80upx"
										width="80upx"></u--image>
									<view>{{cell}}</view>
								</view>
								<view v-if="" class="d-flex a-center j-center">
									<view class="phoneIcon">
										<image></image>
									</view>
									<view class="messageIcon">
										<image></image>
									</view>
									<view class="vedioIcon">
										<image></image>
									</view>
								</view>
							</view>
						</view>
					</u-index-item>
				</template>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	import IndexList from './indexList.vue'
	export default {
		data() {
			return {
				searchWords: "",
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
				itemArr: [
					['列表A1', '列表A2', '列表A3'],
					['列表B1', '列表B2', '列表B3'],
					['列表C1', '列表C2', '列表C3'],
					['列表A1', '列表A2', '列表A3'],
					['列表A1', '列表A2', '列表A3'],
					['列表A1', '列表A2', '列表A3'],
					['列表A1', '列表A2', '列表A3'],
					['列表A1', '列表A2', '列表A3'],
					['列表A1', '列表A2', '列表A3'],
					['列表A1', '列表A2', '列表A3'],
				],
				isActiveButtonB: false,
				hairline: false
			}
		},
		methods: {
			activeButtonA() {
				if (this.isActiveButtonB) {
					this.isActiveButtonB = !this.isActiveButtonB
				}

			},
			activeButtonB() {
				if (!this.isActiveButtonB) {
					this.isActiveButtonB = !this.isActiveButtonB
				}
			}
		},
		components: {
			IndexList
		}
	}
</script>

<style lang="scss" scoped>
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

	.searchBar {}

	.buttonGrounp {

		.leftButton {
			border: 0px;
			width: 40%;
			border-bottom-left-radius: 10px;
			border-top-left-radius: 10px;
		}

		.rightButton {
			border: 0px;
			width: 40%;
			border-bottom-right-radius: 10px;
			border-top-right-radius: 10px;
		}
	}
</style>