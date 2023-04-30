<template>
  <view class="content">
    <z-nav-bar title="心理测评">
      <view slot="right" class="p-2" @click="addSleepRecord">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthEstimate/search.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>
	
	<image class="img" src="/static/icon/healthEstimate/bigpsy.png" shape="circle"></image>
	<u-collapse
	    @change="change"
	    @close="close"
	    @open="open"
	  >
	    <u-collapse-item
	      title="热度优先"
	      name="Docs guide"
	    >
	    </u-collapse-item>
	  </u-collapse>

  </view>
</template>

<script>
	export default {
			methods: {
	            open(e) {
	              // console.log('open', e)
	            },
	            close(e) {
	              // console.log('close', e)
	            },
	            change(e) {
	              // console.log('change', e)
	            }
	        }
		}
</script>

<style lang="scss">
  .content {
        .content {
          font-weight: 600;
          color: #313131;
        }

        image {
          width: 220rpx;
          height: 220rpx;
          margin-top: 22rpx;
        }
    
		.img{
			width: 700rpx;
			height: 400rpx;
			margin-left: 28rpx;
		}
  }
</style>