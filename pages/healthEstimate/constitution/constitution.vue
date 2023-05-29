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
          <u-collapse-item v-for="(item, index) in chineseMedicineConstitutionRecord" :key="index" class="collapse-item" :title="item.title">
              <input-and-choice-form :cell="lists"/>
          </u-collapse-item>
        </u-collapse>
      </view>
        <view>
            <u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
                <view class="m-5">
                    <text>请检查填写格式是否有误</text>
                </view>
                <u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
            </u-popup>
        </view>
        <u-button class="submit-btn" @click="show = true" type="primary" text="提交"></u-button>
    </view>
  </view>
</template>

<script>
  import InputAndChoiceForm from "../../healthAssessment/emotionalCognition/components/inputAndChoiceForm.vue";
  import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";

  export default {
      components: {UButton, InputAndChoiceForm},
    data() {
      return {
          show: false,
          lists: [{
              question: "1.您手脚发凉吗?{不包含因闹团识度低或穿的少导致的手脚发冷}",
              options: ["没有(根本不/从亲没有)","很少(有一点/偶尔)","有时(有些!少数时间}","经常(相当/多数时间)","总是{非常/每天)"]
          },
              {
                  question: "2.不能停止或无法控制担心：",
                  options: ["没有(根本不/从亲没有)","很少(有一点/偶尔)","有时(有些!少数时间}","经常(相当/多数时间)","总是{非常/每天)"]
              },{
                  question: "3.对各种各样的事情担忧过多：",
                  options: ["没有(根本不/从亲没有)","很少(有一点/偶尔)","有时(有些!少数时间}","经常(相当/多数时间)","总是{非常/每天)"]
              },{
                  question: "4.很紧张，很难放松下来：",
                  options: ["没有(根本不/从亲没有)","很少(有一点/偶尔)","有时(有些!少数时间}","经常(相当/多数时间)","总是{非常/每天)"]
              },{
                  question: "5.非常较早，以至于无法静坐",
                  options: ["没有(根本不/从亲没有)","很少(有一点/偶尔)","有时(有些!少数时间}","经常(相当/多数时间)","总是{非常/每天)"]
              }],
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
          this.show = false;
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
