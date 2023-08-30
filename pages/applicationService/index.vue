<template>
	<view class="content">
			<z-nav-bar title="健康咨询"></z-nav-bar>
					<view class="d-flex">
							<view class="m-1 f-grow-1 d-flex j-center a-center rounded-20 py-2" style="background-color: lightpink">
								<view class="flex-column d-flex" @click = "service()">
									<u--image class="appManeger_block_icon" style="margin: auto;" src="/static/icon/homePage/Glu.png"
														:customStyle="{paddingLeft:15+'rpx'}" height="100upx" width="100upx">
									</u--image>
									<view class="font-md" >工单申请</view>
								</view>
							</view>
							<view class="m-1 f-grow-1 d-flex j-center a-center rounded-20 py-2" style="background-color: hotpink">
								<view class="flex-column d-flex" @click = "work()">
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
								v-for="i in baseList"
								:key="i"
								size="large"
								:title="i"
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
	components: {UGrid, PublicModule, ZNavBar},
      data() {
        return {
          baseList: ['医养机构','医疗保健','康复护理','生活照料','临终关怀','文化娱乐','老年用品服务','日间托管','临时托养','安全援助','定期寻访','转介服务'],
          title:""
        };
      },
      //方法
      methods: {
		service(){
			uni.navigateTo({
			    url:'/pages/applicationService/workAndService/service'
			  })
		},
		work(){
			uni.navigateTo({
			    url:'/pages/applicationService/workAndService/work'
			  })
		}
      },
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
