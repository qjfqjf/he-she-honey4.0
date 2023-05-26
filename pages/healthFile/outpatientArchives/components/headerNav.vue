<template>
  <view class="header-nav">
      <z-nav-bar :title="title">
          <view slot="right" class="p-2" @click="addMedicalRecord">
              <text style="font-size: 20rpx;" v-if="addtext">{{ addtext }}</text>
          </view>
      </z-nav-bar>
  </view>
</template>

<script>
import {methods} from "../../../../uni_modules/uview-ui/libs/mixin/mixin";

export default {
    name: "headerNav",
    props:["title","tourl","addtext"],
    methods:{
        addMedicalRecord(){
            uni.navigateTo({
                url:this.tourl
            });
        }
    }
}

</script>

<style scoped>

</style>