<template>
	<view class="fr-content">
		<z-nav-bar title="体温历史">
			<view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
		</z-nav-bar>
		<public-module></public-module>
		<view class="fr-records">
			<view class="header p-2">
				2023-05-04
			</view>
			<view class="content d-flex pl-2 py-3" v-for="(item,index) in list" :key="index">
				<view class="time">
					{{item.time}}
				</view>
				<view class="type">
					{{item.type}}
				</view>
				<view class="value">
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						time: '2023-05-04 15:51:45',
						type: '体温',
						value: '36.5°C'
					},
					{
						time: '2023-05-03 15:31:45',
						type: '体温',
						value: '34.5°C'
					},
					{
						time: '2023-05-04 15:21:45',
						type: '体温',
						value: '37.5°C'
					},
					{
						time: '2023-05-04 13:51:45',
						type: '体温',
						value: '36.5°C'
					}
				]
			};
		},
		computed: {

		},
		mounted() {
			this.getList()
		},
		methods: {
			handleDevelop() {
				this.$refs.uToast.show({
					message: '开发中...'
				})
			},
			getList() {
				let date = ''
				this.list = this.list.map(item => {
					date = item.time.split(' ')[0]
					console.log(date)
					return {
						...item,
						date
					}
				})
				console.log(this.list)
			}
		}
	}
</script>

<style lang="scss">
	.fr-content {
		.fr-records {

			.header {}

			.content {
				border-bottom: solid 1px #f6f6f6;
				background-color: #fff;
				color: #999;

				.time {
					margin-right: 100rpx;

				}

				.type {
					margin-right: 100rpx;
				}

				.value {
					color: $font-color;
				}
			}

		}
	}
</style>
