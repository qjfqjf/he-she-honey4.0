<template>
  <view>
    <z-nav-bar title="评估记录"></z-nav-bar>
    <public-module></public-module>
    <view class="content">
      <view class="collapse">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item v-for="(item, index) in emotionalCognitionRecord" :key="index" class="collapse-item" :title="item.title" name="Docs guide">
            <text class="u-collapse-content">{{item.content}}</text>
          </u-collapse-item>
        </u-collapse>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        emotionalCognitionRecord: [
          {
            title: '情绪筛查表1',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川'
          }
        ]
      };
    },
    methods:{
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

    .collapse {
      background-color: #fff;

      .collapse-content {
        background-color: #fff;

        .u-collapse-content {}
      }
    }
  }
</style>