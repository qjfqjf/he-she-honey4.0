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
				<u-form v-model="ImagingExamination">
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
							v-model="ImagingExamination.data_name"></u-input>
						<u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 50rpx 0"
							border="false" v-model="ImagingExamination.data_result"></u-textarea>

					</view>

					<view style="height: 40rpx"></view>

					<!-- 4、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker">
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
								v-model="ImagingExamination.data_time" :clearIcon="false" />
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
		headerNav,
	},
	data() {
		return {
			title: "影像检查",
			//数据
			ImagingExamination: 
				{
					//用户id
					patient_id: '',
					//照片
					picture_1:'',
					picture_2:'',
					picture_3:'',
					//门诊类型
					check_category: '超声',
					//选择的日期
					data_time: this.formatDate(new Date()),
					//疾病名称
					data_name: '',
					//疾病备注
					data_result: '',
				},
			//显示的文本
			addObj: {
				//默认的选项
				curNow: 0,
				//这边统一写内容用
				choiceTitle: '影像类别',
				list: ["超声", "X线", "CT", "MRI", "其他"],
				uploadImgText: '添加影像检查',
				placeholder1: '请输入检查项目名称',
				placeholder2: '请添加检查项目的备注',
				remarksText: '检查项目',
				//返回的路由
				tourl: '/pages/healthFile/outpatientArchives/imagingExamination/imagingExamination',
				//保存接口
				tourl2: '/imaging/create',
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
			this.ImagingExamination.check_category = this.addObj.list[index]
			this.addObj.curNow = index;
			console.log(index, this.ImagingExamination.check_category)
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
			switch(this.ImagingExamination.check_category){
				case '超声': this.ImagingExamination.check_category=0;break;
				case' X线': this.ImagingExamination.check_category=1;break;
				case 'CT': this.ImagingExamination.check_category=2;break;
				case 'MRI': this.ImagingExamination.check_category=3;break;
				case '其他': this.ImagingExamination.check_category=4;break;
			}
			this.$http.post(this.addObj.tourl2, {
					uid: uid,
					category: this.ImagingExamination.check_category,
					name: this.ImagingExamination.data_name,
					remarks: this.ImagingExamination.data_result,
					time: this.ImagingExamination.data_time
				}).then(res => {
				console.log(res);
				uni.showToast({
					title: '保存成功',
					duration: 1000,
					success: () => {
					setTimeout(() => {
						uni.redirectTo({
						url: _this.addObj.tourl,
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
						});
					}, 1000);
					}
				});
				}).catch(err => {
				console.log(err);
				});


			// uni.request({
			// 	url:this.addObj.tourl2,
			// 	method:'post',
			// 	data:{
			// 		params:{
			// 			//注意！！查接口文档
			// 			model:"inpatient.image.examination",
			// 			token:token,
			// 			uid:uid,
			// 			method:"create",
			// 			args:[
			// 				[{
			// 					//检查类别
			// 					check_category:this.ImagingExamination.check_category,
			// 					picture_1:"",
			// 					picture_2:"",
			// 					picture_3:"",
			// 					//检查项目
			// 					data_name:this.ImagingExamination.data_name,
			// 					//疾病备注
			// 					data_result:this.ImagingExamination.data_result,
			// 					//注意！！这个是uid
			// 					//用户id
			// 					patient_id:uid,
			// 					//时间
			// 					data_time:this.ImagingExamination.data_time
			// 				}]
			// 			],
			// 			kwargs:{}
			// 		}
			// 	},
			// 	success(res){
			// 		//测试
			// 		console.log(res)
			// 		uni.showToast({
			// 			title:'保存成功',
			// 			duration:1000,
			// 			success:()=>{
			// 				setTimeout(() => {
			// 					uni.redirectTo({
			// 						url: _this.addObj.tourl,
			// 						success:(res)=>{
			// 							console.log(res)
			// 						},
			// 						fail:(err)=>{
			// 							console.log(err)
			// 						}
			// 					});
			// 				}, 1000);
			// 			}
			// 		});
			// 	}
			// });
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