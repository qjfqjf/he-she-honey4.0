<template>
    <z-nav-bar title="系统通知">

        <u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>


        <u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>

    </z-nav-bar>
	
</template>
<script>
import ZNavBar from "../../uni_modules/z-nav-bar/components/z-nav-bar/z-nav-bar.vue";
// export {goBack} from "./common"
export default {
    methods: {
        goBack(){
            uni.navigateBack({})
        }
    }
}
</script>
