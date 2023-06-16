<template>
	<view class="content">
		<!-- 健康档案组件 -->
	  <header-nav :title="title" :tourl="tourl" :addtext="addtext"></header-nav>
		<!-- 通用组件 -->
	  <public-module></public-module>

	  <!--  空记录  -->
		<view class="nothing" v-if="records.length === 0">
			<!-- 健康管理组件 -->
			<empty-state :title="title" :tourl="tourl"></empty-state>
		</view>

		<!--  非空记录  -->
		<view class="medical-records" v-else>
			<!-- 健康管理组件 -->
			<view class="in-content">
				<!-- 导航栏上下分割 -->
				<view style="height: 20rpx;background-color: #f5f5f5">
				</view>
				<view class="in-content" v-for="(item,index) in records" :key="index">


					<!-- 1、日期 -->
					<view class="remarks">
						<view class="cate">
							<text class="cate-text">日期</text>
						</view>
						<view style="height: 20rpx"></view>
						<view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
							<text style="font-size: 30rpx">{{item.data_time}}</text>
						</view>
					</view>



					<!-- 2、门诊类别 -->
					<view class="remarks">
						<text class="cate-text" style="">{{showObj.typeText}}</text>
						<view style="height: 20rpx"></view>
						<view style="width: 200rpx;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
							<text>{{item.data_type}}</text>
						</view>
					</view>


					<!-- 3、疾病诊断 -->
					<view class="remarks">
						<text class="cate-text" style="">{{showObj.remarksText}}</text>
						<view style="height: 20rpx"></view>
						<view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
							<text>{{item.data_name}}</text>
						</view>
					</view>
					<!-- 4、情况描述 -->
					<view class="remarks">
						<view style="height: 20rpx"></view>
						<view style="width: 100%;height: 200rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
							<text>{{item.data_result}}</text>
						</view>
					</view>

					<!-- 5、图片展示 -->

					<view style="height: 20rpx"></view>

					<view class="remarks">
						<text class="cate-text" style="margin-left: 20rpx">{{showObj.ImgText}}</text>
						<view style="height: 20rpx"></view>

						<u-album
							:previewFullImage="true"
							:urls="imgs[index]"
							:multipleSize="100"
						></u-album>


					</view>

					<!-- 6、分割线 -->
					<u-divider style="margin-top: 50rpx" text="分割线" text-size="10" textColor="#1fc7a3"></u-divider>
				</view>
			</view>
		</view>

	</view>
	  
</template>

<script>
	import emptyState from "../components/emptyState.vue";
	import headerNav from "../components/headerNav.vue";
	import {base64ToPath} from "../../../../uni_modules/mmmm-image-tools_1.4.0";
	export default {
		components:{
			headerNav,
			emptyState,
		},
		data() {
			return {
				// urls2: [
				// 	'https://cdn.uviewui.com/uview/album/1.jpg',
				// 	'https://cdn.uviewui.com/uview/album/2.jpg',
				// 	'https://cdn.uviewui.com/uview/album/3.jpg',
				// 	'https://cdn.uviewui.com/uview/album/4.jpg',
				// 	'https://cdn.uviewui.com/uview/album/5.jpg',
				// 	'https://cdn.uviewui.com/uview/album/6.jpg',
				// 	'https://cdn.uviewui.com/uview/album/7.jpg',
				// 	'https://cdn.uviewui.com/uview/album/8.jpg',
				// 	'https://cdn.uviewui.com/uview/album/9.jpg',
				// 	'https://cdn.uviewui.com/uview/album/10.jpg',
				// ],
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
					selectedDate: '',
					imageStyles: {
						width: 90,
						height: 90,
						border: {
						}
					},
					value: 0,
				},
				//数据
				records:[
				],
				//图片列表
				imgs:[
					[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
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
			//添加图片前缀
			base64AddPrefix(base64img){
				return 'data:image/jpg;base64,'+base64img;
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
							model:'outpatient.medical.records',
							token:token,
							uid:uid,
							domain:[["patient_id","=",uid]],
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
								"data_type",
								"patient_id"
							]
						}
					},
					success:(res)=>{
						console.log(res)
						//把传回来的值存入
						this.records = res.data.result.records
						this.records.forEach((record,index)=>{

							//判断诊断类型
							record.data_type = record.data_type === 'emergency' ? '急诊' : '普通门诊';
							//把图片前缀加上并且转化为正常路径
							if(record.picture_1){
								record.picture_1 = this.base64AddPrefix(record.picture_1)
								this.imgs[index].push(record.picture_1)
							}else{
								record.picture_1 = ''
							}
							if(record.picture_2){
								record.picture_2 = this.base64AddPrefix(record.picture_2)
								this.imgs[index].push(record.picture_2)
							}else{
								record.picture_2 = ''
							}
							if(record.picture_3){
								record.picture_3 = this.base64AddPrefix(record.picture_3)
								this.imgs[index].push(record.picture_3)
							}else{
								record.picture_3 = ''
							}

							console.log(record)
						})
					},
					fail:(err)=>{
						uni.showToast({
							title:err,
						})
					}
				})
			},
		},

		onLoad(){
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
		.in-content {
			background-color: white;
			height: 100%;

			.in-content{
				padding: 0 10rpx;
			}
			.switch{
				width: 400rpx;
				margin-left: 20rpx;
			}
			.cate {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: white;
			}

			.showImage {
				padding: 20rpx;

			}

			.remarks {
				margin-top: 14rpx;
				padding: 20rpx;
			}
			.textarea {
				height: 200rpx;
				font-size: 28rpx;
			}
			.date-body {

				//display: flex;
				align-items: center;

				background-color: white;
				padding: 24rpx;



				.date {
					margin-right: 25rpx;
				}

				.picker {
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;


					.time-picker {
						margin-right: 220rpx;
					}
				}
			}

			.save-box{
				margin-top: 100rpx;
				.saveBtn {
					background-color: #20c6a2;
					margin: 30rpx;
					padding: 12rpx;
					color: white;
					font-size: 35rpx;
				}
			}
		}
	}

</style>
