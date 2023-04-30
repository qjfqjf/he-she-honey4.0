<template>
	<view>
		<z-nav-bar title="中医体质评估"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u--text class="text" text="请根据近一年的体验和感觉,回答一下所有问题"></u--text>
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
		  <u-button class="custom-style" size="large" text="提交"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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

</style>
