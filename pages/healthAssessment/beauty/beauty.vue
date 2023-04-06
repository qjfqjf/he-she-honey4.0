<template>
  <view>
    美容
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
