<template>
	<view class="contenttest">
		<z-nav-bar title="健康测评">
			<view slot="right" class="p-2">
				<image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthEstimate/search.png" @click="gotoSearch">
				</image>
			</view>
		</z-nav-bar>
		<public-module></public-module>

		<image class="img" src="/static/icon/healthEstimate/bigpsy.png" shape="circle" mode="aspectFill"></image>
		<!-- 筛选区域 -->
		<view class="select">
			<view class="select-list">
				<uni-data-select v-model="selectValue" :localdata="range" :clear="false"
					@change="changeState"></uni-data-select>
			</view>
		</view>
		<view class="container">
			<scroll-view class="nav" scroll-y="true">
				<view v-for="(item, index) in area" :key="index" :class="{ active: currentIndex === index }"
					@tap="handleNavClick(index, item.id)">
					<view>{{ item.name }}</view>
				</view>
			</scroll-view>
			<scroll-view class="bigcontent" scroll-y="true">
				<view class="content" v-for="(item, index) in dataTextList" :key="index">
					<view class="content-one" @click="gotoIndex(item.id)">
						<view class="content-top">
							<view class="left">
								<view class="top">{{ item.name }}</view>
								<view class="buttom">{{ item.desc }}</view>
							</view>
							<view class="right">
								<image class="imgtest" :src="item.imgurl1" mode="aspectFit" />
							</view>
						</view>
						<view class="content-buttom"></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
  
<script>
export default {
	data() {
		return {
			selectValue: 0,
			range: [{
				value: 0,
				text: "热度优先"
			},
			{
				value: 1,
				text: "流量优先"
			},
			],
			// navList: [
			// 	{
			// 		title: '健康',
			// 		data: [

			// 		],
			// 	},
			// ],

			dataList: [],
			dataTextList: [],
			QuestionList: [],
			area: [],
			currentIndex: 0,
			getUrl: '/mmpt_question/area',
			questionUrl: '/mmpt_question/index'
		};
	},
	mounted() {
		this.dataList = this.navList[this.currentIndex].data;
	},
	onLoad() {
		this.getQuestion();
	},
	methods: {
		getQuestion() {
			this.$http.get(this.getUrl, {
				area_type: 2
			}).then(res => {
				console.log('res', res);
				this.area = res.data.area
				// this.area.forEach((record, index) => {
				// 	this.change(record.id);
				// 	this.QuestionList[index] = this.dataTextList;
				// 	console.log('dataTextList', this.dataTextList);
				// });
				this.dataTextList = res.data.data
				for (var record of this.dataTextList) {
					if (record.name.length > 7) record.name = record.name.slice(0, 7)
					if (record.desc.length > 30) record.desc = record.desc.slice(0, 30)
				}
				console.log('QuestionList', this.QuestionList);
			}).catch(err => {
				uni.showToast({
					title: err
				});
			});
		},
		open(e) {
			// console.log('open', e)
		},
		close(e) {
			// console.log('close', e)
		},
		change(e) {

			// console.log('change', e)
		},
		handleNavClick(index, e) {
			console.log('handleNavClick', index, e);
			if (this.currentIndex != index) {
				console.log('this.currentIndex', this.currentIndex);
				this.currentIndex = index;
				this.dataList = this.area[this.currentIndex].data;
			}
			this.$http.get(this.questionUrl, {
				question_area_id: e,
				area_type: 2
			}).then(res => {
				console.log('res', res);
				this.dataTextList = res.data.data
				for (var record of this.dataTextList) {
					if (record.name.length > 7) record.name = record.name.slice(0, 7)
					if (record.desc.length > 30) record.desc = record.desc.slice(0, 30)
				}
			}).catch(err => {
				uni.showToast({
					title: err
				});
			});
			console.log('Current index: ' + this.currentIndex);
		},
		changeState(e) {
			console.log("e:", e);
		},
		selectItem(index) {
			this.selectedItem = index;
		},
		gotoIndex(e) {
			console.log('e', e);
			// uni.setStorageSync('Question', e)
			uni.navigateTo({
				url: '/pages/healthEstimate/health/Exam/index?e=' + e
			})
		},
		gotoSearch() {
			console.log('gotoSearch');
			uni.navigateTo({
				url: '/pages/healthEstimate/health/search'
			})
		},
	}
}
</script>
  
<style lang="scss">
.contenttest {
	font-weight: 600;
	color: #313131;
}

image {
	width: 220rpx;
	height: 220rpx;
	align-items: center;
	/* 垂直居中 */
}

.img {
	width: 700rpx;
	height: 400rpx;
	margin-left: 28rpx;
}

.select {
	width: 100%;
	background-color: white;
	display: flex;
	justify-content: left;
	padding: 14rpx;

	.select-list {
		display: flex;
		// justify-content: right;
		width: 250rpx;
		background-color: white;
	}
}

.container {
	display: flex;
	height: 100%;
}

.nav {
	width: 40%;
	display: flex;
	align-items: center;
	text-align: center;
}

.nav view {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30rpx;
	font-size: 30rpx;
	height: 160rpx;
	text-align: center;
}

.nav view.active {
	background-color: #ddd;

	// 激活项的样式
	&.active {
		background-color: #ffffff;
		position: relative;
		color: #1AB76C;

		// 渲染激活项左侧的绿色指示边线
		&::before {
			content: ' ';
			display: block;
			width: 3px;
			height: 30px;
			background-color: #1AB76C;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}


.bigcontent {
	background-color: #FFFFFF;
	width: 100%;
	height: 3000rpx;
}


.content-one {
	display: flex;
	flex-direction: column;
	height: 190rpx;
}

.content-top {
	flex: 1;
	width: 100%;
	height: 100rpx;
	display: flex;

}


.left {
	width: 70%;
	height: 160rpx;
	font-size: 10rpx;
	padding: 10rpx;
	margin: 10rpx 10rpx;
}

.top {
	font-size: 38rpx;
	overflow-wrap: break-word;
	word-break: break-all;
	width: 100%;
	height: 50%;

}

.buttom {
	font-size: 25rpx;
	text-align: left;
	overflow-wrap: break-word;
	word-break: break-all;
	width: 100%;
	height: 50%;
	display: flex;
	align-items: center;
	/* 垂直居中 */
}

.right {
	width: 30%;
	display: flex;
	justify-content: center;
	/* 水平居中 */
	align-items: center;
	/* 垂直居中 */
	height: 160rpx;
	/* 设置容器高度 */
	margin-right: 10rpx;
}

.imgtest {
	width: 140rpx;
	height: 140rpx;
	margin-right: 25rpx;
}


.content-buttom {
	height: 2px;
	width: 90%;
	background-color: #F6F6F6;
	text-align: center;
	margin-left: 25rpx;
	margin-top: 10rpx;
}</style>