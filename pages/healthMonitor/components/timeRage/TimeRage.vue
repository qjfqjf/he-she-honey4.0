<template>
	<view>
		<view class="timeRange d-flex j-sb mb-3">
			<view class="startTime d-flex a-center" @click="showTimePicker('start')">
				<text>开始时间：</text>
				<u-button style="width: 160rpx; " :text="new Date(startTime).format('yyyy-MM-dd')" color="#abe5c0">
				</u-button>

			</view>
			<view class="endTime d-flex a-center" @click="showTimePicker('end')">
				<text>结束时间：</text>
				<u-button style="width: 160rpx;" :text="new Date(endTime).format('yyyy-MM-dd')" color="#abe5c0">
				</u-button>
			</view>
		</view>
		<!-- 时间选择器 -->
		<u-datetime-picker :show="showStart" v-model="startTime" mode="date" @confirm="handleConfirm"
			@cancel="cancelTime">
		</u-datetime-picker>
		<u-datetime-picker :show="showEnd" v-model="endTime" mode="date" @confirm="handleConfirm" @cancel="cancelTime">
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startTime: '',
				endTime: '',
				showStart: false,
				showEnd: false,
			};
		},
		mounted() {
			this.startTime = this.getFirstDayOfMonth().format('yyyy-MM-dd')
			this.endTime = this.getLastDayOfMonth().format('yyyy-MM-dd')
		},
		methods: {
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
			showTimePicker(value) {
				if (value === 'start') {
					this.showStart = true
				} else {
					this.showEnd = true
				}
			},

			handleConfirm(time) {

				this.showStart = false
				this.showEnd = false
				// console.log(time)
				// console.log(this.startTime)
				// this.startTime = new Date(time.value).format('yyyy-MM-dd')
				const today = new Date();
				const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
				console.log(firstDayOfMonth.format('yyyy-MM-dd'))

			},
			cancelTime() {
				this.showStart = false
				this.showEnd = false
			}
		}
	}
</script>

<style lang="scss">

</style>
