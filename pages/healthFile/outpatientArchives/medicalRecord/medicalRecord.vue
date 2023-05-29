<template>
	<view class="content">
		<!-- 健康档案组件 -->
	  <header-nav :title="title" :tourl="tourl" :addtext="addtext"></header-nav>
		<!-- 通用组件 -->
	  <public-module></public-module>

	  <!--  空记录  -->
		<view class="nothing" v-if="dataList.length === 0">
			<!-- 健康管理组件 -->
			<empty-state :title="title" :tourl="tourl"></empty-state>
		</view>

		<!--  非空记录  -->
		<view class="medical-records" v-else>
			<!-- 健康管理组件 -->
			<not-empty-state :dataList="dataList" :showObj="showObj"></not-empty-state>
		</view>
	</view>
	  
</template>

<script>
	import emptyState from "../components/emptyState.vue";
	import notEmptyState from "../components/notEmptyState.vue";
	import headerNav from "../components/headerNav.vue";
	export default {
		components:{
			headerNav,
			emptyState,
			notEmptyState
		},
		data() {
			return {
				//显示的文本
				showObj:{
					curNow:0,
					//这边统一写内容用
					choiceTitle:'门诊类别',
					type:["急诊","普通门诊"],
					ImgText:'病例照片',
					remarksText:'疾病诊断',
					typeText:'门诊类型',
					discription:'情况描述',

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
				//数据
				dataList:[
					// {
					// 	//用户id
					// 	uid:'',
					// 	//病例id
					// 	recordId:'',
					// 	//门诊类型
					// 	type:'急诊',
					// 	//选择的日期
					// 	selectedDate:'111',
					// 	//疾病名称
					// 	illName:'感冒',
					// 	//疾病备注
					// 	illDiscription:'流鼻涕，发热',
					// 	//图片
					// 	imgs:[
					// 		'../../../../static/icon/wechat.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 	],
					// }
				],
				title:'门诊病例',
				//点击添加跳转的路由
				tourl:'/pages/healthFile/outpatientArchives/medicalRecord/addMedicalRecord',
				//接口
				tourl2:'http://106.14.140.92:8881/platform/dataset/search_read',
				addtext:'添加病例'
			}
		},

		methods: {
			addMedicalRecord(){
				uni.navigateTo({
					url:this.tourl
				});
			},
			//查询当前用户所有档案
			getRecordsList(){
				//拿到用户信息
				const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				const uid = userInfo.uid;
				const token = userInfo.token;
				//接口调用
				uni.request({
					url:this.tourl2,
					method:'post',
					data: {
						params:{
							model:'inpatient.medical.records',
							token:"c695c406dd17d2fc9dbfe917adaf9e33",
							uid:uid,
							//传回去的数组(存放字段)
							fields:[
								"picture_1",
								"picture_2",
								"picture_3",
									//疾病名称
								"data_name",
									//备注
								"data_result",
									//时间
								"data_time",
									//疾病类型
								"data_type"
							]
						}
					},
					success(res){
						console.log(res.data.result)
						//传回来的值
						this.dataList = res.data.result
					}
				})
			},



		},

		//这里因为上面引用了组件所以无法使用uni中的钩子，onload函数，只能用vue中的钩子了
		created(){
			this.getRecordsList();
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #FFFFFF;
		height: 100%;
		.nothing{
			text-align: center;
			padding-top: 300rpx;
			width: 400rpx;
			margin: 0 auto;
		}
	}

</style>
