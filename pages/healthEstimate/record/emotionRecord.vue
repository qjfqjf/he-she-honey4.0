<template>
  <view>
    <z-nav-bar title="评估记录"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="container">
      <view class="item" v-for="(item, index) in baseList" :key="index" @click="gotoEmotionManage">
        <view class="name">{{item.name}}</view>
        <view class="date">{{item.date}}</view>
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
            name: '情绪认知',
            date: '2022-09-24 19:33:00'
          }, {
            name: '情绪认知',
            date: '2022-09-24 19:33:00'
          }, {
            name: '情绪认知',
            date: '2022-09-24 19:33:00'
          },{
            name: '情绪认知',
            date: '2022-09-24 19:33:00'
          },
        ]
      };
    },
	methods: {
	  gotoEmotionManage(){
	    uni.navigateTo({
	      url:'/pages/healthEstimate/record/emotionManage'
	    })
	  }
	}
  }
</script>

<style lang="scss">
.container{
  .item{
    background-color: white;
    margin: 2rpx 0;
    padding: 30rpx;
    font-size: 30rpx;
	height: 100rpx;
	.name{
		float: left;
		margin: auto;
		padding: 10rpx;
	}
	.date{
		float: right;
		margin: auto;
		padding: 10rpx;
	}
    // .public{
    //   margin: 14rpx;
    // }
  }
}
</style>
