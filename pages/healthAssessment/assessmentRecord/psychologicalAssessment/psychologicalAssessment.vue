<template>
  <view>
    <z-nav-bar title="心理档案"></z-nav-bar>
    <public-module></public-module>

    <!-- 内容 -->
    <view class="content">
      <view class="item doctor-advice" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
        @click="click(baseListItem.url, baseListItem.title)">
        <text class="title">{{baseListItem.title}}</text>
        <text class="createTime">{{baseListItem.createtime}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList: [{
          title: '测试你们之间有纯友谊吗？',
          createtime: '2022-08-09 23:00:00',
          url: '/pages/healthAssessment/assessmentRecord/psychologicalAssessment/psychologicalAssessmentReport'
        },{
          title: '测试你们之间有纯友谊吗？',
          createtime: '2022-08-09 23:00:00',
          url: '/pages/healthAssessment/assessmentRecord/psychologicalAssessment/psychologicalAssessmentReport',
        },
		{
		  content: '测试你们之间是纯友谊吗？',
		  date: '2022-09-24 19:33:00',
		}, {
		  content: '贝克抑郁测评量表（BDI）',
		  date: '2022-09-24 19:33:00',
		}, {
		  content: '测试你是讨好型人格吗？',
		  date: '2022-09-24 19:33:00',
		},{
		  content: '焦虑自评量表SAS',
		  date: '2022-09-24 19:33:00',
		},{
		  content: '焦虑自评量表SAS',
		  date: '2022-09-24 19:33:00',
		},{
		  content: '贝克抑郁测评量表（BDI）',
		  date: '2022-09-24 19:33:00',
		},{
		  content: '综合心理健康测评（SCL-90）',
		  date: '2022-09-24 19:33:00',
		},{
		  content: '焦虑自评量表SAS',
		  date: '2022-09-24 19:33:00',
		},{
		  content: '焦虑自评量表SAS',
		  date: '2022-09-24 19:33:00',
		},
		
		'/pages/healthEstimate/record/psychologyTestRecord'
		]
      };
    },
    methods: {
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });

        ;
      }
    }
  }
</script>

<style lang="scss">
  .content {
    background-color: #fff;
    border-top: 1rpx solid #ececec;

    // padding: 10rpx;
    .item {
      display: flex;
      flex-direction: column;

      padding: 24rpx;
      border-bottom: 1rpx solid #ececec;
      font-size: 28rpx;
      .title{
        // font-weight: 600;
        color: #2a2a2a;
        margin-bottom: 4rpx;
      }
      .createTime {
        color: #8a8a8a;
        font-size: 28rpx;
      }
    }

    .doctor-advice {}

  }
</style>