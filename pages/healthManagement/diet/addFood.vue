<template>
	<view class="contaner">
		<z-nav-bar title="添加自定义食物">

		</z-nav-bar>
		<public-module></public-module>
		<u-cell-group :border="false" class="message">
			<u-cell size="large" title="基本信息" titleStyle="font-weight: bold;" :border="false"></u-cell>
			<view class="input-item">
				<view class="title">食物名称</view>
				<input class="uni-input" v-model="foodinfo.name" />
			</view>
			<view class="input-item">
				<view class="title">数量(克)</view>
				<input class="uni-input" v-model="foodinfo.quantity" />
			</view>
			<view class="input-item">
				<view class="title">热量(kcal)</view>
				<input class="uni-input" v-model="foodinfo.kcal" />
			</view>
		</u-cell-group>
		<u-gap height="10"></u-gap>
		<u-cell-group :border="false" class="message">
			<u-cell size="large" title="选填信息" titleStyle="font-weight: bold;" :border="false"></u-cell>
			<view class="input-item">
				<view class="title">蛋白质(克)</view>
				<input class="uni-input" v-model="foodinfo.protein" />
			</view>
			<view class="input-item">
				<view class="title">脂肪(克)</view>
				<input class="uni-input" v-model="foodinfo.fat" />
			</view>
			<view class="input-item">
				<view class="title">碳水化合物(克)</view>
				<input class="uni-input" v-model="foodinfo.carbohydrates" />
			</view>
			<view class="input-item">
				<view class="title">膳食纤维(克)</view>
				<input class="uni-input" v-model="foodinfo.dietary_fiber" />
			</view>
			<view class="input-item">
				<view class="title">维生素A(微克)</view>
				<input class="uni-input" v-model="foodinfo.VA" />
			</view>
			<view class="input-item">
				<view class="title">胡萝卜素(微克)</view>
				<input class="uni-input" v-model="foodinfo.carotene" />
			</view>
			<view class="input-item">
				<view class="title">视黄醇单量(微克)</view>
				<input class="uni-input" v-model="foodinfo.retinol" />
			</view>
			<view class="input-item">
				<view class="title">维生素B1(毫克)</view>
				<input class="uni-input" v-model="foodinfo.VB1" />
			</view>
			<view class="input-item">
				<view class="title">维生素B2(毫克)</view>
				<input class="uni-input" v-model="foodinfo.VB2" />
			</view>
			<view class="input-item">
				<view class="title">烟酸(毫克)</view>
				<input class="uni-input" v-model="foodinfo.niacin" />
			</view>
			<view class="input-item">
				<view class="title">维生素C(毫克)</view>
				<input class="uni-input" v-model="foodinfo.VC" />
			</view>
			<view class="input-item">
				<view class="title">维生素E(毫克)</view>
				<input class="uni-input" v-model="foodinfo.VE" />
			</view>
			<view class="input-item">
				<view class="title">胆固醇(毫克)</view>
				<input class="uni-input" v-model="foodinfo.cholesterol" />
			</view>
			<view class="input-item">
				<view class="title">钾(毫克)</view>
				<input class="uni-input" v-model="foodinfo.K" />
			</view>
			<view class="input-item">
				<view class="title">钠(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Na" />
			</view>
			<view class="input-item">
				<view class="title">钙(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Ca" />
			</view>
			<view class="input-item">
				<view class="title">镁(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Mg" />
			</view>
			<view class="input-item">
				<view class="title">铁(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Fe" />
			</view>
			<view class="input-item">
				<view class="title">锰(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Mn" />
			</view>
			<view class="input-item">
				<view class="title">锌(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Zn" />
			</view>
			<view class="input-item">
				<view class="title">铜(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Cu" />
			</view>
			<view class="input-item">
				<view class="title">磷(毫克)</view>
				<input class="uni-input" v-model="foodinfo.P" />
			</view>
			<view class="input-item">
				<view class="title">硒(毫克)</view>
				<input class="uni-input" v-model="foodinfo.Se" />
			</view>
			<view class="input-item">
				
			</view>
		</u-cell-group>
		<u-gap height="10"></u-gap>
		<div class="bottom-button">
			<button class="button" @click="handleButtonClick">保存</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				foodinfo:{
					name: '',
					cid:'1500'
				}
			}
		},
		methods: {
			handleButtonClick() {
				if (this.foodinfo.name === '') {
					uni.showToast({
						title: '基本信息不能为空',
						icon: 'error'
					})
					
				} else {
					this.$http.post("/food/create", {
						...this.foodinfo
					}).then((res) => {
						console.log(1111111111, res)
						uni.showToast({
							title: '添加成功',
							duration: 2000,
						})
					})
				}
			}
		}
	}
</script>

<style>
	.message {
		background-color: #ffffff;
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

	.input-item {
		display: flex;
		align-items: center;
		height: 60px;
		margin-left: 10px;
		
	}

	.title {
		flex: 2;
		text-align: left;
		font-size: 16px;
	}

	.uni-input {
		flex: 1;
		margin-left: 10px;
		/* 可以根据需要调整标题和输入框之间的距离 */
		border: 1px solid #ccc;
		/* 添加边框样式 */
		padding: 5px;
		/* 可以根据需要调整输入框的内边距 */
		height: 40px;
		margin-right: 10px;
		border-radius: 20rpx;
		background-color: rgb(248, 248, 248);
	}
</style>