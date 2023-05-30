<template>

  <view class="b-content p-2">
    <z-nav-bar title="胆固醇月报">
      <view slot="right" class="p-2" @click="handleDevelop">预警规则</view>
    </z-nav-bar>
    <public-module></public-module>
    <TimeRage></TimeRage>
    <view class="historyCard mb-3" v-for="(item,index) in dataList" :key="index">
      <view class="top d-flex j-sb mb-2">
        <view class="time">
          {{item.test_time}}
        </view>
      </view>
      <view class="data d-flex j-sb">
        <view class="name">
          <!-- 名称：{{item.name}} -->
		  名称：胆固醇
        </view>
        <view class="ergometer" v-if="item.oml_l > targetIndexMax">
          <!-- ↓ -->
          数值：{{item.oml_l}}
          <text class="up">{{arrowUp}}</text>
        </view>
        <view class="ergometer" v-else-if="item.oml_l < targetIndexMin">
          <!-- ↓ -->
          数值：{{item.oml_l}}
          <text class="down">{{arrowDown}}</text>
        </view>
        <view class="ergometer" v-else>
          <!-- ↓ -->
          数值：{{item.oml_l}}
          <text class="down"></text>
        </view>
      </view>
    </view>


  </view>
</template>

<script>
  import TimeRage from '../components/timeRage/TimeRage.vue'
  export default {
    components: {
      TimeRage
    },
    data() {
      return {
        targetIndexMax: 5.69,
        targetIndexMin: 5.23,
        arrowUp: '↑',
        arrowDown: '↓',
        dataList: [
			// {
   //          time: "2023-3-29 15:30:50",
   //          name: '胆固醇',
   //          ergometer: 5.34
   //        },
   //        {
   //          time: "2023-3-29 15:30:50",
   //          name: '胆固醇',
   //          ergometer: 5.11
   //        },
   //        {
   //          time: "2023-3-29 15:30:50",
   //          name: '胆固醇',
   //          ergometer: 5.33
   //        },
   //        {
   //          time: "2023-3-29 15:30:50",
   //          name: '胆固醇',
   //          ergometer: 120
   //        }
        ]
      };
    },
    onLoad() {
		this.getHistoryList();
    },
    methods: {
      handleDevelop() {
        this.$refs.uToast.show({
          message: '开发中...'
        })
      },
	  //查询胆固醇历史记录
	  getHistoryList() {
	  	this.$http.post('/platform/dataset/search_read', {
	  		model: "blood.glucose.uric.acid.cholesterol",
	  		fields: [
	  			"name",
	  			"numbers",
	  			"owner",
	  			"category",
	  			"oml_l",
	  			"input_type",
	  			"test_time"
	  		]
	  	}).then(res => {
	  		this.dataList = res.result.records
	  	})
	  }

    }
  }
</script>

<style lang="scss">
  .b-content {
    .timeRange {
      .startTime {
        color: #2fa290;
      }

      .endTime {
        color: #2fa290;
      }
    }

    .historyCard {
      padding: 40rpx;
      border-radius: 16rpx;
      background-color: #fff;
      box-shadow: inset 0 3px 0 hsla(0, 0, 0, 0), 0 3px 3px hsla(0, 0, 0, .2);

      .top {
        .position {
          font-size: 36rpx;
          font-weight: 700;
        }

        .time {
          color: #666;


        }
      }

      .data {
        .name {

          color: #ffd661;

        }
        .ergometer{
          .up {
            color: #f10000;
            font-size: 40rpx;
          }
          
          .down {
            color: #ffa053;
            font-size: 40rpx;
          }
        }
        
      }
    }
  }
</style>