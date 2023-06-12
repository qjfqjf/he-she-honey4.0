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
				<u-form v-model="laboratoryExamination">
					<!-- 1、分类 -->
					<view class="cate">
						<text class="cate-text">{{ addObj.choiceTitle }}</text>
					</view>
					<view class="switch">
						<u-subsection :list="addObj.list" :current="addObj.curNow" font-size="15" @change="sectionChange"
							mode="subsection" inactive-color="#20c6a2" active-color="#20c6a2"></u-subsection>
					</view>

					<view style="height: 40rpx"></view>

					<!-- 2、上传照片 -->
					<view class="uploadImage">
						<text class="cate-text">{{ addObj.uploadImgText }}</text>
						<view style="height: 20rpx"></view>
						<view class="example-body">
							<uni-file-picker limit="9" :image-styles="addObj.imageStyles" @select=""></uni-file-picker>
						</view>
						<text class="tip">（友情提示：最多添加9张图片）</text>
					</view>

					<!-- 3、备注和时间 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ addObj.remarksText }}</text>
						<view style="height: 20rpx"></view>
						<u-input style="background-color: #f5f5f5" :placeholder="addObj.placeholder1" border="false"
							v-model="laboratoryExamination.data_name"></u-input>
						<u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 50rpx 0"
							border="false" v-model="laboratoryExamination.data_result"></u-textarea>

					</view>

					<view style="height: 40rpx"></view>

					<!-- 4、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker">
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
								v-model="laboratoryExamination.data_time" :clearIcon="false" />
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
import addTemplate from "../components/addTemplate.vue";
export default {
	components: {
		headerNav,
		addTemplate
	},
	data() {
		return {
			title: "化验检查",
			//数据
			laboratoryExamination: 
				{
					//用户id
					patient_id: '',
					//病例id
					recordId: '',
					//化验类别
					drug_class: '急诊',
					//选择的日期
					data_time:this.formatDate(new Date()),
					//疾病名称
					data_name: '',
					//疾病备注
					data_result: '',
					//图片
					picture_1:'',
					picture_2:'',
					picture_3:'',
				},
			//显示的文本
			addObj: {
				//默认的选项
				curNow: 0,
				//这边统一写内容用
				choiceTitle: '化验类别',
				list: ["血液", "尿液", "影像", "其他"],
				uploadImgText: '添加化验检查',
				placeholder1: '请输入检查项目名称',
				placeholder2: '请添加检查项目的备注',
				remarksText: '检查项目',
				//返回的路由
				tourl: '/pages/healthFile/outpatientArchives/laboratoryExamination/laboratoryExamination',
				//保存接口
				tourl2: 'http://106.14.140.92:8881/platform/dataset/call_kw',
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
				type: '',
			},
		};
	},
	//方法
	methods: {
		//时间格式转换
		formatDate(date) {
			var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                var second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
		},
		sectionChange(index) {
			this.laboratoryExamination.type = this.addObj.list[index]
			this.addObj.curNow = index;
			console.log(index, this.laboratoryExamination.type)
		},
		change(e) {
			console.log("e:", e);
		},


		//保存方法
		saveRecords(){
			//拿到用户数据
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			const uid = userInfo.uid;
			const token = userInfo.token;
			const _this = this;
			//把疾病类型转化成正确字段存储
			// this.record.data_type = this.record.data_type == '急诊' ? 'emergency' : 'General clinic';
			switch(this.laboratoryExamination.drug_class){
				case'血液': this.laboratoryExamination.drug_class='blood';break;
				case'尿液': this.laboratoryExamination.drug_class='urine';break;
				case'影像': this.laboratoryExamination.drug_class='image';break;
				case'其他': this.laboratoryExamination.drug_class='other';break;
			}
			
			uni.request({
				url:this.addObj.tourl2,
				method:'post',
				data:{
					params:{
						//注意！！查接口文档
						model:"inpatient.laboratory.tests",
						token:token,
						uid:uid,
						method:"create",
						args:[
							[{
								//急诊类型
								drug_class:this.laboratoryExamination.drug_class,
								picture_1:"",
								picture_2:"",
								picture_3:"",
								//疾病名称
								data_name:this.laboratoryExamination.data_name,
								//疾病备注
								data_result:this.laboratoryExamination.data_result,
								//注意！！这个是uid
								//用户id
								patient_id:uid,
								//时间
								data_time:this.laboratoryExamination.data_time
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
									url: _this.addObj.tourl,
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
	onShow() {
		this.addObj.type = this.addObj.list[this.addObj.curNow];
		console.log(this.addObj.type)
	}
}
</script>

<style lang="scss">
.out-contain {
	background-color: #FFFFFF;
	height: 100%;

	.in-content {
		.in-content {
			padding: 0 10rpx;
		}

		.switch {
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

		.save-box {
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
}</style>