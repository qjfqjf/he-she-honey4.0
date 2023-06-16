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
						<u-subsection :list="addText.list" :current="addText.curNow" font-size="15"
													@change="sectionChange" mode="subsection" inactive-color="#20c6a2"
													active-color="#20c6a2"></u-subsection>
					</view>

					<view style="height: 40rpx"></view>

					<!-- 2、上传照片 -->
					<view class="uploadImage">
						<text class="cate-text">{{addText.uploadImgText}}</text>
						<view style="height: 20rpx"></view>
						<view class="example-body" style="display: flex;">
						<view class="img" v-for="(item, index) in imgList1" :key="index" >
							<image :src="item" mode="aspectFill" @click="showImage(index)"></image>
							<view class="deleteBtn" @click="removeImg(index)">x</view>
						</view>
<!--							添加按钮-->
							<view class="addImg" @click="addImg" v-if="number < 3"> + </view>

						</view>
						<text class="tip">（友情提示：最多添加3张图片）</text>

						<!--图片放大-->
						<view class="imageOverlay" v-show="isOverlayVisible" @click="hideImage"></view>
						<view class="enlargedImageView" v-show="isOverlayVisible">
							<image :src="getEnlargedImageUrl" mode="aspectFit"></image>
						</view>
					</view>

					<!-- 3、疾病和备注 -->
					<view class="remarks">
						<text class="cate-text" style="">{{addText.remarksText}}</text>
						<view style="height: 20rpx"></view>
						<u-input style="background-color: #f5f5f5" :placeholder="addText.placeholder1" border="false"
										 v-model="record.data_name"></u-input>
						<u-textarea :placeholder="addText.placeholder2"
												style="background-color: #f5f5f5;margin: 50rpx 0" border="false"
												v-model="record.data_result"></u-textarea>

					</view>

					<view style="height: 40rpx"></view>

					<!-- 4、日期 -->
					<view class="date-body">
						<text class="cate-text">日期</text>
						<view style="height: 20rpx"></view>
						<view class="picker">
							<uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
																	 :clearIcon="false" v-model="record.data_time" />
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
import {pathToBase64} from "../../../../uni_modules/mmmm-image-tools_1.4.0";

export default {
	components: {
		headerNav
	},

	data() {
		return {
			number:0,//图片数量
			title: "门诊病例",
			imgList: [], // 图片列表数据
			imgList1:[],
			currentImageIndex: -1, // 当前被放大查看的图片索引
			isOverlayVisible: false ,// 控制遮罩层和放大图片容器的显示与隐藏

			//添加数据
			record: {

				//急诊类型(需要默认值)
				data_type: '急诊',
				//照片
				picture_1: '',
				picture_2: '',
				picture_3: '',
				//疾病名称
				data_name: '',
				//疾病备注
				data_result: '',
				//注意！！这个是uid
				//用户id
				patient_id: '',
				//时间()
				data_time: this.formatDate(new Date())
			},

			//显示的文本
			addText: {
				//默认的选项
				curNow: 0,
				//这边统一写内容用
				choiceTitle: '门诊类别',
				list: ["急诊", "普通门诊"],
				uploadImgText: '添加病例照片',
				placeholder1: '请输入疾病诊断名称',
				placeholder2: '请添加疾病诊断的备注',
				remarksText: '疾病诊断',
				//返回的路由
				tourl: '/pages/healthFile/outpatientArchives/medicalRecord/medicalRecord',
				//保存接口
				tourl2: 'http://106.14.140.92:8881/platform/dataset/call_kw',
				// 备注
				remarksValue: '',
				// 选择日期
				selectedDate: '',
				imageStyles: {
					width: 90,
					height: 90,
					border: {}
				},
				value: 0,
				type: '',


				//测试
				value1: '',
			},
		};
	},



	computed: {
		getEnlargedImageUrl() {
			if (this.currentImageIndex >= 0 && this.currentImageIndex < this.imgList1.length) {
				return this.imgList1[this.currentImageIndex];
			}
			return '';
		}
	},
	//方法
	methods: {
		//移除前缀
		base64RemovePrefix(base64List){
			let list = []
			base64List.forEach((url)=>{
				list.push(url.substring(23))
			})
			return list;
		},

		showImage(index) {
			this.currentImageIndex = index;
			this.isOverlayVisible = true;
		},
		hideImage() {
			this.isOverlayVisible = false;
		},
		addImg() {
			let that = this;
			uni.chooseImage({
				count: 5,
				sourceType: ['album', 'camera'],
				success(res) {
					that.number++;
					res.tempFiles.forEach((file, index) => {
						pathToBase64(file.path).then(base64 => {
							that.imgList1.push(base64)
						})
					});
				}
			});
		},
		removeImg(index){
			this.imgList1.splice(index,1)
			this.number--;
		},


		//时间格式转换
		formatDate(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			minute = minute < 10 ? ('0' + minute) : minute;
			var second = date.getSeconds();
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		},
		//选择器方法
		sectionChange(index) {
			this.record.data_type = this.addText.list[index]
			this.addText.curNow = index;
			//测试
			console.log(index, this.record.data_type)
		},

		//保存方法
		saveRecords() {
			//拿到用户数据
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			const uid = userInfo.uid;
			const token = userInfo.token;
			const _this = this;
			//把图片的前缀删除
			this.imgList = this.base64RemovePrefix(this.imgList1)
			//把疾病类型转化成正确字段存储
			this.record.data_type = this.record.data_type == '急诊' ? 'emergency' : 'General clinic';
			uni.request({
				url: this.addText.tourl2,
				method: 'post',
				data: {
					params: {
						//注意！！查接口文档
						model: "outpatient.medical.records",
						token: token,
						uid: uid,
						method: "create",
						args: [
							[{
								//急诊类型
								"data_type": this.record.data_type,
								"picture_1": this.imgList[0],
								"picture_2": this.imgList[1],
								"picture_3": this.imgList[2],
								//疾病名称
								"data_name": this.record.data_name,
								//疾病备注
								"data_result": this.record.data_result,
								"data_time": this.record.data_time,
								//注意！！这个是uid
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
									url: _this.addText.tourl,
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

	},
}
</script>

<style lang="scss">
.imageOverlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
}

.enlargedImageView {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 101;
}

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

			.img image {
				width: 200rpx;
				height: 100%;
				display: flex;
				flex-direction: row;
			}

			.img {
				position: relative;
				font-size: 70rpx;
				margin-bottom: 10px;
				width: 200rpx;
				/* 设置合适的宽度 */
				height: 200rpx;
				/* 设置合适的高度 */
				display: flex;
				/* 设置为 flex 布局 */
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				margin-right: 40rpx;
			}
			.deleteBtn {
				font-size: 28rpx;
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				width: 40rpx;
				height: 40rpx;
				background-color: gray;
				color: white;
				border-radius: 50%;
				text-align: center;
				line-height: 20px;
				cursor: pointer;
				z-index: 1;
			}


			.addImg {
				display: flex;
				flex-direction: row;
				font-size: 70rpx;
				font-weight: 600;
				color: #ccc;
				margin: 5px;
				height: 200rpx;
				width: 200rpx;
				background: #eee;
				border-radius: 15px;
				align-items: center;
				justify-content: center;
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
}
</style>