<template>
  <view>
    <z-nav-bar title="情绪认知"></z-nav-bar>
    <public-module></public-module>

    <!-- 内容 -->
    <view class="content">
      <view class="collapse">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item class="collapse-item" title="情绪筛查表1" >
              <input-and-choice-form :cell="lists"/>
          </u-collapse-item>
          <u-collapse-item class="collapse-item" title="情绪筛查表2" >
              <input-and-choice-form :cell="lists"/>
          </u-collapse-item>
          <u-collapse-item class="collapse-item" title="认知功能自评表" >
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
        <view class="submit">
        <u-button @click="show = true" type="primary" class="submit-btn" text="提交"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
  import InputAndChoiceForm from "../../healthAssessment/emotionalCognition/components/inputAndChoiceForm.vue";

  export default {
      components: {InputAndChoiceForm},
    data() {
      return {
          show: false,
          lists: [{
              question: "1.感到不安，担心及烦躁：",
              options: ["完全没有","有几天","一半以上天数","几乎每天"]
              },
              {
                  question: "2.不能停止或无法控制担心：",
                  options: ["完全没有","有几天","一半以上天数","几乎每天"]
              },{
                  question: "3.对各种各样的事情担忧过多：",
                  options: ["完全没有","有几天","一半以上天数","几乎每天"]
              },{
                  question: "4.很紧张，很难放松下来：",
                  options: ["完全没有","有几天","一半以上天数","几乎每天"]
              },{
                  question: "5.非常较早，以至于无法静坐",
                  options: ["完全没有","有几天","一半以上天数","几乎每天"]
              }]
      };
    },
    methods: {
      open(e) {
        // console.log('open', e)
      },
      close(e) {
        this.show = false;
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
