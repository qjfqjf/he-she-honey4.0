<template>
	<view class="d-flex flex-column j-sb h-100">
		<z-nav-bar title="基础档案"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="flex-1">
			<view class="background">
				<view class="per">
					<view class="left">
						<u-avatar
								:src="avatar"
								size="60"
								class="avatar"
						></u-avatar>
						<view class="name">{{ name }}</view>
					</view>
					<view class="right">
						<view class="center">
							<view class="msg">
								<view class="title">性别</view>
								<view class="msg2">{{ gender }}</view>
							</view>
							<view class="msg">
								<view class="title">身高(cm)</view>
								<view class="msg2">{{ height }}</view>
							</view>
							<view class="msg">
								<view class="title">年龄</view>
								<view class="msg2">{{ age }}</view>
							</view>
							<view class="msg">
								<view class="title">体重(kg)</view>
								<view class="msg2">{{ weight }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="u-demo-block__content">
				<u-subsection
						:list="list"
						mode="button"
						:current="current"
						activeColor="rgb(57,185,105)"
						bgColor="#ffffff"
						@change="change"
				></u-subsection>
			</view>

			<!--		<view class="uni-form-item uni-column d-flex a-center shadow-sm border " v-for="info in baseInfo" :key="info">-->
			<!--			<view class="m-2 font-md" style="width: 30%">{{info}}</view>-->
			<!--			<input class="uni-input font-md" maxlength="10" placeholder="请输入" />-->
			<!--		</view>-->
			<doc-list v-if="current === 0" :cell-list="signInfo"></doc-list>
			<doc-list v-if="current === 1" :cell-list="baseInfo"></doc-list>
			<doc-list v-if="current === 2" :cell-list="history"></doc-list>
			<doc-choice v-if="current === 2" :cell-choice="choices"></doc-choice>
			<doc-list v-if="current === 3" :cell-list="history"></doc-list>
		</view>
		<view>
			<u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
				<view class="m-5">
					<text>请检查填写格式是否有误</text>
				</view>
				<u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
			</u-popup>
		</view>
		<u-button @click="show = true" type="primary" text="提交"></u-button>
	</view>
</template>

<script>
	import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
	import DocList from "../components/docList.vue";
	import DocChoice from "../components/docChoice.vue";
	export default {
		components: {DocList, UButton, DocChoice},
		data() {
			return {	
				dataList:{
					sign_contract_time:' ',
					sign_contract_type:' ',
					patient_id:' ',

					login:' ',
					phone_number:' ',
					birthday:' ',
					contact_name:' ',
					contact_number:' ',
					address:' ',
					nationality:' ',
					home_address:' ',
					work_unit:' ',
					blood_type:' ',
					rh_negative:' ',
					degree_education:' ',
					occupation:' ',
					marital_status:' ',
					history_allergy:' ',
					exposure_history:' ',
					other_history_allergy:' ',

					data_name_past:' ',
					data_result_past:' ',
					
					data_name_family:' ',
					data_result_family:' ',
				},
				show: false,
				current: 0,
				avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
				name: '彭老师',
				gender: '男',
				height: 173,
				age: '60岁',
				weight: 73,
				list:['签约信息', '基本信息', '既往史', '家族史'],
				signInfo:['签约日期', '签约医生', '签约类型'],
				baseInfo:['身份证号码:','手机号码:','出生日期:', '联系人姓名:','联系人电话:','常驻户籍:','民族;','家庭住址:','家庭住址:','血型:'
					,'RH阴性:','文化程度:', '职业:','婚姻状况:','药物过敏史:','暴露史:','暴露史:'
				],
				history:[
						'疾病一','疾病二'
				],
				choices:[
						"是否有手术","是否有外伤"
				],
				//跳转
				toUrl:'/pages/healthFile/basicFile/basicFile',
				//接口
				toUrl2:'',
			}
		},
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
			change(index) {
				this.current = index
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			saveRecords(){
				const userInfo = JoSN.parse(uni.getStorageSync('userInfo'));
				const uid = userInfo.uid;
				const token = userInfo.token;
				const _this = this;
				uni.request({
				url: this.tourl2,
				method: 'post',
				data: {
					params1: {
						//注意！！查接口文档
						model: "contract.information",
						token: token,
						uid: uid,
						method: "create",
						args: [
							[{
								//签约日期
								"sign_contract_time": this.dataList.sign_contract_time,
								//签约类型
								"sign_contract_type": this.dataList.sign_contract_type,
								//签约医生
								"patient_id": this.dataList.patient_id,
							}]
						],
						kwargs: {}
					},
					params2: {
						//注意！！查接口文档
						model: "res.users",
						token: token,
						uid: uid,
						method: "create",
						args: [
							[{
								//身份证号
								"login": this.dataList.login,
								//手机号
								"phone_number":this.dataList.phone_number,
								//生日
								"birthday": this.dataList.birthday,
								//联系人姓名
								"contact_name": this.dataList.contact_name,
								//联系人电话
								"contact_number": this.dataList.contact_number,
								//地址
								"address": this.dataList.address,
								//名族
								"nationality": this.dataList.nationality,
								//家庭住址
								"home_address":this.dataList.home_address,
								//工作单位
								"work_unit":this.dataList.work_unit,
								//血型
								"blood_type":this.dataList.blood_type,
								//RH阴性
								"rh_negative":this.dataList.rh_negative,
								//文化程度
								"degree_education":this.dataList.degree_education,
								//职业
								"occupation":this.dataList.occupation,
								//婚宴状况
								"marital_status":this.dataList.marital_status,
								//药物过敏史
								"history_allergy":this.dataList.history_allergy,
								//暴露史
								"exposure_history":this.dataList.exposure_history,
								//其他药物过敏史
								"other_history_allergy":this.dataList.other_history_allergy,


							}]
						],
						kwargs: {}
					},
					params3: {
						//注意！！查接口文档
						model: "",
						token: token,
						uid: uid,
						method: "create",
						args: [
							[{
								//检查类别
								"data_name": this.dataList.data_name_past,
								//疾病备注
								"data_result": this.dataList.data_result_past,
								//注意！！这个是uid
								//用户id
								//时间
							}]
						],
						kwargs: {}
					},
					params4: {
						//注意！！查接口文档
						model: "",
						token: token,
						uid: uid,
						method: "create",
						args: [
							[{
								//检查类别
								"data_name": this.dataList.data_name_family,
								//疾病备注
								"data_result": this.dataList.data_result_family,
							}]
						],
						kwargs: {}
					},

				},
				success(res) {
					//测试
					console.log(res)
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
			}

		}
	}
</script>

<style>
	.background{
		position: relative;
		background-image: url('../../../static/icon/healthFile/background.png');
		height: 420upx;
		width: 100%;
		background-size: cover;

	}
	.per{
		background-color: #ffffff;
		height:200upx;
		width: 100%;
		position: absolute;
		bottom: 0;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		}
	.left {
	  float: left;
	  width: 25%;
	  height: 100%;

	}

	.right {
	  float: right;
	  width: 75%;
	  height: 100%;
	  display: flex;
	  justify-content: center;
	  padding-top: 70upx;
	}
	.avatar {
	position: absolute;
	left: 15px;
	top: -26px;
	}

	.name {
	  margin-top: 92upx;
	  text-align: center;
	  font-weight: bold;
	}

	.center {
	  height: 120upx;
	  width: 100%;
	  display: flex;
	  justify-content: left;
	}

	.msg{
		height: 100%;
		width: 25%;
		display: flex;
		flex-direction: column;
	}
	.title{
		margin: 0 auto;
		font-size: 24upx;
	}
	.msg2{
		margin: 10upx auto;
		font-weight: bold;
	}
</style>
