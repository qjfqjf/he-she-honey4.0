<template>
	<view class="bgView">
		<z-nav-bar title="心电图">
		</z-nav-bar>
		<view>
               
				<view class="mt-3 mb-3" >
					<lime-ecg :ecgList="ecgArr"/>
				</view>
		</view>
		<!-- <view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="startConnect()">开始连接</view>
		<view style="width: 200rpx;height: 50rpx;background-color: bisque;" @click="showReport()">显示心电图记录</view> -->
		<view><text>姓名 :{{name}} , 性别 :{{sex}}</text></view>
		<view><text>出生日期 :{{birthday}}</text></view>
		<view><text>身高(cm) :{{stature}} , 体重(kg) :{{weight}}</text></view>
		<view><text>时间 :{{time}},心率 :{{ hr }}</text></view>
		<view><text>分析结果 :{{result_cn}}</text></view>
	</view>
</template>

<script>
	let ecgView = null;
	export default {
		data() {
			return {
				ecgArr:[],

				name: "",
				sex: "",
				birthday: "",
				stature: "",
				weight: "",
				time: "",
				hr: "",
				result_cn: "",
				id:10

			}
		},
		onLoad(options) {
			// this.uid = this.userInfo
			// 获取URL参数
			this.id = options.id
			this.uid = options.uid
		},
		mounted() {
			ecgView = this.$refs.ecgView;
			console.log(111111111111111111, ecgView);
			this.getEcg()
		},
		methods: {
			getEcg(){
				this.$http.post("/ecg/info",{
					id: this.id
				}).then((res)=>{
					if(res.data){
						this.name = res.message.fullname
						this.sex = res.message.sex_cn
						this.birthday = res.message.birthday
						this.stature = res.message.stature
						this.weight = res.message.weight
						this.time = res.data.time
						this.hr = res.data.hr
						this.result_cn = res.data.result_cn
						this.ecgArr = res.data.value.split(",").map(Number)
						const divider = 2;
						this.ecgArr = this.ecgArr.map((num) => (num-2000) / divider);
					}
					
				})
				console.log('ecgArr',this.ecgArr);
			},
			startConnect: function() {
				console.log(1111)
				ecgView.connect();

			},
			showReport: function() {
				ecgView.showReport();
			}
		}
	}
</script>

<style>
	.bgView {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
</style>