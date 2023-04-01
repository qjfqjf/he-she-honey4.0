<template>
	<view class="content" style="height: 100%;position: relative;" v-if="list.length>0">
		<scroll-view class="list" id="listItem" scroll-x="true" :scroll-left="scrollLeft" @scroll="scroll"
			@scrolltoupper="upper" @scrolltolower="lower">
			<view text-align="center" class="item" style="opacity: 0.5;" v-for="(item,index) in list" :key="index"
				:show-scrollbar="false" :id="'item'+index" :animation="getAnimation(index)"
				:style="{width:itemStyle,marginLeft: index===0?itemFloatStyle:0, marginRight:index===list.length-1?itemFloatStyle:0}">
				<view class="img" :style="getImage(index)" @click="scrollTo(index,null)"></view>
				<view class="text">{{item.name}}</view>
			</view>
		</scroll-view>
		<view style="position: relative;">
			<view class="tjx"></view>
		</view>
		<view class="text" style="min-height: 40vh;">
			<rich-text :nodes="this.list[this.currentIndex].desc"></rich-text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				itemWidth: 0,
				scrollLeft: 0,
				oldScrollLeft: 0,
				animationData: {},
				animationData1: {},
				currentIndex: 0,
				oldCurrentIndex: -1,
				itemStyle: `calc(100vw / ${this.number}) `,
				itemFloatStyle: `calc((100vw - 100vw / ${this.number}) / 2) `
			}
		},
		props: {
			list: {
				type: Array,
				default: []
			},
			//  一个屏幕展示几个
			number: {
				type: Number,
				default: 4
			}
		},
		created() {

		},
		updated() {

		},

		mounted() {
			uni.createSelectorQuery().in(this).select("#listItem").fields({
				size: true,
				scrollOffset: true
			}, data => {
				this.itemWidth = data.width / this.number
			}).exec();


			var animation = uni.createAnimation({
				duration: 1500,
				timingFunction: 'ease',
			})
			animation.scale(1.2).opacity(1).step()

			this.animationData = animation.export()

			var animation1 = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			animation1.scale(1).opacity(0.5).step()
			this.animationData1 = animation1.export()
		},
		methods: {
			upper(e) {
				this.scrollTo(0)
			},
			lower(e) {
				this.scrollTo(this.list.length - 1)
			},
			async scroll(e) {
				this.oldScrollLeft = e.detail.scrollLeft
				if (this.oldScrollLeft % this.itemWidth >= this.itemWidth * 5 / 8 || this.oldScrollLeft % this.itemWidth <=
					this.itemWidth * 3 / 8) {
						await this.scrollTo(Number((this.oldScrollLeft / this.itemWidth).toFixed(0)))
				}
			},
			async scrollTo(index){
				let scrollLeft = this.oldScrollLeft
				if (index !== this.currentIndex) {
					let timer = null
					clearInterval(timer);
					timer = setInterval( async()=> {
						this.oldScrollLeft = scrollLeft
						let iSpeed = 0;
						if (scrollLeft < this.itemWidth * index) {
							iSpeed = 3;
						} else {
							iSpeed = -3;
						}
						if (Math.abs(scrollLeft - this.itemWidth * index) < 3 && Math.abs(scrollLeft - this.itemWidth * index) > -3) {
							//到达终点
							clearInterval(timer);
							this.scrollLeft = await this.itemWidth * index
							this.oldCurrentIndex = this.currentIndex
							this.currentIndex = index
							await this.$emit('change', this.currentIndex)
						} else {
							this.scrollLeft = scrollLeft =  await scrollLeft + iSpeed
						}
					}, 1);
				}
			},
			getAnimation(index) {
				if (index === this.currentIndex) {
					return this.animationData
				} else {
					return this.animationData1
				}
			},
			getImage(index) {
				return {
					backgroundImage: "url(" + this.list[index].url + ")"
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page,
	body,
	uni-page-wrapper,
	uni-page-body {
		background: #fff;
		height: 100%;
	}

	.content {
		background: #ffffff;
		height: 100%;

		.tjx {
			position: absolute;
			border-width: 0 30rpx 30rpx;
			border-style: solid;
			border-color: transparent transparent #ffffff;
			bottom: 0rpx;
			left: calc(50vw - 30rpx);
		}

		.list {
			white-space: nowrap;
			width: 100%;
			height: 200rpx;
			line-height: 200rpx;
			padding: 50rpx 0;
			background-color: rgba($color: #e7e7e7, $alpha: 0.2);

			/deep/ ::-webkit-scrollbar {
				display: none;
				width: 0 !important;
				height: 0 !important;
				-webkit-appearance: none;
				background: transparent;
			}

			// .item:first-child {
			// 	margin-left: calc(100vw * 3/8);
			// }

			// .item:last-child {
			// 	margin-right: calc(100vw * 3/8);
			// }

			.item {
				display: inline-block;

				height: 170rpx;
				line-height: 170rpx;
				border-radius: 10rpx;
				position: relative;
				vertical-align: middle;

				.img {
					margin: 0 auto;
					width: 110rpx;
					height: 110rpx;
					max-width: 110rpx;
					max-height: 110rpx;
					min-width: 110rpx;
					min-height: 110rpx;
					background-size: 110rpx;
					background-repeat: no-repeat;
					background-position: 0;
				}

				.text {
					width: 100%;
					height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					color: #333333;
					letter-spacing: 3rpx;
					line-height: 60rpx;

				}

			}
		}
	}
</style>
