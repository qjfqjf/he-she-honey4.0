<template>


	<view class="scroll-choose-all">
		<view class="middleLine"></view>
		<scroll-view class="scroll-choose" scroll-x="true" upper-threshold="5" lower-threshold="5"
			:scroll-left="scrollLeftInit" show-scrollbar="false" @scroll="scroll" @scrolltoupper="upper"
			@scrolltolower="lower" scroll-with-animation="true">
			<view class="scroll-con" :style="{width: scrollWid}">
				<view class="topLine">
					<view class="allLine" :style="{'marginRight': maginL + 'px'}" :class="item.type"
						v-for="(item,index) in scrollList" :key="index"></view>
				</view>
				<view class="bottomNum" :style="{'paddingLeft': allNumLeft}">
					<text v-show="!isPoint" class="allNum"
						:style="{width: (maginL + 2) * 10 + 'px',left: -((maginL + 2) * 5) + 'px'} "
						v-for="(item,index) in scrollNumList" :key="index">
						{{item}}
					</text>
					<text v-show="isPoint" class="allNum"
						:style="{width: (maginL + 2)  + 'px',left: -((maginL + 2) /2) + 'px'} "
						v-for="(item,index) in scrollNumList" :key="item+'abc'">
						{{item}}
					</text>
				</view>
			</view>
		</scroll-view>
	</view>


</template>

<script>
	export default {
		name: 'ScrollChoose',
		props: {
			//起始值和终止值差距不要过大，否则会影响页面性能
			/**
			 * 初始值（初始值应在起始值和终止值之间）
			 */
			scrollLeft: {
				type: Number,
				default: 0
			},
			/**
			 * 滚动区域起始值（起始值不能大于终止值）
			 */
			scrollStart: {
				type: Number,
				default: 0
			},
			/**
			 * 滚动区域终止值
			 */
			scrollEnd: {
				type: Number,
				default: 100
			},
			/**
			 * 线间距
			 */
			maginL: {
				type: Number,
				default: 10
			},
			// 是否开启小数点模式
			isPoint: {
				type: Boolean,
				default: false
			},
			// 保留到小数点几位
			pointNum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				scrollList: [],
				scrollNumList: [],
				scrollWid: '100vw',
				scrollLeftInit: 0,
				allNumLeft: ''
			}
		},
		mounted() {
			this.init();
		},
		computed: {

		},
		methods: {
			init() {
				for (let i = this.scrollStart; i < this.scrollEnd + 1; i++) {
					const _line = {};

					if (this.isPoint) {
						this.scrollNumList.push(i);
						if (this.pointNum === 2) {
							// 小数位数为两位时
							for (let j = 1; j < 10; j++) {
								const num = i + j / 10
								_line.type = 'SLine';
								this.scrollList.push(_line);
								if (i !== this.scrollEnd) {
									this.scrollNumList.push(num);
								}
							}
						} else {
							// 小数位数为一位时
							if (i % 10 === 0) {
								_line.type = 'LLine';

							} else {
								_line.type = 'SLine';
							}
							this.scrollList.push(_line);
						}
					} else {
						// 没有小数时
						if (i % 5 === 0) {
							if (i % 10 === 0) {
								this.scrollNumList.push(i);
								_line.type = 'LLine';

							} else {
								_line.type = 'MLine';
							}
						} else {
							_line.type = 'SLine';
						}
						this.scrollList.push(_line);
					}

				}
				// 小数位数为两位时
				if (this.pointNum === 2) {
					this.scrollWid = uni.upx2px(750) + (this.scrollEnd - this.scrollStart) * 10 * (this.maginL + 2) + 'px';
				} else {
					this.scrollWid = uni.upx2px(750) + (this.scrollEnd - this.scrollStart) * (this.maginL + 2) + 'px';
				}

				if (this.scrollStart % 10 != 0) {
					if (this.scrollStart > 0) {
						if (!this.isPoint) {
							this.allNumLeft = (10 - this.scrollStart % 10) * (this.maginL + 2) + uni.upx2px(372) + 'px';
						}
					} else {
						this.allNumLeft = Math.abs(this.scrollStart % 10) * (this.maginL + 2) + uni.upx2px(372) + 'px';
					}
				}
				setTimeout(() => {
					this.setNowLeft();
				}, 100)

			},
			setNowLeft() {
				this.scrollLeftInit = (this.scrollLeft - this.scrollStart) * (this.maginL + 2);
			},
			upper: function(e) {
				setTimeout(() => {
					this.$emit('scroll', this.scrollStart);
				}, 50)
			},
			lower: function(e) {
				setTimeout(() => {
					this.$emit('scroll', this.scrollEnd);
				}, 50)
			},
			scroll: function(e) {
				if (this.isPoint && this.pointNum === 1) {
					const value = parseFloat(e.detail.scrollLeft / (this.maginL + 2))
					this.$emit('scroll', (this.scrollStart + value).toFixed(1));
				} else if (this.isPoint && this.pointNum === 2) {
					const value = parseFloat(e.detail.scrollLeft / (this.maginL + 2))
					this.$emit('scroll', (this.scrollStart + value / 10).toFixed(2));
				} else {
					this.$emit('scroll', Math.round(e.detail.scrollLeft / (this.maginL + 2)) + this.scrollStart);
				}
				// const value = parseFloat(e.detail.scrollLeft / (this.maginL + 2))

				// console.log((this.scrollStart + value).toFixed(1))
				// console.log(this.scrollStart)
				// this.$emit('scroll', (this.scrollStart + value).toFixed(1));
			}
		}
	}
</script>

<style lang="scss">
	@charset "UTF-8";

	.scroll-choose-all {
		width: 750rpx;
		height: 70px;
		background: #f8f8f8;
		margin: 10px 0;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		position: relative;
	}

	.middleLine {
		position: absolute;
		width: 4px;
		height: 40px;
		background: #83DC42;
		left: 375rpx;
		margin-left: -2px;
		z-index: 1;
	}

	.scroll-choose {
		width: 750rpx;
		height: 70px;

		.scroll-con {
			height: 70px;
			overflow: hidden;

			.topLine {
				height: 30px;
				padding: 0 372rpx;
			}

			.bottomNum {
				height: 30px;
				padding: 0 0 0 372rpx;
				width: 100%;

				// display: flex;
				// flex-wrap: nowrap;
				.allNum {
					display: inline-block;
					position: relative;
					// width: 70px;
					// left: -35px;
					text-align: center;
				}
			}

			.allLine {
				display: inline-block;
				// margin-right: 5px;
				width: 2px;
				background: #999;
				position: relative;
			}

			.allLine:last-child {
				margin-right: 0px !important;
			}

			.LLine {
				height: 30px;
			}

			.MLine {
				height: 20px;
				top: -10px;
			}

			.SLine {
				height: 15px;
				top: -15px;
			}
		}
	}
</style>
