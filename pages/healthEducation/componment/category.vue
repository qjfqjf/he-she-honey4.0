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
			
			@click="changePage"
			
        >
        </u-tabs>
		<newpage v-if="index1" />
		<knowledge v-if="index2"/>

    </view>
</template>

<script>
import {wisperImage} from "../../../static/js/homePage/staticData";
import newpage from "pages/healthEducation/componment/newpage.vue";
import knowledge from "pages/healthEducation/componment/knowledge.vue";
export default {
    name: "advisory",
	components:{
		newpage,
		knowledge
	},
    data() {
        return {
            wisperImage,
			index1: true,
			index2: false
        };
    },
    props:{
        tabList: Array,
    },
	methods:{
		changePage(index) {
			this.index1 = !this.index1;
			this.index2 = !this.index2;
		},
	}
}
</script>

<style scoped>
.tab_top{
    width: 100%;
	color: aquamarine;
}
</style>
