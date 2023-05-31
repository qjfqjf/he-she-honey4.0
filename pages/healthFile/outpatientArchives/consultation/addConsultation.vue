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
            <u-form v-model="dataObj">
                <!-- 1、分类 -->
                <view class="cate">
                    <text class="cate-text">{{addObj.choiceTitle}}</text>
                </view>
                <view class="switch">
                    <u-subsection :list="addObj.list" :current="addObj.curNow" font-size="15" @change="sectionChange" mode="subsection" inactive-color="#20c6a2" active-color="#20c6a2"></u-subsection>
                </view>

                <view style="height: 40rpx"></view>

                <!-- 2、上传照片 -->
                <view class="uploadImage">
                    <text class="cate-text">{{addObj.uploadImgText}}</text>
                    <view style="height: 20rpx"></view>
                    <view class="example-body">
                        <uni-file-picker limit="9" :image-styles="addObj.imageStyles"  @select=""></uni-file-picker>
                    </view>
					          <text class="tip">（友情提示：最多添加9张图片）</text>
                </view>

                <!-- 3、备注和时间 -->
                <view class="remarks">
                    <text class="cate-text" style="">{{addObj.remarksText}}</text>
                    <view style="height: 20rpx"></view>
                    <u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 20rpx 0" border="false" v-model="dataObj.illDiscription"></u-textarea>

                </view>

                <view style="height: 40rpx"></view>

                <!-- 4、日期 -->
                <view class="date-body">
                    <text class="cate-text">日期</text>
                    <view style="height: 20rpx"></view>
                    <view class="picker">
                        <uni-datetime-picker class="time-picker" :show-icon="true" :border="false" v-model="dataObj.selectedDate"
                                             :clearIcon="false"/>
                        <uni-icons type="forward" size="15"></uni-icons>
                    </view>
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
import headerNav from "../components/headerNav.vue";
export default {
	components: {
		headerNav,
	},
	data() {
		return {
			title:"转诊会诊",
			//数据
			dataObj:[
				{
					//用户id
					uid:'111',
					//病例id
					recordId:'',
					//门诊类型
					type:'',
					//选择的日期
					selectedDate:new Date(),
					//疾病名称
					illName:'',
					//疾病备注
					illDiscription:'',
					//图片
					imgs:[
						''
					],
				},


			],
			//显示的文本
			addObj:{
				//默认的选项
				curNow:0,
				//这边统一写内容用
				choiceTitle:'转诊会诊',
				list:["转院","转科","会诊"],
				uploadImgText:'添加照片',
				placeholder2:'请添加检查项目的备注',
				//返回的路由
				tourl:'/pages/healthFile/outpatientArchives/consultation/consultation.vue',
				//保存接口
				tourl2:'',
				// 备注
				remarksValue: '',
        remarksText:'备注',
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
	//方法
	methods: {
    sectionChange(index) {
            this.dataObj.type = this.addObj.list[index]
            this.addObj.curNow = index;
            console.log(index,this.dataObj.type)
        },
        change(e) {
            console.log("e:", e);
        },


        //保存方法
        saveRecords(){
            console.log(this.dataObj);
            //uni.request({
                // url:this.addObj.tourl2,
                // method:'post',
                // data:{
                //     params:{
                //         dataObj:this.dataObj,
                //         model:'',
                //         token:'',
                //         uid:'',
                //         fields:[
                //
                //         ]
                //     }
                // },
                //success(res){
                    uni.showToast({
                        title:'保存成功',
                        duration:1000,
                        success:()=>{
                            setTimeout(() => {
                                uni.redirectTo({
                                    url: this.addObj.tourl,
                                    success:(res)=>{
                                        console.log(res)
                                    },
                                    fail:(err)=>{
                                        console.log(err)
                                    }
                                });
                            }, 1000);
                        }
                    });
                //}
           // });

        },
	},
	onShow(){
		this.addObj.type = this.addObj.list[this.addObj.curNow];
		console.log(this.addObj.type)
	}
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

    padding: 30rpx;
    height: 300rpx;
    .textarea {
      height: 0rpx;
      font-size: 28rpx;
    }
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