<template>
	<view class="content p-2">
		<z-nav-bar title="体脂率">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader></HealthHeader>
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
						{{item.value}}
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
				btnColor: '#dadada',
				deviceStatus: 0,
				data: [{
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体重',
						desc: '标准',
						value: '73.0kg'
					},
					{
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: 'BMI',
						desc: '超重',
						value: '24.4'
					},
					{
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体脂率',
						desc: '严重超重',
						value: '31.7%'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '肌肉率',
						desc: '偏低',
						value: '63.6%'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '去脂体重',
						desc: '偏低',
						value: '49.9kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '皮下脂肪',
						desc: '偏高',
						value: '22.6%'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '内脏脂肪',
						desc: '标准',
						value: '9.0'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体水分',
						desc: '偏低',
						value: '50%'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '骨骼肌率',
						desc: '偏低',
						value: '38.1%'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '肌肉量',
						desc: '偏低',
						value: '46.4kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '骨量',
						desc: '偏低',
						value: '3.3kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '蛋白质',
						desc: '偏低',
						value: '13.6%'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '基础代谢',
						desc: '偏低',
						value: '1445kacl'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '身体年龄',
						desc: '偏高',
						value: '63.0'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '脂肪量',
						desc: '严重超重',
						value: '23.1kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '含水量',
						desc: '偏低',
						value: '36.5kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '蛋白量',
						desc: '偏低',
						value: '9.9kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '标准体重',
						desc: '',
						value: '65.9kg'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '肥胖等级',
						desc: '偏高',
						value: '--'
					}, {
						icon: require('@/static/icon/bodyFat/weight.png'),
						name: '体型',
						desc: '偏肥胖',
						value: '--'
					}
				]
			};
		},
		methods: {
			handleDevelop() {
				uni.navigateTo({
				  url:'/pages/healthMonitor/bodyFat/bodyFatHistory'
				})
			},
			handleSave() {
				console.log('提交')
			}
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
