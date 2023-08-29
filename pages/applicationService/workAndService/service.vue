<template>
	<view style="background-color: #ffffff;">
		<z-nav-bar title="申请服务">
			<view class="preview" slot="right" @click="savework">
				<text style="font-size: 20rpx;" v-if="addtext">{{ addtext }}</text>
			</view>
		</z-nav-bar>
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<u-cell-group :border="true" class="message" display="flex">
				<u-cell @click="showNameModal" titleStyle="font-size: 14px" size="large" title="会员" :isLink="true">
					<text slot="value" class="u-slot-value">{{ name }}</text>
				</u-cell>
				<u-cell @click="selectDoctor" size="large" titleStyle="font-size: 14px" title="服务人员" :isLink="true">
					<text slot="value" class="u-slot-value">{{ didName }}</text>
				</u-cell>
			</u-cell-group>
			<u-gap height="10"></u-gap>
			<u-cell-group :border="false" class="message">
                <u-cell @click="showdate = true" class="message" titleStyle="font-size: 14px" size="large" title="日期"
					:value="date" :isLink="true">
					<text slot="value" class="u-slot-value">{{ date }}</text>
				</u-cell>
			</u-cell-group>
			</view>

            <view class="u-demo-block uni-flex uni-row service" v-for="item in dataList">
                 <!-- 6、日期 -->
                <view class="flex-item date-body">
                    <text class="cate-text">开始日期</text>
                    <view style="height: 20rpx"></view>
                    <view class="picker" @click="showCreateTime = true">
                        <uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
                            v-model="item.start_time" :clearIcon="false" />
                        <uni-icons type="forward" size="15"></uni-icons>
                    </view>
                </view>	
                <view class="flex-item date-body">
                    <text class="cate-text">结束日期</text>
                    <view style="height: 20rpx"></view>
                    <view class="picker" @click="showEndTime = true">
                        <uni-datetime-picker class="time-picker" :show-icon="true" :border="false"
                            v-model="item.end_time" :clearIcon="false" />
                        <uni-icons type="forward" size="15"></uni-icons>
                    </view>
                </view>
                <u-textarea :placeholder="placeholder2" style="background-color: #f5f2 5f5;margin: 20rpx 0"
							border="false" v-model="item.content"></u-textarea>
            </view>
            
            
            <u-datetime-picker :show="showdate" v-model="chooseDate" :min-date="new Date().getTime()"
			:max-date="new Date('2070/12/31').getTime()" mode="date" closeOnClickOverlay @confirm="confirmdata()"
			@cancel="showdate = false" @close="() => (showdate = false)"></u-datetime-picker>
		</view>
		<!-- <z-navigation></z-navigation> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
                showdate:false,
                showCreateTime:false,
                showEndTime:false,
				addtext:'提交',
                placeholder2:'请输入工单内容',
                chooseDate: Number(new Date()),
				count: 5,
				value: 2,
				albumWidth: 200,
				datetime: '2023-02-02 20:20',
				commentList:[],
				did:" ",
                name:'',
                didName:'',
                date: '',
                dataList:[{
                    start_time: this.formatDate(new Date()),
                    end_time: this.formatDate(new Date()),
                    save_id:0,
                    content:''
                },[],[]]
			}
		},
		onLoad: function () {
            this.getwork()
			this.did = uni.getStorageSync('did');
            this.didName = uni.getStorageSync('didName');
			console.log('did',this.did);
            if(localStorage.getItem('data')){
                this.data = localStorage.getItem('data')
            }
            if(localStorage.getItem('date')){
                this.date = localStorage.getItem('date')
            }
		},
		methods: {
            formatDate(date) {
			var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                var second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
		},
            confirmdata(){
                const timestamp = this.chooseDate
				const date = new Date(timestamp)
				const year = date.getFullYear()
				const month = String(date.getMonth() + 1).padStart(2, '0') // 注意月份从 0 开始计数，需要加 1，并且需要补齐位数
				const day = String(date.getDate()).padStart(2, '0') // 注意日期需要补齐位数
				this.date = `${year}-${month}-${day}`
				this.showdate = false
            },
			getwork(){
				this.$http.post('/user/info',{
                    id:uni.getStorageSync('userInfo')
				}).then((res)=>{
					console.log('res',res);
                    this.name = res.data.fullname
					// this.commentList = res.data.data
				})
			},
            savework(){
                console.log("dataList",this.dataList);
                var filteredArray = this.dataList.filter(function(value) {
                    return value !== null && value !== undefined && value !== '';
                });
                this.$http.post('/work/create',{
                    did:this.did,
                    data:filteredArray,
                    date:this.date,
                }).then((res)=>{
                    console.log(res);
                })
            },
			selectDoctor(){
                let index = '服务人员'
                localStorage.setItem('data',this.data)
                localStorage.setItem('date',this.date)
                localStorage.setItem('did',this.did)
				uni.navigateTo({
			    	url:'/pages/message/addressBook?title=' + index
			  })
			}
		}
	}
</script>

<style lang="scss">
	@import '@/style/mixin.scss';

	.message {
		background-color: #ffffff;
	}

	.u-slot-value {
		color: gray;
		font-size: 14px;
	}

	.form_but {
		background-color: rgb(32, 198, 162);
		color: #ffffff;
		border-radius: 50upx;
	}
    .date-body {

        display: flex;
        flex-direction: row;
        align-items: center;
        .cate-text {
            flex: 1;
        }
        background-color: white;
        // padding: 30rpx;
        // margin-bottom: 100rpx;


        .date {
            margin-right: 25rpx;
        }

        .picker {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            // width: 50%;
            // max-width: 200px;


            .time-picker {
                margin-right: 220rpx;
            }
        }
    }
    .service{
        margin-top: 20px;
        margin-bottom: 20px;
    }

</style>