<template>
  <view>
    <z-nav-bar title="评估记录"></z-nav-bar>
    <public-module></public-module>
    
    <view class="content">
      <!-- 报告区域 -->
      <view class="record-result">
        <text class="rate-title">测试评分</text>
        <text class="rate">89</text>
        <view class="result">
          <view class="result-item" v-for="(item, index) in chineseMedicineConstitutionRecord" :key="index">
            <text>{{item.title}}: </text>
            <text class="yes-or-no"> {{item.result}}</text>
          </view>
        </view>
      </view>
      <view class="collapse">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item  v-for="(item, index) in chineseMedicineConstitutionRecord" :key="index" class="collapse-item" :title="item.title" name="Docs guide">
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
        chineseMedicineConstitutionRecord: [
          {
            title: '阳虚质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '否'
          },{
            title: '阴虚质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '倾向是'
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
            title: '血瘀质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '否'
          },{
            title: '气郁质',
            content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
            result: '否'
          },
		  {
		    title: '特禀质',
		    content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
		    result: '否'
		  },
		  {
		    title: '平和质',
		    content:'涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
		    result: '否'
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
  .content {
    font-size: 2rpx;

    .record-result{
      padding: 30rpx 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      .rate-title{
        color: #19a99b;
        font-size: 40rpx;
        font-weight: 600;
      }
      .rate{
        font-size: 80rpx;
        margin: 20rpx 0;
      }
      .result{
        font-size: 26rpx;
        .result-item{

          .yes-or-no{
            margin-left: 50rpx;
          }
        }
      }
    }
    .collapse {
      background-color: #fff;

      .collapse-content {
        background-color: #fff;

        .u-collapse-content {}
      }
    }
  }
</style>