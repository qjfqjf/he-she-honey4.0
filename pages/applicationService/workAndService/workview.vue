<template>
	<view style="background-color: #ffffff;">
		<z-nav-bar title="服务详情">
		</z-nav-bar>
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<u-cell-group :border="true" class="message" display="flex">
				<u-cell  titleStyle="font-size: 14px" size="large" title="会员" :isLink="true">
					<text slot="value" class="u-slot-value">{{ name }}</text>
				</u-cell>
				<u-cell size="large" titleStyle="font-size: 14px" title="服务人员" :isLink="true">
					<text slot="value" class="u-slot-value">{{ didName }}</text>
				</u-cell>
			</u-cell-group>
			<u-gap height="10"></u-gap>
			<u-cell-group :border="false" class="message">
                <u-cell  class="message" titleStyle="font-size: 14px" size="large" title="日期"
					:value="date" :isLink="true">
					<text slot="value" class="u-slot-value">{{ date }}</text>
				</u-cell>
			</u-cell-group>
			</view>

            <view class="u-demo-block uni-flex uni-row service" v-for="item in dataList">
                 <!-- 6、日期 -->
                 <u-cell-group :border="false" class="message">
                    <u-cell  class="message" titleStyle="font-size: 14px" size="large" title="开始日期"
					:value="date" :isLink="true">
					    <text slot="value" class="u-slot-value">{{ item.start_time }}</text>
				    </u-cell>
			    </u-cell-group>
                <u-cell-group :border="false" class="message">
                    <u-cell  class="message" titleStyle="font-size: 14px" size="large" title="结束日期"
					:value="date" :isLink="true">
					    <text slot="value" class="u-slot-value">{{ item.end_time }}</text>
				    </u-cell>
			    </u-cell-group>
                <u-textarea :placeholder="placeholder2" style="background-color: #f5f2 5f5;margin: 10rpx 0"
							border="false" v-model="item.content" disabled="true"></u-textarea>
            </view>
            
            
            <u-datetime-picker :show="showdate" v-model="chooseDate" :min-date="new Date().getTime()"
			:max-date="new Date('2070/12/31').getTime()" mode="date" closeOnClickOverlay @confirm="confirmdata()"
			@cancel="showdate = false" @close="() => (showdate = false)"></u-datetime-picker>
		</view>
    </view>
		<!-- <z-navigation></z-navigation> -->
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
				id:" ",
                name:'',
                didName:'',
                date: '',
                dataList:[]
			}
		},
		onLoad: function (option) {
            
			this.id = option.id;
            // this.didName = uni.getStorageSync('didName');
			console.log('id',this.id);
            if(localStorage.getItem('data')){
                this.data = localStorage.getItem('data')
            }
            if(localStorage.getItem('date')){
                this.date = localStorage.getItem('date')
            }
            this.getwork()
		},
		methods: {
            parseDate(timeString) {
                if (timeString && typeof timeString === 'string') {
                    var timeComponents = timeString.split(':');
                    var hour = parseInt(timeComponents[0]);
                    var minute = parseInt(timeComponents[1]);
                    var second = parseInt(timeComponents[2]);

                    // 创建一个当前日期对象，并使用设定好的时间分量
                    var currentDate = new Date();
                    currentDate.setHours(hour);
                    currentDate.setMinutes(minute);
                    currentDate.setSeconds(second);

                    return currentDate;
                } else {
                    console.error('Invalid time string');
                    return null;
                }
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
				this.$http.post('/work/info',{
                    id: this.id
				}).then((res)=>{
					console.log('res',res);
                    this.name = res.data.fullname
                    this.didName = res.data.doctorname
                    this.date = res.data.date
                    res.data.data.forEach(element => {
                        this.dataList.push(element)
                    });
                    // this.dataList.start_time = this.parseDate(this.dataList.start_time)
                    // this.dataList.end_time = this.parseDate(this.dataList.end_time)
                    console.log('dataList',this.dataList);
					// this.commentList = res.data.data
				})
			},
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