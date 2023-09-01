<template>
	<view class="content p-2">
		<z-nav-bar title="体脂率">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader :username="username" @myUser="handleMyUser"></HealthHeader>
		<u-read-more class="p-2 mt-3" :toggle="true" closeText="查看更多">
			<view class="d-flex j-center">
				<image src="@/static/icon/bodyFat/logo.png" mode="aspectFit"></image>
			</view>

			<view class="data-item d-flex j-sb a-center mt-3" v-for="(item,index) in data" :key="index">
				<view class="left d-flex a-center">
					<view class="icon">
						<image :src="item.icon" style="width: 60rpx;height: 60rpx;" mode="aspectFit"></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
				<view class="right d-flex">
					<view class="desc">
						{{item.desc}}
					</view>
					<view class="value">
						{{ getICWeightInfoValue(item.name) }}
					</view>
				</view>
			</view>
		</u-read-more>
		<!-- <TipInfo title="血脂趋势"></TipInfo> -->
		<view class="mt-5">

		</view>
		<u--text class="d-flex j-center mb-3" color="#01b09a"
			:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSave"></u-button>
		<view class="mb-3">

		</view>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right"
			iconStyle="font-size: 15px;color:#20baa6" text="查看监测历史" @click="handleDevelop">
		</u--text>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	const bluethModule = uni.requireNativePlugin('plugin-BtModule');
	import HealthHeader from "../components/healthHeader/HealthHeader.vue"
	import TipInfo from '../components/tipInfo/TipInfo.vue'
	import BottomNavigation from '../components/bottomNav/BottomNavigation.vue'
	export default {
		components: {
			HealthHeader,
			TipInfo,
			BottomNavigation
		},
		data() {
			return {
				uid: 0, //用户id
				username: '', //登录的名字
				userInfo: '',
				btnColor: '#dadada',
				deviceStatus: 0,

				deviceId: uni.getStorageSync('tzDeviceId'), // 蓝牙设备的id
				data: [{
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体重',
						desc: '标准',

					},
					{
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: 'BMI',
						desc: '超重',

					},
					{
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体脂率',
						desc: '严重超重',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '肌肉率',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '去脂体重',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '皮下脂肪',
						desc: '偏高',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '内脏脂肪',
						desc: '标准',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体水分',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '骨骼肌率',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '肌肉量',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '骨量',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '蛋白质',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '基础代谢',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '身体年龄',
						desc: '偏高',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '脂肪量',
						desc: '严重超重',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '含水量',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '蛋白量',
						desc: '偏低',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '标准体重',
						desc: '',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '肥胖等级',
						desc: '偏高',

					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体型',
						desc: '偏肥胖',

					}
				],
				macAddr: uni.getStorageSync('macAddr'),
				name: uni.getStorageSync('name'),
				communicationType: uni.getStorageSync('communicationType'),
				dataResult: '',
				icWeightInfo: {
					//体重
					weight_kg: "0.0",
					//BMI
					bmi: "0",
					//体脂率
					bodyFatPercent: "0.0",
					//肌肉率
					musclePercent: "0.0",
					//去脂体重
					weight_lb: "0.0",
					//皮下脂肪
					subcutaneousFatPercent: "0.0",
					//内脏脂肪
					visceralFat: "0.0",
					//体水分
					moisturePercent: "0.0",
					//骨骼肌率
					boneMass: "0.0",
					//肌肉量
					musclePercent: "0.0",
					//骨量
					boneMass: "0.0",
					//蛋白质
					proteinPercent: "0.0",
					//基础代谢
					bmr: "0",
					//身体年龄
					physicalAge: "0",
					//脂肪量
					subcutaneousFatPercent: "0.0",
					//含水量
					moisturePercent: "0.0",
					//蛋白量
					proteinPercent: "0.0",
					//标准体重
					weight_kg: "0.0",
					//肥胖等级
					bodyScore: "0",
					//体型
					bodyType: "0",
				}
			};
		},
		async onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			console.log(111111,this.uid)
			this.getUserInfo()
			this.initPrinter()
			this.timer = setTimeout(() => {
				this.connectedDevice()
			}, 2000)
		},
		//页面显示
		onShow() {
			uni.$on('backWithData', (data) => {
			    this.uid = data.uid;
			    this.username = data.name;
			});
			console.log(111111,this.uid)
		},
		methods: {
			getUserInfo(){
				this.$http.post('/user/info', {
					id: this.uid,
				}).then(res => {
					this.username = res.data.fullname
				})
			},
			handleMyUser() {
				uni.navigateTo({
					url: '/pages/homePage/myUsers?type=select' // 跳转到指定的目标页面
				});
			},
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bodyFat/bodyFatHistory?uid=' + this.uid,
				})
			},
			handleSave() {
				if(parseFloat(this.icWeightInfo.bmi).toFixed(1) != 0){
					this.$http.post('/bmi/create', {
						uid: this.uid,
						weight:parseFloat(this.icWeightInfo.weight_kg).toFixed(1), 
						bmi: parseFloat(this.icWeightInfo.bmi).toFixed(1),
						body_fat_percent: parseFloat(this.icWeightInfo.bodyFatPercent).toFixed(1),
						subcutaneous_fat_percent: parseFloat(this.icWeightInfo.subcutaneousFatPercent).toFixed(1),
						visceral_fat: parseFloat(this.icWeightInfo.visceralFat).toFixed(1),
						muscle_percent: parseFloat(this.icWeightInfo.musclePercent).toFixed(1),
						bmr: parseFloat(this.icWeightInfo.bmr),
						bone_mass: parseFloat(this.icWeightInfo.boneMass).toFixed(1),
						moisture_percent: parseFloat(this.icWeightInfo.moisturePercent).toFixed(1),
						physical_age: parseFloat(this.icWeightInfo.physicalAge),
						protein_percent: parseFloat(this.icWeightInfo.proteinPercent).toFixed(1),
						sm_percent: parseFloat(this.icWeightInfo.boneMass).toFixed(1),
						electrode:8,
						imp:0,
						imp2:0,
						imp3:0,
						imp4:0,
						imp5:0,
						impendences:'0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0',
						ext_data:'{"left_arm":0.0, "right_arm":0.0, "left_leg":0.0, "right_leg":0.0, "all_body":0.0, "left_arm_kg":0.0, "right_arm_kg":0.0, "left_leg_kg":0.0, "right_leg_kg":0.0, "all_body_kg":0.0, "left_arm_muscle":0.0, "right_arm_muscle":0.0, "left_leg_muscle":0.0, "right_leg_muscle":0.0, "all_body_muscle":0.0, "left_arm_muscle_kg":0.0, "right_arm_muscle_kg":0.0, "left_leg_muscle_kg":0.0, "right_leg_muscle_kg":0.0, "all_body_muscle_kg":0.0}',
						body_score:parseFloat(this.icWeightInfo.bodyScore),
						body_type:parseFloat(this.icWeightInfo.bodyType),
						target_weight:parseFloat(this.icWeightInfo.weight_kg).toFixed(1),
						standard:'{"water_mass_max":0.0, "water_mass_min":0.0, "bone_max":0.0, "bone_min":0.0, "protein_mass_max":0.0, "protein_mass_min":0.0, "muscle_mass_max":0.0, "muscle_mass_min":0.0, "weight_standard":0.0, "smm_standard":0.0, "bfm_standard":0.0, "bmr_standard":0}',
						time: this.formatDate(new Date()),
							
					}).then(res => {
						this.$refs.uToast.show({
							message: '保存成功',
							type: 'success',
						})
						this.btnColor = '#dadada'
						
					})
				}else{
					this.$refs.uToast.show({
						message: '保存失败，请检查网络',
						type: 'error',
					})
					this.btnColor = '#dadada'
					
					this.icWeightInfo.weight_kg = '0.0'
					this.icWeightInfo.bmi = '0.0'
					this.icWeightInfo.bodyFatPercent = '0.0'
					this.icWeightInfo.musclePercent = '0.0'
					this.icWeightInfo.weight_lb = '0.0'
					
					this.icWeightInfo.subcutaneousFatPercent = '0.0'
					this.icWeightInfo.visceralFat = '0.0'
					this.icWeightInfo.moisturePercent = '0.0'
					this.icWeightInfo.boneMass = '0.0'
					
					this.icWeightInfo.musclePercent = '0.0'
					this.icWeightInfo.boneMass = '0.0'
					this.icWeightInfo.proteinPercent = '0.0'
					this.icWeightInfo.bmr = '0'
					
					this.icWeightInfo.physicalAge = '0'
					this.icWeightInfo.subcutaneousFatPercent = '0.0'
					this.icWeightInfo.moisturePercent = '0.0'
					this.icWeightInfo.proteinPercent = '0.0'
					this.icWeightInfo.weight_kg = '0.0'
					this.icWeightInfo.bodyScore = '0'
					this.icWeightInfo.bodyType = '0'
					
					
				}
				
			},
			/* 初始化 */
			initPrinter() {
				// console.log("执行顺序", 1)
				bluethModule.initBluetooth((res) => {
					if (res.code === 200) {
						console.log(`bluethModule---`, JSON.stringify(res));
						this.stateMsg = res['data'];
					}
				});
			},
			/* 连接设备 */
			connectedDevice() {
				const _this = this
				const params = {
					macAddr: this.macAddr,
					name: this.name,
					communicationType: this.communicationType,
				};
				if (this.deviceId != '') {
					_this.deviceStatus = 1
					bluethModule.connectedDevice(params, (result) => {
						if (result && result.code === 200) {
							if (result.message === 'device-result') {
								this.dataResult = result.data; // 设备结果
								console.log("返回的数据", this.dataResult)

							}
						}
					});
				}
			},

			getICWeightInfoValue(name) {
				const start = this.dataResult.indexOf('ICWeightInfo'); // 查找 value_g 字段的起始位置
				const endIndex = this.dataResult.indexOf('{', start); // 查找 value_g 字段的结束位置
				const type = this.dataResult.substring(start, endIndex); // 提取 value_g 的值
				if (type === 'ICWeightInfo') {
					switch (name) {
						case '体重':
							const startIndexKg = this.dataResult.indexOf('weight_kg='); // 查找 value_g 字段的起始位置
							const endIndexKg = this.dataResult.indexOf(',', startIndexKg); // 查找 value_g 字段的结束位置
							const weightKg = this.dataResult.substring(startIndexKg + 10, endIndexKg); // 提取 value_g 的值
							const wergihtKgValue = weightKg.substring(0, 3);
							return this.icWeightInfo.weight_kg = wergihtKgValue + " kg";
						case 'BMI':
							const startIndexBmi = this.dataResult.indexOf('bmi='); // 查找 value_g 字段的起始位置
							const endIndexBmi = this.dataResult.indexOf(',', startIndexBmi); // 查找 value_g 字段的结束位置
							const bmi = this.dataResult.substring(startIndexBmi + 4, endIndexBmi); // 提取 value_g 的值
							const bmiValue = bmi.substring(0, 3);
							return this.icWeightInfo.bmi = bmiValue;
						case '体脂率':
							const startIndexBFP = this.dataResult.indexOf('bodyFatPercent='); // 查找 value_g 字段的起始位置
							const endIndexBFP = this.dataResult.indexOf(',', startIndexBFP); // 查找 value_g 字段的结束位置
							const BFP = this.dataResult.substring(startIndexBFP + 15, endIndexBFP); // 提取 value_g 的值
							const BFPValue = BFP.substring(0, 3);
							return this.icWeightInfo.bodyFatPercent = BFPValue + ' %';
						case '肌肉率':
							const startIndexMP = this.dataResult.indexOf('musclePercent='); // 查找 value_g 字段的起始位置
							const endIndexMP = this.dataResult.indexOf(',', startIndexMP); // 查找 value_g 字段的结束位置
							const MP = this.dataResult.substring(startIndexMP + 14, endIndexMP); // 提取 value_g 的值
							const MPValue = MP.substring(0, 3);
							return this.icWeightInfo.musclePercent = MPValue + ' %';
						case '去脂体重':
							const startIndexWL = this.dataResult.indexOf('weight_kg='); // 查找 value_g 字段的起始位置
							const endIndexWL = this.dataResult.indexOf(',', startIndexWL); // 查找 value_g 字段的结束位置
							const WL = this.dataResult.substring(startIndexWL + 10, endIndexWL); // 提取 value_g 的值
							const WLValue = WL.substring(0, 3);
							return this.icWeightInfo.weight_lb = WLValue + ' kg';
						case '皮下脂肪':
							const startIndexSFP = this.dataResult.indexOf('subcutaneousFatPercent='); // 查找 value_g 字段的起始位置
							const endIndexSFP = this.dataResult.indexOf(',', startIndexSFP); // 查找 value_g 字段的结束位置
							const SFP = this.dataResult.substring(startIndexSFP + 23, endIndexSFP); // 提取 value_g 的值
							const SFPValue = SFP.substring(0, 3);
							return this.icWeightInfo.subcutaneousFatPercent = SFPValue + ' %';
						case '内脏脂肪':
							const startIndexVF = this.dataResult.indexOf('visceralFat='); // 查找 value_g 字段的起始位置
							const endIndexVF = this.dataResult.indexOf(',', startIndexVF); // 查找 value_g 字段的结束位置
							const VF = this.dataResult.substring(startIndexVF + 12, endIndexVF); // 提取 value_g 的值
							const VFValue = VF.substring(0, 3);
							return this.icWeightInfo.visceralFat = VFValue;
						case '体水分':
							const startIndexMoi = this.dataResult.indexOf('moisturePercent='); // 查找 value_g 字段的起始位置
							const endIndexMoi = this.dataResult.indexOf(',', startIndexMoi); // 查找 value_g 字段的结束位置
							const Moi = this.dataResult.substring(startIndexMoi + 16, endIndexMoi); // 提取 value_g 的值
							const MoiValue = Moi.substring(0, 3);
							return this.icWeightInfo.moisturePercent = MoiValue + ' %';
						case '骨骼肌率':
							const startIndexBone = this.dataResult.indexOf('boneMass='); // 查找 value_g 字段的起始位置
							const endIndexBone = this.dataResult.indexOf(',', startIndexBone); // 查找 value_g 字段的结束位置
							const bone = this.dataResult.substring(startIndexBone + 9, endIndexBone); // 提取 value_g 的值
							const boneValue = bone.substring(0, 3);
							return this.icWeightInfo.boneMass = boneValue + ' %';
						case '肌肉量':
							const startIndexMus = this.dataResult.indexOf('musclePercent='); // 查找 value_g 字段的起始位置
							const endIndexMus = this.dataResult.indexOf(',', startIndexMus); // 查找 value_g 字段的结束位置
							const Mus = this.dataResult.substring(startIndexMus + 14, endIndexMus); // 提取 value_g 的值
							const MusValue = Mus.substring(0, 3);
							return this.icWeightInfo.musclePercent = MusValue + ' kg';
						case '骨量':
							const startIndexBoneMass = this.dataResult.indexOf('boneMass='); // 查找 value_g 字段的起始位置
							const endIndexBoneMass = this.dataResult.indexOf(',',
							startIndexBoneMass); // 查找 value_g 字段的结束位置
							const boneMass = this.dataResult.substring(startIndexBoneMass + 9,
							endIndexBoneMass); // 提取 value_g 的值
							const boneMassValue = boneMass.substring(0, 3);
							return this.icWeightInfo.boneMass = boneMassValue + ' kg';
						case '蛋白质':
							const startIndexPP = this.dataResult.indexOf('proteinPercent='); // 查找 value_g 字段的起始位置
							const endIndexPP = this.dataResult.indexOf(',', startIndexPP); // 查找 value_g 字段的结束位置
							const PP = this.dataResult.substring(startIndexPP + 15, endIndexPP); // 提取 value_g 的值
							const PPValue = PP.substring(0, 3);
							return this.icWeightInfo.proteinPercent = PPValue + ' %';
						case '基础代谢':
							const startIndexBmr = this.dataResult.indexOf('bmr='); // 查找 value_g 字段的起始位置
							const endIndexBmr = this.dataResult.indexOf(',', startIndexBmr); // 查找 value_g 字段的结束位置
							const Bmr = this.dataResult.substring(startIndexBmr + 4, endIndexBmr); // 提取 value_g 的值
							const BmrValue = Bmr.substring(0, 3);
							return this.icWeightInfo.bmr = BmrValue + ' kacl';
						case '身体年龄':
							const startIndexAge = this.dataResult.indexOf('physicalAge='); // 查找 value_g 字段的起始位置
							const endIndexAge = this.dataResult.indexOf(',', startIndexAge); // 查找 value_g 字段的结束位置
							const Age = this.dataResult.substring(startIndexAge + 12, endIndexAge); // 提取 value_g 的值
							const AgeValue = Age.substring(0, 3);
							return this.icWeightInfo.physicalAge = AgeValue;
						case '脂肪量':
							const startIndexSub = this.dataResult.indexOf('subcutaneousFatPercent='); // 查找 value_g 字段的起始位置
							const endIndexSub = this.dataResult.indexOf(',', startIndexSub); // 查找 value_g 字段的结束位置
							const Sub = this.dataResult.substring(startIndexSub + 23, endIndexSub); // 提取 value_g 的值
							const SubValue = Sub.substring(0, 3);
							return this.icWeightInfo.subcutaneousFatPercent = SubValue + ' kg';
						case '含水量':
							const startIndexMoisture = this.dataResult.indexOf('moisturePercent='); // 查找 value_g 字段的起始位置
							const endIndexMoisture = this.dataResult.indexOf(',',
							startIndexMoisture); // 查找 value_g 字段的结束位置
							const Moisture = this.dataResult.substring(startIndexMoisture + 16,
							endIndexMoisture); // 提取 value_g 的值
							const MoistureValue = Moisture.substring(0, 3);
							return this.icWeightInfo.moisturePercent = MoistureValue + ' kg';
						case '蛋白量':
							const startIndexPro = this.dataResult.indexOf('proteinPercent='); // 查找 value_g 字段的起始位置
							const endIndexPro = this.dataResult.indexOf(',', startIndexPro); // 查找 value_g 字段的结束位置
							const Pro = this.dataResult.substring(startIndexPro + 15, endIndexPro); // 提取 value_g 的值
							const ProValue = Pro.substring(0, 3);
							return this.icWeightInfo.proteinPercent = ProValue + ' kg';
						case '标准体重':
							const startIndexWKg = this.dataResult.indexOf('weight_kg='); // 查找 value_g 字段的起始位置
							const endIndexWKg = this.dataResult.indexOf(',', startIndexWKg); // 查找 value_g 字段的结束位置
							const WKg = this.dataResult.substring(startIndexWKg + 10, endIndexWKg); // 提取 value_g 的值
							const WKgValue = WKg.substring(0, 3);
							return this.icWeightInfo.weight_kg = WKgValue + " kg"
						case '肥胖等级':
							const startIndexScore = this.dataResult.indexOf('bodyScore='); // 查找 value_g 字段的起始位置
							const endIndexScore = this.dataResult.indexOf(',', startIndexScore); // 查找 value_g 字段的结束位置
							const Score = this.dataResult.substring(startIndexScore + 10, endIndexScore); // 提取 value_g 的值
							const ScoreValue = Score.substring(0, 3);
							return this.icWeightInfo.bodyScore = ScoreValue;
						case '体型':
							const startIndexBody = this.dataResult.indexOf('bodyType='); // 查找 value_g 字段的起始位置
							const endIndexBody = this.dataResult.indexOf(',', startIndexBody); // 查找 value_g 字段的结束位置
							const Body = this.dataResult.substring(startIndexBody + 9, endIndexBody); // 提取 value_g 的值
							const BodyValue = Body.substring(0, 3);
							return this.icWeightInfo.bodyType = BodyValue;
						default:
							return '0.0'; // 没有匹配的情况下返回空字符串
					}
				} else {
					switch (name) {
						case '体重':
							return this.icWeightInfo.weight_kg = '连接错误设备';
						case 'BMI':
							return this.icWeightInfo.bmi = '0';
						case '体脂率':
							return this.icWeightInfo.bodyFatPercent = '0.0 %';
						case '肌肉率':
							return this.icWeightInfo.musclePercent = '0.0 %';
						case '去脂体重':
							return this.icWeightInfo.weight_lb = '0.0 kg';
						case '皮下脂肪':
							return this.icWeightInfo.subcutaneousFatPercent = '0.0 %';
						case '内脏脂肪':
							return this.icWeightInfo.visceralFat = '0';
						case '体水分':
							return this.icWeightInfo.moisturePercent = '0.0 %';
						case '骨骼肌率':
							return this.icWeightInfo.boneMass = '0.0 %';
						case '肌肉量':
							return this.icWeightInfo.musclePercent = '0.0 kg';
						case '骨量':
							return this.icWeightInfo.boneMass = '0.0 kg';
						case '蛋白质':
							return this.icWeightInfo.proteinPercent = '0.0 %';
						case '基础代谢':
							return this.icWeightInfo.bmr = '0.0 kacl';
						case '身体年龄':
							return this.icWeightInfo.physicalAge = '0';
						case '脂肪量':
							return this.icWeightInfo.subcutaneousFatPercent = '0.0 kg';
						case '含水量':
							return this.icWeightInfo.moisturePercent = '0.0 kg';
						case '蛋白量':
							return this.icWeightInfo.proteinPercent = '0.0 kg';
						case '标准体重':
							return this.icWeightInfo.weight_kg = "0.0 kg"
						case '肥胖等级':
							return this.icWeightInfo.bodyScore = '0';
						case '体型':
							return this.icWeightInfo.bodyType = '0';
						default:
							return '0.0'; // 没有匹配的情况下返回空字符串
					}

				}
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
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fff;
		height: 100%;

		.data-item {
			.left {
				.name {
					margin-left: -40rpx;
				}
			}

			.right {
				.desc {
					margin-right: -40rpx;
				}
			}
		}
	}
</style>