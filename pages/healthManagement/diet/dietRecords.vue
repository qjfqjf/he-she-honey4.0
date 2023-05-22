<template>
  <view class="content">
    <z-nav-bar title="饮食记录">
      <view slot="right" class="p-2" @click="addRecords">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthManagement/addRecords.png"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>


    <!--饮食记录  -->
    <view class="diet-records">
      <view class="diet-item" v-for="(baseListItem,baseListIndex) in dietRecordsData" :key="baseListIndex">
        <view class="title">用餐类别：{{baseListItem.name}}</view>
        <text class="content">{{baseListItem.content}}</text>
        <image :src="baseListItem.img" mode="aspectFill"></image>
        <text class="time">{{baseListItem.createTime}}</text>
      </view>
    </view>
   
  </view>
</template>

<script>
  export default {
    data() {
      return {
        dietRecordsData: {},
      };
    },
    onLoad() {
      this.getDietRecords()
    },
    //方法
    methods: {
      addRecords() {
        uni.navigateTo({
          url: '/pages/healthManagement/diet/addDietRecords'
        })
      },
      // 获取饮食记录信息
      async getDietRecords() {
        const params = {
          "params": {
            'model': 'ttm.conditioning.managment.food',
            "domain": [],
            'fields': [ "name",
            "food_times",
            "food_content",
            "food_image",
            "food_image_2"
            ],
          }

        }
        // uni.request({
        //   url: 'http://121.37.31.233:8888/web/dataset/search_read',
        //   method: 'POST',
        //   data: params,
        //   header: {
        //     'Content-Type': 'application/json;charset=UTF-8',
        //     "session_id": "48a55bbe04ac4450c016b4f064fe470bab083b0e"
        //   },
        //   success: (res) => {
        //     console.log(res)
        //   },
        //   fail: (err) => {
        //     console.log(err)
        //   }
        // })
        
        const result = await this.$http.post('/web/dataset/search_read', params)
        console.log(result)
        .then(res => {
          this.dietRecordsData = res.data.result.records;
        }).catch(err => {
          console.log(err)
        })
        // return result;
      }
    }
  }
</script>

<style lang="scss">
  .content {
    .diet-records {
      .diet-item {
        background-color: white;
        border-top: 1rpx solid #ececec;
        padding: 30rpx;

        font-size: 26rpx;

        .title {
          color: #2bd1ae;
          font-weight: 700;
          margin-bottom: 12rpx;
        }

        .content {
          font-weight: 600;
          color: #313131;
        }

        image {
          width: 200rpx;
          height: 200rpx;
          margin-top: 22rpx;
        }

        .time {
          line-height: 60rpx;
        }
      }
    }
  }
</style>