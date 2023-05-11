<template>
	<view class="content">
			<z-nav-bar title="健康咨询"></z-nav-bar>
					<view class="d-flex">
							<view class="m-1 f-grow-1 d-flex j-center a-center rounded-20 py-2" style="background-color: lightpink">
								<view class="flex-column d-flex">
									<u--image class="appManeger_block_icon" style="margin: auto;" src="/static/icon/homePage/Glu.png"
														:customStyle="{paddingLeft:15+'rpx'}" height="100upx" width="100upx">
									</u--image>
									<view class="font-md" >服务申请</view>
								</view>
							</view>
							<view class="m-1 f-grow-1 d-flex j-center a-center rounded-20 py-2" style="background-color: hotpink">
								<view class="flex-column d-flex">
									<u--image style="margin: auto" class="appManeger_block_icon" src="/static/icon/homePage/Glu.png"
														:customStyle="{paddingLeft:15+'rpx'}" height="100upx" width="100upx">
									</u--image>
									<view class="font-md" >工单记录</view>
								</view>
							</view>

					</view>

			<view class="title pl-2">
				<span style="">服务类别与价格</span>
			</view>
					<view class="d-flex flex-column">
						<u-cell
								v-for="i in 5"
								:key="i"
								size="large"
								title="单元格"
								isLink
						></u-cell>
					</view>
			<public-module></public-module>

	</view>
</template>

<script>
import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
import PublicModule from "../../components/public-module/public-module.vue";
import UGrid from "../../uni_modules/uview-ui/components/u-grid/u-grid.vue";

export default {
	components: {UGrid, PublicModule, ZNavBar}

}

</script>

<style lang="scss">
.content {
	.title {
		span {
			border-left: 8rpx #28be9e solid;
			padding-left: 20rpx;
		}
	}

	.devices-warp {
		.item {
			padding: 20rpx;
			margin: 10rpx;
			width: 160rpx !important;
			border-radius: 16rpx;
			background-color: #fff !important;
			box-shadow: 0px 3px 3px hsla(0, 0, 0, 0.1);
			&:nth-child(4n){
				margin-right: 0;
			}
		}
	}
}
</style>
