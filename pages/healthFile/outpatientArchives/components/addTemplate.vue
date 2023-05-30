<template>
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
                    <u-input style="background-color: #f5f5f5" :placeholder="addObj.placeholder1" border="false" v-model="dataObj.illName"></u-input>
                    <u-textarea :placeholder="addObj.placeholder2" style="background-color: #f5f5f5;margin: 50rpx 0" border="false" v-model="dataObj.illDiscription"></u-textarea>

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
                    <button class="saveBtn" @click="saveRecords">保存</button>
                </view>
            </u-form>
        </view>
    </view>
</template>

<script>


import UForm from "../../../../uni_modules/uview-ui/components/u-form/u-form.vue";

export default {
    name: "addTemplate",
    components: {UForm},
    props:["addObj","params"],
    data() {
        return {
            //增添的数据
            dataObj: {
                //用户id
                uid: '111',
                //病例id
                recordId: '',
                //门诊类型
                type: this.addObj.type,
                //选择的日期
                selectedDate: new Date(),
                //疾病名称
                illName: '',
                //疾病备注
                illDiscription: '',
                //图片
                imgs: [
                    ''
                ],
            },
        }
    },
    methods:{
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
            //console.log(this.dataObj);
            console.log(this.params)

            uni.request({
                url:this.addObj.tourl2,
                method:'post',
                data:{

                    params:this.params,


                    // {
                    //     model:this.params.model,
                    //     token:this.params.token,
                    //     uid:this.params.uid,
                    //     method:"create",
                    //     args:this.params.args,
                    //     kwargs:{}
                    // },

                },
                success(res){
                    console.log(res)
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
                }
           });

        },
    },


}
</script>

<style lang="scss">
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
    .select-list {}
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
    padding: 30rpx;
    height: 400rpx;
    .textarea {
      height: 200rpx;
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

</style>