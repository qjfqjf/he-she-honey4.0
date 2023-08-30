<template>
  <view class="content">
    <z-nav-bar title="心理咨询">
      <view slot="right" class="p-2" @click="addRecords">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthManagement/addRecords.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>

    <!--  空记录  -->
    <view class="nothing" v-if="dataList.length === 0">
      <EmptyState :title="title"></EmptyState>
    </view>

    <!-- 内容 -->
    <view class="container">
        <view class="item" v-for="(item, index) in dataList" :key="index" @click="gotoPsychologyIndex(item.question_id)">
            <view class="public name">医生：{{ item.fullname }}</view>
            <!-- <view class="public content">内容：{{ item.name }}</view> -->
            <view class="public date">时间：{{ item.createtime }}</view>
        </view>
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
        dataList: [],
        title:""
      };
    },
    onLoad: function (option) {
			this.getPsychology()
	},
    //方法
    methods: {
      addRecords(){
        uni.navigateTo({
          url:'/pages/healthManagement/psychology/addPsychology'
        })
      },
      getPsychology(){
        this.$http.post('/psy_consult/index',{
          type:"1"
        }).then((res) => {
          console.log(res);
          res.data.data.forEach(element => {
            this.dataList.push(element)
          });
        })
      },
      gotoPsychologyIndex(e){
        console.log("e",e);
        uni.navigateTo({
            url:'/pages/healthManagement/psychology/psychologyIndex?id=' + e
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
.container {
    .item {
        background-color: white;
        margin: 16rpx 0;
        padding: 30rpx;
        font-size: 30rpx;

        .public {
            margin: 14rpx;
        }
    }
}
</style>