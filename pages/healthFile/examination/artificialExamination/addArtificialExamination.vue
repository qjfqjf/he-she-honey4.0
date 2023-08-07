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
				<u-form v-model="examination">
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

					<!-- 3、体检项目 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ addObj.remarksText1 }}</text>
						<view style="height: 20rpx"></view>
						<u-input style="background-color: #f5f5f5" :placeholder="addObj.placeholder1" border="false"
							v-model="examination.medical_examination_item"></u-input>
					</view>

					<!-- 4、体检备注 -->
					<view class="remarks">
						<u-textarea :placeholder="addObj.placeholder4" style="background-color: #f5f5f5;margin: 0rpx 0"
							border="false" v-model="examination.remarks"></u-textarea>
					</view>

					<!-- 6、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker" @click="showdate = true">
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
								v-model="examination.medical_examination_date" :clearIcon="false" />
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
					</view>


					<view class="save-box">
						<!-- 保存按钮 -->
						<button class="saveBtn" @click="saveRecords()">保存</button>
					</view>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
import headerNav from "pages/healthFile/outpatientArchives/components/headerNav.vue";
import UForm from "../../../../uni_modules/uview-ui/components/u-form/u-form.vue";
import UPicker from "../../../../uni_modules/uview-ui/components/u-picker/u-picker.vue";
export default {
	components: {
		UPicker,
		UForm,
		headerNav,
	},
	data() {
		return {
			title: "体检报告",
			//数据
			examination:
			{
				//体检类别
				medical_examination_type: '健康体检',
				//体检报告img
				medical_examination_file_image: '',
				//体检项目
				medical_examination_item:'',
				//体检备注
				remarks: '',
				//体检时间
				medical_examination_date:this.formatDate(new Date()),
			},


			//显示的文本
			addObj: {
				//默认的选项
				curNow: 0,
				//这边统一写内容用
				choiceTitle: '体检类别',
				list: ["健康体检", "入职体检","专项体检","其他"],
				uploadImgText: '添加体检照片',
				remarksText1: '体检项目',
				placeholder1: '请输入药物名称',
				placeholder4: '请添加疾病诊断的备注',
				//返回的路由
				tourl: '/pages/healthFile/examination/artificialExamination/artificialExamination',
				//保存接口
				tourl2: '/physica/create',
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
		//上方选择器函数
		sectionChange(index) {
			this.examination.medical_examination_type = this.addObj.list[index]
			this.addObj.curNow = index;
			console.log(index, this.examination.medical_examination_type)
		},
		//保存方法
		saveRecords() {
			//测试
			console.log(this.addObj.tourl2)
			console.log('examination',this.examination);
			//拿到用户数据
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			const uid = userInfo.uid;
			const token = userInfo.token;
			const _this = this;

			//把疾病类型转化成正确字段存储
			// this.medicalRecord.drug_class = this.medicalRecord.drug_class == '口服' ? 'Oral administration' : 'Subcutaneous injection';
			switch (this.examination.medical_examination_type) {
								case '健康体检': this.examination.medical_examination_type = 0; break;
								case '入职体检': this.examination.medical_examination_type = 1; break;
								case '专项体检': this.examination.medical_examination_type =2; break;
								case '其他': this.examination.medical_examination_type = 3; break;
							}
			console.log(this.examination.medical_examination_item);


			this.$http.post(this.addObj.tourl2, {
					uid: uid,
					category: this.examination.medical_examination_type,
					name: this.examination.medical_examination_item,
					remarks: this.examination.remarks,
					time: this.examination.medical_examination_date,
					type:1
				}).then(res => {
				uni.showToast({
					title: '保存成功',
					duration: 1000,
					success: () => {
					setTimeout(() => {
						uni.redirectTo({
						url: _this.addObj.tourl,
						success: (res) => {
							console.log(res);
						},
						fail: (err) => {
							console.log(err);
						}
						});
					}, 1000);
					}
				});
				});


			// uni.request({
			// 	url: this.addObj.tourl2,
			// 	method: 'post',
			// 	data: {
			// 		params: {
			// 			//注意！！查接口文档
			// 			model: "medical.examination.file",
			// 			token: token,
			// 			uid: uid,
			// 			method: "create",
			// 			args: 
			// 				[{
			// 					//用药类型
			// 					medical_examination_type: this.examination.medical_examination_type,
			// 					//药物名称
			// 					medical_examination_item: this.examination.medical_examination_item,
			// 					//备注
			// 					remarks: this.examination.remarks,
			// 					//日期
			// 					medical_examination_date: this.examination.medical_examination_date,
			// 					//注意:这个是uid
			// 					//用户id
			// 					//时间
			// 				}],
			// 			kwargs: {}
			// 		}
			// 	},
			// 	success(res) {
			// 		uni.showToast({
			// 			title: '保存成功',
			// 			duration: 1000,
			// 			success: () => {
			// 				setTimeout(() => {
			// 					uni.redirectTo({
			// 						url: _this.addObj.tourl,
			// 						success: (res) => {
			// 							console.log(res)
			// 						},
			// 						fail: (err) => {
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
}
</script>

<style lang="scss">
.out-contain {
	background-color: #FFFFFF;

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
			margin-top: 0rpx;
			padding: 30rpx;

			.textarea {
				height: 100rpx;
				font-size: 28rpx;
			}
		}

		.date-body {

			//display: flex;
			align-items: center;

			background-color: white;
			padding: 24rpx;
			margin-bottom: 100rpx;


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
			height: 200rpx;
			background-color: #FFFFFF;

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