<template>
	<view class="u-page">
		<z-nav-bar title="我的"></z-nav-bar>
		<u-gap
			height="10"
		></u-gap>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form
					labelPosition="left"
					:model="model1"
					ref="form1"
					class="form"
				>
					<u-form-item
						label="手机号码"
						prop="userInfo.tel"
						borderBottom
						ref="item1"
						labelWidth="80px"
						labelAlign="right"
					>
						<u--input
							v-model="model1.userInfo.tel"
							border="none"
							placeholder="请输入您的电话号码"
						></u--input>
					</u-form-item>
					<u-form-item
						label="手机号码"
						prop="userInfo.tel"
						borderBottom
						ref="item1"
						labelWidth="80px"
						labelAlign="right"
					>
						<u--input
							v-model="model1.userInfo.pwd"
							border="none"
							placeholder="请输入您的密码"
						></u--input>
					</u-form-item>
					<u-form-item
						label="手机号码"
						prop="userInfo.tel"
						borderBottom
						ref="item1"
						labelWidth="80px"
						labelAlign="right"
					>
						<u--input
							v-model="model1.userInfo.pwd2"
							border="none"
							placeholder="请再次输入您的新密码"
						></u--input>
					</u-form-item>
					<u-form-item
						label="验证码"
						prop="code"
						labelWidth="80"
						borderBottom
					>
						<u--input
							v-model="model1.code"
							border="none"
							placeholder="请填写验证码"
						></u--input>
						<u-button
							slot="right"
							@tap="getCode"
							:text="tips"
							type="success"
							size="normal"
							:plain="true"
							shape="circle"
							:disabled="disabled1"
						></u-button>
					</u-form-item>
				</u--form>
				<view class="d-flex j-center">
					<u-button
						type="primary"
						text="提交"
						customStyle="margin-top: 250px"
						shape="circle"
						@click="submit"
						color="rgb(10, 185, 156)"
						style="width: 660rpx; height: 96rpx;"
					></u-button>
				</view>
				<u-code
					ref="uCode"
					@change="codeChange"
					seconds="20"
					@start="disabled1 = true"
					@end="disabled1 = false"
				></u-code>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				disabled1: false,
				tips: '',
				value: '',
				model1: {
					userInfo: {
						tel: '',
						pwd: '',
						pwd2: ''
					},
					radiovalue1: '苹果',
					checkboxValue1: [],
					intro: '',
					code: ''
				},
				rules: {
					code: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写4位验证码',
						trigger: ['blur']
					},

				},
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			afterRead(event) {
				this.fileList1.push({
					url: event.file,
					status: 'uploading',
					message: '上传中'
				})
			},
			groupChange(n) {
				// console.log('groupChange', n);
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			navigateBack() {
				uni.navigateBack()
			},
			change(e) {
				// console.log(e);
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				if (day.month == month && day.day == date + 3) {
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 6000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
		submit() {
			// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
			this.$refs.form1.validate().then(res => {
				uni.$u.toast('校验通过')
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
		},
	},
}
</script>

<style lang="scss">
	.form {
		background-color: #fff;
		padding-left: 50rpx;
		padding-right: 50rpx;
	}
</style>