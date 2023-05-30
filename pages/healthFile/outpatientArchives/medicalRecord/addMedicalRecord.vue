<template>
	<view class="out-contain">
		<public-module></public-module>
		<!-- 上导航栏 -->
		<header-nav :title="title"></header-nav>


		<!-- 添加页面主体 -->
		<view class="in-content">
			<!-- 导航栏上下分割 -->
			<view style="height: 20rpx;background-color: #f5f5f5">
			</view>
			<view class="in-content">
				<u-form v-model="record">
					<!-- 1、分类 -->
					<view class="cate">
						<text class="cate-text">{{addText.choiceTitle}}</text>
					</view>
					<view class="switch">
						<u-subsection :list="addText.list" :current="addText.curNow" font-size="15" @change="sectionChange" mode="subsection" inactive-color="#20c6a2" active-color="#20c6a2"></u-subsection>
					</view>

					<view style="height: 40rpx"></view>

					<!-- 2、上传照片 -->
					<view class="uploadImage">
						<text class="cate-text">{{addText.uploadImgText}}</text>
						<view style="height: 20rpx"></view>
						<view class="example-body">
							<!-- 图片没绑定 -->
							<uni-file-picker limit="9" :image-styles="addText.imageStyles"  @select=""></uni-file-picker>
						</view>
						<text class="tip">（友情提示：最多添加9张图片）</text>
					</view>

					<!-- 3、疾病和备注 -->
					<view class="remarks">
						<text class="cate-text" style="">{{addText.remarksText}}</text>
						<view style="height: 20rpx"></view>
						<u-input style="background-color: #f5f5f5" :placeholder="addText.placeholder1" border="false" v-model="record.data_name"></u-input>
						<u-textarea :placeholder="addText.placeholder2" style="background-color: #f5f5f5;margin: 50rpx 0" border="false" v-model="record.data_result"></u-textarea>

					</view>

					<view style="height: 40rpx"></view>

					<!-- 4、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker">
							<!-- 日期没绑定 -->
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
																	 :clearIcon="false"/>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
					</view>


					<view class="save-box">
						<!-- 保存按钮 -->
						<button class="saveBtn" @click="saveRecords">保存</button>
					</view>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
import headerNav from "../components/headerNav.vue";

export default {
	components: {
		headerNav
	},

	data() {
		return {
			title:"门诊病例",

			//添加数据
			record: {
					//急诊类型(需要默认值)
					data_type:'急诊',
					//照片
					picture_1:'',
					picture_2:'',
					picture_3:'',
					//疾病名称
					data_name:'',
					//疾病备注
					data_result:'',
					//注意！！这个是uid
					//用户id
					patient_id:''
					//时间()

				},

			//显示的文本
			addText:{
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
				tourl2:'http://106.14.140.92:8881/platform/dataset/call_kw',
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


				//测试
				value1:'',
			},
		};
	},
	//方法
	methods: {
		//选择器方法
		sectionChange(index) {
			this.record.data_type = this.addText.list[index]
			this.addText.curNow = index;
			//测试
			console.log(index,this.record.data_type)
		},

		//保存方法
		saveRecords(){
			//拿到用户数据
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			const uid = userInfo.uid;
			const token = userInfo.token;
			const _this = this;
			//把疾病类型转化成正确字段存储
			this.record.data_type = this.record.data_type == '急诊' ? 'emergency' : 'General clinic';
			uni.request({
				url:this.addText.tourl2,
				method:'post',
				data:{
					params:{
						//注意！！查接口文档
						model:"inpatient.medical.records",
						token:token,
						uid:uid,
						method:"wreate",
						args:[
							[{
								//急诊类型
								"data_type":this.record.data_type,
								"picture_1":"",
								"picture_2":"",
								"picture_3":"",
								//疾病名称
								"data_name":this.record.data_name,
								//疾病备注
								"data_result":this.record.data_result,
								//注意！！这个是uid
								//用户id
								"patient_id":uid
								//时间
							}]
						],
						kwargs:{}
					}
				},
				success(res){
					//测试
					console.log(res)
					uni.showToast({
						title:'保存成功',
						duration:1000,
						success:()=>{
							setTimeout(() => {
								uni.redirectTo({
									url: _this.addText.tourl,
									success:(res)=>{
										console.log(res)
									},
									fail:(err)=>{
										console.log(err)
									}
								});
							}, 1000);
						}
					});
				}
			});
		},

	},
}
</script>

<style lang="scss">
	.out-contain{
		background-color: #FFFFFF;
		height: 100%;
		.in-content {
			.in-content{
				padding: 0 10rpx;
			}
			.switch{
				width: 600rpx;
				margin-left: 20rpx;
			}
			.cate {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: white;
				padding: 20rpx;
				.select-list {}
			}

			.uploadImage {
				padding: 20rpx;
				background-color: white;
				.tip {
					color: #e0584b;
					font-size: 24rpx
				}
			}

			.remarks {
				margin-top: 14rpx;
				padding: 30rpx;
				height: 400rpx;
				.textarea {
					height: 200rpx;
					font-size: 28rpx;
				}
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