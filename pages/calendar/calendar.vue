<template>
	<view class="container">
		<uni-calendar 
		:insert="true"
		:lunar="true"
		@change="change"
		:selected="[{date: '2023-06-27', info: '服药', data: { medicineName: '阿莫西林', takeMedicineTime: '中晚饭后，2次/天' }}]"
		 />
		<view class="bodyContainer" v-if="extraInfo.date != null">
<!--			<view class="title" style="font-size: 60rpx">用药提醒</view>-->
			<view style="display: flex; justify-content: center;">
				<view class="title" style="font-size: 60rpx;">用药提醒</view>
			</view>
<!--			<view style="display: flex">-->
<!--				<view class="title">药物名称</view>-->
<!--				<text>{{extraInfo.data.medicineName}}</text>-->
<!--				<view class="title">服药时间</view>-->
<!--				<text>{{extraInfo.data.takeMedicineTime}}</text>-->
<!--			</view>-->
			<view style="display: flex">
				<view class="title" style="flex: 1; text-align: center;">药物名称</view>
				<view class="title" style="flex: 1; text-align: center;">服药时间</view>
			</view>
			<view style="display: flex">
				<text style="flex: 1; text-align: center;color: rgb(130, 220, 100)">{{ extraInfo.data.medicineName }}</text>
				<text style="flex: 1; text-align: center;color: rgb(130, 220, 100)">{{ extraInfo.data.takeMedicineTime }}</text>
			</view>

		</view>

	</view>
</template>

<script>
import uniCalendar from "../../uni_modules/uni-calendar_1.4.10/components/uni-calendar/uni-calendar.vue";
	export default {
		data() {
			return {
				extraInfo:{}
			}
		},
		components: {
			uniCalendar
		},
		methods: {
			change(e){
				console.log(this.extraInfo)
				this.extraInfo = {}
				if(e.extraInfo.date){
					this.extraInfo = e.extraInfo
				}
				console.log(this.extraInfo)
			},
		}
	}
</script>

<style>
.container{
	background-color: #FFFFFF;
	.bodyContainer{
		background-color: #FFFFFF;
		padding:30rpx 20rpx;

		.title{
			font-size: 50rpx;
			margin-bottom: 30rpx;
		}
	}

}
</style>
