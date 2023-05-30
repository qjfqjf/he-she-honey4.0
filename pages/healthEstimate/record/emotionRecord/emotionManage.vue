<template>
	<view>
		<z-nav-bar title="情绪认知"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-collapse @change="change" @close="close" @open="open">
		    <u-collapse-item title="情绪筛查表1" name="Docs guide" class="item">
					<input-and-choice-form :cell="lists"/>
		    </u-collapse-item>
		    <u-collapse-item title="情绪筛查表2" name="Variety components" class="item">
					<input-and-choice-form :cell="lists"/>
		    </u-collapse-item>
		    <u-collapse-item title="认知功能自评表" name="Numerous tools" class="item">
					<input-and-choice-form :cell="lists"/>
		    </u-collapse-item>
		  </u-collapse>
		  <!-- <u-button class="custom-style" size="large" text="提交"></u-button> -->
	</view>
</template>

<script>
	import InputAndChoiceForm from "../../../healthAssessment/emotionalCognition/components/inputAndChoiceForm.vue";

	export default {
		components: {InputAndChoiceForm},
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
				],
				lists: [{
					question: "1.感到不安，担心及烦躁：",
					options: ["完全没有","有几天","一半以上天数","几乎每天"],
					value: "完全没有"
				},
					{
						question: "2.不能停止或无法控制担心：",
						options: ["完全没有","有几天","一半以上天数","几乎每天"],
						value: "有几天"
					},{
						question: "3.对各种各样的事情担忧过多：",
						options: ["完全没有","有几天","一半以上天数","几乎每天"],
						value: "一半以上天数"
					},{
						question: "4.很紧张，很难放松下来：",
						options: ["完全没有","有几天","一半以上天数","几乎每天"],
						value: "有几天"
					},{
						question: "5.非常较早，以至于无法静坐",
						options: ["完全没有","有几天","一半以上天数","几乎每天"],
						value: "有几天"
					}]

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
