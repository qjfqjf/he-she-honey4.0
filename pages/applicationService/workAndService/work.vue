<template>
    <view class="content">
      <z-nav-bar title="工单记录"></z-nav-bar>
      <public-module></public-module>
  
      <!--  空记录  -->
      <view class="nothing" v-if="dataList.length === 0">
        <EmptyState :title="title"></EmptyState>
      </view>
      
      <!--  非空记录  -->
      <view class="medical-records" v-else>
        <uni-list >
          <uni-list :border="true">
            <!-- 显示圆形头像 -->
            <uni-list-chat v-for="(item, index) in dataList" :key="index" :avatar-circle="true" :title="item.fullname" :time="item.createtime" :clickable="true" @click="onClick(item.id)"></uni-list-chat>
            <!-- 右侧带角标 -->
          </uni-list>
        </uni-list>
      </view>
    </view>
  </template>
  
  <script>
    import EmptyState from '../components/emptyState.vue'
    export default {
      components: {
        EmptyState
      },
      data() {
        return {
          baseList: [],
          dataList:[],
          title:""
        };
      },
      onLoad: function (option) {
          console.log(uni.getStorageSync('userInfo')); 
          this.getComment()
      },
      //方法
      methods: {
        onClick(e){
          uni.navigateTo({
			      url:'/pages/applicationService/workAndService/workview?id=' + e
			    })
        },
        getComment(){
          this.$http.post('/work/index',{
          }).then((res)=>{
            console.log(res);
            this.dataList = res.data.data
          })
        }
      },
    }
  </script>
  
  <style lang="scss">
  
  .content{
    background-color: #FFFFFF;
    height: 100%;
    .nothing{
      text-align: center;
      padding-top: 300rpx;
      width: 400rpx;
      margin: 0 auto;
    }
  }
  </style>