<!--
 * @Author: August-Rushme
 * @Date: 2023-05-29 15:48:55
 * @LastEditors: August-Rushme 864011713@qq.com
 * @LastEditTime: 2023-05-29 17:03:39
 * @FilePath: \he-she-honey\pages\healthFile\status\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <view>
    <z-nav-bar title="健康状况"></z-nav-bar>
    <!-- 公共组件-每个页面必须引入 -->
    <public-module></public-module>
    <u-collapse @change="change" @close="close" @open="open">
      <u-collapse-item title="健康状况调查" name="Docs guide">
        <view v-for="(list, index) in lists" :key="index">
          <view class="">{{ list.questions }}</view>
          <doc-choice :cell-choice="list.options" />
        </view>
      </u-collapse-item>
    </u-collapse>
  </view>
</template>
<script>
  import DocList from '../componments/docList.vue'
  import DocChoice from '../componments/docChoice.vue'

  export default {
    data() {
      return {
        lists: [
          {
            questions: '您是否患有一下疾病【可多选】',
            options: [
              '高血压',
              '冠心病',
              '高脂血症',
              '糖尿病',
              '脑血管疾病',
              '慢性胃炎',
              '胃溃疡',
              '支气管哮喘',
              '慢性阻塞性肺疾病',
              '骨质疏松症',
              '青光眼',
              '白内障',
            ],
          },
        ],
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
      },
    },
    components: {
      DocList,
      DocChoice,
    },
  }
</script>
