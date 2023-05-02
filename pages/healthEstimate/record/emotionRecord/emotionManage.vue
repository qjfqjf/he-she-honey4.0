<template>
	<view>
		<z-nav-bar title="情绪认知"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-collapse @change="change" @close="close" @open="open">
		    <u-collapse-item title="情绪筛查表1" name="Docs guide" class="item">
				<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
		    </u-collapse-item>
		    <u-collapse-item title="情绪筛查表2" name="Variety components" class="item">
		      <text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
		    </u-collapse-item>
		    <u-collapse-item title="认知功能自评表" name="Numerous tools" class="item">
		      <text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
		    </u-collapse-item>
		  </u-collapse>
		  <!-- <u-button class="custom-style" size="large" text="提交"></u-button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [
				  {
				    name: '情绪认知',
				    date: '2022-09-24 19:33:00'
				  }, {
				    name: '情绪认知',
				    date: '2022-09-24 19:33:00'
				  }, {
				    name: '情绪认知',
				    date: '2022-09-24 19:33:00'
				  },{
				    name: '情绪认知',
				    date: '2022-09-24 19:33:00'
				  },
				]
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

.custom-style {
	background-color: #1AB76C;
	color: #ffffff;
	width: 80%;
	border-radius: 20rpx;
	margin-left: 10%;
	margin-top: 400px;

}

</style>
