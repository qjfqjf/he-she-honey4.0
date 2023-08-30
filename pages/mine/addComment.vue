<template>
	<view class="out-contain">
		<public-module></public-module>
		<!-- 上导航栏 -->
		<header-nav :title="title"></header-nav>
		<!-- 添加页面主体 -->
		<view class="in-content">
        <!-- 导航栏上下分割 -->
        <view style="height: 20rpx;background-color: #f5f5f5">
        </view>
        <view class="in-content">
            <u-form v-model="comment">
                <!-- 1、项目名称 -->
				<view class="remarks">
                    <text class="cate-text" style="">{{addObj.remarksText}}</text>
                    <view style="height: 20rpx"></view>
                    <u-rate active-color="#26c2a2" inactive-color="#b2b2b2" v-model="addObj.level" @change="rateChange"></u-rate>
                </view>

                <view style="height: 10rpx"></view>
				
                <!-- 2、上传照片 -->
                <view class="uploadImage">
                    <text class="cate-text">{{addObj.uploadImgText}}</text>
                    <view style="height: 20rpx"></view>
                    <view class="example-body">
                        <uni-file-picker limit="9" :image-styles="addObj.imageStyles"  @select=""></uni-file-picker>
                    </view>
				            <text class="tip">（友情提示：最多添加9张图片）</text>
                </view>

                <!--备注-->
                <view class="remarks">
                    <text class="cate-text" style="">{{addObj.remarksText2}}</text>
                  <u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 20rpx 0" border="false" v-model="comment.content"></u-textarea>
                </view>
                <view class="save-box">
                    <!-- 保存按钮 -->
                    <button class="saveBtn" @click="saveRecords()">保存</button>
                </view>
            </u-form>
        </view>
    </view>
	</view>
</template>

<script>
import headerNav from "../mine/components/headerNav.vue";
export default {
	components: {
		headerNav,
	},
	data() {
		return {
			title:"添加评价",
			//数据
			comment:
				{
                    //
                    did:'',
					//评分
					level:0,
					//具体评价
					content:'',
					//照片
					picture_1:'',
					picture_2:'',
					picture_3:'',
				},


			
			//显示的文本
			addObj:{
                level:'',
				//默认的选项
				curNow:0,
				//这边统一写内容用
				uploadImgText:'评价照片',
				remarksText2:'评价描述',
                placeholder2:'请输入评价',
				//返回的路由
				tourl:'/pages/mine/commentDetail',
				//保存接口
				tourl2:'/rating/create',
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
				type:'',
			},
		};
	},
    onLoad: function (option) {
			console.log(option.did); 
			this.comment.did = option.did;
			console.log('did',this.comment.did);
	},
	//方法
	methods: {
		rateChange(index) {
            console.log(index)
            this.comment.level = index;
        },
		//保存方法
		saveRecords(){
            console.log('comment',this.comment);
			this.$http.post(this.addObj.tourl2,{
                ...this.comment
            }).then(res => {
				console.log(res);
				uni.showToast({
					title: '保存成功',
					duration: 1000,
					success: () => {
					setTimeout(() => {
						uni.redirectTo({
						url: '/pages/mine/commentDetail?did='+this.comment.did,
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
						});
					}, 1000);
					}
				});
				}).catch(err => {
				console.log(err);
				});


			// uni.request({
			// 	url:this.addObj.tourl2,
			// 	method:'post',
			// 	data:{
			// 		params:{
			// 			//注意！！查接口文档
			// 			model:"inpatient.surgery",
			// 			token:token,
			// 			uid:uid,
			// 			method:"create",
			// 			args:[
			// 				[{
			// 					picture_1:"",
			// 					picture_2:"",
			// 					picture_3:"",
			// 					//疾病名称
			// 					data_name:this.operation.data_name,
			// 					//疾病备注
			// 					data_result:this.operation.data_result,
			// 					//注意！！这个是uid
			// 					//用户id
			// 					patient_id:uid,
			// 					//时间
            //     date_time:this.operation.data_time
			// 				}]
			// 			],
			// 			kwargs:{}
			// 		}
			// 	},
			// 	success(res){
			// 		//测试
			// 		console.log(res)
			// 		uni.showToast({
			// 			title:'保存成功',
			// 			duration:1000,
			// 			success:()=>{
			// 				setTimeout(() => {
			// 					uni.redirectTo({
			// 						url: _this.addObj.tourl,
			// 						success:(res)=>{
			// 							console.log(res)
			// 						},
			// 						fail:(err)=>{
			// 							console.log(err)
			// 						}
			// 					});
			// 				}, 1000);
			// 			}
			// 		});
			// 	}
			// });
		},
	},
}
</script>

<style lang="scss">

	.out-contain{
		background-color: #FFFFFF;
		height: 100%;	
		.in-content {
  			.in-content{
    			padding: 0 10rpx;
  			}
  		.switch{
    		width: 600rpx;
    		margin-left: 20rpx;
  		}
  		.cate {
    		display: flex;
    		align-items: center;
    		justify-content: space-between;
    		background-color: white;
    		padding: 20rpx;
  		}

  		.uploadImage {
    		padding: 20rpx;
    		background-color: white;

    		.tip {
      		color: #e0584b;
      		font-size: 24rpx
    		}
  		}

  		.remarks {
    		margin-top: 14rpx;
    		padding: 20rpx;
    		.textarea {
      		height: 100rpx;
      		font-size: 10rpx;
    		}
  		}
		  .tip {
        color: #e0584b;
        font-size: 24rpx
      }
  		.date-body {

    		//display: flex;
    		align-items: center;

    		background-color: white;
   			padding: 35rpx;



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