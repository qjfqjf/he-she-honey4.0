<template>
	<view class="out-contain">
		<public-module></public-module>
		<!-- 上导航栏 -->
		<header-nav :title="title"></header-nav>
		<!-- 添加页面主体 -->
		<add-template :addObj="addObj" :params="params"></add-template>
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
			//请求的参数
			params:{
				model:"",
				token:"",
				uid:2,
				methods:"create",
				args:[
						[{
							"name":"",
						}]
				],
				kwargs:{}
			},



			//展示数据
			dataObj:[
				{
					//用户id
					uid:'111',
					//病例id
					recordId:'',
					//门诊类型
					type:'',
					//选择的日期
					selectedDate:new Date(),
					//疾病名称
					illName:'',
					//疾病备注
					illDiscription:'',
					//图片
					imgs:[
						''
					],
				},


			],
			//显示的文本
			addObj:{
				//默认的选项
				curNow:0,
				//这边统一写内容用
				choiceTitle:'门诊类别',
				list:["急诊","普通门诊"],
				uploadImgText:'添加病例照片',
				placeholder1:'请输入疾病诊断名称',
				placeholder2:'请添加疾病诊断的备注',
				remarksText:'疾病诊断',
				//返回的路由
				tourl:'/pages/healthFile/outpatientArchives/medicalRecord/medicalRecord',
				//保存接口
				tourl2:'',
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
				type:'',
			},
		};
	},
	//方法
	methods: {

	},
	onShow(){
		this.addObj.type = this.addObj.list[this.addObj.curNow];
		console.log(this.addObj.type)
	}
}
</script>

<style lang="scss">
	.out-contain{
		background-color: #FFFFFF;
		height: 100%;
	}
</style>