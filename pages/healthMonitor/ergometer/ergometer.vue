<template>
	<view class="content p-2">
		<z-nav-bar title="心电图">

		</z-nav-bar>
		<public-module></public-module>
		<HealthHeader :username="username" @myUser="handleMyUser"></HealthHeader>
		<view class="mt-3 mb-3">
			<!-- <My-ECGView ref="ecgView" style="height: 500rpx;width: 750rpx;" /> -->
			<lime-ecg />
		</view>

		<br>
		<br><br>
		<u--text class="d-flex j-center mb-3" color="#01b09a"
			:text="deviceStatus === 0 ? '设备状态：未连接' : '设备状态：已连接' + '(' + deviceId + ')'"></u--text>
		<u-button class="mt-2" :color="btnColor" text="保存" @click="handleSave"></u-button>
		<view class="mb-3">

		</view>
		<u--text class="d-flex j-center" color="#20baa6" suffixIcon="arrow-right" iconStyle="font-size: 15px;color:#20baa6"
			text="查看监测历史" @click="handleDevelop">
		</u--text>
		<!-- <BottomNavigation page="bloodSUA/suaManualEntry"></BottomNavigation> -->
		<view class="tools d-flex j-sb mt-5 p-4">
			<view class="d-flex flex-column a-center" @click="onPageSelectDocter">
				<image :src="this.toolList[0].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[0].title }}</text>
			</view>
			<view class="d-flex flex-column a-center" @click="onPageMonth">
				<image :src="this.toolList[1].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[1].title }}</text>
			</view>
			<view class="d-flex flex-column a-center" @click="onPageDevice">
				<image :src="this.toolList[2].img" style="width: 100rpx; height: 100rpx" mode="aspectFit"></image>
				<text class="mt-1">{{ this.toolList[2].title }}</text>
			</view>


		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import HealthHeader from "../components/healthHeader/HealthHeader.vue"
import BottomNavigation from '../components/bottomNav/BottomNavigation.vue'
export default {
	components: {
		HealthHeader,
		BottomNavigation
	},
	data() {
		return {
			stateData: "",
			eventData: "",
			btnColor: '#dadada',
			deviceStatus: 0,
			ecgRef: null,
			value: [122, 122, 122, 122, -122, -122, -122, -122, -122, -122, -122, -122, -122, -122, 122, 122, 122, 123,
				125, 127, 130, 133, 135, 137, 138, 139, 140, 140, 139, 138, 136, 134, 130, 127, 125, 124, 123, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 121, 119,
				116, 113, 111, 132, 151, 171, 190, 210, 229, 210, 190, 171, 151, 132, 112, 114, 117, 120, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 124, 126, 128, 131, 133, 134, 136, 140, 143, 144,
				146, 149, 150, 152, 153, 153, 154, 155, 156, 157, 156, 155, 153, 153, 152, 150, 149, 146, 145, 142,
				138, 135, 133, 129, 127, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
				122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122
			],
			time: null,
			uid: 0, //用户选择的id
			username: '', //登录的名字
			// 底部工具栏
			page: '',
			toolList: [
				{
					img: require('@/static/icon/select_docter.png'),
					title: '找医生',
					url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
				},
				{
					img: require('@/static/icon/bloodPressure/month.png'),
					title: '月报',
					url: '/pages/healthMonitor/ergometer/ergometerMonth'
				},
				{
					img: require('@/static/icon/bloodPressure/device.png'),
					title: '设备',
					url: '/pages/mine/myDevice'
				},
			],

		}
	},
	onLoad() {
		this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		this.uid = this.userInfo
		console.log(111111, this.uid)
		this.getUserInfo()

		// this.startConnect()

		// this.initBlue()
		// if (this.deviceId && this.deviceStatus === 0) {
		// 	this.connect()
		// }
	},
	//页面显示
	onShow() {
		uni.$on('backWithData', (data) => {
			this.uid = data.uid;
			this.username = data.name;
		});
		console.log(111111, this.uid)
	},
	methods: {

		getUserInfo() {
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
				url: '/pages/healthMonitor/ergometer/ergometerHistory?uid=' + this.uid,
			})
		},
		handleSave() {
			console.log('提交')
		},
		onPageJump(url) {
			uni.navigateTo({
				url: url
			});

		},


		onPageSelectDocter() {
			uni.navigateTo({
				url: '/pages/healthAdvisory/treatmentMethod/treatmentMethod',
			})
		},
		onPageMonth() {
			uni.navigateTo({
				url: '/pages/healthMonitor/ergometer/ergometerMonth?uid=' + this.uid,
			})
		},
		onPageDevice() {
			uni.navigateTo({
				url: '/pages/mine/myDevice',
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

	},
}
</script>

<style lang="scss">
.bgView {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
}
</style>