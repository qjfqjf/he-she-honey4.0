<template>
  <view>
    <z-nav-bar title="睡眠管理"></z-nav-bar>
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
