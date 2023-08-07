<template>
	<view class="content">
		<!-- 健康档案组件 -->
	  <header-nav :title="title" :tourl="tourl" :addtext="addtext"></header-nav>
		<!-- 通用组件 -->
	  <public-module></public-module>

	  <!--  空记录  -->
		<view class="nothing" v-if="records.length === 0">
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
        <view class="in-content" v-for="item in records" >
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



            <!-- 2、门诊类别 -->
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
                    <text style="font-weight: 300">{{item.remarks}}</text>
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
	import emptyState from "../components/emptyState.vue";
	import headerNav from "../components/headerNav.vue";
	export default {
		components:{
			headerNav,
			emptyState,
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
					choiceTitle:'影像类别',
					type:["转院","转科","会诊"],
					ImgText:'添加照片',
					typeText:'项目类别',
					discription:'影像描述',

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
				records:[
					// {
					// 	//用户id
					// 	uid:'',
					// 	//病例id
					// 	recordId:'',
					// 	//化验类型
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
				title:'转诊会诊',
				//点击添加跳转的路由
				tourl:'/pages/healthFile/outpatientArchives/consultation/addConsultation',
				//接口
				tourl2:'/diagnose/index',
				addtext:'添加档案'
			}
		},

		methods: {
			addMedicalRecord(){
				uni.navigateTo({
					url:this.tourl
				});
			},getRecordsList(){
				//拿到用户信息
				const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				let uid = userInfo.uid;
				uid = 172
				const token = userInfo.token;
				//接口调用


				this.$http.post(this.tourl2, {
						type: 1,
						uid: uid,
					})
					.then((response) => {
					console.log(response);
					//把传回来的值存入
					this.records = response.data.data;
					//判断诊断类型
					})
					.catch((error) => {
					uni.showToast({
						title: error,
					});
					});


				// uni.request({
				// 	url:this.tourl2,
				// 	method:'post',
				// 	data: {
				// 		params:{
				// 			model:'inpatient.referral.consultation',
				// 			token:token,
				// 			uid:uid,
				// 			//传回去的数组(存放字段)
				// 			fields:[
				// 				"picture_1",
				// 				"picture_2",
				// 				"picture_3",
				// 					//疾病名称
				// 				"data_name",
				// 					//备注
				// 				"data_result",
				// 					//时间
				// 				"data_time",
				// 			]
				// 		}
				// 	},
				// 	success:(res)=>{
				// 		console.log(res);
				// 		//把传回来的值存入
				// 		this.records = res.data.result.records
				// 		//判断诊断类型
				// 		for (var record of this.records) {
				// 			switch (record.data_name) {
				// 				case 'Transfer hospital': record.data_name = '转院'; break;
				// 				case 'X-turn department': record.data_name = '转科'; break;
				// 				case 'consultation': record.data_name = '会诊'; break;
				// 			}
				// 	}
				// 	},
				// 	fail:(err)=>{
				// 		uni.showToast({
				// 			title:err,
				// 		})
				// 	}
				// })
			},
		},

		onLoad(){
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
