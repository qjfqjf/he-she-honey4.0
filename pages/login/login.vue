<template>
	<view class="wholebox">
		<!-- 背景图 -->
		<image class="bg-img" src="../../static/img/login/backgroundimg.png"> </image>
		<view class="top-nev">
			<view class="left-back" plain="true">
				<u-icon name="arrow-left" color="rgb(60, 60, 60)" size="18" @click="back"></u-icon>
			</view>
			<view class="right-change" plain="true">
				<p style="font-size: 30rpx; color: #1ab76c" @click="changeType(1000)" v-if="type == 1000">
					账号密码登录
				</p>
				<p style="font-size: 30rpx; color: #1ab76c" @click="changeType(2000)" v-if="type == 2000">
					验证码登录
				</p>
			</view>
		</view>
		<view class="middle-box">
			<view class="large-text">
				<h2>手机号登录</h2>
			</view>
			<view class="small-text">
				<h5>他她蜜(用户端)</h5>
			</view>
		</view>
		<view class="login-input">
			<u-form class="login-form" :model="params" ref="uForm">
				<u-form-item label="+86" v-if="type == 1000">
					<p style="color: #6a6a6a">|</p>
					<u-input v-if="type == 1000" v-model="form.phonenum" border="false" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item v-if="type == 2000"><u-input v-if="type == 2000" v-model="params.login" border="false"
						placeholder="请输入账号" /></u-form-item>
				<u-form-item>
					<u-input v-if="type == 1000" v-model="form.code" border="false" placeholder="请输入验证码"
						style="width: 300rpx" />
					<button v-if="type == 1000" style="background: none; font-size: 30rpx; color: #1fc7a3"
						@click="getCode">
						{{ codeText }}
					</button>
					<view v-if="type == 2000" class="pass-input">
						<u-input v-model="params.password" border="false" type="password" placeholder="请输入密码"
							password-icon="true" />
					</view>
				</u-form-item>
			</u-form>
			<u-button @click="onsubmit" type="success" size="large"
				style="margin-top: 100rpx; color: #ffffff; background-color: #1fc7a3" ripple="true">立即登录</u-button>
		</view>
		<u-divider style="margin-top: 250rpx" text="其他方式登录" text-size="10" textColor="#1fc7a3"></u-divider>
		<view class="third-methods">
			<view class="wechatimg-box">
				<image src="../../static/icon/wechat2.png" @click="onWechatLog"
					style="display: block; margin: 0 auto; width: 100rpx; height: 100rpx">
				</image>
			</view>
			<text style="text-align: center; margin-top: 100rpx; font-size: 30rpx">微信登陆</text>
		</view>
		<view class="bottom-text">
			<text style="color: #6a6a6a">登录即代表同意</text>
			<text style="color: #1fc7a3">《他她蜜用户协议》</text>
		</view>
	</view>
</template>

<script>
	import md5 from '@/plugins/md5'
	import {
		baseUrl
	} from '@/config/baseUrl.js'
	var clear
	export default {
		data() {
			return {
				params: {
					login: '',
					password: '',
				},
				value: '',
				form: { //手机号
					phonenum: '',
					//输入的验证码
					code: '',
					pass: '',
					type: ''
				},
				type: '1000',
				codeText: '获取验证码',
				readonly: '',
			}
		},
		methods: {
			back() {},

			//改变登录方式
			changeType(type) {
				if (type == 1000) {
					this.type = 2000
				} else {
					this.type = 1000
				}
				this.form = {}
				this.params = {}
			},

			//获取验证码
			getCode() {
				if (!this.form.phonenum) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					})
					return
				}
				if (!this.$base.phoneRegular.test(this.form.phonenum)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none',
					})
					return
				}

				//模拟验证码发送后的验证码按钮变化
				this.getCodeState()

				//发送验证码接口
				uni.request({
					url: baseUrl + '/login/getCode',
					method: "POST",
					data: {
						mobile: this.form.phonenum,
						type: 'reset'
					},
				}).then((res) => {
					console.log(res);
					if (Array.isArray(res)) {
					    this.form.pass = res[1].data.message
					    this.getCodeState()
					} else {
					    this.form.pass = res.data.message
					    this.getCodeState()
					}
					
				})
			},
			//验证码按钮文字状态
			getCodeState() {
				clear && clearInterval(clear)
				const _this = this
				this.readonly = true
				this.codeText = '60S'
				var s = 60
				clear = setInterval(() => {
					s--
					_this.codeText = s + 'S'
					if (s <= 0) {
						clearInterval(clear)
						_this.codeText = '获取验证码'
						_this.readonly = false
					}
				}, 1000)
			},

			//登录按钮
			onsubmit() {
				console.log('code', this.form.code);
				//登录方式为验证码登录时的非空判断和手机号格式判断(未实现)
				if (this.type == 1000) {
					if (!this.form.phonenum) {
						uni.showToast({
							title: '请输入手机号',
							icon: 'none',
						})
						return
					}
					if (!this.$base.phoneRegular.test(this.form.phonenum)) {
						uni.showToast({
							title: '手机号码格式不正确',
							icon: 'none',
						})
						return
					}
					if (!this.form.code) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none',
						})
						return
					}
					uni.request({
						url: baseUrl + '/login/login',
						method: "POST",
						data: {
							mobile: this.form.phonenum,
							code: this.form.code
						},
					}).then((res) => {
						console.log('res', res)
						if (Array.isArray(res)) {
							if (res[1].data.code == 20000) {
								uni.setStorageSync('access-token', res[1].data.data.token)
								const uid = uni.getStorageSync('access-token')
								const parts = uid.split('.');
								const payload = JSON.parse(atob(parts[1])); // 解码并解析负载
								// 提取"Audience"字段的值
								const audience = payload.aud;
								uni.setStorageSync('userInfo', audience)
								console.log('this.uid', uni.getStorageSync('userInfo'))
								if (!uni.getStorageSync('userInfo')) {
									this.$http.post("/user/create", {
										mobile: this.form.phonenum,
										code: this.form.pass,
										type: 0,
										utype: "0"
									}).then((res) => {
										console.log(1111111111, res)
										console.log('第一次登陆')
										uni.setStorageSync('userInfo', res.data.uid)
										console.log('this.uid', uni.getStorageSync('userInfo'))
										uni.showToast({
											title: '登录成功',
											duration: 2000,
											success: () => {
												setTimeout(() => {
													uni.switchTab({
														url: '/pages/homePage/homePage',
														success: (res) => {
															console.log(res)
														},
														fail: (err) => {
															console.log(err)
														},
													})
												}, 1000)
											},
										})
									})
								} else {
									console.log('第二次登录')
									uni.setStorageSync('access-token', res[1].data.data.token)
									const uid = uni.getStorageSync('access-token')
									const parts = uid.split('.');
									const payload = JSON.parse(atob(parts[1])); // 解码并解析负载
									// 提取"Audience"字段的值
									const audience = payload.aud;
									uni.setStorageSync('userInfo', audience)
									console.log('this.uid', uni.getStorageSync('userInfo'))
									uni.showToast({
										title: '登录成功',
										duration: 2000,
										success: () => {
											setTimeout(() => {
												uni.switchTab({
													url: '/pages/homePage/homePage',
													success: (res) => {
														console.log(res)
													},
													fail: (err) => {
														console.log(err)
													},
												})
											}, 1000)
										},
									})
								}
								
							}
							//登陆失败
							else {
								uni.showToast({
									title: '登陆失败',
									icon: 'none',
									duration: 2000,
								})
							}
						} else {
							if (res.data.code == 20000) {
								uni.setStorageSync('access-token', res.data.data.token)
								const uid = uni.getStorageSync('access-token')
								const parts = uid.split('.');
								const payload = JSON.parse(atob(parts[1])); // 解码并解析负载
								// 提取"Audience"字段的值
								const audience = payload.aud;
								uni.setStorageSync('userInfo', audience)
								console.log('this.uid', uni.getStorageSync('userInfo'))
								if (!uni.getStorageSync('userInfo')) {
									this.$http.post("/user/create", {
										mobile: this.form.phonenum,
										code: this.form.pass,
										type: 0,
										utype: "0"
									}).then((res) => {
										console.log(1111111111, res)
										uni.showToast({
											title: '登录成功',
											duration: 2000,
											success: () => {
												setTimeout(() => {
													uni.switchTab({
														url: '/pages/homePage/homePage',
														success: (res) => {
															console.log(res)
														},
														fail: (err) => {
															console.log(err)
														},
													})
												}, 1000)
											},
										})
									})
								} else {
									console.log('第二次登录')
									uni.showToast({
										title: '登录成功',
										duration: 2000,
										success: () => {
											setTimeout(() => {
												uni.switchTab({
													url: '/pages/homePage/homePage',
													success: (res) => {
														console.log(res)
													},
													fail: (err) => {
														console.log(err)
													},
												})
											}, 1000)
										},
									})
								}
							}
							//登陆失败
							else {
								uni.showToast({
									title: '登陆失败',
									icon: 'none',
									duration: 2000,
								})
							}
						}
						//登录成功
						
					})
					.catch((error) => {
						console.log(error)
					})
				}
				//登录方式为账号密码登录
				else {
					if (!this.params.login) {
						uni.showToast({
							title: '请输入账号',
							icon: 'none',
						})
						return
					}
					if (!this.params.password) {
						uni.showToast({
							title: '请输入密码',
							icon: 'none',
						})
						return
					}
					this.$http.post('/login/accountLogin', {
							mobile: this.params.login,
							pwd: this.params.password
						})
						.then((res) => {
							console.log(res)
							//登录成功
							if (res.code == 20000) {
								uni.setStorageSync('userInfo', res.data.uid)
								uni.setStorageSync('User', JSON.stringify(res.data))
								uni.setStorageSync('access-token', res.data.token)
								uni.showToast({
									title: '登录成功',
									duration: 2000,
									success: () => {
										setTimeout(() => {
											uni.switchTab({
												url: '/pages/homePage/homePage',
												success: (res) => {
													console.log(res)
												},
												fail: (err) => {
													console.log(err)
												},
											})
										}, 1000)
									},
								})
							}
							//登陆失败
							else {
								uni.showToast({
									title: '登陆失败',
									icon: 'none',
									duration: 2000,
								})
							}
						})
						.catch((error) => {
							console.log(error)
						})
				}
			},

			//微信登录(未实现)
			onWechatLog() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.getUserInfo({
							success: (info) => {
								this.userInfo = info.userInfo
								if (res.authResult.openid && res.authResult.unionid) {
									this.$http
										.post('api/open/v1/login', {
											wxAppOpenId: res.authResult.openid,
											unionid: res.authResult.unionid,
											nickname: this.userInfo.nickName,
											headImg: this.userInfo.avatarUrl,
										})
										.then((data) => {
											this.setUserInfo({
												openId: res.authResult.openid,
												unionid: res.authResult.unionid,
												...data,
											})
											if (data.thirdLoginSuccess) {
												socket.init()
												uni.showToast({
													title: '登录成功',
													duration: 2000,
												})
												setTimeout(() => {
													uni.switchTab({
														url: '/pages/home/home',
													})
												}, 2000)
											} else {
												uni.showModal({
													title: '提示',
													content: '您还未绑定手机号，请先绑定~',
													confirmText: '去绑定',
													cancelText: '再逛会',
													success: (res) => {
														if (res.confirm) {
															uni.redirectTo({
																url: '/pages/user/bindPhone',
															})
														}
													},
												})
											}
										})
								} else {
									uni.showToast({
										title: '点击无效，请再次点击',
										icon: 'none',
									})
								}
							},
							fail: () => {
								console.log('未授权')
							},
						})
					},
					fail(err) {
						console.log(err)
					},
				})
			},
		},
	}
</script>

<style lang="scss">
	.wholebox {
		width: 100%;
		height: 100%;
		padding: 60rpx 35rpx;

		.bg-img {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.top-nev {
			height: 150rpx;
			padding-top: 40rpx;
			flex-direction: row;

			.left-back {
				float: left;
			}

			.right-change {
				float: right;
			}
		}

		.middle-box {
			height: 400rpx;
			padding-top: 75rpx;

			.large-text {}

			.small-text {
				margin-top: 30rpx;
			}
		}

		.third-methods {
			text-align: center;
		}

		.bottom-text {
			margin-top: 100rpx;
			text-align: center;
			font-size: 20rpx;
		}
	}
</style>