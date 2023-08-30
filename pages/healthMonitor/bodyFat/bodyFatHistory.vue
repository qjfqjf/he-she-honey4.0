<template>
	<view class="container">
		<z-nav-bar title="体脂率历史"></z-nav-bar>
		<public-module></public-module>

		<!-- 正文内容 -->
		<view class="content-body ">
			<view class="data-item j-sb" v-for="(item,index) in historyList" :key="index">
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
						{{item.value}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: 0, //用户id
				userInfo: '',
				dataList: [],
				historyList: [

				]
			};
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// this.uid = this.userInfo
			// 获取URL参数
			const uid = options.uid;
			if (uid == 0) {
				this.uid = this.userInfo
				console.log(111111,this.uid)
			} else {
				this.uid = uid
			}
			console.log(111111,this.uid)
			this.getHistoryList();
		},
		computed: {
			data() {
				return this.dataList[0];
			}
		},
		methods: {
			handleDevelop() {
				uni.navigateTo({
					url: '/pages/healthMonitor/bloodSugar/warningRules'
				})
			},

			//查询血压历史记录
			getHistoryList() {
				this.$http.post('/bmi/index', {
					uid: this.uid,
				}).then(res => {
					this.dataList = res.data[0];
					this.generateHistoryList();
				})
			},
			generateHistoryList() {
				if (this.dataList === undefined) {
					this.historyList = [{
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体重',
							desc: '标准',
							value: 0 + ' kg'
						},
						{
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: 'BMI',
							desc: '超重',
							value: 0
						},
						{
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体脂率',
							desc: '严重超重',
							value: 0 + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '肌肉率',
							desc: '偏低',
							value: 0 + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '去脂体重',
							desc: '偏低',
							value: 0 + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '皮下脂肪',
							desc: '偏高',
							value: 0 + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '内脏脂肪',
							desc: '标准',
							value: 0
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体水分',
							desc: '偏低',
							value: 0 + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '骨骼肌率',
							desc: '偏低',
							value: 0 + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '肌肉量',
							desc: '偏低',
							value: 0 + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '骨量',
							desc: '偏低',
							value: 0 + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '蛋白质',
							desc: '偏低',
							value: 0 + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '基础代谢',
							desc: '偏低',
							value: 0 + ' kacl'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '身体年龄',
							desc: '偏高',
							value: 0
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '脂肪量',
							desc: '严重超重',
							value: 0 + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '含水量',
							desc: '偏低',
							value: 0
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '蛋白量',
							desc: '偏低',
							value: 0 + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '标准体重',
							desc: '',
							value: 0 + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '肥胖等级',
							desc: '偏高',
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体型',
							desc: '偏肥胖',
						}
					];
				}else{
					this.historyList = [
						{
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体重',
							desc: '标准',
							value: this.dataList.weight + ' kg'
						},
						{
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: 'BMI',
							desc: '超重',
							value: this.dataList.bmi
						},
						{
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体脂率',
							desc: '严重超重',
							value: this.dataList.body_fat_percent + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '肌肉率',
							desc: '偏低',
							value: this.dataList.muscle_percent + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '去脂体重',
							desc: '偏低',
							value: this.dataList.weight + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '皮下脂肪',
							desc: '偏高',
							value: this.dataList.subcutaneous_fat_percent + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '内脏脂肪',
							desc: '标准',
							value: this.dataList.visceral_fat
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体水分',
							desc: '偏低',
							value: this.dataList.moisture_percent + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '骨骼肌率',
							desc: '偏低',
							value: this.dataList.sm_percent + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '肌肉量',
							desc: '偏低',
							value: this.dataList.muscle_percent + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '骨量',
							desc: '偏低',
							value: this.dataList.bone_mass + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '蛋白质',
							desc: '偏低',
							value: this.dataList.protein_percent + ' %'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '基础代谢',
							desc: '偏低',
							value: this.dataList.bmr + ' kacl'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '身体年龄',
							desc: '偏高',
							value: this.dataList.physical_age
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '脂肪量',
							desc: '严重超重',
							value: this.dataList.subcutaneous_fat_percent + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '含水量',
							desc: '偏低',
							value: this.dataList.moisture_percent
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '蛋白量',
							desc: '偏低',
							value: this.dataList.protein_percent + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '标准体重',
							desc: '',
							value: this.dataList.weight + ' kg'
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '肥胖等级',
							desc: '偏高',
						}, {
							icon: require('@/static/icon/bodyFat/weight2.png'),
							name: '体型',
							desc: '偏肥胖',
						}
					];
					
				}

			}
		},

	}
</script>

<style lang="scss">
	.right {
		text-align: right;
	}

	.container {
		font-size: 28rpx;


		.content-body {
			background-color: white;
			padding: 30rpx;
			font-size: 30rpx;

			.data-item {
				border-top: 1rpx solid #eee;
				display: flex;
				align-items: center;

				.left {
					padding: 10rpx;

					.name {
						margin-left: 20rpx;
					}
				}

				.right {
					.desc {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>