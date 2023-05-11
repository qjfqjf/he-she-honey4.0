<template>
  <view class="contenttest">
    <z-nav-bar title="健康测评">
      <view slot="right" class="p-2">
        <image style="width: 40rpx;height: 40rpx;" src="/static/icon/healthEstimate/search.png" @click="gotoSearch"></image>
      </view>
    </z-nav-bar>
    <public-module></public-module>
	
	<image class="img" src="/static/icon/healthEstimate/bigpsy.png" shape="circle" mode="aspectFill"></image>
	<!-- 筛选区域 -->
	<view class="select">
	  <view class="select-list">
	    <uni-data-select v-model="selectValue" :localdata="range" :clear="false" @change="changeState"></uni-data-select>
	  </view>
	</view>
	<view class="container">
	    <scroll-view class="nav" scroll-y>
	        <view
	           v-for="(item, index) in navList"
	           :key="index"
	           :class="{ active: currentIndex === index }"
	           @tap="handleNavClick(index)"
	        >
	        <view>{{ item.title }}</view>
	        </view>
	    </scroll-view>
	    <scroll-view class="bigcontent"  scroll-y>
	        <view class="content" v-for="(item, index) in dataList" :key="index">
				<view class="content-one">
					<view class="content-top">
						<view class="left">
							<view class="top">{{ item.title }}</view>
							<view class="buttom">{{ item.description }}</view>
						</view>
						<view class="right">
							<image class="imgtest" :src="item.imgUrl" mode="aspectFit" />
						</view>
					</view>
					<view class="content-buttom"></view>
				</view>
	        </view>
	    </scroll-view>
	</view>
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
				navList: [
		        {
		          title: '心血管疾病',
		          data: [
		            {
		              title: '动脉粥样硬化风险自测',
		              description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
		              imgUrl: '/static/icon/healthEstimate/brain.png',
		            },
					{
					  title: '动脉粥样硬化风险自测',
					  description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
					  imgUrl: '/static/icon/healthEstimate/brain.png',
					},
					{
					  title: '动脉粥样硬化风险自测',
					  description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
					  imgUrl: '/static/icon/healthEstimate/brain.png',
					},
					{
					  title: '动脉粥样硬化风险自测',
					  description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
					  imgUrl: '/static/icon/healthEstimate/brain.png',
					},
					{
					  title: '动脉粥样硬化风险自测',
					  description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
					  imgUrl: '/static/icon/healthEstimate/brain.png',
					},
					{
					  title: '动脉粥样硬化风险自测',
					  description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
					  imgUrl: '/static/icon/healthEstimate/brain.png',
					},
					{
					  title: '动脉粥样硬化风险自测',
					  description: '动脉粥样硬化(Atherosclerosis，AS) 是冠...',
					  imgUrl: '/static/icon/healthEstimate/brain.png',
					},
		          ],
		        },
		        {
		          title: '脑血管疾病',
		          data: [
		            {
		              title: '标题3',
		              description: '描述3',
		              imgUrl: 'xxx',
		            },
		            {
		              title: '标题4',
		              description: '描述4',
		              imgUrl: 'xxx',
		            },
		          ],
		        },
				{
				  title: '泌尿道系统疾病',
				  data: [
				    {
				      title: '标题3',
				      description: '描述3',
				      imgUrl: 'xxx',
				    },
				    {
				      title: '标题4',
				      description: '描述4',
				      imgUrl: 'xxx',
				    },
				  ],
				},
				{
				  title: '肛肠消化道疾病',
				  data: [
				    {
				      title: '标题3',
				      description: '描述3',
				      imgUrl: 'xxx',
				    },
				    {
				      title: '标题4',
				      description: '描述4',
				      imgUrl: 'xxx',
				    },
				  ],
				},
				{
				  title: '呼吸道系统疾病',
				  data: [
				    {
				      title: '标题3',
				      description: '描述3',
				      imgUrl: 'xxx',
				    },
				    {
				      title: '标题4',
				      description: '描述4',
				      imgUrl: 'xxx',
				    },
				  ],
				},
		      ],
		      dataList: [],
		      currentIndex: 0,
		    };
		  },
		  mounted() {
		    this.dataList = this.navList[this.currentIndex].data;
		  },
			methods: {
	            open(e) {
	              // console.log('open', e)
	            },
	            close(e) {
	              // console.log('close', e)
	            },
	            change(e) {
	              // console.log('change', e)
	            },
				handleNavClick(index) {
				    if (this.currentIndex !== index) {
				        this.currentIndex = index;
				        this.dataList = this.navList[this.currentIndex].data;
				    }
				},
				changeState(e) {
				  console.log("e:", e);
				},
				selectItem(index) {
				  this.selectedItem = index;
				},
				gotoSearch(){
					uni.navigateTo({
					    url:'/pages/healthEstimate/psychology/search'
					})
				},
	        }
		}
</script>

<style lang="scss">
    .contenttest {
      font-weight: 600;
      color: #313131;
    }
    image {
      width: 220rpx;
      height: 220rpx;
      align-items: center; /* 垂直居中 */
    }

	.img{
		width: 700rpx;
		height: 400rpx;
		margin-left: 28rpx;
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
	.container {
	  display: flex;
	  height: 100%;
	}
	.nav {
	  width: 40%;
	  display: flex;
	  align-items: center;
	  text-align: center;
	}
	.nav view {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  padding: 30rpx;
	  font-size: 30rpx;
	  height: 160rpx;
	  text-align: center;

	}
	.nav view.active {
	  background-color: #ddd;
	  // 激活项的样式
	  &.active {
	    background-color: #ffffff;
	    position: relative;
	  		color: #1AB76C;
	  
	    // 渲染激活项左侧的绿色指示边线
	    &::before {
	      content: ' ';
	      display: block;
	      width: 3px;
	      height: 30px;
	      background-color: #1AB76C;
	      position: absolute;
	      left: 0;
	      top: 50%;
	      transform: translateY(-50%);
	    }
	  }
	}
	.bigcontent{
		background-color: #FFFFFF;
	}
	
	
	.content-one{
		display: flex;
		flex-direction: column;
		height: 190rpx;
	}
	.content-top{
		flex: 1;
		width: 100%;
		height: 155rpx;
		display: flex;
		
	}
	
	
	.left {
		width: 70%;
		height: 160rpx;
		font-size: 10rpx;
		padding: 10rpx;
		margin: 10rpx 10rpx;
	}
	
	.top{
		font-size: 34rpx;
		overflow-wrap: break-word;
		word-break: break-all;
		width: 100%;
		height: 50%;
		display: flex;
		align-items: center; /* 垂直居中 */
	}
	
	.buttom{
		font-size: 25rpx;
		text-align: left;
		overflow-wrap: break-word;
		word-break: break-all;
		width: 100%;
		height: 50%;
		display: flex;
		align-items: center; /* 垂直居中 */
	}
	
	.right {
		width: 30%;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		height: 160rpx; /* 设置容器高度 */
		margin-right: 10rpx;
	}
	
	.imgtest{
		width: 140rpx;
		height: 140rpx;
		margin-right: 25rpx;
	}
	
	
	.content-buttom {
	    height: 2px;
		width: 90%;
	    background-color: #F6F6F6;
		text-align: center;
		margin-left: 25rpx;
		margin-top: 10rpx;
	}
	
	
	
	
	

</style>