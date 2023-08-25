<template>
	<view>
		<view class="header d-flex j-sb">
			<view class="left" v-if="!isNameEmpty">
				当前会员：<span>{{name}}</span>
			</view>
			<view class="left" v-else-if="!isUsername">
				当前会员：<span>{{username}}</span>
			</view>
			<view class="left" v-else>
				当前会员：<span>{{this.DefaultName}}</span>
			</view>
			<view class="member pr-2" @click="handleMyUser">
				切换会员
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				DefaultName:''
			};
		},
		props: ['name','username'],
		computed: {
		  isNameEmpty() {
			return !this.name || this.name.trim() === '';
		  },
		  isUsername() {
		  	return !this.username || this.username.trim() === '';
		  },
		},
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			handleMyUser() {
				this.$emit('myUser');
			},
			select(){
				
			}
		}

	}
</script>

<style lang="scss">
	.header {
		position: relative;

		.left {
			span {
				color: #424242;
			}
		}

		.member {
			color: #20c49f;

			&::after {
				content: '';
				position: absolute;
				// right: 12rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 20rpx;
				height: 20rpx;
				background: url('@/static/icon/bloodPressure/arrow-right.png') no-repeat center/cover;

			}
		}
	}
</style>