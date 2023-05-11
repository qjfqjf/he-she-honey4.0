<template>
  <view>
    <z-nav-bar title="情绪认知"></z-nav-bar>
    <public-module></public-module>

    <!-- 内容 -->
    <view class="content">
      <view class="collapse">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item class="collapse-item" title="情绪筛查表1" name="Docs guide">
            <text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
          </u-collapse-item>
          <u-collapse-item class="collapse-item" title="情绪筛查表2" name="Variety components">
            <text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
          </u-collapse-item>
          <u-collapse-item class="collapse-item" title="认知功能自评表" name="Numerous tools">
            <text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
          </u-collapse-item>
        </u-collapse>
      </view>
      <view class="submit">
        <u-button type="primary" class="submit-btn" text="提交"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
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
    font-size: 2rpx;
    .collapse{
      background-color: #fff;
      .collapse-content{
        background-color: #fff;
        .u-collapse-content{
        }
      }
    }
    
    .submit{
      position: relative;
      display: flex;
      justify-content: center;
      .submit-btn{
        width: 80%;
        border-radius: 50rpx;
        margin-top: 20rpx;
        position: absolute;
        
      }
    }
    
  }
</style>