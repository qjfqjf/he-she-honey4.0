<template>
    <view class="container">
        <u-image src="../../../static/icon/healthFile/listEmpty.png" width="400rpx" height="400rpx" shape="circle"></u-image>
        <view class="first-text">
            <text >暂无数据</text>
        </view>
        <view class="second-text">
            <text style="font-size: 30rpx">
                当前暂无{{title}}记录，
            </text>
            <text style="font-size: 30rpx;color: #5ac725" @click="addMedicalRecord">
                点击前去添加
            </text>
        </view>
    </view>
</template>

<script>
export default {
    props: [
        "title",
        "tourl"
    ],
    data(){
      return{

      }
    },
    methods:{
        addMedicalRecord(){
            uni.navigateTo({
                url:this.tourl
            });
        }
    },
}
</script>

<style lang="scss">

  u-image{
    //光晕效果未加
    //Filter: Chroma(Color = #000000) Glow(Color=#00FF00, Strength=20);
  }
  .first-text{
    margin-top: 40rpx;
  }
  .second-text{
    margin-top: 40rpx;
  }

</style>
