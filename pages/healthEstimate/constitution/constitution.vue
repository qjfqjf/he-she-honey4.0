<template>
  <view>
    <z-nav-bar title="中医体质"></z-nav-bar>
    <public-module></public-module>
    <view class="title">
      中医体质评估
    </view>
    <view class="content">
      <!-- 报告区域 -->
      
     <view class="tip">
       请根据近一年的体验和感觉，回答一下所有问题
     </view>
      <view class="collapse">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item v-for="(item, index) in chineseMedicineConstitutionRecord" :key="index" class="collapse-item" :title="item.title" name="Docs guide">
            <text class="u-collapse-content">{{item.content}}</text>
          </u-collapse-item>
        </u-collapse>
      </view>
      <u-button class="submit-btn" type="primary" text="提交"></u-button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        chineseMedicineConstitutionRecord: [
          {
            title: '阳虚质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '阴虚质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '气虚质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '痰湿质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '湿热质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '气淤质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '气郁质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '特禀质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },{
            title: '平和质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '是'
          },
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
  .title{
    background-color: #f7f7f7;
    font-size: 28rpx;
    text-align: center;
    padding: 20rpx;
    box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1);
  }
  .content {
    font-size: 30rpx;
    line-height: 54rpx;
    padding: 10rpx;
   
    .tip{
      // color: #ffA053;
      color: #ef9f00;
      font-weight: 600;
    }
    .collapse {
      background-color: #fff;

      .collapse-content {
        // background-color: #fff;
          margin-top: 10rpx;
        .u-collapse-content {
        }
      }
    }
    .submit-btn{
      margin-top: 14rpx;
    }
  }
</style>