<template>
  //健康服务模块代码
    <view>
        <z-nav-bar title="健康服务">
            <u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>
            <!--            <u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>-->
        </z-nav-bar>
        <u-swiper class=" m-1 swiper" :list="wisperImage" indicator indicatorMode="line" circular :autoplay="false"
                  radius="5" bgColor="#ffffff">
        </u-swiper>
        <view class="m-1 rounded-20 bg-white pb-3">
            <u-gap height="10"></u-gap>
            <view class="m-1 rounded-20 bg-white">
                <u-grid :border="false" col="3">
                    <u-grid-item v-for="(listItem,listIndex) in appManage" :key="listIndex">
                        <navigator :url="listItem.path">
                            <u--image class="appManeger_block_icon" :src="listItem.icon" :customStyle="{paddingLeft:15+'rpx'}" height="100upx" width="100upx">
                            </u--image>
                            <u--text :text="listItem.name" align="center"></u--text>
                        </navigator>
                    </u-grid-item>
                </u-grid>
                <u-toast ref="uToast" />
            </view>
        </view>
    </view>

</template>

<script>
import {
    wisperImage,
    appManage,
} from "../../static/js/homePage/staticData";
import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
export default {
    computed: {

    },
    data() {
        return {
            wisperImage,
            appManage
        };
    },
    components: {
        // SwiperList
    },
    //第一次加载
    onLoad(e) {
        // 隐藏原生的tabbar
        uni.hideTabBar();
    },
    //页面显示
    onShow() {
        // 隐藏原生的tabbar
        uni.hideTabBar();
    },
    //方法
    methods: {
        switchChange() {

        },
        onPageJump(url) {
            uni.navigateTo({
                url: url
            });
            console.log(111)
        },
        onTokenJump(url) {
            this.judgeLogin(() => {
                uni.navigateTo({
                    url: url
                });
            });
        },
        onPrivacyAgreement() {
            // #ifdef H5
            window.open("https://ask.dcloud.net.cn/article/36937");
            // #endif
            // #ifndef H5
            this.$store.commit("setWebViewUrl", "https://ask.dcloud.net.cn/article/36937");
            uni.navigateTo({
                url: '/pages/template/webView'
            });
            // #endif
        },
        changeHeadImg(index) {
            console.log('当前选中' + index)
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

<style>
.swiper{
    height: 300upx;
}
</style>
