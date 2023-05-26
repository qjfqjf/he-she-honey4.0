<template>
	<view class="out-contain">
		<public-module></public-module>
		<!-- 上导航栏 -->
		<header-nav :title="title"></header-nav>
		<!-- 添加页面主体 -->
		<add-template :addObj="addObj"></add-template>
	</view>
</template>

<script>
import headerNav from "../components/headerNav.vue";
import addTemplate from "../components/addTemplate.vue";
export default {
	components: {
		headerNav,
		addTemplate
	},
	data() {
		return {
			title:"门诊病例",
			//数据
			dataList:[
				{
					type:'',
					remarksText:'',
					choiceTitle:'',
					selectedDate:'',
					text1:'',
					text2:'',
				}
			],
			//显示的文本
			addObj:{
				curNow:0,
				//这边统一写内容用
				choiceTitle:'门诊类别',
				list:["急诊","普通门诊"],
				uploadImgText:'添加病例照片',
				placeholder1:'请输入疾病诊断名称',
				placeholder2:'请添加疾病诊断的备注',
				remarksText:'疾病诊断',
				// 备注
				remarksValue: '',
				// 选择日期
				selectedDate: new Date(),
				imageStyles: {
					width: 90,
					height: 90,
					border: {
					}
				},
				value: 0,
			},
		};
	},
	//方法
	methods: {

	},
}
</script>

<style lang="scss">

</style>