<template>
  <view>
    <z-nav-bar title="症状自述"></z-nav-bar>
    <public-module></public-module>

    <view class="container">
      <view class="self-report">
        <textarea class="textarea" v-model="remarksValue" placeholder="症状自述" />
        <textarea class="textarea" v-show="show" v-model="way" placeholder="方法描述" />
        <textarea class="textarea" v-show="show" v-model="recipel" placeholder="处方描述" />
        <textarea class="textarea" v-show="show" v-model="eval" placeholder="评估描述" />
      </view>
      <u-gap height="10"></u-gap>
			<u-cell-group :border="false" class="message" v-show="show">
          <u-cell @click="showdate = true" class="message" titleStyle="font-size: 14px" size="large" title="日期"
					:value="date" :isLink="true">
					<text slot="value" class="u-slot-value">{{ date }}</text>
				</u-cell>
			</u-cell-group>
      <u-datetime-picker :show="showdate" v-model="chooseDate" :min-date="new Date().getTime()"
			:max-date="new Date('2070/12/31').getTime()" mode="date" closeOnClickOverlay @confirm="change = true"
			@cancel="showdate = false" @close="() => (showdate = false)"></u-datetime-picker>
      <button plain="true" @click="saveReport">保存</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        remarksValue:'',
        way:'',
        recipel:'',
        eval:'',
        type:0,
        showdate:false,
        show:false,
        change:false,
        date: '',
        chooseDate: Number(new Date()),
      };
    },
    onLoad: function (option) {
      console.log('type',option.type);
      this.type= Number(option.type);
      if(this.type ==2 || this.type ==1){
        this.show = true
      } 
		},
    //方法
    methods: {
      async confirmdata(){
        const timestamp = this.chooseDate
				const date = new Date(timestamp)
				const year = date.getFullYear()
				const month = String(date.getMonth() + 1).padStart(2, '0') // 注意月份从 0 开始计数，需要加 1，并且需要补齐位数
				const day = String(date.getDate()).padStart(2, '0') // 注意日期需要补齐位数
				this.date = `${year}-${month}-${day}`
				this.showdate = false
        this.change = false
      },
      saveReport() {
        
        if (this.type !=1 && this.type != 2){
          this.$http.post('/medical_file/save',{
            uid:uni.getStorageSync('userInfo'),
            type:this.type,
            symptom : this.remarksValue
          }).then((res)=>{
          console.log(res);
          if(res.message=='保存成功')
            {
              uni.showToast({
                title: '保存成功',
                duration: 1000,
                success: () => {
                setTimeout(() => {
                  uni.redirectTo({
                    url: '/pages/healthManagement/medical/index',
                  success: (res) => {
                    console.log(res)
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                  });
                }, 1000);
                }
              });
            }
          })
        }else if(this.type==1){
          this.$http.post('/medical_file/save',{
            uid:uni.getStorageSync('userInfo'),
            type: this.type,
            symptom : this.remarksValue,
            way :this.way,
            recipel:this.recipel,
            eval:this.eval,
            time : this.date
          }).then((res)=>{
          console.log(res);
          if(res.message=='保存成功')
            {
              uni.showToast({
                title: '保存成功',
                duration: 1000,
                success: () => {
                setTimeout(() => {
                  uni.redirectTo({
                    url: '/pages/healthManagement/medical/index',
                  success: (res) => {
                    console.log(res)
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                  });
                }, 1000);
                }
              });
            }
          })
        }else if(this.type==2){
          this.$http.post('/medical_file/save',{
            uid:uni.getStorageSync('userInfo'),
            type:this.type,
            symptom : this.remarksValue,
            way :this.way,
            recipel:this.recipel,
            eval:this.eval,
            time : this.date
          }).then((res)=>{
          console.log(res);
          if(res.message=='保存成功')
            {
              uni.showToast({
                title: '保存成功',
                duration: 1000,
                success: () => {
                setTimeout(() => {
                  uni.redirectTo({
                    url: '/pages/healthManagement/medical/index',
                  success: (res) => {
                    console.log(res)
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                  });
                }, 1000);
                }
              });
            }
          })
        }
      
      },
      click(url, name) {
        if (!url) {
          this.$refs.uToast.default('开发中...')
        }
        uni.navigateTo({
          url: url
        });

        ;
      }

    },
    watch: {
      change: function(newVal, oldVal) {
        // 当 this.chooseDate 发生变化时，将会触发这个函数
        console.log('change 变化啦！新值为：', newVal);
        console.log('旧值为：', oldVal);
        if(this.change) this.confirmdata()
        // 在这里可以执行其他逻辑或操作，根据新的值做出相应的处理
      }
    }
  }
</script>

<style lang="scss">
	.message {
		background-color: #ffffff;
	}
  .container {
    .self-report {
      background-color: white;
      border-top: 1rpx solid #ececec;
      padding: 36rpx;
      background-color: white;

      .textarea {
        font-weight: 600;
        height: 200rpx;
        font-size: 28rpx;
      }

    }

    button {
      color: white;
      background-color: #20c6a2;
      border-radius: 50rpx;
      margin: 30rpx;
      border: none;
    }
    
  }
</style>