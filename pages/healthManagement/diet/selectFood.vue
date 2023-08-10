<template>
	<view class="container">
		<z-nav-bar title="营养库">
			<view slot="right" class="p-2">
				<image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthEstimate/search.png"
					@click="gotoSearch"></image>
					
			</view>
		</z-nav-bar>
		<public-module></public-module>
		<view class="content">
			<!-- 切换tab 历史和检测 -->
			<view class="tab-container d-flex j-center ">
				<view class="tab tab1" :class="{ active: currentTab === 'tab1' }" @click="()=>currentTab = 'tab1'">全部
				</view>
				<view class="tab" :class="{ active: currentTab === 'tab2' }" @click="()=>currentTab = 'tab2'">常用</view>
				<view class="tab" :class="{ active: currentTab === 'tab3' }" @click="()=>currentTab = 'tab3'">自定义</view>
			</view>

			<!-- 全部页面 -->
			<view class="all" v-if="currentTab === 'tab1'">
				<view class="row" v-for="(rowItems, rowIndex) in groupedData" :key="rowIndex">
					<view class="text" v-for="(item, columnIndex) in rowItems" :key="columnIndex" @click="foodList(item.cid, item.name,item.icon)">
						<view class="icon">
							<image :src="item.icon" style="width:50rpx;height:50rpx" mode="aspectFill"></image>
						</view>
						<view class="name">
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>

			<!-- 常用页面 -->
			<view class="changyong" v-if="currentTab === 'tab2'">

			</view>

			<!-- 自定义页面 -->
			<view class="zidingyi" v-if="currentTab === 'tab3'">

				<u-button type="primary" class="submit-btn" text="添加自定义食物"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				currentTab: 'tab1', //但前选项卡
			}
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo.uid
			this.getFoodData();
		},
		methods: {
			getFoodData() {
				this.$http.post('/food/category', {
				}).then(res => {
					this.dataList = res.data.data;
				})
			},
			foodList(cid,name,icon){
				uni.navigateTo({
					url: `/pages/healthManagement/diet/foodList?cid=${cid}&name=${name}&icon=${icon}`,
					// url: '/pages/healthManagement/diet/foodList?cid=' + cid + '&name=' + name + '&icon=' + icon
				})
			}
			
		},
		computed: {
			groupedData() {
				const groupSize = 3; // Number of items per row
				const result = [];
				for (let i = 0; i < this.dataList.length; i += groupSize) {
					result.push(this.dataList.slice(i, i + groupSize));
				}
				return result;
			}
		}
	}
</script>

<style>
	.container {
		background-color: white;

	}

	.content {
		border-top: 1rpx solid #ececec;
		font-size: 30rpx;
	}


	.tab-container {
		background-color: white;
	}

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

	.all {
		display: flex;
		flex-wrap: wrap;
		height: 800px;
	}

	.changyong {
		height: 800px;
	}

	.zidingyi {
		height: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.row {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		/* Align left */
		margin-bottom: 10px;
		/* Adjust spacing between rows as needed */
	}

	.text {
		width: calc(33.33% - 10px);
		margin: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	.icon {
		width: 50px;
		height: 50px;
		margin-bottom: 5px;
	}

	.name {
		font-size: 14px;
	}

	.submit-btn {
		width: 75%;
		border-radius: 50rpx;
		background-color: #28be9e;
		border-color: #28be9e;
		margin-top:700px;
	}
</style>