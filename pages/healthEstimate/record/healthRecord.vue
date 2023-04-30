<template>
  <view>
    <z-nav-bar title="测评记录"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="container">
      <view class="item" v-for="(item, index) in baseList" :key="index"  @click="gotohealthTestRecord">
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
            content: '动脉粥样硬化风险自测',
            date: '2022-09-24 19:33:00',
          }, {
            content: '猝死风险自测',
            date: '2022-09-24 19:33:00',
          }, {
            content: '肺炎风险自测',
            date: '2022-09-24 19:33:00',
          },{
            content: '冠心病风险自测',
            date: '2022-09-24 19:33:00',
          },{
            content: '动脉粥样硬化风险自测',
            date: '2022-09-24 19:33:00',
          },{
            content: '高脂血症风险自测',
            date: '2022-09-24 19:33:00',
          },{
            content: '肾炎风险自测',
            date: '2022-09-24 19:33:00',
          }
        ]
      };
    },
	methods: {
	  gotohealthTestRecord(){
	    uni.navigateTo({
	      url:'/pages/healthEstimate/record/healthTestRecord'
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
