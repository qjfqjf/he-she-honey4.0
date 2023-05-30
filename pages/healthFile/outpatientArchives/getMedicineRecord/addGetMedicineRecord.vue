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
				<u-form v-model="medicalRecord">
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

					<!-- 3、药物名称 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ addObj.remarksText1 }}</text>
						<view style="height: 20rpx"></view>
						<u-input style="background-color: #f5f5f5" :placeholder="addObj.placeholder1" border="false"
							v-model="medicalRecord.data_name"></u-input>
					</view>

					<!-- 4、用药剂量 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ addObj.remarksText2 }}</text>
						<view style="height: 20rpx"></view>
						<view class="000" @click="show0 = true"
							style="height: 80rpx;background-color: #f5f5f5;font-size: 28rpx;padding-top: 20rpx;padding-left: 20rpx;display: flex">
							<text style="color: rgb(60, 60, 60)">{{ addObj.placeholder2 }}</text>
							<u-picker :show="show0" ref="uPicker" :columns="columns0" confirmColor="#20c6a2"
								@confirm="confirm0" @change="changeHandler0" @close="close0" @cancel="cancel0"
								:closeOnClickOverlay="true"></u-picker>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>

					</view>

					<!-- 5、用药频次 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ addObj.remarksText3 }}</text>
						<view style="height: 20rpx"></view>
						<view class="111" @click="show1 = true"
							style="height: 80rpx;background-color: #f5f5f5;font-size: 28rpx;padding-top: 20rpx;padding-left: 20rpx;display: flex">
							<text style="color: rgb(60, 60, 60)">{{ addObj.placeholder3 }}</text>
							<u-picker :show="show1" ref="uPicker" :columns="columns1" confirmColor="#20c6a2"
								@confirm="confirm1" @change="changeHandler1" @close="close1" @cancel="cancel1"
								:closeOnClickOverlay="true"></u-picker>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
						<u-textarea :placeholder="addObj.placeholder4" style="background-color: #f5f5f5;margin: 50rpx 0"
							border="false" v-model="medicalRecord.data_result"></u-textarea>
					</view>

					<!-- 6、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker" @click="showdate = true">
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
								v-model="medicalRecord.data_time" :clearIcon="false" />
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
import headerNav from "../components/headerNav.vue";
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
			title: "门诊病例",

			//用药剂量
			show0: false,
			columns0: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
					, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
				['毫克', '克']
			],
			columnData0: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
			],

			//用药频次
			show1: false,
			columns1: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
				['次/日', '次/隔日', '次/周', '次/月']
			],
			columnData1: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
			],


			//数据
			medicalRecord:
			{
				//用药类别
				drug_class: '皮下注射',
				//病例id
				patient_id: '',
				//图片
				picture_1: '',
				picture_2: '',
				picture_3: '',
				//药物名称
				data_name: '',
				//用药剂量
				dosage: '',
				//用药计量单位
				dose_unit: '',
				//用药频次
				frequency: '',
				//用药凭此单位
				frequency_unit: '',
				//备注
				data_result: '',
				//时间
				data_time: '',
			},


			//显示的文本
			addObj: {
				//默认的选项
				curNow: 0,
				//这边统一写内容用
				choiceTitle: '门诊类别',
				list: ["口服", "皮下注射"],
				uploadImgText: '添加病例照片',
				remarksText1: '药物名称',
				remarksText2: '用药剂量',
				remarksText3: '用药频次',
				placeholder1: '请输入药物名称',
				placeholder2: '请选择用药剂量',
				placeholder3: '请选择用药频次',
				placeholder4: '请添加疾病诊断的备注',
				//返回的路由
				tourl: '/pages/healthFile/outpatientArchives/getMedicineRecord/getMedicineRecord',
				//保存接口
				tourl2: 'http://106.14.140.92:8881/platform/dataset/call_kw',
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
		//上方选择器函数
		sectionChange(index) {
			this.medicalRecord.type = this.addObj.list[index]
			this.addObj.curNow = index;
			console.log(index, this.medicalRecord.type)
		},
		//保存方法
		saveRecords() {
			//测试
			console.log(this.addObj.tourl2)
			//拿到用户数据
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			const uid = userInfo.uid;
			const token = userInfo.token;
			const _this = this;

			//把疾病类型转化成正确字段存储
			this.medicalRecord.drug_class = this.medicalRecord.drug_class == '口服' ? 'Oral administration' : 'Subcutaneous injection';
			uni.request({
				url: this.addObj.tourl2,
				method: 'post',
				data: {
					params: {
						//注意！！查接口文档
						model: "inpatient.medical.record",
						token: token,
						uid: uid,
						method: "wreate",
						args: [
							[{
								//用药类型
								"drug_class": this.medicalRecord.drug_class,
								"picture_1": "",
								"picture_2": "",
								"picture_3": "",
								//药物名称
								"data_name": this.medicalRecord.data_name,
								//用药剂量
								"dosage": this.medicalRecord.dosage,
								//用药剂量单位
								"dose_unit": this.medicalRecord.dose_unit,
								//用药频次
								"frequency": this.medicalRecord.frequency,
								//用药频次单位
								"frequency_unit": this.medicalRecord.frequency_unit,
								//备注
								"data_result": this.medicalRecord.data_result,
								//日期
								"data_time": this.medicalRecord.data_time,
								//注意:这个是uid
								//用户id
								"patient_id": uid
								//时间
							}]
						],
						kwargs: {}
					}
				},
				success(res) {


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
				}
			});
		},
		//用药剂量函数
		changeHandler0(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPicker
			} = e
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				//picker.setColumnValues(1, this.columnData1[index])
			}
		},
		// 回调参数为包含columnIndex、value、values
		confirm0(e) {
			this.addObj.placeholder2 = e.value[0] + e.value[1]
			this.medicalRecord.dosage = e.value[0];
			this.medicalRecord.dose_unit = e.value[1];
			this.show0 = false
		},
		close0() {
			this.show0 = false
		},
		cancel0() {
			this.show0 = false
		},


		//用药频次函数
		changeHandler1(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPicker
			} = e
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				//picker.setColumnValues(1, this.columnData1[index])
			}
		},
		// 回调参数为包含columnIndex、value、values
		confirm1(e) {
			this.addObj.placeholder3 = e.value[0] + e.value[1]
			this.medicalRecord.frequency = e.value[0];
			switch (this.medicalRecord.frequency_unit) {
				case '次/日': this.medicalRecord.frequency_unit = 'day'; break;
				case '次/隔日': this.medicalRecord.frequency_unit = 'tomorrow'; break;
				case '次/周': this.medicalRecord.frequency_unit = 'weeks'; break;
				case '次/月': this.medicalRecord.frequency_unit = 'month'; break;
			}
			this.show1 = false
		},
		close1() {
			this.show1 = false
		},
		cancel1() {
			this.show1 = false
		}



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