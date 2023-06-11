<template>
  <view class="contenttest">
    <z-nav-bar title="心理测评">
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
	    <scroll-view class="nav" scroll-y="true">
	        <view
	           v-for="(item, index) in navList"
	           :key="index"
	           :class="{ active: currentIndex === index }"
	           @tap="handleNavClick(index)"
	        >
	        <view>{{ item.title }}</view>
	        </view>
	    </scroll-view>
	    <scroll-view class="bigcontent"  scroll-y="true">
	        <view class="content" v-for="(item, index) in dataList" :key="index">
				<view class="content-one" @click="gotoIndex">
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
						title: '健康',
						data: [
						{
							title: '综合心理健康测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你的心理压...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '焦虑自评量表SAS',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '贝克-拉范森躁狂...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '贝克抑郁测评量...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '伯恩斯抑郁症清...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '精神分裂测评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '阿森斯失眠测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你是否需要...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '汉米尔顿焦虑...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '心理成熟度测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '孤独感测试-UCLA',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '密西根酒精依赖测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '心理年龄测试...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '心理适应性测评量表...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '亚健康状况自我...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '心理垃圾对照检查表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '拖延症测评：...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '强迫症测评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '你是否患上了...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '网瘾测评：你是否',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '心理承受能力测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '抑郁程度测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '马洛斯安全感...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '自信心测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '贝克焦虑测评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '恐惧症测评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '安全感测试：...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '抗挫折能力测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '情感缺失测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '艾森克情绪稳定...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '爱丁堡产后抑郁...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '老年人抑郁筛查...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '自杀态度调查...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '自卑心理测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '产前抑郁测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '厌食症风险测评...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '双向情感障碍自测',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						],
					},
					{
						title: '情感',
						data: [
						{
							title: '测试你的恋爱智...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '成人依恋-亲密...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '恋爱类型测试-...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你的恋爱...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '婚姻幸福度测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '婚姻安全界线测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '生活满意度测试',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你的"爱情..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '婚姻质量综合评估...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你们之间是纯...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你是一个重..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '离婚危险性测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测测他有家暴倾向',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试哪种类型的..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你们会旧情复燃...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测测他有家暴倾向',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试哪种类型的..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你们会旧情复燃...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你的桃花运',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测你陷入爱情雷区的..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '3分钟测出你们的真实...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测你会嫁给那种人会..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你是不是花心大萝卜...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测一测你的古代身份',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '回到古代你会嫁给哪..."',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '你的恋爱距离有多远...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测测你的最佳"婚点"...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测一测你是古代哪个...',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						],
					},
					{
					title: '亲子',
					data: [
						{
							title: '亲子关系测评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '家庭环境测评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '中学生综合心理健康',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '考试焦虑自评量表',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '青春期逆反心理测评',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '测试你属于哪一类型',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '儿童孤独症/自闭症',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '儿童孤独症/自闭症',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '孩子专注力测试',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
						{
							title: '逆反心理测试',
							description: '在现实生活中，心理健康和生理健康是互相联系、互相作用的...',
							imgUrl: '/static/icon/healthEstimate/brain.png',
						},
					],
					},
					{
					title: '人格',
					data: [
						{
							title: '大五人格测评量表',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '性格内外倾向测量',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '菲尔人格测评量表',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '人格魅力测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '气质类型测试',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '测试你是讨好型人格',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '测试你是一个杠精么',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '医学AB型人格测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '测试你的虚荣心有多强',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '自恋人格测试',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '潜意识分析：你隐藏',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '测试你是否具有幽默感',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '情商(EQ)测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
					],
					},
					{
					title: '人际',
					data: [
						{
							title: '社交恐惧症测评',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '人际关系综合诊断测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '社会适应能力测评',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '人际信任(ITS)测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '容纳他人程度测评',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '交际他人程度测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '交际能力测评',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '大学生人际交往心理',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '社交回避及苦恼量表',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '测试你最出众的能力',
							description: '描述4',
							imgUrl: 'xxx',
						},
					],
					},
					{
					title: '性心理',
					data: [
						{
							title: '同性恋倾向测试',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '哈佛性向测试',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '测试男人你对你的性幻想',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '贝姆性别角色测评',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '性取向测试',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '性心理成熟度测试',
							description: '描述4',
							imgUrl: 'xxx',
						},
						{
							title: '测试你的好色程度',
							description: '描述3',
							imgUrl: 'xxx',
						},
						{
							title: '测测你的性生活够...',
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
			gotoIndex(){
				uni.navigateTo({
					url:'/pages/healthEstimate/psychology/Exam/index'
				})
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
		width:100%;
		height: 1400rpx;
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
		font-size: 38rpx;
		overflow-wrap: break-word;
		word-break: break-all;
		width: 100%;
		height: 50%;
		
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