<template>
	<view class="container">
		<public-module></public-module>
		<z-nav-bar home title="我的用户" class="HomeNavBar" fontColor="black">
		</z-nav-bar>
		<view class="">

			<uni-list :border="true">
				<uni-list-item v-for="(item,index) in userList" :key="index" :title="item.name"
					:note="item.relation+' '+ item.gender+' '+ item.age"
					thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg">
					<template v-slot:footer>
						<view class="d-flex a-center" style="width: 240rpx;">
							<u-button type="primary" size="mini" class="mr-1" @click="handleEdit">编辑</u-button>
							<u-button type="error" size="mini" @click="handleDel">删除</u-button>
						</view>
					</template>
				</uni-list-item>
			</uni-list>

		</view>
		<!-- 手动添加日常程按钮 -->
		<view class="add" @click="addPeople"></view>
		<u-modal v-model="show" :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '确定要删除吗？',
				userList: [{
					img: 'https://img2.baidu.com/it/u=1834432083,2460596852&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					name: JSON.parse(uni.getStorageSync('userInfo')).name,
					relation: '本人',
					gender: '男',
					age: 36
				}]
			}
		},
		methods: {
			handleEdit() {
				uni.navigateTo({
					url: '/pages/mine/editInfo'
				})
			},
			handleDel() {
				console.log(1111)
				this.show = true;

			},
			addPeople() {
				uni.navigateTo({
					url: '/pages/mine/editInfo'
				})
				console.log('添加用户')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;

		.add {
			height: 100rpx;
			width: 100rpx;
			background: #005a8a;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: calc(10%);
			border-radius: 50%;
			z-index: 99;
			box-shadow: 0 0 20rpx #005a8a60;
		}

		.add::before,
		.add::after {
			content: '';
			width: 6rpx;
			height: 50rpx;
			left: calc(50% - 3rpx);
			top: calc(50% - 50rpx / 2);
			border-radius: 6rpx;
			background: #eee;
			position: absolute;
		}

		.add::before {
			transform: rotate(90deg);
		}
	}
</style>