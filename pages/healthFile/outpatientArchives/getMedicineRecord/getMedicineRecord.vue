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
			<view class="in-content">
				<!-- 导航栏上下分割 -->
				<view style="height: 20rpx;background-color: #f5f5f5">
				</view>
				<view class="in-content" v-for="item in dataList">


					<!-- 1、日期 -->
					<view class="remarks">
						<view class="cate">
							<text class="cate-text">日期</text>
						</view>
						<view style="height: 20rpx"></view>
						<view
							style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
							<text style="font-size: 30rpx">{{ item.data_time }}</text>
						</view>
					</view>



					<!-- 2、门诊类别 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ showObj.typeText }}</text>
						<view style="height: 20rpx"></view>
						<view
							style="width: 200rpx;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
							<text>{{ item.drug_class }}</text>
						</view>
					</view>


					<!-- 3、药品名称 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ showObj.remarksText }}</text>
						<view style="height: 20rpx"></view>
						<view
							style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
							<text>{{ item.data_name }}</text>
						</view>
					</view>
					<!-- 4、用药剂量 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ showObj.dosageText }}</text>
						<view style="height: 20rpx"></view>
						<view
							style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
							<text style="margin-right: 20rpx;">{{ item.dosage }}</text>
							<text>{{ item.dose_unit }}</text>
						</view>
					</view>
					<!-- 5、用药频次 -->
					<view class="remarks">
						<text class="cate-text" style="">{{ showObj.frequencyText }}</text>
						<view style="height: 20rpx"></view>
						<view
							style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
							<text style="margin-right: 20rpx;">{{ item.frequency }}</text>
							<text>{{ item.frequency_unit }}</text>
						</view>
					</view>
					<!-- 6、备注 -->
					<view class="remarks">
						<view style="height: 20rpx"></view>
						<view
							style="width: 100%;height: 200rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
							<text>{{ item.data_result }}</text>
						</view>
					</view>

					<!-- 7、图片展示 -->

					<view style="height: 20rpx"></view>

					<view class="remarks">
						<text class="cate-text" style="margin-left: 20rpx">{{showObj.ImgText}}</text>
						<view style="height: 20rpx"></view>
						<view class="showImage" style="display:flex; align-items: center; flex-wrap: wrap-reverse;">
							<view class="example-body" v-for="img in item.imgs" style="width: 150rpx;height: 150rpx;margin-left: 50rpx;margin-bottom: 50rpx;" >
								<view style="">
									<image style="width: 150rpx;height: 150rpx; " :src="img"></image>
								</view>
							</view>
							<tel-pic :lineNum="3" :spacingNumber="10" :imageArr="item.imgs" ></tel-pic>
						</view>
					</view>

					<!-- 8、分割线 -->
					<u-divider style="margin-top: 50rpx" text="分割线" text-size="10" textColor="#1fc7a3"></u-divider>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
import emptyState from "../components/emptyState.vue";
import headerNav from "../components/headerNav.vue";
export default {
	components: {
		headerNav,
		emptyState,
	},
	data() {
		return {
			urls2: [
				'https://cdn.uviewui.com/uview/album/1.jpg',
				'https://cdn.uviewui.com/uview/album/2.jpg',
				'https://cdn.uviewui.com/uview/album/3.jpg',
				'https://cdn.uviewui.com/uview/album/4.jpg',
				'https://cdn.uviewui.com/uview/album/5.jpg',
				'https://cdn.uviewui.com/uview/album/6.jpg',
				'https://cdn.uviewui.com/uview/album/7.jpg',
				'https://cdn.uviewui.com/uview/album/8.jpg',
				'https://cdn.uviewui.com/uview/album/9.jpg',
				'https://cdn.uviewui.com/uview/album/10.jpg',
			],
			//显示的文本
			showObj: {
				curNow: 0,
				//这边统一写内容用
				choiceTitle: '用药类别',
				type: ["口服", "皮下注射"],
				ImgText: '病例照片',
				remarksText: '药物名称',
				dosageText: '用药剂量',
				frequencyText: '用药频次',
				typeText: '用药类型',
				discription: '情况描述',

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
			dataList: [
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
			title: '用药记录',
			//点击添加跳转的路由
			tourl: '/pages/healthFile/outpatientArchives/getMedicineRecord/addGetMedicineRecord',
			//接口
			tourl2: 'http://106.14.140.92:8881/platform/dataset/search_read',
			addtext: '添加记录'
		}
	},

	methods: {
		addGetMedicalRecord() {
			uni.navigateTo({
				url: this.tourl
			});
		},
		//查询当前用户所有档案
		getRecordsList() {
			//拿到用户信息
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			const uid = userInfo.uid;
			const token = userInfo.token;
			//接口调用
			uni.request({
				url: this.tourl2,
				method: 'post',
				data: {
					params: {
						model: 'inpatient.medical.record',
						token: token,
						uid: uid,
						domain:[["patient_id","=",uid]],
						//传回去的数组(存放字段)
						fields: [
							"picture_1",
							"picture_2",
							"picture_3",
							//药物名称
							"data_name",
							//用药剂量
							"dosage",
							//用药计量单位
							"dose_unit",
							//用药频次
							"frequency",
							//用药频次单位
							"frequency_unit",
							//备注
							"data_result",
							//时间
							"data_time",
							//用药类别
							"drug_class"
						]
					}
				},
				success: (res) => {
					console.log(res);
					//把传回来的值存入
					this.dataList = res.data.result.records
					//判断诊断类型
					for (var record of this.dataList) {
						//用药类型
						record.drug_class = record.drug_class === 'Oral administration' ? '口服' : '皮下注射';
						//用药剂量单位
						switch(record.dose_unit){
							case 'mg': record.dose_unit = '毫克'; break;
							case 'g': record.dose_unit = '克'; break;
						}
						//用药频次单位
						switch(record.frequency_unit){
							case 'day': record.frequency_unit = '次/日'; break;
							case 'tomorrow': record.frequency_unit = '次/隔日'; break;
							case 'weeks': record.frequency_unit = '次/周'; break;
							case 'month': record.frequency_unit = '次/月'; break;
						}
					}

				},
				fail: (err) => {
					uni.showToast({
						title: err,
					})
				}
			})
		},
	},


	onLoad() {
		this.getRecordsList();
	}
}
</script>

<style lang="scss">
.content {
	background-color: #FFFFFF;
	height: 100%;

	.nothing {
		text-align: center;
		padding-top: 300rpx;
		width: 400rpx;
		margin: 0 auto;
	}

	.in-content {
		background-color: white;
		height: 100%;

		.in-content {
			padding: 0 10rpx;
		}

		.switch {
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
}
</style>
