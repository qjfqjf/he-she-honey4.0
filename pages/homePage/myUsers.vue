<template>
	<view class="container">
		<public-module></public-module>
		<z-nav-bar home title="我的用户" class="HomeNavBar" fontColor="black"> </z-nav-bar>
		<view class="">
			<uni-list :border="true">
				<uni-list-item v-for="(item, index) in userIndex" :key="index" :title="item.fullname"
					:note="item.type_cn + ',' + item.sex_cn + ',' + item.birthday_cn" :thumb="item.head" thumb-size="lg"
					:clickable="true" @click="selectUser(item)">
					<template v-slot:footer>
						<view class="d-flex a-center" style="width: 240rpx">
							<u-button type="primary" size="mini" class="mr-1"
								@click="handleEdit(item.user_id)">编辑</u-button>
							<u-button type="error" size="mini" @click="handleDel(item.user_id)">删除</u-button>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 手动添加日常程按钮 -->
		<view class="add" @click="addPeople"></view>

	</view>
</template>

<script>
	
	export default {
		data() {
			return {

				show: false,
				content: '确定要删除吗？',
				userInfo: JSON.parse(uni.getStorageSync('userInfo')),
				userList: [{
					img: 'https://img2.baidu.com/it/u=1834432083,2460596852&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					name: JSON.parse(uni.getStorageSync('userInfo')).name,
					relation: '本人',
					gender: '男',
					age: 36,
				}, ],
				type: '',
				userIndex: [],
				uid: 0
			}
		},
		//第一次加载
		onLoad(e) {
			this.type = e.type
			console.log(this.type)
		},
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.uid = this.userInfo
			this.getUserList()
		},
		methods: {
			selectUser(item) {
				if (this.type == 'select') {
					uni.$emit('backWithData', { 
						uid: item.user_id, 
						name: item.fullname ,
					});
					uni.navigateBack({ delta: 1 });
					// this.$store.commit("getUser", item);
				} else {

				}
			},
			getUserList() {
				this.$http.post('/user/index', {
					uid: this.uid,
				}).then(res => {
					// console.log(11,res.code)
					this.userIndex = res.data.data
				})
			},
			// 获取亲属关系列表
			getRelationList() {
				this.$http
					.post('/user/index')
					.then((res) => {
						console.log(res)
						this.userList = res.result.result.map((item) => {
							return {
								...item,
								img: 'https://img2.baidu.com/it/u=1834432083,2460596852&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
							}
						})
					})
			},
			handleEdit(e) {
				console.log('user_id', e)
				uni.navigateTo({
					url: '/pages/mine/editInfo?e=' + e,
				})
			},
			handleDel(e) {
				console.log(e)
				uni.showModal({
					content: '是否删除关系用户',
					success: (res) => {
						if (res.confirm) {
							// 用户点击了确认按钮
							this.$http.post('/user/delete', {
								id: e,
							}).then(res => {
								if (res.code === 20000) {
									uni.showToast({
										title: '删除成功',
									})
									this.getUserList();
								}
								// this.userIndex = res.data.data
							})
						} else if (res.cancel) {
							// 用户点击了取消按钮
							console.log('用户点击了取消按钮');
						}
					}
				});

			},
			addPeople() {
				uni.navigateTo({
					url: '/pages/mine/editInfo?type=add',
				})
				console.log('添加用户')
			},

		},
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