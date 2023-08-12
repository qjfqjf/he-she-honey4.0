<template>
	<view class="contaner">

		<view class="bar">
			<view class="bar-left">
				<image class="img" src="/static/demo/back2.png" style="width: 16px;height: 16px;" shape="circle"
					mode="aspectFill" @click="goDiet"></image>
			</view>
			<view class="bar-center">
				营养秤
			</view>
			<view class="bar-right">
				分析报告
			</view>
		</view>
		<public-module></public-module>

		<!-- 内容区域 -->
		<view class="content">
			<!-- 切换tab 历史和检测 -->
			<view class="tab-container d-flex j-center ">
				<view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">历史
				</view>
				<view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">检测</view>
			</view>


			<!-- 历史页面 -->
			<view class="historyCard" v-if="currentTab === 'tab1'">
				<!-- 时间区间 -->
				<view class="date-range">
					<uni-datetime-picker v-model="range" type="daterange" :border="false" :clear-icon="false"
						@maskClick="maskClick" />
				</view>
				<!-- 运动记录项 -->
				<view class="record-item">
					<view class="record-content" v-for="(item, index) in recordList" :key="index">
						<view class="date">
							<text>{{item.createtime}}</text>
							<!-- <img :src="item.icon" style="width:50rpx;height:50rpx" mode="aspectFill"> -->
							<image :src="item.icon" style="width:50rpx;height:50rpx" mode="aspectFill"></image>
						</view>
						<view class="line">
							<text class="title">名称</text>
							<text class="result right">{{item.name}}</text>
						</view>
						<view class="line">
							<text class="title">数量</text>
							<text class="result">{{item.quantity}} <text>{{getUnit(item.unit) }}</text></text>
						</view>
						<view class="line">
							<text class="title">热量</text>
							<text class="result">{{item.kcal}} kcal</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 检测页面 -->
			<view class="checkCard" v-else>
				<view class="top">
					<!-- 切换会员 -->
					<HealthHeader></HealthHeader>
					<!-- 设备状态 -->
					<view class="device-state">
						<u--text class="d-flex j-center" color="#01b09a"
							:text="deviceStatus===0?'设备状态：未连接':'设备状态：已连接'+'('+deviceId+')'"></u--text>
					</view>

					<view class="food">
						<!-- 重置 -->
						<view class="reset">
							<uni-icons class="icon" type="refreshempty" size="16" @click="reset"></uni-icons>
						</view>
						<view class="input">

							<view class="hd-dataResult">
								{{ KitchenScaleDataValue }}
							</view>
						</view>
						<button style="height: 30px;" @click="selectFood" v-if="this.foodNameTag">选择食物</button>
						<button style="height: 30px;" @click="selectFood" v-else>{{this.foodName}}</button>
					</view>
					<!-- 单位、保存 -->
					<view class="btns">
						<button class="units">单位：{{ renderUnit(dataResult) }}</button>
						<button class="save" :color="btnColor" @click="save">保存</button>
					</view>
				</view>
				<view class="nutrient-content">
					<view class="title">营养素含量</view>
				</view>
				
				<u-list @scrolltolower="scrolltolower" class="list">
					<u-list-item v-for="(item, index) in data" :key="index">
						<view class="data-item">
							<view class="left">
								<view class="list-name">
									{{ item.name }}
								</view>
							</view>
							<view class="right">
								<view class="value">
									{{ getFoodInfoValue(item.name)}}
								</view>
							</view>
						</view>
						<u-line></u-line>
					</u-list-item>
				</u-list>
			</view>
		</view>
	</view>
</template>

<script>
	const bluethModule = uni.requireNativePlugin('plugin-BtModule');
import indexList from '../../../uni_modules/uview-ui/libs/config/props/indexList';
	import HealthHeader from '../components/healthHeader.vue'
	export default {
		components: {
			HealthHeader
		},
		data() {
			return {
				btnColor: '#dadada',
				currentTab: 'tab2', //但前选项卡
				// 日期范围
				range: [this.getFirstDayOfMonth().format('yyyy-MM-dd'), this.getLastDayOfMonth().format('yyyy-MM-dd')],
				// 设备状态
				deviceStatus: 0,
				deviceId: uni.getStorageSync('yycDeviceId'), // 蓝牙设备的id
				recordList: [{
					date: '2022-03-11 23:34',
					img: require('@/static/icon/healthManagement/egg.png'),
					name: '煎蛋',
					count: 10,
					heal: 67
				}, {
					date: '2022-03-11 23:34',
					img: require('@/static/icon/healthManagement/egg.png'),
					name: '煎蛋',
					count: 10,
					heal: 67
				}, {
					date: '2022-03-11 23:34',
					img: require('@/static/icon/healthManagement/egg.png'),
					name: '煎蛋',
					count: 10,
					heal: 67
				}, ],
				inputValue: '',
				sliderHeight: 100,
				value: 10,
				// 基本案列数据
				radiolist1: [{
						name: '当前',
						disabled: false
					},
					{
						name: '推荐',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '当前',
				percentageValue: 70,
				macAddr: uni.getStorageSync('macAddr'),
				name: uni.getStorageSync('name'),
				communicationType: uni.getStorageSync('communicationType'),
				dataResult: '',
				showRenderValue: true, // 添加一个标志位，默认为true，表示显示renderValue(dataResult)
				KitchenScaleDataValue: "正在获取数据",
				userInfo: '',
				uid: 0, //用户id
				unit: 0,
				foodName: '',
				foodNameTag:true,
				// foodId: '',
				// selectFoodTag: '',
				// foodNameTag: '',
				KitchenScaleDataValueFloat: 0,
				indexList:[],
				data: [
					{
						name: '热量(kcal)',
					},
					{
						name: '蛋白质(克)',
					},
					{
						name: '脂肪(克)',
					},
					{
						name: '碳水化合物(克)',
					},
					{
						name: '膳食纤维(克)',
					},
					{
						name: '维生素A(微克)',
					},
					{
						name: '胡萝卜素(微克)',
					},
					{
						name: '视黄醇单量(微克)',
					},
					{
						name: '维生素B1(毫克)',
					},
					{
						name: '维生素B2(毫克)',
					},
					{
						name: '烟酸(毫克)',
					},
					{
						name: '维生素C(毫克)',
					},
					{
						name: '维生素E(毫克)',
					},
					{
						name: '胆固醇(毫克)',
					},
					{
						name: '钾(毫克)',
					},
					{
						name: '钠(毫克)',
					},
					{
						name: '钙(毫克)',
					},
					{
						name: '镁(毫克)',
					},
					{
						name: '铁(毫克)',
					},
					{
						name: '锰(毫克)',
					},
					{
						name: '锌(毫克)',
					},
					{
						name: '铜(毫克)',
					},
					{
						name: '磷(毫克)',
					},
					{
						name: '硒(微克)',
					},
				],
				foodInfo: {
					Ca: 0,
					Cu: 0,
					Fe: 0,
					K: 0,
					Mg: 0,
					Mn: 0,
					Na: 0,
					P: 0,
					Se: 0,
					VA: 0,
					VB1: 0,
					VB2: 0,
					VC: 0,
					VE: 0,
					Zn: 0,
					carbohydrates: 0,
					carbon_water: 0,
					carotene: 0,
					cholesterol: 0,
					cid: "",
					dietary_fiber: 0,
					fat: 0,
					food_id: "",
					kcal: 0,
					language: "",
					name: "",
					niacin: 0,
					protein: 0,
					quantity: 0,
					retinol: 0,
					unit: 0
				},
			};
		},
		async onLoad() {
			const foodName = uni.getStorageSync('foodName')
			const indexList = uni.getStorageSync('indexList')
			if(foodName === ''){
				this.foodName = '选择食物'
				this.foodNameTag = true
			}else{
				this.foodName = foodName
				this.foodNameTag = false
			}
			// this.foodId = uni.getStorageSync('foodId')
			this.indexList = uni.getStorageSync('indexList')
			this.foodName = uni.getStorageSync('foodName')
			
			// const selectFoodTag = uni.getStorageSync('selectFoodTag')
			// const foodNameTag = uni.getStorageSync('foodNameTag')
			this.selectFoodTag = selectFoodTag
			this.foodNameTag = foodNameTag
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			this.initPrinter()
			this.timer = setTimeout(() => {
				this.connectedDevice()
			}, 2000)
			this.getNutritionScaleData();
		},

		mounted() {
			this.getNutritionScaleData();

		},
		watch: {
			dataResult(newValue) {
				// 当dataResult的值发生变化时，重新显示renderValue(dataResult)
				this.showRenderValue = true;
			},
			range(newval) {
				this.getNutritionScaleData();
				console.log('范围选:', this.range);
			},
		},
		computed: {
			renderUnit() {
				return (dataString) => {
					const startIndexUnit = dataString.indexOf('unit=');
					const endIndexUnit = dataString.indexOf('}', startIndexUnit); // 使用 startIndexUnit
					const unit = dataString.substring(startIndexUnit + 5, endIndexUnit);
					if (unit === 'ICKitchenScaleUnitG') {
						this.unit = 0;
						return `g`;
					} else if (unit === 'ICKitchenScaleUnitMl') {
						this.unit = 1;
						return `ml`;
					} else if (unit === 'ICKitchenScaleUnitMlMilk') {
						this.unit = 2;
						return `ml(milk)`;
					} else if (unit === 'ICKitchenScaleUnitOz') {
						this.unit = 3;
						return `oz`;
					} else if (unit === 'ICKitchenScaleUnitLb') {
						this.unit = 4;
						return `lb:oz`;
					} else if (unit === 'ICKitchenScaleUnitFlOzWater') {
						this.unit = 5;
						return `fl、oz`;
					} else if (unit === 'ICKitchenScaleUnitFlOzMilk') {
						this.unit = 6;
						return `fl、oz(milk)`;
					} else {
						this.unit = 0;
						return `g`;
					}
				};
			},
		},
		//方法
		methods: {
			scrolltolower() {
			
			},
			getFoodInfoValue(name) {
				switch (name) {
					case '热量(kcal)':
						return this.foodInfo.kcal = this.indexList.kcal;
					case '蛋白质(克)':
						return this.foodInfo.protein = this.indexList.protein;
					case '脂肪(克)':
						return this.foodInfo.fat = this.indexList.fat;
					case '碳水化合物(克)':
						return this.foodInfo.carbohydrates = this.indexList.carbohydrates;
					case '膳食纤维(克)':
						return this.foodInfo.dietary_fiber = this.indexList.dietary_fiber;
					case '维生素A(微克)':
						return this.foodInfo.VA = this.indexList.VA;
					case '胡萝卜素(微克)':
						return this.foodInfo.carotene = this.indexList.carotene;
					case '视黄醇单量(微克)':
						return this.foodInfo.retinol = this.indexList.retinol;
					case '维生素B1(毫克)':
						return this.foodInfo.VB1 = this.indexList.VB1;
					case '维生素B2(毫克)':
						return this.foodInfo.VB2 = this.indexList.VB2;
					case '烟酸(毫克)':
						return this.foodInfo.niacin = this.indexList.niacin;
					case '维生素C(毫克)':
						return this.foodInfo.VC = this.indexList.VC;
					case '维生素E(毫克)':
						return this.foodInfo.VE = this.indexList.VE;
					case '胆固醇(毫克)':
						return this.foodInfo.cholesterol = this.indexList.cholesterol;
					case '钾(毫克)':
						return this.foodInfo.K = this.indexList.K;
					case '钠(毫克)':
						return this.foodInfo.Na = this.indexList.Na;
					case '钙(毫克)':
						return this.foodInfo.Ca = this.indexList.Ca;
					case '镁(毫克)':
						return this.foodInfo.Mg = this.indexList.Mg;
					case '铁(毫克)':
						return this.foodInfo.Fe = this.indexList.Fe;
					case '锰(毫克)':
						return this.foodInfo.Mn = this.indexList.Mn;
					case '锌(毫克))':
						return this.foodInfo.Zn = this.indexList.Zn;
					case '铜(毫克)':
						return this.foodInfo.Cu = this.indexList.Cu;
					case '磷(毫克)':
						return this.foodInfo.P = this.indexList.P;
					case '硒(微克)':
						return this.foodInfo.Se = this.indexList.Se;
					default:
						return '0.0'; // 没有匹配的情况下返回空字符串
				}
			},
			getUnit(unitCode) {
				// 假设1表示kg，2表示g等，你可以根据实际情况添加更多的单位判断
				switch (unitCode) {
					case 0:
						return ' g';
					case 1:
						return ' ml';
					case 2:
						return ' ml(milk)';
					case 3:
						return ' oz';
					case 4:
						return ' lb:oz';
					case 5:
						return ' fl、oz';
					case 6:
						return ' fl、oz(milk)';
					default:
						return ' g';
				}
			},
			reset() {
				this.KitchenScaleDataValue = "0"
			},
			/* 初始化 */
			initPrinter() {
				bluethModule.initBluetooth((res) => {
					if (res.code === 200) {
						console.log(`bluethModule---`, JSON.stringify(res));
						this.stateMsg = res['data'];
					}
				});
			},
			/* 连接设备 */
			connectedDevice() {
				console.log("设备状态", this.deviceId)
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
								this.getValue(this.dataResult)
							}
						}
					});
				}
			},
			getValue(dataResult) {
				if(dataResult != ''){
					this.btnColor = '#01b09a'
				}else{
					this.btnColor = '#dadada'
				}
				const startIndexUnit = dataResult.indexOf('unit=');
				const endIndexUnit = dataResult.indexOf('}', startIndexUnit); // 使用 startIndexUnit
				const unit = dataResult.substring(startIndexUnit + 5, endIndexUnit);
				if (unit === 'ICKitchenScaleUnitG') {
					const startIndex = dataResult.indexOf('value_g='); // 查找 value_g 字段的起始位置
					const endIndex = dataResult.indexOf(',', startIndex); // 查找 value_g 字段的结束位置
					const valueGString = dataResult.substring(startIndex + 8, endIndex); // 提取 value_g 的值
					this.KitchenScaleDataValue = valueGString + " g"
				} else if (unit === 'ICKitchenScaleUnitMl') {
					const startIndex = dataResult.indexOf('value_ml=');
					const endIndex = dataResult.indexOf(',', startIndex);
					const valueGString = dataResult.substring(startIndex + 9, endIndex); // 提取 value_g 的值
					this.KitchenScaleDataValue = valueGString + " ml"
				} else if (unit === 'ICKitchenScaleUnitMlMilk') {
					const startIndex = dataResult.indexOf('value_ml_milk=');
					const endIndex = dataResult.indexOf(',', startIndex);
					const valueGString = dataResult.substring(startIndex + 14, endIndex); // 提取 value_g 的值
					this.KitchenScaleDataValue = valueGString + " ml(milk)"
				} else if (unit === 'ICKitchenScaleUnitOz') {
					const startIndex = dataResult.indexOf('value_oz=');
					const endIndex = dataResult.indexOf(',', startIndex);
					const valueGString = dataResult.substring(startIndex + 9, endIndex); // 提取 value_g 的值	
					this.KitchenScaleDataValue = valueGString + " oz"
				} else if (unit === 'ICKitchenScaleUnitLb') {
					const startIndex = dataResult.indexOf('value_lb_oz=');
					const endIndex = dataResult.indexOf(',', startIndex);
					const valueGString = dataResult.substring(startIndex + 12, endIndex); // 提取 value_g 的值		
					this.KitchenScaleDataValue = valueGString + " lb:oz"
				} else if (unit === 'ICKitchenScaleUnitFlOzWater') {
					const startIndex = dataResult.indexOf('value_fl_oz=');
					const endIndex = dataResult.indexOf(',', startIndex);
					const valueGString = dataResult.substring(startIndex + 12, endIndex); // 提取 value_g 的值
					this.KitchenScaleDataValue = valueGString + " fl、oz"
				} else if (unit === 'ICKitchenScaleUnitFlOzMilk') {
					const startIndex = dataResult.indexOf('value_fl_oz_milk=');
					const endIndex = dataResult.indexOf(',', startIndex);
					const valueGString = dataResult.substring(startIndex + 17, endIndex); // 提取 value_g 的值			
					this.KitchenScaleDataValue = valueGString + " fl、oz(milk)"
				} else {
					this.KitchenScaleDataValue = "未查找到设备"
				}
			},
			getNutritionScaleData() {
				this.$http.post('/nutrition/index', {
					uid: this.uid,
					start_date: this.range[0],
					end_date: this.range[1]
				}).then(res => {
					this.recordList = res.data;
				})
			},
			gotoReport() {
				console.log('跳到营养分析报告页面')
				uni.navigateTo({
					url: '/pages/healthManagement/diet/nutritionReport'
				})
			},
			click(url, name) {
				if (!url) {
					this.$refs.uToast.default('开发中...')
				}
				uni.navigateTo({
					url: url
				});;
			},
			// 时间区域
			maskClick(e) {
				console.log('maskClick事件:', e);
			},

			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
			},
			save() {
				this.$http.post('/nutrition/create', {
					uid: this.uid,
					food_id: this.foodId,
					unit: this.unit,
					quantity: parseFloat(this.KitchenScaleDataValue).toFixed(2),
					value: parseFloat(this.KitchenScaleDataValue).toFixed(2),
					createtime: this.formatDate(new Date()),
				}).then(res => {
					this.$refs.uToast.show({
						message: '保存成功',
						type: 'success',
					})
				})
				this.getNutritionScaleData()
			},

			selectFood() {
				console.log('选择食物')
				uni.navigateTo({
					url: '/pages/healthManagement/diet/selectFood'
				})
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
			// 获取当前月的最后一天
			getLastDayOfMonth() {
				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1; // 月份从0开始，需要加1
				const lastDay = new Date(year, month, 0).getDate(); // 0表示上一个月的最后一天，即当前月的最后一天
				const lastDayOfMonth = new Date(year, month - 1, lastDay);
				return lastDayOfMonth;
			},
			// 获取当前月的第一天
			getFirstDayOfMonth() {
				const today = new Date();
				const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				return firstDayOfMonth
			},
			goDiet() {
				uni.navigateTo({
					url: '/pages/healthManagement/diet/diet'
				})
			}
		},
	}
</script>

<style lang="scss">
	.right {
		text-align: right;
	}

	.contaner {
		.analysis-report {
			font-size: 28rpx;
		}

		.bar {
			display: flex;
			justify-content: space-between;
			/* 将子元素平分空间 */
			align-items: center;
			height: 70px;

			background-color: white;

			.bar-left {
				text-align: center;
				margin-left: 20px;
				width: 50px;
				margin-top: 20px;
			}

			.bar-center {
				display: flex;
				/* 使用 Flex 布局 */
				justify-content: center;
				/* 水平居中 */
				align-items: center;
				text-align: center;
				font-size: 17px;
				font-weight: bold;
				margin-top: 20px;
			}

			.bar-right {
				text-align: center;
				font-size: 15px;
				width: 60px;
				margin-top: 20px;
			}
		}



		.content {
			border-top: 1rpx solid #ececec;
			font-size: 30rpx;

			.tab-container {
				background-color: white;

				.tab {
					padding: 18rpx;
					width: 100%;
					text-align: center;
					font-weight: 400;
					cursor: pointer;

					&.active {
						background-color: white;
						font-weight: 600;
						border-bottom: #01b09a 6rpx solid;
						color: #01b09a;
					}
				}
			}

			.historyCard {
				border-top: 1rpx solid #ececec;

				.date-range {
					background-color: #fff;
					padding: 10px;
					border-bottom: #01b09a 2rpx solid;
				}

				.record-item {
					margin: 10rpx 0;
					font-size: 29rpx;

					.record-content {
						padding: 10rpx;
						margin-top: 10rpx;
						background-color: white;

						.date {
							border-bottom: 1rpx solid #ececec;
							padding: 16rpx;
							display: flex;
							justify-content: space-between;

							image {
								width: 100rpx;
								height: 100rpx;
							}
						}

						.line {
							padding: 10rpx 20rpx;
							display: flex;
							justify-content: space-between;

							.title {}

							.result {}
						}
					}

				}
			}

			.checkCard {
				border-top: 1rpx solid #ececec;

				.top {
					background-color: white;
					padding: 20rpx;

					.device-state {
						display: flex;
						justify-content: center;

						text {
							margin-top: 20rpx;
							font-size: 26rpx
						}
					}

					.food {
						margin-top: 20rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.reset {
							width: 100rpx;
							height: 40rpx;
							background-color: gainsboro;
							text-align: center;
							border-radius: 20rpx;
							margin-bottom: 20rpx;
						}

						.input {
							display: flex;
							align-items: center;

							input {
								border-bottom: #999 1rpx solid;
								width: 200rpx;
								text-align: center;
							}
						}

						button {
							width: 400rpx;
							font-size: 20rpx;
							border: #01b09a 2rpx solid;
							border-radius: 50rpx;
							margin-top: 30rpx;
							color: #01b09a;
						}
					}

					.btns {
						margin-top: 30rpx;
						padding: 0;
						display: flex;
						justify-content: center;

						button {
							width: 300rpx;
							font-size: 20rpx;
							border-radius: 50rpx;
							color: white;
							margin: 0 20rpx;
						}

						.units {
							background-color: #01b09a;
						}

						.save {
							background-color: #d3d3d5;
						}
					}
				}




				.nutrientContent {
					background-color: #fff;
					margin: 16rpx;
					color: #19a99b;

					.nutrient-content {
						padding: 14rpx;

						.title {
							text-align: center;
							font-size: 32rpx;
						}

						.checkbox {
							display: flex;
							justify-content: space-between;
						}
					}

					.content {
						.item {
							padding: 10rpx 14rpx;

							.title {}

							.slide {
								display: flex;
								align-items: center;
								justify-content: space-between;

								text {
									width: 100rpx;
								}

								.slider {
									width: 58%;

									u-slider {
										--slider-height: 50rpx;
									}
								}
							}
						}
					}
				}

				.vitamin {
					background-color: #fff;
					padding: 14rpx;
					color: #19a99b;

					.item {
						display: flex;
						justify-content: space-between;
						padding: 14rpx;
						border-bottom: 1rpx solid #eeeeec;

					}
				}
			}
			
			.nutrient-content {
				padding: 14rpx;
				background-color:#20c49f;
				.title {
					text-align: center;
					font-size: 32rpx;
				}
			
				.checkbox {
					display: flex;
					justify-content: space-between;
				}
			}
			
			.list {
				background-color: white;
				.data-item {
					display: flex;
					/* height: 50px; */
					background-color: white;
					padding: 10px;
					.left {
						flex: 1;
						margin-left: 10px;
					}
					
					.right {
						flex: 1;
						margin-right: 10px;
					}
				}
			}
			
			
			
		}
	}

	// .active {
	//   color: #20c49f;
	// }
</style>