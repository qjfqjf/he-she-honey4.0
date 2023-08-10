<template>
	<view class="container">
		<z-nav-bar :title="name">
		</z-nav-bar>
		<public-module></public-module>
		<view class="title">
			<view class="name">
				{{this.indexList.name}} ({{Math.floor(this.indexList.quantity)}}g)
			</view>
			<view class="icon">
				<img :src="this.icon" style="width:28px;height:28px" mode="aspectFill" alt="">
			</view>
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
							
							{{ getFoodInfoValue(item.name) }}
						</view>
					</view>
				</view>
				<u-line></u-line>
			</u-list-item>
		</u-list>

		<div class="bottom-button">
			<button class="button" @click="handleButtonClick">选择</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid: 0,
				name: '',
				indexList: [],
				data: [{
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
			}
		},
		created() {

		},
		onLoad(options) {
			const cid = options.cid;
			const value = options.value;
			const icon = options.icon;
			this.cid = cid
			this.name = value
			this.icon = icon
			this.getFoodIndex();
		},
		methods: {
			getFoodIndex() {
				this.$http.post('/food/info', {
					id: this.cid
				}).then(res => {
					this.indexList = res.data;
					console.log(11111111,this.indexList.kcal)
				})
			},
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
			handleButtonClick() {
				// 处理按钮点击事件
				uni.setStorageSync('foodName',this.indexList.name)
				uni.setStorageSync('foodId',this.indexList.food_id)
				uni.setStorageSync('selectFoodTag',false)
				uni.setStorageSync('foodNameTag',true)
				uni.navigateTo({
					url: '/pages/healthManagement/diet/nutritionScale'
				})
			}
		},
	}
</script>

<style>
	.container {}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		/* 添加适当的内边距，使内容不紧贴边界 */
	}


	.name {
		display: flex;
		align-items: center;
	}

	.icon {
		margin-right: 20px;
		/* 调整图标与右侧的距离 */
	}

	.list {
		background-color: white;
	}

	.data-item {
		display: flex;
		/* height: 50px; */
		background-color: white;
	}

	.left {
		flex: 1;
	}

	.right {
		flex: 1;

	}


	.list-name {
		margin-left: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		height: 50px;
		width: 200px;
	}

	.value {
		/* margin-left: 130px; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		height: 50px;
	}

	.bottom-button {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: white;
		text-align: center;
		display: flex;
		/* 使用 Flex 布局 */
		justify-content: center;
		/* 水平居中 */
	}

	.button {
		height: 80rpx;
		background-color: rgb(32, 198, 162);
		color: aliceblue;
		display: flex;
		align-items: center;
		width: 90%;
		justify-content: center;
		border-radius: 45rpx;
	}
</style>