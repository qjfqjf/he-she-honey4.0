<template>
    <view>
        <public-module></public-module>
        <z-nav-bar title="预警">

            <u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>


            <u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>

        </z-nav-bar>
         <custom-tab-bar direction="horizontal" :show-icon="false" :selected="selected" @onTabItemTap="onTabItemTap" />
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
