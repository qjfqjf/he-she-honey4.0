<template>
	<view class="d-flex flex-column j-sb h-100">
		<z-nav-bar title="基础档案"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="flex-1">
			<view class="background">
				<view class="per">
					<view class="left">
						<u-avatar
								:src="avatar"
								size="60"
								class="avatar"
						></u-avatar>
						<view class="name">{{ name }}</view>
					</view>
					<view class="right">
						<view class="center">
							<view class="msg">
								<view class="title">性别</view>
								<view class="msg2">{{ gender }}</view>
							</view>
							<view class="msg">
								<view class="title">身高(cm)</view>
								<view class="msg2">{{ height }}</view>
							</view>
							<view class="msg">
								<view class="title">年龄</view>
								<view class="msg2">{{ age }}</view>
							</view>
							<view class="msg">
								<view class="title">体重(kg)</view>
								<view class="msg2">{{ weight }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="u-demo-block__content">
				<u-subsection
						:list="list"
						mode="button"
						:current="current"
						activeColor="rgb(57,185,105)"
						bgColor="#ffffff"
						@change="change"
				></u-subsection>
			</view>

			<!--		<view class="uni-form-item uni-column d-flex a-center shadow-sm border " v-for="info in baseInfo" :key="info">-->
			<!--			<view class="m-2 font-md" style="width: 30%">{{info}}</view>-->
			<!--			<input class="uni-input font-md" maxlength="10" placeholder="请输入" />-->
			<!--		</view>-->
			<doc-list v-if="current === 0" :cell-list="signInfo"></doc-list>
			<doc-list v-if="current === 1" :cell-list="baseInfo"></doc-list>
			<doc-list v-if="current === 2" :cell-list="history"></doc-list>
			<doc-choice v-if="current === 2" :cell-choice="choices"></doc-choice>
			<doc-list v-if="current === 3" :cell-list="history"></doc-list>
		</view>
		<view>
			<u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
				<view class="m-5">
					<text>请检查填写格式是否有误</text>
				</view>
				<u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
			</u-popup>
		</view>
		<u-button @click="show = true" type="primary" text="提交"></u-button>
	</view>
</template>

<script>
	import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
	import DocList from "../componments/docList.vue";
	import DocChoice from "../componments/docChoice.vue";
	export default {
		components: {DocList, UButton, DocChoice},
		data() {
			return {
				show: false,
				current: 0,
				avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
				name: '彭老师',
				gender: '男',
				height: 173,
				age: '60岁',
				weight: 73,
				list:['签约信息', '基本信息', '既往史', '家族史'],
				signInfo:['签约日期', '签约医生', '签约类型'],
				baseInfo:['身份证号码:','手机号码:','出生日期:', '联系人姓名:','联系人电话:','常驻户籍:','民族;','家庭住址:','家庭住址:','血型:'
					,'RH阴性:','文化程度:', '职业:','婚姻状况:','药物过敏史:','暴露史:','暴露史:'
				],
				history:[
						'疾病一','疾病二'
				],
				choices:[
						"是否有手术","是否有外伤"
				]
			}
		},
		methods: {
			change(index) {
				this.current = index
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			}
		}
	}
</script>

<style>
	.background{
		position: relative;
		background-image: url('../../../static/icon/healthFile/background.png');
		height: 420upx;
		width: 100%;
		background-size: cover;

	}
	.per{
		background-color: #ffffff;
		height:200upx;
		width: 100%;
		position: absolute;
		bottom: 0;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		}
	.left {
	  float: left;
	  width: 25%;
	  height: 100%;

	}

	.right {
	  float: right;
	  width: 75%;
	  height: 100%;
	  display: flex;
	  justify-content: center;
	  padding-top: 70upx;
	}
	.avatar {
	position: absolute;
	left: 15px;
	top: -26px;
	}

	.name {
	  margin-top: 92upx;
	  text-align: center;
	  font-weight: bold;
	}

	.center {
	  height: 120upx;
	  width: 100%;
	  display: flex;
	  justify-content: left;
	}

	.msg{
		height: 100%;
		width: 25%;
		display: flex;
		flex-direction: column;
	}
	.title{
		margin: 0 auto;
		font-size: 24upx;
	}
	.msg2{
		margin: 10upx auto;
		font-weight: bold;
	}
</style>
