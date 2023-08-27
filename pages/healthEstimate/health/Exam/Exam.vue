<template>
	<view>
		<z-nav-bar title="问卷">
		</z-nav-bar>
		<exam-widght 
		:dataList='QuestionList' 
		:index="index" 
		@select='selectItem' 
		@selectFinish='selectFinish' 
		@finish='finish'
		:numBoxType='numBoxType'
		:showIndexText='showIndexText'
		:numBoxShow='numBoxShow'
		>
		</exam-widght>
		
		<view style="text-align: center;padding: 20rpx;">------------分割线-----------</view>
		<view>
			<button size="mini" @tap="jump()">跳转10题</button>
			 
			<button style="margin-left: 20rpx;" size="mini" @tap="switchIndexBox()">题号显示切换</button>
			
			<button style="margin-left: 20rpx;" size="mini" @tap="switchBoxType()">题号显示类型({{numBoxType == 0? '下拉' : '弹框'}})</button>
		</view>
	</view>
</template>

<script>
	import examWidght from '../../../../components/Li-ExamWidght/Li-ExamWidght.vue';
	var _this;
	export default {
		components: {
			examWidght
		}, 
		data() {
			return {
				//题目页数
				fldTestPaperID: undefined,
				//题目号
				fldTestRecordID: undefined,
				showIndexText:true, //题号文字是否显示
				numBoxShow:false, 
				items: [],
				index: 0,
				numBoxType:0,
				QuestionList:[],
				id:'',
				score:[],
				QuestionUrl:'/mmpt_question/info',
				answer:''
			}	
		},
		onLoad: function (opt) {
			console.log(opt.e); 
			this.id = opt.e;
			console.log('id',this.id);
			// console.log(111)
			_this = this;
			setTimeout(function(){
				_this.getTestPaper();
			},100)
		},
		onUnload() {},
		methods: {
			switchBoxType(){
				this.numBoxType = this.numBoxType == 0? 1 : 0;
			},
			jump(){
				this.index = 9;
			},
			switchIndexBox(){
				this.numBoxShow = !this.numBoxShow;
			},
			finish(item) {
				console.log("-----finish------")
				console.log(item)
				const sum = Object.values(this.score)
				.map(Number)
				.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
				this.$http.post('/mmpt_question/save',{
					uid:uni.getStorageSync('userInfo'),
					question_id:this.id,
					data:this.score
				}).then(response =>{
					console.log('response',response);
				})
				uni.showToast({
					title: '提交成功',
					duration: 2000,
					success: () => {
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/healthEstimate/psychology/psychology',
								success: (res) => {
									console.log(res)
								},
								fail: (err) => {
									console.log(err)
								},
							})
						}, 1000)
					},
				})
				// console.log('sum: ' ,sum);
				// uni.navigateTo({
				// 	url:'/pages/healthEstimate/psychology/psychology'
				// })
			},
			selectItem(item) {
				console.log("-----selectItem------")
				console.log(item)
				
			},
			selectFinish(item) {
				console.log("-----selectFinish------")
				console.log(item)
				console.log("score",this.score);
				let index = item.newItem.index + 1;
				console.log(item.currentItem.anwser-1);
				console.log("score",item.newItem.question.QuestionOptionList[item.currentItem.anwser-1].fldOptionScore);
					if (item.currentItem.anwser) {
						switch (item.currentItem.anwser) {
							case 1:
							// 当anwser等于1时执行的代码
							this.answer = 'A'
							break;
							case 2:
							// 当anwser等于2时执行的代码
							this.answer = 'B'
							break;
							case 3:
							// 当anwser等于3时执行的代码
							this.answer = 'C'
							break;
							case 4:
							// 当anwser等于4时执行的代码
							this.answer = 'D'
							break;
							case 5:
							// 当anwser等于5时执行的代码
							this.answer = 'E'
							break;
							case 6:
							// 当anwser等于5时执行的代码
							this.answer = 'F'
							break;
							case 7:
							// 当anwser等于5时执行的代码
							this.answer = 'G'
							break;
							case 8:
							// 当anwser等于5时执行的代码
							this.answer = 'H'
							break;
							case 9:
							// 当anwser等于5时执行的代码
							this.answer = 'I'
							break;
							case 10:
							// 当anwser等于5时执行的代码
							this.answer = 'J'
							break;
							case 11:
							// 当anwser等于5时执行的代码
							this.answer = 'K'
							break;
							case 12:
							// 当anwser等于5时执行的代码
							this.answer = 'L'
							break;
							case 13:
							// 当anwser等于5时执行的代码
							this.answer = 'M'
							break;
							default:
							// 当anwser等于5时执行的代码
							this.answer = 'N'
							break;
						}
					}	
					const  existingItem = this.score.find((change) => change.q_id === item.newItem.question.questionID)
					if(existingItem){
						existingItem.q_id = item.newItem.question.questionID
						existingItem.result = this.answer
						existingItem.score = item.newItem.question.QuestionOptionList[item.currentItem.anwser-1].fldOptionScore
					}else{
						this.score.push({
							q_id: item.newItem.question.questionID,
							result: this.answer,
							score: item.newItem.question.QuestionOptionList[item.currentItem.anwser-1].fldOptionScore
						});
					}
				console.log("score",this.score);
			},
			getTestPaper() {
				// let data = require('../../static/data.json')  ;
				this.$http.post(this.QuestionUrl,{
					id:this.id,
				}).then(res=>{
					console.log('res',res);
					this.fldTestPaperID = res.data.data.length;
					// this.score = new Array(this.fldTestPaperID).fill(null)
					console.log('fldTestPaperID',this.fldTestPaperID);
					res.data.data.forEach((element,index) => {
						this.QuestionList.push({
							questionID: element.id,
							fldName: element.question_desc,
							questionType: 0,
							QuestionOptionList: []
						});
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_a,
							fldOptionScore: element.sel_a_score,
							fldOptionStep: element.sel_a_step,
							fldOptionIndex: 1
						});
						if(element.sel_b)
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_b,
							fldOptionScore: element.sel_b_score,
							fldOptionStep: element.sel_b_step,
							fldOptionIndex: 2
						});
						if (element.sel_c) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_c,
							fldOptionScore: element.sel_c_score,
							fldOptionStep: element.sel_c_step,
							fldOptionIndex: 3
						});
						}
						if (element.sel_d) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_d,
							fldOptionScore: element.sel_d_score,
							fldOptionStep: element.sel_d_step,
							fldOptionIndex: 4
						});
						}
						if (element.sel_e) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_e,
							fldOptionScore: element.sel_e_score,
							fldOptionStep: element.sel_e_step,
							fldOptionIndex: 5
						});
						}
						if (element.sel_f) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_f,
							fldOptionScore: element.sel_f_score,
							fldOptionStep: element.sel_f_step,
							fldOptionIndex: 6
						});
						}
						if (element.sel_g) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_g,
							fldOptionScore: element.sel_g_score,
							fldOptionStep: element.sel_g_step,
							fldOptionIndex: 7
						});
						}
						if (element.sel_h) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_h,
							fldOptionScore: element.sel_h_score,
							fldOptionStep: element.sel_h_step,
							fldOptionIndex: 8
						});
						}
						if (element.sel_i) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_i,
							fldOptionScore: element.sel_i_score,
							fldOptionStep: element.sel_i_step,
							fldOptionIndex: 9
						});
						}
						if (element.sel_j) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_j,
							fldOptionScore: element.sel_j_score,
							fldOptionStep: element.sel_j_step,
							fldOptionIndex: 10
						});
						}
						if (element.sel_k) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_k,
							fldOptionScore: element.sel_k_score,
							fldOptionStep: element.sel_k_step,
							fldOptionIndex: 11
						});
						}
						if (element.sel_l) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_l,
							fldOptionScore: element.sel_l_score,
							fldOptionStep: element.sel_l_step,
							fldOptionIndex: 12
						});
						}
						if (element.sel_m) {
						this.QuestionList[index].QuestionOptionList.push({
							fldOptionText: element.sel_m,
							fldOptionScore: element.sel_m_score,
							fldOptionStep: element.sel_m_step,
							fldOptionIndex: 13
						});
						}
						if (element.question_type_id) {
							let title = '1/' + _this.QuestionList.length
							if (element.question_type_id == 1001)
								title += "  单选题";
							else if (element.question_type_id == 2001)
								title += "  多选题";
							else
								title += "  填空题";
							uni.setNavigationBarTitle({
								title: title
							});
						}
					})
					console.log('数据', this.QuestionList);
					// this.avatar = imgUrl;
					// this.examNum = res.data.data[0]
					// this.examNum = res.data.total
				}).catch(error => {
					console.error('请求发生错误', error);
				});
			}
		}
	}
</script>

<style>

</style>
