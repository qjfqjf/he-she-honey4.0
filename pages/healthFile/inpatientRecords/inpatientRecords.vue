<template>
	<view class="content">
		<!-- 健康档案组件 -->
	  <header-nav :title="title" :tourl="tourl" :addtext="addtext"></header-nav>
		<!-- 通用组件 -->
	  <public-module></public-module>

	  <!--  空记录  -->
		<view class="nothing" v-if="dataList.length === 0">
			<!-- 健康管理组件 -->
			<empty-state :title="title" :tourl="tourl"></empty-state>
		</view>

		<!--  非空记录  -->
		<view class="medical-records" v-else>
			<!-- 健康管理组件 -->
			<view class="in-content">
        <!-- 导航栏上下分割 -->
        <view style="height: 20rpx;background-color: #f5f5f5">
        </view>
        <view class="in-content" v-for="item in dataList" >
            <!-- 1、日期 -->
            <view class="remarks">
                <view class="cate">
                    <text class="cate-text">日期</text>
                </view>
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
                    <text style="font-size: 30rpx">{{item.createtime}}</text>
                </view>
            </view>
			<!-- 2、疾病诊断 -->
			<view class="remarks">
                <text class="cate-text" style="">{{showObj.remarksText}}</text>
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
                    <text style="font-weight: 300">{{item.name}}</text>
                </view>
            </view>


            <!-- 3、门诊类别 -->
            <view class="remarks">
                <text class="cate-text" style="">{{showObj.typeText}}</text>
                <view style="height: 20rpx"></view>
                <view style="width: 200rpx;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
                    <text style="font-weight: 300">{{item.category_cn}}</text>
                </view>
            </view>


            
            <!-- 4、情况描述 -->
            <view class="remarks">
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 200rpx;background-color: #f5f5f5;font-size: 30rpx;padding-top: 20rpx;padding-left: 30rpx">
                    <text style="font-weight: 300">{{item.symptom}}</text>
                </view>
            </view>

			<view class="remarks">
                <view class="cate">
                    <text class="cate-text">入院时间</text>
                </view>
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
                    <text style="font-size: 30rpx">{{item.createtime}}</text>
                </view>
            </view>
			<view class="remarks">
                <view class="cate">
                    <text class="cate-text">出院时间</text>
                </view>
                <view style="height: 20rpx"></view>
                <view style="width: 100%;height: 80rpx;background-color: #f5f5f5;font-size: 30rpx;padding: 20rpx 30rpx">
                    <text style="font-size: 30rpx">{{item.time}}</text>
                </view>
            </view>
            <!-- 5、图片展示 -->

            <view style="height: 20rpx"></view>

            <view class="remarks">
                <text class="cate-text" style="margin-left: 20rpx">{{showObj.ImgText}}</text>
                <view style="height: 20rpx"></view>
                <view class="showImage" style="display:flex; align-items: center; flex-wrap: wrap-reverse;">
                    <view class="example-body" v-for="img in item.imgs" style="width: 150rpx;height: 150rpx;margin-left: 50rpx;margin-bottom: 50rpx;" >
                        <view style="">
                            <image style="width: 150rpx;height: 150rpx; " :src="img"></image>
                        </view>
                    </view>
                    <tel-pic :lineNum="3" :spacingNumber="10" :imageArr="item.imgs" ></tel-pic>
                </view>
            </view>


            <!-- 6、分割线 -->
            <u-divider style="margin-top: 50rpx" text="分割线" text-size="10" textColor="#1fc7a3"></u-divider>

        </view>
    </view>
		</view>
	</view>
	  
</template>

<script>
	import emptyState from "../outpatientArchives/components/emptyState.vue";
	import notEmptyState from "../outpatientArchives/components/notEmptyState.vue";
	import headerNav from "../outpatientArchives/components/headerNav.vue";
	export default {
		components:{
			headerNav,
			emptyState,
			notEmptyState
		},
		data() {
			return {
      urls2: [
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/2.jpg',
          'https://cdn.uviewui.com/uview/album/3.jpg',
          'https://cdn.uviewui.com/uview/album/4.jpg',
          'https://cdn.uviewui.com/uview/album/5.jpg',
          'https://cdn.uviewui.com/uview/album/6.jpg',
          'https://cdn.uviewui.com/uview/album/7.jpg',
          'https://cdn.uviewui.com/uview/album/8.jpg',
          'https://cdn.uviewui.com/uview/album/9.jpg',
          'https://cdn.uviewui.com/uview/album/10.jpg',
      ],
				//显示的文本
				showObj:{
					curNow:0,
					//这边统一写内容用
					choiceTitle:'门诊类别',
					type:["急诊","普通门诊"],
					ImgText:'病例照片',
					remarksText:'疾病诊断',
					typeText:'门诊类型',
					discription:'情况描述',

					// 备注
					remarksValue: '',
					// 选择日期
					selectedDate: new Date(),
					imageStyles: {
						width: 90,
						height: 90,
						border: {
						}
					},
					value: 0,
				},
				//数据
				dataList:[
					// {
					// 	//用户id
					// 	uid:'',
					// 	//病例id
					// 	recordId:'',
					// 	//门诊类型
					// 	type:'急诊',
					// 	//选择的日期
					// 	selectedDate:'111',
					// 	//疾病名称
					// 	illName:'感冒',
					// 	//疾病备注
					// 	illDiscription:'流鼻涕，发热',
					// 	//图片
					// 	imgs:[
					// 		'../../../../static/icon/wechat.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 		'../../../../static/icon/wechat2.png',
					// 	],
					// }
				],
				title:'住院病历',
				//点击添加跳转的路由
				tourl:'/pages/healthFile/inpatientRecords/addInpatientRecords',
				//接口
				tourl2:'/medical/index',
				addtext:'添加病例'
			}
		},

		methods: {
			addMedicalRecord(){
				uni.navigateTo({
					url:this.tourl
				});
			}
		,
		//查询当前用户所有档案
		getRecordsList(){
			//接口调用
      this.$http.post(this.tourl2, {
          uid: '172',
          type: 2
      })
      .then((response) => {
        console.log(response);
        //传回来的值
        this.dataList = response.data.data
      })
      .catch((error) => {
        uni.showToast({
          title: error,
        });
      });

    }
			// uni.request({
			// 	url:this.tourl2,
			// 	method:'post',
			// 	data: {
			// 		params:{
			// 			model:'',
			// 			token:'',
			// 			uid:'',
			// 			//传回去的数组(存放字段)
			// 			fields:[

			// 			]
			// 		}
			// 	},
			// 	success(res){
			// 		//传回来的值
			// 		//this.dataList = res.data.result.
			// 	}
			// })
		},

		onLoad(){
      const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
      console.log(userInfo);
			this.getRecordsList();
		}
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
		.in-content {
  background-color: white;
  height: 100%;

  .in-content{
    padding: 0 10rpx;
  }
  .switch{
    width: 400rpx;
    margin-left: 20rpx;
  }
  .cate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    .select-list {}
  }

  .showImage {
    padding: 20rpx;

  }

  .remarks {
    margin-top: 14rpx;
    padding: 20rpx;
  }
    .textarea {
        height: 200rpx;
        font-size: 28rpx;
    }
  .date-body {

    //display: flex;
    align-items: center;

    background-color: white;
    padding: 24rpx;



    .date {
      margin-right: 25rpx;
    }

    .picker {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;


      .time-picker {
        margin-right: 220rpx;
      }
    }
  }

  .save-box{
    margin-top: 100rpx;
    .saveBtn {
      background-color: #20c6a2;
      margin: 30rpx;
      padding: 12rpx;
      color: white;
      font-size: 35rpx;
    }
  }
}
	}

</style>
