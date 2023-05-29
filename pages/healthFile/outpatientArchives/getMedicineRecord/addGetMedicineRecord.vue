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
				<u-form v-model="dataObj">
					<!-- 1、分类 -->
					<view class="cate">
						<text class="cate-text">{{addObj.choiceTitle}}</text>
					</view>
					<view class="switch">
						<u-subsection :list="addObj.list" :current="addObj.curNow" font-size="15" @change="sectionChange" mode="subsection" inactive-color="#20c6a2" active-color="#20c6a2"></u-subsection>
					</view>

					<view style="height: 40rpx"></view>

					<!-- 2、上传照片 -->
					<view class="uploadImage">
						<text class="cate-text">{{addObj.uploadImgText}}</text>
						<view style="height: 20rpx"></view>
						<view class="example-body">
							<uni-file-picker limit="9" :image-styles="addObj.imageStyles"  @select=""></uni-file-picker>
						</view>
					</view>

					<!-- 3、备注和时间 -->
					<view class="remarks">
						<text class="cate-text" style="">{{addObj.remarksText}}</text>
						<view style="height: 20rpx"></view>
						<u-input style="background-color: #f5f5f5" :placeholder="addObj.placeholder1" border="false" v-model="dataObj.illName"></u-input>
						<u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 50rpx 0" border="false" v-model="dataObj.illDiscription"></u-textarea>

					</view>

					<view style="height: 40rpx"></view>

					<!-- 4、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker">
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false" v-model="dataObj.selectedDate"
																	 :clearIcon="false"/>
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
export default {
	components: {
		UForm,
		headerNav,
	},
	data() {
		return {
			title:"门诊病例",
			//数据
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
				list:["口服","皮下注射"],
				uploadImgText:'添加病例照片',
				placeholder1:'请输入疾病诊断名称',
				placeholder2:'请添加疾病诊断的备注',
				remarksText:'疾病诊断',
				//返回的路由
				tourl:'/pages/healthFile/outpatientArchives/getMedicineRecord/getMedicineRecord',
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
		sectionChange(index) {
			this.dataObj.type = this.addObj.list[index]
			this.addObj.curNow = index;
			console.log(index,this.dataObj.type)
		},
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