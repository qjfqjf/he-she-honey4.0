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
			<u-button type="success" size="normal"  align="center" text="开始测试" @click="gotoExam(id)"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function (option) {
			console.log(option.e); 
			this.id = option.e;
			console.log('id',this.id);
			this.searchData();
		},
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
				toUrl:'/mmpt_question/index',
				QuestionUrl:'/mmpt_question/info',
				id:'',
			};
			
		},
	methods:{
		searchData(){
			this.$http.post(this.toUrl,{
				id:this.id,
				area_type: 2
			}).then(res=>{
				console.log('res',res);
				// this.avatar = imgUrl;
				// this.examNum = res.data.data[0]
				this.ExamPeople = res.data.data[0].sum
				this.text = res.data.data[0].desc
			}).catch(error => {
				console.error('请求发生错误', error);
			});
			this.$http.post(this.QuestionUrl,{
				id:this.id,
				type:"no"
			}).then(res=>{
				console.log('res',res);
				// this.avatar = imgUrl;
				// this.examNum = res.data.data[0]
				this.examNum = res.data.total
			}).catch(error => {
				console.error('请求发生错误', error);
			});
		},
        rightClick() {
            console.log('rightClick');
        },
		gotoExam(e){
			console.log('e',e);
			uni.navigateTo({
				url:'/pages/healthEstimate/psychology/Exam/Exam?e=' + e
			})
		},
    },
	
	}
</script>

<style lang="scss">

	.text{
		margin:20px;
	}
</style>
