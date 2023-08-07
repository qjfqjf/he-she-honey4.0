<template>
	<view class="d-flex flex-column j-sb">
		<z-nav-bar title="基础档案"></z-nav-bar>
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
			<doc-list v-show="current === 0" :cell-list="dataListText[current]"></doc-list>
			<doc-list v-show="current === 1" :cell-list="dataListText[current]"></doc-list>
			<doc-list v-show="current === 2" :cell-list="dataListText[current]"></doc-list>
			<!-- <doc-choice v-show="current === 2" :cell-choice="choices"></doc-choice> -->
			<!-- 复选框 -->
			<view v-show="current === 2">
				<u-checkbox-group>
					<u-checkbox class="mt-4 ml-2" :customStyle="{ marginBottom: '8px' }" v-for="(item, index) in choices"
						:key="index" :label="item.name" @change="radioChange(index)" shape="square"></u-checkbox>
				</u-checkbox-group>
			</view>
			<doc-list v-show="current === 3" :cell-list="dataListText[current]"></doc-list>
		</view>
		<!-- <view>
			<u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
				<view class="m-5">
					<text>请检查填写格式是否有误</text>
				</view>
				<u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary" text="关闭"></u-button>
			</u-popup>
		</view> -->
		<u-button @click="saveRecords" type="primary" text="提交"></u-button>
	</view>
</template>

<script>
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
import DocList from "../components/docList";
import DocChoice from "../components/docChoice.vue";
export default {
	components: { DocList, UButton, DocChoice },
	data() {
		return {
			dataList: [
				{
					model: 'contract.information',
					domain: [["id", "=", this.uid]],
				},
				{
					model: 'res.users',
					domain: [["id", "=", this.uid]],

				},
				{
					model: 'past.history',
					domain: [["id", "=", this.uid]],

				},
				{
					model: 'family.history',
					domain: [["id", "=", this.uid]],
				},
			],
			data: [],
			show: false,
			current: 0,
			avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
			name: '彭老师',
			gender: '男',
			height: 173,
			age: '60岁',
			weight: 73,
			list: ['签约信息', '基本信息', '既往史', '家族史'],
			dataListText: [
				[{
					name: '签约日期',
					value: '',
				}, {
					name: '签约医生',
					value: '',
				}, {
					name: '签约类型',
					value: '',
				}],
					[{
						name: '身份证号码',
						value: '',
					}, {
						name: '手机号码',
						value: '',
					}, {
						name: '出生日期',
						value: '',
					}
						, {
						name: '联系人姓名',
						value: '',
					}
						, {
						name: '联系人电话',
						value: '',
					}
						, {
						name: '常驻户籍',
						value: '',
					}
						, {
						name: '民族',
						value: '',
					}
						, {
						name: '家庭住址',
						value: '',
					}
						, {
						name: '血型',
						value: '',
					}
						, {
						name: 'RH阴性',
						value: '',
					}
						, {
						name: '文化程度',
						value: '',
					}
						, {
						name: '职业',
						value: '',
					}
						, {
						name: '婚姻状况',
						value: '',
					}
						, {
						name: '药物过敏史',
						value: '',
					}
						, {
						name: '暴露史',
						value: '',
					}
						, {
						name: '其他药物过敏史',
						value: '',
					}],
					 [
					{
						name: '疾病一',
						value: '',
					}, {
						name: '疾病二',
						value: '',
					}
				],
				[
					{
						name: '疾病一',
						value: '',
					}, {
						name: '疾病二',
						value: '',
					}
				]
			],
			choices: [
				{
					name: '有过手术',
					value: false,
				}, {
					name: '有过外伤',
					value: false,
				}],
			dataText:{
				contact : '',
				contact_phone : '',
				register : '',
				company : '',
				blood_type : '',
				rh : '',
				education : '',
				occupation : '',
				marriage : '',
				drug_allergy : '',
				expose : '',
				other_allergy : '',
				disease : '',
				operation : '',
				trauma : '',
				family_disease : '',
			},
			saveText:{},
			//跳转
			toUrl: '/pages/healthFile/basicFile/basicFile',
			//接口
			toUrl2: '/archival/save',
			uid:''
		}
	},
	methods: {
		//checkbox复选框转换数据
		radioChange(index) {
			this.choices[index] = !this.choices[index]
			console.log(this.choices[index]);
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
		saveRecords() {
			console.log('dataListText',this.dataListText);
			console.log(this.dataListText[1][5]);
			if(this.dataListText[1][3]){
				this.dataText.contact = this.dataListText[1][3].value
			}
			if(this.dataListText[1][4]){
				this.dataText.contact_phone = this.dataListText[1][4].value
			}
			if(this.dataListText[1][5]){
				this.dataText.register = this.dataListText[1][5].value
			}
			if(this.dataListText[1][9]){
				this.dataText.blood_type = this.dataListText[1][9].value
			}
			if(this.dataListText[1][10]){
				this.dataText.rh = this.dataListText[1][10].value
			}
			if(this.dataListText[1][11]){
				this.dataText.education = this.dataListText[1][11].value
			}
			if(this.dataListText[1][12]){
				this.dataText.occupation = this.dataListText[1][12].value
			}
			if(this.dataListText[1][13]){
				this.dataText.marriage = this.dataListText[1][13].value
			}
			if(this.dataListText[2][1]){
				this.dataText.drug_allergy = this.dataListText[2][1].value
			}
			if(this.dataListText[1][15]){
				this.dataText.expose = this.dataListText[1][15].value
			}
			if(this.dataListText[1][16]){
				this.dataText.other_allergy = this.dataListText[1][16].value
			}
			if(this.dataListText[2][0]){
				this.dataText.disease = this.dataListText[2][0].value
			}
			if(this.dataListText[3][0]){
				this.dataText.family_disease = this.dataListText[3][0].value
			}
			// this.dataText.operation = 
			// this.dataText.trauma = 
			
			console.log('this.dataText',this.dataText);
			for (let key in this.dataText) {
				if (this.dataText.hasOwnProperty(key)) {
					if (this.dataText[key] !== null && this.dataText[key] !== undefined && this.dataText[key] !== '') {
						this.saveText[key] = this.dataText[key];
					}
				}
			}
			console.log('this.saveText',this.saveText);
			// for(let i=0;i<this.dataListText[0].length;i++){
			// 	this.dataText[0][i]=this.dataListText[0][i];
			// }
			// for(let i=0;i<this.dataListText[1].length;i++){
			// 	this.dataText[1][i]=this.dataListText[1][4];
			// }
			// for(let i=0;i<this.dataListText[2].length;i++){
			// 	this.ListText[2][i]=this.dataListText[2][i];
			// }
			// for(let i=0;i<this.dataListText[3].length;i++){
			// 	this.ListText[3][i]=this.dataListText[3][i];
			// }
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			this.uid = userInfo.uid;
			console.log(this.uid);
			const _this = this;
			const requestData = {
				...this.saveText  // 将 saveText 对象的所有属性展开到 requestData 中
			};
			console.log('requestData',requestData);
			this.$http
					.post(this.toUrl2,
						requestData
						// model:this.Records[this.current].model,
						// domain:[["user_id", "=", this.uid]],
						// fields:this.Records[this.current].fields
					).then(res=>{
						console.log(res);
						uni.showToast({
						title: "保存成功"
					})
			}).catch(error => {
				console.error('请求发生错误', error);
			});
		},

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
}</style>
