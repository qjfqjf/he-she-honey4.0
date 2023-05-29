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
		<view>
			<u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
				<view class="m-5">
					<text>请检查填写格式是否有误</text>
				</view>
				<u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
			</u-popup>
		</view>
		<u-button @click="show = true" type="primary" text="提交"></u-button>
	</view>
</template>

<script>
import inputAndChoiceForm from "../componments/inputAndChoiceForm.vue";
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
	export default {
		data() {
			return {
				show: false,
				lists:[{
					question:"最近7天，您是否做了剧烈体育活动？（提重物，挖掘，有氧运动，快速骑车）",
					subTitle:"每周运动天数 (天)",
					choice: ["无相关体育活动"]
				}]
			}
		},
		components:{
			UButton,
			inputAndChoiceForm
		},
		methods: {
			open(e) {
				  // console.log('open', e)
				},
				close(e) {
				  this.show = false
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
