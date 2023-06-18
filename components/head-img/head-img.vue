<template>
	<view>
		<view class="scroll flex justify-between align-center" :style="{top:Height,color:'#FFFFFF'}">
			<view class="icon-top" @click="scrollX(0)">
				<image class="icon" src="@/static/into-img.png"></image>
			</view>
			<scroll-view @scroll="scrollHeadImg" scroll-x="true" class="bookshelf-content" scroll-with-animation
				:scroll-left="scrollLeft">
				<block>
					<text class="blank" :style="{width:leftRightW}"></text> <!-- 左边空白块 -->
					<view v-for="(item,index) in imgs" id="item" :key="index" class="item" :style="{width:itemW+'px'}">
						<image @click="switchHead(index)" :style="{width:imgW+'rpx'}" class="headImg"
							:class="[ tobigactive==index?'toBig':'']" :src="item.images"></image>
						<text style="margin-left: -16px;color: #000;" v-if="tobigactive==index">{{item.name}}</text>
					</view>
					<text class="blank" :style="{width:leftRightW}"></text> <!-- 右边空白块 -->
				</block>
			</scroll-view>
			<view class="icon-top" @click="scrollX(1)">
				<image class="icon1" src="@/static/into-img.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			imgs: {
				type: Array
			}, //图片数组
			itemW: {
				type: Number,
				default: 60
			}, //每一项的宽度
			imgW: {
				type: Number,
				default: 55
			}, //左右两边空白的宽度
			defaultSelect: {
				type: Number,
				default: 2
			}, //默认选中下标
			Height: {
				type: String
			}, //默认选中下标
		},
		data() {
			return {
				scrollLeft: 0,
				tobigactive: 2,
				oldScrollTop: 0,
				timeStamp: (new Date()).getTime(),
				setTimeout: '',
				leftRightW: 240, //左右两边空白的宽度
			}
		},
		mounted() {
			this.tobigactive = this.defaultSelect
			// this.getHeight()
			setTimeout(() => {
				this.scrollLeft = (this.itemW) * this.tobigactive
			}, 1000)
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.leftRightW = windowWidth / 1.5625
		},
		watch: {
			defaultSelect: function(val) {
				console.log(val)
				this.tobigactive = val
				this.scrollLeft = (this.itemW) * this.tobigactive
			}
		},
		methods: {
			getHeight() {
				uni.getSystemInfo({
					success: (res) => {
						this.Height = res.statusBarHeight + (this.itemW / 2)
					}
				});
			},
			scrollX(e) { //左右按钮
				if (((new Date()).getTime() - this.timeStamp) < 1000) { //左右按钮700毫秒只能点击一次,等待动画放完
					return
				} else {
					this.timeStamp = (new Date()).getTime()
				}
				this.scrollLeft = this.tobigactive * (this.itemW)
				if (e == 0 && this.scrollLeft > 0) { //左边按鈕
					this.scrollLeft -= this.itemW
				} else if (e == 1 && this.scrollLeft < (this.imgs.length * this.itemW + this.leftRightW)) { //右边按鈕
					this.scrollLeft += this.itemW
				}
			},
			scrollHeadImg(e) { //滑动选择
				let width = e.detail.scrollWidth //总宽度
				let x = e.detail.scrollLeft //距离左边
				let index = x / ((width - this.leftRightW) / this.imgs.length)
				this.tobigactive = Number(index.toFixed(0)) //当前选中的下标
				this.oldScrollTop = x //保存上次滑动位置
				if (this.setTimeout) {
					clearTimeout(this.setTimeout)
					this.setTimeout = setTimeout(() => {
						clearTimeout(this.setTimeout)
						this.$emit('change', this.tobigactive)
					}, 300)
				} else {
					this.setTimeout = setTimeout(() => {
						clearTimeout(this.setTimeout)
						this.$emit('change', this.tobigactive)
					}, 300)
				}

			},
			switchHead(index) {
				this.tobigactive = index
				this.scrollLeft = this.tobigactive * (this.itemW)
			},
			setVal(e) {
				this.tobigactive = e
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	// scroll头像
	.scroll {
		width: 750rpx;
		height: 160rpx;
		background: #bef1d0;
		// position: fixed;
		top: 120rpx;
		// border-top: 1px solid #333333;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.icon-top {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon {
				width: 10px;
				height: 17px;
				margin-left: 43rpx;
				background-image: none;
				transform: rotate(180deg);
				-ms-transform: rotate(180deg);
				/* IE 9 */
				-moz-transform: rotate(180deg);
				/* Firefox */
				-webkit-transform: rotate(180deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(180deg);
				/* Opera */
			}

			.icon1 {
				width: 10px;
				height: 21px;
				margin-right: 43rpx;
				background-image: none;
			}
		}

		scroll-view {
			color: #FFFFFF;
			display: flex;
			flex-direction: row;
			white-space: nowrap; // 滚动必须加的属性
			width: 600rpx;
			height: 100%;
		}

		.blank {
			display: inline-block;
			width: 240rpx;
			height: 100%;
		}

		.item {
			width: 120px;
			display: inline-block;
			vertical-align: top;
			text-align: center;

			.headImg {
				width: 55rpx;
				height: 55rpx;
				border-radius: 50%;
				margin-top: 40rpx;
				transition: 0.5s;
				-webkit-transition: 0.5s;
				/* Safari */
			}
		}
	}

	.toBig {
		width: 80rpx !important;
		height: 80rpx !important;
		border: 2px solid #FBDB08;
		margin-top: 25rpx !important;
	}

	// scroll头像end
</style>