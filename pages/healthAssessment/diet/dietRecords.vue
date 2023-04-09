<template>
  <view class="content">
    <z-nav-bar title="饮食记录">
      <view slot="right" class="p-2" @click="addRecords">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthAssessment/addRecords.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>
    
    
    <!--饮食记录  -->
    <view class="diet-records">
      <view class="diet-item" v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex">
        <view class="title">{{baseListItem.title}}</view>
        <text class="content">{{baseListItem.content}}</text>
        <image :src="baseListItem.img" mode=""></image>
        <text class="time">{{baseListItem.createTime}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseList:[
          {
            img: require('@/static/img/openPage.jpg'),
            title: '用餐类别：早餐',
            content:'主食米粥、炒河粉、油条,蛋白质有煎鸡蛋、烤肠,肉丁炒胡萝卜黄瓜,蔬菜有生菜、菜花、土豆丝',
            createTime: '2023-02-15 08:51:00'
          },{
            img: require('@/static/img/openPage.jpg'),
            title: '用餐类别：早餐',
            content:'主食米粥、炒河粉、油条,蛋白质有煎鸡蛋、烤肠,肉丁炒胡萝卜黄瓜,蔬菜有生菜、菜花、土豆丝',
            createTime: '2023-02-15 08:51:00'
          }
        ]
      };
    },
    //方法
    methods: {
      addRecords(){
        uni.navigateTo({
          url:'/pages/healthAssessment/diet/addDietRecords'
        })
      },
    },
  }
</script>

<style lang="scss">
.content{
  .diet-records{
    .diet-item{
      background-color: white;
      border-top: 1rpx solid #ececec;
      padding: 30rpx;
      
      font-size: 26rpx;
      
      .title{
        color: #2bd1ae;
        font-weight: 700;
        margin-bottom: 12rpx;
      }
      .content{
        font-weight: 600;
        color: #313131;
      }
      image{
        width: 220rpx;
        height: 220rpx;
        margin-top: 22rpx;
      }
      .time{
        line-height: 60rpx;
      }
    }
  }
}
</style>
