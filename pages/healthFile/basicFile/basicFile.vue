<template>
	<view class="d-flex flex-column j-sb h-100">
		<z-nav-bar title="基础档案">
			<view class="preview" slot="right" @click="addMedicalRecord">
				<text style="font-size: 20rpx;" v-if="addtext">{{ addtext }}</text>
			</view>
		</z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="flex-1">
			<view class="background">
				<view class="per">
					<view class="left">
						<u-avatar :src="avatar" size="60" class="avatar"></u-avatar>
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
				<u-subsection :list="list" mode="button" :current="current" activeColor="rgb(57,185,105)" bgColor="#ffffff"
					@change="change"></u-subsection>
			</view>

			<!--		<view class="uni-form-item uni-column d-flex a-center shadow-sm border " v-for="info in baseInfo" :key="info">-->
			<!--			<view class="m-2 font-md" style="width: 30%">{{info}}</view>-->
			<!--			<input class="uni-input font-md" maxlength="10" placeholder="请输入" />-->
			<!--		</view>-->
			<read-list v-if="current === 0" :cell-list="signInfo" :dataListText="data1"></read-list>
			<read-list v-if="current === 1" :cell-list="baseInfo" :dataListText="data2"></read-list>
			<read-list v-if="current === 2" :cell-list="history" :dataListText="data3"></read-list>
			<doc-choice v-if="current === 2" :cell-choice="choices"></doc-choice>
			<read-list v-if="current === 3" :cell-list="history" :dataListText="data4"></read-list>
		</view>
	</view>
</template>

<script>
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
import ReadList from "../components/List";
import DocChoice from "../components/docChoice.vue";
export default {
	components: { ReadList, UButton, DocChoice },
	data() {
		return {
			Records: [
				{
					model: 'contract.information',
					// domain: [["user_id", "=", this.uid]],
					fields: [
						//签约日期
						"createtime",
						//签约类型
						"sign_contract_type",
						//签约医生
						"patient_id",
					]
				},
				{
					model: 'res.users',
					domain: [["user_id", "=", this.uid]],
					fields: [
						//身份证号
						"id_card",
						//手机号
						"mobile",
						//生日
						"birthday",
						//联系人姓名
						"contact",
						//联系人电话
						"contact_phone",
						//地址
						"register",
						//名族
						"nation",
						//家庭住址
						"address",
						//工作单位
						"company",
						//血型
						"blood_type",
						//RH阴性
						"rh",
						//文化程度
						"education",
						//职业
						"occupation",
						//婚宴状况
						"marriage",
						//药物过敏史
						"drug_allergy",
						//暴露史
						"expose",
						//其他药物过敏史
						"other_allergy",
					]

				},
				{
					model: 'past.history',
					domain: [["user_id", "=", this.uid]],
					fields: [
						//检查类别
						"disease",
						//疾病备注
						"data_result",
					]

				},
				{
					model: 'family.history',
					domain: [["user_id", "=", this.uid]],
					fields: [
						//检查类别
						"family_disease",
					]

				},
			],

			//传回数据
			data1: [],
			data2: [],
			data3: [],
			data4: [],
			list1:{},
			list2:{},
			list3:{},
			list4:{},
			show: false,
			current: 0,
			avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
			name: '彭老师',
			gender: '男',
			height: 173,
			age: '60岁',
			weight: 73,
			list: ['签约信息', '基本信息', '既往史', '家族史'],
			signInfo: ['签约日期', '签约医生', '签约类型'],
			baseInfo: ['身份证号码:', '手机号码:', '出生日期:', '联系人姓名:', '联系人电话:', '常驻户籍:', '民族;', '家庭住址:', '所属机构:', '血型:'
				, 'RH阴性:', '文化程度:', '职业:', '婚姻状况:', '药物过敏史:', '暴露史:', '过敏史:'
			],
			history: [
				'疾病'
			],
			choices: [
				"是否有手术", "是否有外伤"
			],
			toUrl: '/pages/healthFile/basicFile/modifyBasicFile',
			addtext: '修改',
			toUrl2: '/archival/index',
			uid:''
		}
	},
	created(){
		this.getRecordsList();
		this.$forceUpdate();
	},
	methods: {

		change(index) {
			this.current = index
			this.getRecordsList();
		},
		addMedicalRecord() {
			uni.navigateTo({
				url: this.toUrl
			});
		},
		//拿去用户信息
		getRecordsList() {
			console.log(uni.getStorageSync('userInfo'));
			this.uid = uni.getStorageSync('userInfo').uid;
			// this.uid = 3
			// console.log(this.uid);
				const token = uni.getStorageSync('userInfo').token;
				this.$http
					.post(this.toUrl2,{
						uid : 3
						// model:this.Records[this.current].model,
						// domain:[["user_id", "=", this.uid]],
						// fields:this.Records[this.current].fields
					}).then(res=>{
						console.log('res',res);
						this.data1[1] = res.data.createtime 
						this.data1[2] = res.data.sign_contract_type 
						this.data1[3] = res.data.patient_id 
						// console.log(res.result.records[0]);
						// this.data2 = Object.values(res.data);
						//测试
						this.data2[1] = res.data.id_card
						this.data2[2] = res.data.mobile
						this.data2[3] = res.data.birthday
						this.data2[4] = res.data.contact
						this.data2[5] = res.data.contact_phone
						this.data2[6] = res.data.register
						this.data2[7] = res.data.nation
						this.data2[8] = res.data.address
						this.data2[9] = res.data.company
						this.data2[10] = res.data.blood_type
						this.data2[11]= res.data.rh
						this.data2[12]= res.data.education
						this.data2[13] = res.data.occupation
						this.data2[14] = res.data.marriage
						this.data2[15] = res.data.drug_allergy
						this.data2[16] = res.data.expose
						this.data2[17]= res.data.other_allergy
						
						this.data3[1] = res.data.disease
						this.data3[2] = res.data.drug_allergy

						this.data4[1] = res.data.family_disease
						this.data4[2]= res.data.other_allergy
						console.log('data1',this.data1)
						console.log('data2',this.data2)
						console.log('data3',this.data3)
						console.log('data4',this.data4)
						this.name = res.data.fullname
			}).catch(error => {
				console.error('请求发生错误', error);
			});
			// this.change(this.current);
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false
			// console.log('close');
		},
		onLoad() {
			this.getRecordsList();
			
		}
	}
}
</script>

<style>
.background {
	position: relative;
	background-image: url('../../../static/icon/healthFile/background.png');
	height: 420upx;
	width: 100%;
	background-size: cover;

}

.per {
	background-color: #ffffff;
	height: 200upx;
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

.msg {
	height: 100%;
	width: 25%;
	display: flex;
	flex-direction: column;
}

.title {
	margin: 0 auto;
	font-size: 24upx;
}

.msg2 {
	margin: 10upx auto;
	font-weight: bold;
}
</style>
