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
              <doc-choice :cell-choice="choice"/>
          </u-collapse-item>
      </u-collapse>


  </view>
</template>
<script>
import DocList from "../componments/docList.vue";
import DocChoice from "../componments/docChoice.vue";

export default {
    data() {
        return {
            list: ["*身高(cm)" ,
            "*体重(kg)" ,
            "*BMK(kg/m')" ,
            "*腰围(cm)" ,
            "*腰围(尺)" ,
            "臀围(cm)" ,
            "心率(次/分)" ,
            "呼吸(次/分)" ,
            "体温(℃)"],
            choice: ["从未错过","曾经错过","经常检测"]
        }
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
	},
    components:{
        DocList,
        DocChoice
    }
}
</script>
