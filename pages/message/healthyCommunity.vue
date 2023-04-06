<template>
    <view class="d-flex flex-column bg-white">
        <z-nav-bar title="健康圈">

			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>


			<u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>

		</z-nav-bar>
        <view>
            <u-index-list :index-list="indexList">
                <template v-for="(item, index) in itemArr">
                    <!-- #ifdef APP-NVUE -->
                    <!--					<u-index-anchor :text="indexList[index]"></u-index-anchor>-->
                    <!-- #endif -->
                    <u-index-item>
                        <!-- #ifndef APP-NVUE -->
                        <u-index-anchor :text="indexList[index]"></u-index-anchor>
                        <!-- #endif -->
                        <view class="list-cell" v-for="(cell, index) in item">
                            <view class="d-flex j-center a-center my-1">
                                <u--image  shape="circle" :showLoading="true" :src="avatar" width="40px" height="40px"></u--image>
                                <span class="list-cell">{{cell}}</span>
                            </view>
                        </view>
                    </u-index-item>
                </template>
            </u-index-list>
        </view>
    </view>
</template>

<script>
import IndexList from './indexList.vue'
export default {
    data() {
        return {
            searchWords: "",
            indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"]
            ,
            avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
            itemArr: [
                ['列表A1', '列表A2', '列表A3'],
                ['列表B1', '列表B2', '列表B3'],
                ['列表C1', '列表C2', '列表C3'],
                ['列表A1', '列表A2', '列表A3'],
                ['列表A1', '列表A2', '列表A3'],
                ['列表A1', '列表A2', '列表A3'],
                ['列表A1', '列表A2', '列表A3'],
                ['列表A1', '列表A2', '列表A3'],
                ['列表A1', '列表A2', '列表A3'],
                ['列表A1', '列表A2', '列表A3'],
            ],
            hairline: false
        }
    },
    methods: {
        goBack(){
            uni.navigateBack({})
        },
		goAddFriend(){
			uni.navigateTo({
				url:"./addFriend"
			})
		}
    },
    components: {
        IndexList
    }
}
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

.searchBar {

}

.buttonGrounp {

  .leftButton {
    border: 0px;
    width: 40%;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }

  .rightButton {
    border: 0px;
    width: 40%;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
}
</style>
