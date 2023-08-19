<template>
	<view class="d-flex flex-column bg-white">
		<z-nav-bar title="通讯录">
			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>
		</z-nav-bar>
		<u-search placeholder="请输入关键字" :show-action="false" shape="round" class="searchBar m-3" margin="20rpx"
			v-model="searchWords" height="40" :clearabled="true"></u-search>
		<u-tabs :list="tabList" class="tab_top" :activeStyle="{
			color: '#303133',
			fontWeight: 'bold',
			transform: 'scale(1.05)',
		}" :inactiveStyle="{
	color: '#606266',
	transform: 'scale(1)',
}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px; width: 50%" @change="tabChange">
		</u-tabs>

		<view>
			<u-index-list ref="indexList" :index-list="indexList" active-color="#71d5a1">
				<template v-for="(item, i) in newArr">
					<u-index-item>
						<u-index-anchor v-show="item.length>0" style="" :text="indexList[i]"></u-index-anchor>
						<view class="list-cell" v-for="(cell, index) in item" :key="index">
							<view class="d-flex j-center a-center my-1">
								<u--image shape="circle" :showLoading="true" :src="avatar" width="40px"
									height="40px"></u--image>
								<span class="list-cell">{{ cell }}</span>
							</view>
						</view>
					</u-index-item>
				</template>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	import IndexList from './indexList.vue'
	import {
		pinyin
	} from '@/utils/pinyin.js'
	export default {
		data() {
			return {
				tabList: [{
						name: '签约医生',
						id: 1,
					},
					{
						name: '关注医生',
						id: 2,
					},
				],
				searchWords: '',
				indexList: [
					'A',
					'B',
					'C',
					'D',
					'E',
					'F',
					'G',
					'H',
					'I',
					'J',
					'K',
					'L',
					'M',
					'N',
					'O',
					'P',
					'Q',
					'R',
					'S',
					'T',
					'U',
					'V',
					'W',
					'X',
					'Y',
					'Z',
					'#',
				],
				avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
				// avatar: [
				// 	"https://cdn.uviewui.com/uview/album/1.jpg"
				// ],
				itemArr: [
					[]
				],
				doctorArr: [
					[]
				],
				newArr: [],
				hairline: false,
				userInfo: '',
			}
		},
		async onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			await this.getDockerUserList()
			await this.getDoctorList()
		},
		watch: {
			// 监听itemArr的变化
			itemArr: {
				handler: function(val, oldVal) {},
				deep: true,
			},
		},
		methods: {
			tabChange(e) {
				if (e.index == 1) {
					this.newArr = this.itemArr.filter(item => !!item);
				} else {
					this.newArr = this.doctorArr.filter(item => !!item);
				}
			},
			chineseToInitials(word) {
				let SX = ''
				for (var i = 0; i < word.length; i++) {
					var c = word.charAt(i)
					if (/^[A-Z]+$/.test(c)) {
						SX += c
					}
				}
				console.log(SX)
				return SX
			},
			chineseToPinYin(l1) {
				var l2 = l1.length
				var I1 = ''
				var reg = new RegExp('[a-zA-Z0-9]')
				for (var i = 0; i < l2; i++) {
					var val = l1.substr(i, 1)
					var name = this.arraySearch(val, pinyin)
					if (reg.test(val)) {
						I1 += val
					} else if (name !== false) {
						I1 += name
					}
				}
				I1 = I1.replace(/ /g, '-')
				while (I1.indexOf('--') > 0) {
					I1 = I1.replace('--', '-')
				}
				return I1
			},
			arraySearch(l1, l2) {
				for (var name in pinyin) {
					if (pinyin[name].indexOf(l1) !== -1) {
						return this.ucfirst(name)
					}
				}
				return false
			},
			ucfirst(l1) {
				if (l1.length > 0) {
					var first = l1.substr(0, 1).toUpperCase()
					var spare = l1.substr(1, l1.length)
					return first + spare
				}
			},
			goBack() {
				uni.navigateBack({})
			},
			// 获取关注医生列表
			getDockerUserList() {
				this.$http
					.post('/doctor/contact', {
						type: 2
					})
					.then((res) => {
						console.log('res', res);
						// res.data.data.push({fullname:'法外狂徒'});
						const valList = res.data.data.map((item) => {
							const py = this.chineseToInitials(this.chineseToPinYin(item.fullname)).charAt(0);
							return {
								name: item.fullname,
								img: item.headurl,
								flag: py,
							};
						});
						// console.log('valList',valList);
						this.itemArr = this.indexList.map((val) => {
							const temArr = valList
								.filter((tem) => tem.flag === val)
								.map((tem) => tem.name);
							return temArr;
						});
					});
			},
			// 获取签约医生列表
			async getDoctorList() {
				let valList = []
				await this.$http
					.post('/doctor/contact', {
						type: 1
					})
					.then((res) => {
						console.log('res', res);
						const valList = res.data.data.map((item) => {
							const py = this.chineseToInitials(this.chineseToPinYin(item.fullname)).charAt(
								0);
							return {
								name: item.fullname,
								img: item.headurl,
								flag: py,
							};
						});
						this.doctorArr = this.indexList.map((val) => {
							const temArr = valList
								.filter((tem) => tem.flag === val)
								.map((tem) => tem.name);
							return temArr;
						});
						console.log('doctorArr', this.doctorArr);
					});
			},
		},
		components: {
			IndexList,
		},
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.searchBar {}

	.buttonGrounp {
		.leftButton {
			border: none;
			width: 40%;
			border-bottom-left-radius: 10px;
			border-top-left-radius: 10px;
		}

		.rightButton {
			border: none;
			width: 40%;
			border-bottom-right-radius: 10px;
			border-top-right-radius: 10px;
		}
	}
</style>