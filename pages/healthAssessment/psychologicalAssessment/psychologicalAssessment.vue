<template>
  <view>
    <z-nav-bar title="心理测评"></z-nav-bar>
    <public-module></public-module>
    <view class="container">
      <!-- 图片区域 -->
      <view class="image">
        <image src="../../../static/demo/1.jpg" mode="aspectFill"></image>
      </view>
      <!-- 筛选区域 -->
      <view class="select">
        <view class="select-list">
          <uni-data-select v-model="selectValue" :localdata="range" :clear="false" @change="change"></uni-data-select>
        </view>
      </view>
    </view>

    <!-- 滚动区域 -->


  </view>
</template>

<script>
  export default {
    data() {
      return {
        selectValue: 0,
        range: [{
            value: 0,
            text: "热度优先"
          },
          {
            value: 1,
            text: "流量优先"
          },
        ],

        currentIndex: 0,
        dataList:[
          {
            leftCate: '健康',
            content:'1111111111111'
          },{
            leftCate: '健康',
            content:'1111111111111'
          },{
            leftCate: '健康',
            content:'1111111111111'
          },{
            leftCate: '健康',
            content:'1111111111111'
          },
        ]


      };
    },
    methods: {
      change(e) {
        console.log("e:", e);
      },
      selectItem(index) {
        this.selectedItem = index;
      },
    }
  }
</script>

<style lang="scss">
  .container {
    .image {
      image {
        width: 100%;
        height: 300rpx;
      }
    }

    .select {
      width: 100%;
      background-color: white;
      display: flex;
      justify-content: left;
      padding: 14rpx;

      .select-list {
        display: flex;
        // justify-content: right;
        width: 250rpx;
        background-color: white;
      }
    }

    .scroll-view-container {
      display: flex;

      // background-color: #007AFF;
      .left-scroll-view {
        width: 120px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        // margin-top: 94rpx;
        .left-scroll-view-item {
          line-height: 90rpx;
          background-color: #eee;
          text-align: center;
          font-size: 26rpx;

          // 激活项的样式
          &.active {
            background-color: #ffffff;
            position: relative;

            // 渲染激活项左侧的红色指示边线
            &::before {
              content: ' ';
              display: block;
              width: 3px;
              height: 30px;
              background-color: #007AFF;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }

      .right-scroll-view {
        background-color: white;
        // height: 90vh;

        // margin-top: 94rpx;
        .cate-lv2-list {
          display: flex;
          // 自动换行
          flex-wrap: wrap;

          .cate-lv2-item {
            .food-item {
              .right {
                display: flex;
                flex-direction: column;
                padding: 20rpx;
                border-bottom: 1rpx solid #eee;
                text-align: left;
                position: relative;

                .food-info {
                  display: flex;

                  image {
                    width: 160rpx;
                    height: 160rpx;
                  }

                  .item-right {
                    display: flex;
                    flex-direction: column;
                    padding-left: 20rpx;
                    font-size: 26rpx;
                    width: 64%;

                    .food2-name {
                      font-size: 40rpx;
                      font-weight: 600;
                    }

                    text {
                      font-size: 26rpx;
                      color: #666;
                    }
                  }
                }

                .addCart {
                  width: 50rpx;
                  height: 50rpx;
                  position: absolute;
                  // right: -100rpx;
                  // top: 20rpx;
                  left: 500rpx;
                  background-color: lightcoral;
                  color: white;
                  font-size: 50rpx;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 10rpx;
                }
              }
            }
          }
        }
      }
    }

  }
</style>