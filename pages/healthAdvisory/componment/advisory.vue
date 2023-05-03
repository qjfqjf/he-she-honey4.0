<template>
    <view>
        <u-swiper class=" m-1 swiper" :list="wisperImage" indicator indicatorMode="line" circular :autoplay="false"
                  radius="5" bgColor="#ffffff">
        </u-swiper>
        <u-tabs
            :list="tabList"
            lineWidth="140"
            lineColor="#18b566"
            class="tab_top"
            :activeStyle="{
                  color: '#18b566',
                  transform: 'scale(1.05)'
              }"
            :inactiveStyle="{
                  color: '#606266',
                  transform: 'scale(1)'
              }"
            itemStyle="padding-left: 15px; padding-right: 15px; height: 34px; width: 50%"
        >
        </u-tabs>


        <view class="d-flex">

                <u-picker @cancel="show = false" close-on-click-overlay :show="show" :columns="columns"></u-picker>
                <u-button class="w-50" @click="show = true">
                    <span style="margin: auto;color: #18b566" class="">位置</span>
                    <u-icon name="arrow-down"></u-icon>
                </u-button>

                <u-picker @cancel="show = false" close-on-click-overlay :show="show" :columns="columns"></u-picker>
                <u-button class="d-flex" @click="show = true">
                    <span style="margin: auto;color: #18b566" class="">机构</span>
                    <u-icon name="arrow-down"></u-icon>
                </u-button>

        </view>
    </view>
</template>

<script>
import {wisperImage} from "../../../static/js/homePage/staticData";
export default {
    name: "advisory",

    data() {
        return {
            wisperImage,
            show: false,
            columns: [
                ['医疗', '美容', '医学']
            ],
        };
    },
    props:{
        tabList: Array
    }
}
</script>

<style scoped>
.tab_top{
    width: 100%;
	color: aquamarine;
}
</style>
