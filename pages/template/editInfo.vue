<template>
	<view class="page">
		<z-nav-bar title="个人信息" bgColor="#ffffff"></z-nav-bar>
		<u-gap
			height="10"
			bgColor="#fff"
		></u-gap>
		<u-cell-group>
			<u-cell
				title="头像"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="姓名"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="姓别"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="出生日期"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="身份证号"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="亲属关系"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="手机号"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="身高(cm)"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-cell
				title="体重(kg)"
				:value="name"
				:isLink="true"
			></u-cell>
			<u-gap
				height="40"
			></u-gap>
			<view class="d-flex j-center">
				<u-button
					text="保存"
					size="normal"
					type="success"
					shape="circle"
					color="rgb(10, 185, 156)"
					style="width: 660rpx;"
				></u-button>
			</view>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				showName: false,
				showSex: false,
				popupOptions: {
					placeholder: ''
				},
				avatar: '',
				gender: '',
				name: '',
				phone: "",
				birth: "",
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		//第一次加载
		onLoad(e) {
			this.avatar = this.userInfo.avatar || "";
			this.nickname = this.userInfo.nickname || "";
			this.phone = this.userInfo.phone || "";
		},
		//页面显示
		onShow() {},
		//方法
		methods: {
			onSubmit() {
				if (this.avatar == '') {
					uni.showToast({
						title: '请上传头像',
						icon: 'none'
					});
					return;
				}
				if (this.nickname == '') {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					});
					return;
				}
				let httpData = {
					nickname: this.nickname,
					avatar: this.avatar
				};
				if(this.phone){
					if (!this.$base.phoneRegular.test(this.phone)) {
						uni.showToast({
							title: '请输入正确的手机号',
							icon: 'none'
						});
						return;
					}
					if(this.phone != this.userInfo.phone){
						httpData.phone = this.phone;
					}
				}
				this.$http
					.post('api/common/v1/edit_user_info', httpData)
					.then(res => {
						this.setUserInfo({
							nickname: this.nickname,
							avatar: this.avatar,
							phone: this.phone || this.userInfo.phone
						});
						uni.showToast({
							title: '修改成功！'
						});
					});
			}
		},
		//页面隐藏
		onHide() {},
		//页面卸载
		onUnload() {},
		//页面下来刷新
		onPullDownRefresh() {},
		//页面上拉触底
		onReachBottom() {},
		//用户点击分享
		onShareAppMessage(e) {
			return this.wxShare();
		}
	};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.page{
	height: 100%;
	background-color: #ffffff;
}

.form_but {
	background-color: rgb(32, 198, 162);
	color: #ffffff;
	border-radius: 50upx;
}
</style>
