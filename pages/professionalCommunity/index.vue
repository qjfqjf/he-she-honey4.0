<template>
	<view class="w-100">
		<z-nav-bar title="监管/预警">
			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>
			<!--            <u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>-->
		</z-nav-bar>
			<view class="page-body w-100">
				<view class="page-section">
					<video class="w-100" id="myVideo" src="https://web-assets.dcloud.net.cn/unidoc/zh/wap2appvsnative.mp4" @error="videoErrorCallback" :danmu-list="danmuList"
								 enable-danmu danmu-btn controls>
					</video>
<!--					<view class="uni-list">-->
<!--						<view class="uni-list-cell">-->
<!--							<view>-->
<!--								<view class="uni-label">弹幕内容</view>-->
<!--							</view>-->
<!--							<view class="uni-list-cell-db">-->
<!--								<input @blur="bindInputBlur" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />-->
<!--							</view>-->
<!--						</view>-->
<!--					</view>-->
<!--					<view class="btn-area">-->
<!--						<button @tap="bindSendDanmu" class="page-body-button" formType="submit">发送弹幕</button>-->
<!--					</view>-->
				</view>
			</view>
		<view class="m-4 px-4">监管控制</view>
		<view>
			<u-popup :show="show" @close="close" @open="open">
				<view class="m-5 px-5 flex-column d-flex">
					<text class="pt-5" style="font-size: larger; font: bold">预警提示</text>
					<text class="py-2">防盗预警</text>
					<text class="py-2">天气预警</text>
				</view>
			</u-popup>
			<u-button @click="show = true">打开</u-button>
		</view>
		<public-module></public-module>
	</view>
</template>

<script>


export default {
	data() {
		return {
			show: false,
			title: 'video',
			src: '',
			inputValue: '',
			danmuList: [{
				text: '第 1s 出现的弹幕',
				color: '#ff0000',
				time: 1
			},
				{
					text: '第 3s 出现的弹幕',
					color: '#ff00ff',
					time: 3
				}
			]
		}
	},
	onReady: function (res) {
		this.videoContext = uni.createVideoContext('myVideo')
	},
	methods: {
		open() {
			// console.log('open');
		},
		close() {
			this.show = false
			// console.log('close');
		},
		bindInputBlur: function (e) {
			this.inputValue = e.target.value
		},
		bindButtonTap: function () {
			var that = this
			uni.chooseVideo({
				sourceType: ['album', 'camera'],
				maxDuration: 60,
				camera: ['front', 'back'],
				success: function (res) {
					this.src = res.tempFilePath
				}
			})
		},
		bindSendDanmu: function () {
			this.videoContext.sendDanmu({
				text: this.inputValue,
				color: this.getRandomColor()
			})
		},
		videoErrorCallback: function (e) {
			console.log('视频错误信息:')
			console.log(e.target.errMsg)
		},
		getRandomColor: function () {
			const rgb = []
			for (let i = 0; i < 3; ++i) {
				let color = Math.floor(Math.random() * 256).toString(16)
				color = color.length == 1 ? '0' + color : color
				rgb.push(color)
			}
			return '#' + rgb.join('')
		},
		goBack(){
			uni.navigateBack({})
		},
	}
}
</script>

<style>
</style>
