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
		      <input-and-choice-form :cell ="lists"></input-and-choice-form>
		    </u-collapse-item>
		    <u-collapse-item
		      title="运动习惯"
		      name="Variety components"
			  class="item"
		    >
					<input-and-choice-form :cell ="lists"></input-and-choice-form>
		    </u-collapse-item>
		    <u-collapse-item
		      title="个人嗜好"
		      name="Numerous tools"
			  class="item"
		    >
					<input-and-choice-form :cell ="lists"></input-and-choice-form>
		    </u-collapse-item>
		  </u-collapse>
	</view>
</template>

<script>
import inputAndChoiceForm from "../componments/inputAndChoiceForm.vue";
	export default {
		data() {
			return {
				lists:[{
					question:"最近7天，您是否做了剧烈体育活动？（提重物，挖掘，有氧运动，快速骑车）",
					subTitle:"每周运动天数 (天)",
					choice: ["无相关体育活动"]
				}]
			}
		},
		components:{
			inputAndChoiceForm
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
