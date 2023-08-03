<template>
	<view class="contaner">
		<z-nav-bar title="营养秤">
			<view slot="right" class="p-2" @click="gotoReport()">
				<text class="analysis-report">分析报告</text>
			</view>
		</z-nav-bar>
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
							<text>{{item.date}}</text>
							<image :src="item.img" style="width:50rpx;height:50rpx" mode="aspectFill"></image>
						</view>
						<view class="line">
							<text class="title">名称</text>
							<text class="result right">{{item.name}}</text>
						</view>
						<view class="line">
							<text class="title">数量</text>
							<text class="result">{{item.count}} g</text>
						</view>
						<view class="line">
							<text class="title">热量</text>
							<text class="result">{{item.heal}} kcal</text>
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
						<button @click="selectFood">选择食物</button>
					</view>
					<!-- 单位、保存 -->
					<view class="btns">
						<button class="units">单位：{{ renderUnit(dataResult) }}</button>
						<button class="save" @click="save">保存</button>
					</view>
				</view>


				<!-- 营养素含量 -->
				<view class="nutrientContent">
					<!-- 当前，当天 -->
					<view class="nutrient-content">
						<view class="title">营养素含量</view>
					</view>
					<!-- 含量 -->
					<view class="content">
						<view class="item">
							<view class="title">热量(345.8kcal)</view>
							<view class="slide">
								<text> 890</text>
								<view class="slider">
									<u-line-progress :percentage="percentageValue" height="14" :showText="false"
										activeColor="#1ec4a1">
									</u-line-progress>
								</view>
								<text class="right">22</text>
							</view>
						</view>

					</view>

				</view>
				<!-- 维生素 -->
				<view class="vitamin">
					<view class="item">
						<text>维生素A(800微克)</text>
						<text class="right">0</text>
					</view>
					<view class="item">
						<text>胡萝卜素(60微克)</text>
						<text class="right">0</text>
					</view>
					<view class="item">
						<text>维生素A(800微克)</text>
						<text class="right">0</text>
					</view>
					<view class="item">
						<text>维生素A(800微克)</text>
						<text class="right">0</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const bluethModule = uni.requireNativePlugin('plugin-BtModule');
	import HealthHeader from '../components/healthHeader.vue'
	export default {
		components: {
			HealthHeader
		},
		data() {
			return {
				currentTab: 'tab1', //但前选项卡
				// 日期范围
				range: ['2021-02-1', '2024-3-28'],
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
			};
		},
		async onLoad() {
			this.initPrinter()
			this.timer = setTimeout(() => {
				this.connectedDevice()
			}, 2000)

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
						return `g`;
					} else if (unit === 'ICKitchenScaleUnitMl') {
						return `ml`;
					} else if (unit === 'ICKitchenScaleUnitMlMilk') {
						return `ml(milk)`;
					} else if (unit === 'ICKitchenScaleUnitOz') {
						return `oz`;
					} else if (unit === 'ICKitchenScaleUnitLb') {
						return `lb:oz`;
					} else if (unit === 'ICKitchenScaleUnitFlOzWater') {
						return `fl、oz`;
					} else if (unit === 'ICKitchenScaleUnitFlOzMilk') {
						return `fl、oz(milk)`;
					} else {
						return `g`;
					}
				};
			},
		},
		//方法
		methods: {
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
				console.log("设备状态",this.deviceId)
				const _this = this
				const params = {
					macAddr: this.macAddr,
					name: this.name,
					communicationType: this.communicationType,
				};
				if(this.deviceId != ''){
					_this.deviceStatus = 1
					bluethModule.connectedDevice(params, (result) => {
						if (result && result.code === 200) {
							if (result.message === 'device-result') {
								this.dataResult = result.data; // 设备结果
								console.log("返回的数据",this.dataResult)
								this.getValue(this.dataResult)
							}
						}
					});
				}
			},
			getValue(dataResult) {
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
				uni.request({
					url: 'http://106.14.140.92:8881/platform/dataset/search_read',
					method: 'POST',
					data: {
						"params": {
							"model": "nutrition.scale",
							"domain": [
								["input_type", "=", "hend"]
							],
							"fields": [
								"name",
								"numbers",
								"owner",
								"food_name",
								"heat",
								"protein",
								"fat",
								"carbohydrate",
								"dietary_fiber",
								"test_time"
							]
						}
					},
					success: (res) => {
						this.data = res.data;
					},
					fail: (err) => {
						this.loading = false;
						this.error = '接口请求失败';
						console.error(err);
					}
				});
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
				console.log('save====')
			},

			selectFood() {
				console.log('选择食物')
			},

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
		}
	}

	// .active {
	//   color: #20c49f;
	// }
</style>