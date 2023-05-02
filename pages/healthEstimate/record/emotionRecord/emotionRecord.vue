<template>
  <view>
    <z-nav-bar title="评估记录"></z-nav-bar>
    <public-module></public-module>
    
    <!-- 内容 -->
    <view class="content">
      <view class="item doctor-advice" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex" @click="click(baseListItem.url, baseListItem.title)">
        <text>{{baseListItem.title}}</text>
        <text class="createTime">{{baseListItem.createTime}}</text>
      </view>
    </view>
  </view>
</template>
url:
	    })
<script>
  export default {
    data() {
      return {
        baseList: [{
            title: '情绪认知',
            createTime: '2022-08-09 23:23:00',
            url: '/pages/healthEstimate/record/emotionRecord/emotionManage'
          },{
            title: '情绪认知',
            createTime: '2022-08-09 23:23:00',
            url: '/pages/healthEstimate/record/emotionRecord/emotionManage'
          },{
            title: '情绪认知',
            createTime: '2022-08-09 23:23:00',
            url: '/pages/healthEstimate/record/emotionRecord/emotionManage'
          },{
            title: '情绪认知',
            createTime: '2022-08-09 23:23:00',
            url: '/pages/healthEstimate/record/emotionRecord/emotionManage'
          },
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
      
      ;}
    }
  }
</script>

<style lang="scss">
.content{
  background-color: #fff;
  border-top: 1rpx solid #ececec;
  // padding: 10rpx;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
      
    padding: 26rpx;
    border-bottom: 1rpx solid #ececec;
    font-size: 28rpx;
    .createTime{
      color: #aaa;
    }
  }
  .doctor-advice{
    
  }
  
}
</style>
