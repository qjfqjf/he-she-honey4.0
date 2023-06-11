<template>
	<view>
		<view>
			<u-navbar title="测评" @rightClick="rightClick" :autoBack="true"></u-navbar>
			<u--image :src="avatar" class="avatar" width="100%"></u--image>
		</view>
		<view>
			<u-row gutter="16">
				<u-col span="5">
					<view class="demo-layout bg-purple " align="left">已测：{{ ExamPeople }}人
					</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout bg-purple ">
					</view>
				</u-col>
				<u-col span="5">
					<view class="demo-layout bg-purple-light" align="right" >题目数：{{ examNum }}道
					</view>
				</u-col>
			</u-row>
		</view>
		<view>
			<u--text size="24" type="success" text="测评介绍" align="center" style="margin-bottom: 20px;margin-top: 10px;"></u--text>
		</view>
		<view class="text" style=" font-style:italic;">
			{{ text }}
		</view>
		<view style="margin: 30px;">
			<u-button type="success" size="normal"  align="center" text="开始测试" @click="gotoExam"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//测试介绍图片
				avatar: '',
				//测试题数
				examNum:'',
				//已经测试的人数
				ExamPeople:'',
				//测试介绍文本
				text:'',
			};
		},
		methods:{
		searchData(){
			
		},
        rightClick() {
            console.log('rightClick');
        },
		gotoExam(){
			uni.navigateTo({
				url:'/pages/healthEstimate/psychology/Exam/Exam'
			})
		}
    }
	}
</script>

<style lang="scss">

	.text{
		margin:20px;
	}
</style>
