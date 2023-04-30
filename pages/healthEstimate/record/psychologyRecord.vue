<template>
  <view>
    <z-nav-bar title="心理档案"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="container">
      <view class="item" v-for="(item, index) in baseList" :key="index"  @click="gotoPsychologyTestRecord">
        <view class="public content">{{item.content}}</view>
        <view class="public date">{{item.date}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList: [
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
        ]
      };
    },
	methods: {
	  gotoPsychologyTestRecord(){
	    uni.navigateTo({
	      url:'/pages/healthEstimate/record/psychologyTestRecord'
	    })
	  }
	}
  }
</script>

<style lang="scss">
.container{
  .item{
    background-color: white;
    margin: 16rpx 0;
    padding: 30rpx;
    font-size: 30rpx;
    .public{
      margin: 14rpx;
    }
  }
}
</style>
