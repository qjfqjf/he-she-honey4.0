<template>
  <view>
    <z-nav-bar title="营养秤">
      <view slot="right" class="p-2" @click="addRecords">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthAssessment/addRecords.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    //方法
    methods: {
    
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });
    
      ;}
    
    },
  }
</script>

<style lang="scss">

</style>
