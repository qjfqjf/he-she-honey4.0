<template>
  <view>
	  <z-nav-bar title="生理指标"></z-nav-bar>
	  <!-- 公共组件-每个页面必须引入 -->
	  <public-module></public-module>
      <u-collapse
              @change="change"
              @close="close"
              @open="open"
      >
          <u-collapse-item
                  title="1.相关指标"
                  name="Docs guide"
          >
              <doc-list :cell-list="list"/>
          </u-collapse-item>
          <u-collapse-item
                  title="2.血压测量频率"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodPressure1"/>
          </u-collapse-item>
          <u-collapse-item
                  title="3.血压最近一次测量指标是否正常"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodPressure2"/>
          </u-collapse-item>
          <u-collapse-item
                  title="4.血糖测量频率"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodSugar1"/>
          </u-collapse-item>
          <u-collapse-item
                  title="5.血糖最近一次测量指标是否正常"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodSugar2"/>
          </u-collapse-item>
          <u-collapse-item
                  title="6.血脂测量频率"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodFat1"/>
          </u-collapse-item>
          <u-collapse-item
                  title="7.血脂最近一次测量指标是否正常"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodFat2"/>
          </u-collapse-item>
          <u-collapse-item
                  title="8.尿酸测量频率"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodSUA1"/>
          </u-collapse-item>
          <u-collapse-item
                  title="9.尿酸最近一次测量指标是否正常"
                  name="Variety components"
          >
              <choice :cell-choice="choiceBloodSUA2"/>
          </u-collapse-item>
          <u-collapse-item
                  title="10.血氧饱和度测量频率"
                  name="Variety components"
          >
              <choice :cell-choice="choiceOxygen1"/>
          </u-collapse-item>
          <u-collapse-item
                  title="11.血氧最近一次测量指标是否正常"
                  name="Variety components"
          >
              <choice :cell-choice="choiceOxygen1"/>
          </u-collapse-item>
          <u-collapse-item
                  title="12.请填写最近一次测量血压相关指标的情况"
                  name="Docs guide"
          >
              <clist :cell-list="listBloodPressure"/>
          </u-collapse-item>
          <u-collapse-item
                  title="13.请填写一次测量血糖相关指标的情况"
                  name="Docs guide"
          >
              <clist :cell-list="listBloodSugar"/>
          </u-collapse-item>
          <u-collapse-item
                  title="14.请填写一次测量血脂相关指标的情况"
                  name="Docs guide"
          >
              <clist :cell-list="listBloodFat"/>
          </u-collapse-item>
          <u-collapse-item
                  title="15.请填写一次测量尿酸相关指标的情况"
                  name="Docs guide"
          >
              <clist :cell-list="listBloodSUA"/>
          </u-collapse-item>
          <u-collapse-item
                  title="16.请填写一次测量血氧相关指标的情况"
                  name="Docs guide"
          >
              <clist :cell-list="listOxygen" :disableInput="disableInput"/>
          </u-collapse-item>
      </u-collapse>
      
      <view>
          <u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
              <view class="m-5">
                  <text>请检查填写格式是否有误</text>
              </view>
              <u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
          </u-popup>
      </view>
      <u-button @click="show = true" type="primary" text="提交"></u-button>

  </view>
</template>
<script>
import clist from "../components/listWithChoice.vue";
import choice from "../components/Choice.vue";
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
import DocList from "../components/docList";
export default {
    components:{UButton,DocList,choice,clist},
    data() {
        return {
            show: false,
            list: [
                {
                    name:"*身高(cm)",
                    value:'',
                }, 
                {
                    name:"*体重(kg)" ,
                    value:'',
                }, 
                {
                    name:"*BMK(kg/m')" ,
                    value:'',
                }, 
                {
                    name:"*腰围(cm)" ,
                    value:'',
                }, 
                {
                    name:"*腰围(尺)" ,
                    value:'',
                }, 
                {
                    name:"臀围(cm)" ,
                    value:'',
                }, 
                {
                    name:"心率(次/分)" ,
                    value:'',
                }, 
                {
                    name:"呼吸(次/分)" ,
                    value:'',
                }, 
                {
                    name:"体温(℃)",
                    value:'',
                }, 
            ],
            choiceBloodPressure1: [{name:"从未测过",value:false,}, {name:"曾经测过",value:false,}, {name:"经常检测",value:false,}, ],
            choiceBloodPressure2: [{name:"正常",value:false,}, {name:"过高",value:false,}, {name:"过低",value:false,}, {name:"不清楚",value:false,}, ],
            choiceBloodSugar1: [{name:"从未测过",value:false,}, {name:"曾经测过",value:false,}, {name:"经常检测",value:false,}, ],
            choiceBloodSugar2: [{name:"正常",value:false,}, {name:"过高",value:false,}, {name:"过低",value:false,}, {name:"不清楚",value:false,}, ],
            choiceBloodFat1: [{name:"从未测过",value:false,}, {name:"曾经测过",value:false,}, {name:"经常检测",value:false,}, ],
            choiceBloodFat2: [{name:"正常",value:false,}, {name:"过高",value:false,}, {name:"过低",value:false,}, {name:"不清楚",value:false,}, ],
            choiceBloodSUA1: [{name:"从未测过",value:false,}, {name:"曾经测过",value:false,}, {name:"经常检测",value:false,}, ],
            choiceBloodSUA2: [{name:"正常",value:false,}, {name:"过高",value:false,}, {name:"过低",value:false,}, {name:"不清楚",value:false,}, ],
            choiceOxygen1: [{name:"从未测过",value:false,}, {name:"曾经测过",value:false,}, {name:"经常检测",value:false,}, ],
            choiceOxygen2: [{name:"正常",value:false,}, {name:"过高",value:false,}, {name:"过低",value:false,}, {name:"不清楚",value:false,}, ],
            listBloodPressure:[{name:'收缩压(高压)一般在[mmHg]',value:''},{name:'舒长压(高压)一般在[mmHg]',value:''},{name:'最近一次血压高压[mmHg]',value:''},{name:'最近一次血压低压[mmHg]',value:''},],
            listBloodSugar:[{name:'空腹血糖[mmol/L]',value:''},{name:'糖化血红蛋白[%]',value:''},],
            listBloodFat:[{name:'收缩压(高压)一般在[mmHg]',value:''},{name:'舒长压(高压)一般在[mmHg]',value:''},{name:'最近一次血压高压[mmHg]',value:''},{name:'最近一次血压低压[mmHg]',value:''},],
            listBloodSUA:[{name:'收缩压(高压)一般在[mmHg]',value:''},{name:'舒长压(高压)一般在[mmHg]',value:''},{name:'最近一次血压高压[mmHg]',value:''},{name:'最近一次血压低压[mmHg]',value:''},],
            listOxygen:[{name:'收缩压(高压)一般在[mmHg]',value:''},{name:'舒长压(高压)一般在[mmHg]',value:''},{name:'最近一次血压高压[mmHg]',value:''},{name:'最近一次血压低压[mmHg]',value:''},],
            disableInput:false,
        }
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
	},
    
}
</script>
