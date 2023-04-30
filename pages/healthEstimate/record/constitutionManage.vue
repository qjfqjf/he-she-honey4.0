<template>
	<view>
		<z-nav-bar title="中医体质评估"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<!-- 内容 -->
		<text class="container">
			<view class="name">{{score.name}}</view>
			<view class="Number">{{score.Number}}</view>
			<view class="zhi">阳虚质：{{score.Yang}}</view>
			<view class="zhi">阴虚质：{{score.Yin}}</view>
			<view class="zhi">气虚质：{{score.Qi}}</view>
			<view class="zhi">痰湿质：{{score.Tan}}</view>
			<view class="zhi">湿热质：{{score.Shi}}</view>
			<view class="zhi">血瘀质：{{score.Xue}}</view>
			<view class="zhi">气郁质：{{score.Yu}}</view>
			<view class="zhi">特禀质：{{score.Te}}</view>
			<view class="zhi">
				<view class="Ping">平和质：{{score.Ping}}</view>
			</view>
			
		</text>
		<u-collapse
		    @change="change"
		    @close="close"
		    @open="open"
		  >
		    <u-collapse-item
		      title="阳虚质"
		      name="Docs guide"
			  class="item"
		    >
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
		    </u-collapse-item>
		    <u-collapse-item
		      title="阴虚质"
		      name="Variety components"
			  class="item"
		    >
		      <text class="u-collapse-content">
		      	<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
		      	</uni-card>
		      </text>
		    </u-collapse-item>
		    <u-collapse-item
		      title="气虚质"
		      name="Numerous tools"
			  class="item"
		    >
		      <text class="u-collapse-content">
		      	<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
		      	</uni-card>
		      </text>
		    </u-collapse-item>
			<u-collapse-item
			  title="痰湿质"
			  name="Docs guide"
			  class="item"
			>
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
			</u-collapse-item>
			<u-collapse-item
			  title="湿热质"
			  name="Docs guide"
			  class="item"
			>
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
			</u-collapse-item>
			<u-collapse-item
			  title="血瘀质"
			  name="Docs guide"
			  class="item"
			>
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
			</u-collapse-item>
			<u-collapse-item
			  title="气郁质"
			  name="Docs guide"
			  class="item"
			>
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
			</u-collapse-item>
			<u-collapse-item
			  title="特票质"
			  name="Docs guide"
			  class="item"
			>
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
			</u-collapse-item>
			<u-collapse-item
			  title="平和质"
			  name="Docs guide"
			  class="item"
			>
				<text class="u-collapse-content">
					<uni-card class="card" title="标题文字" thumbnail="" extra="额外信息" note="Tips">内容主体，可自定义内容及样式
					</uni-card>
				</text>
			</u-collapse-item>
		  </u-collapse>
		  <!-- <u-button class="custom-style" size="large" text="提交"></u-button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				score: {
					name: '测试评分',
					Number: '89',
				    Yang: '否',
					Yin: '倾向是',
					Qi: '是',
					Tan: '是',
					Shi: '是',
					Xue: '否',
					Yu : '否',
					Te: '否',
					Ping: '否',
				}
			}
		},
		methods: { 
			open(e) {
				  // console.log('open', e)
				},
				close(e) {
				  // console.log('close', e)
				},
				change(e) {
				  // console.log('change', e)
				}
		}
	}
</script>

<style lang="scss" scoped>
.item{
	background-color: #ffffff;
}

.text{
	height: 100rpx;
	background-color: #F3FFFC;
}

.custom-style {
	background-color: #1AB76C;
	color: #ffffff;
	width: 80%;
	border-radius: 20rpx;
	margin-left: 10%;
	margin-top: 100px;

}

.container{
	height: 250rpx;
	padding-bottom: 20rpx;
	.name{
		text-align: center;
		color: #0055ff;
		font-size: 70rpx;
		margin-top: 20rpx;
	}
	.Number{
		text-align: center;
		font-size: 100rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.zhi{
		margin-left: 35%;
		.Ping{
			padding-bottom: 20rpx;
		}
	}
	
}
</style>
