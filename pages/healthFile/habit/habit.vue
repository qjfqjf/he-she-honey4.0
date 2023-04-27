<template>
	<view>
		<z-nav-bar title="生活习惯"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-collapse
		    @change="change"
		    @close="close"
		    @open="open"
		  >
		    <u-collapse-item
		      title="饮食习惯"
		      name="Docs guide"
			  class="item"
		    >
		      <text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
		    </u-collapse-item>
		    <u-collapse-item
		      title="运动习惯"
		      name="Variety components"
			  class="item"
		    >
		      <text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
		    </u-collapse-item>
		    <u-collapse-item
		      title="个人嗜好"
		      name="Numerous tools"
			  class="item"
		    >
		      <text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
		    </u-collapse-item>
		  </u-collapse>
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

<style>
.item{
	background-color: #ffffff;
}
</style>
