<template>
    <view>
        <public-module></public-module>
        <z-nav-bar title="预警">

            <u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>

            <view class="mr-2" style="font-size: 30rpx; color: #5becbc;"  slot="right" >预警规则</view>

        </z-nav-bar>
          <u-tabs
              :list="tabList"
              lineWidth="140"
              lineColor="#5becbc"
			  			class="tab_top"
              :activeStyle="{
                  color: '#303133',
                  fontWeight: 'bold',
                  transform: 'scale(1.05)'
              }"
              :inactiveStyle="{
                  color: '#606266',
                  transform: 'scale(1)'
              }"
              itemStyle="padding-left: 15px; padding-right: 15px; height: 34px; width: 50%"
          >
          </u-tabs>
		  <view class="d-flex a-center j-center buttonGrounp my-1">
		      <u-button  :hairline="hairline"  color="#71d5a1" text="签约医生" class="leftButton" :plain="true"
		                ></u-button>
		      <u-button  :hairline="hairline"  color="#71d5a1" text="关注医生" class="rightButton" :plain="true"
		                ></u-button>
		  </view>
		  <view class="notification d-flex flex-column shadow border rounded m-1 p-2 bg-white" v-for="index in 5">
		      <view class="notification_title my-1">
		          <h3>血压</h3>
		      </view>
		          <view class="notification_text-content">低压 89 高压 112 心率 83</view>
		          <view class="notification_text-content">2022-03-07 18:00:26</view>
		  </view>
    </view>
</template>
<script setup>
import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
import PublicModule from "../../components/public-module/public-module.vue";
// export {goBack} from "./common"
export default {
    methods: {
        goBack(){
            uni.navigateBack({})
        }
    },
    data() {
        return{
            tabList: [{name:'我的'}, {name:'家庭组'}]
        }
    }
}
</script>
<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

.searchBar {

}

.buttonGrounp {

  .leftButton {
    border: 0;
    width: 40%;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }

  .rightButton {
    border: 0;
    width: 40%;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
}

.tab_top{
	width: 100%;
}
</style>
