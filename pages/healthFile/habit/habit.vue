<template>
	<view>
		<z-nav-bar title="生活习惯"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-collapse @change="change" @close="close" @open="open">
			<u-collapse-item title="饮食习惯" name="Docs guide" class="item">
				<view>
					<view class="uni-form-item uni-column" v-for="info in habitList">
						<view class="m-2 font-md font-weight">{{ info.question }}</view>
						<u-radio-group :v-model="radioGroupValue">
							<view>
								<view>
									<u-radio v-for="item in info.choice" class="mt-4 ml-2"
										:customStyle="{ marginBottom: '8px' }" :name="item" :checked="false" @change="updateHabitAnswer(item)">{{ item
										}}</u-radio>
								</view>
							</view>
						</u-radio-group>
						<!-- <doc-choice class="mt-4" :value="info.value" :cell-choice="info.options"></doc-choice> -->
					</view>
				</view>
				<!-- <input-and-choice-form :cell ="lists"></input-and-choice-form> -->
			</u-collapse-item>
			<u-collapse-item title="运动习惯" name="Variety components" class="item">
				<view>
					<view class="uni-form-item uni-column" v-for="(info, index) in sportLists">
						<view class="m-2 font-md font-weight">{{ info.question }}</view>

						<view class="mt-4 ml-2">
							<view class="input-wrapper">
								<label>{{ info.subTitle }}</label>
								<input type="text" class="uni-input input" maxlength="10" placeholder="请输入"
									database="database" :disabled="sportDisableInput[index]" @input="handInput" />
							</view>
							<view>
								<u-checkbox-group :v-model="radioGroupValue">
									<view>
										<view>
											<u-checkbox v-for="item in info.choice" :customStyle="{ marginBottom: '8px' }"
												:name="item" :label="item"
												@change="updateSportInputStatus(index)"></u-checkbox>
										</view>
									</view>
								</u-checkbox-group>
							</view>

							<!-- <doc-choice class="mt-4" :value="info.value" :cell-choice="info.options"></doc-choice> -->
						</view>
					</view>
				</view>
				<!-- <input-and-choice-form :cell ="sportLists"></input-and-choice-form> -->
			</u-collapse-item>
			<u-collapse-item title="个人嗜好" name="Numerous tools" class="item">
				<view>
					<view class="uni-form-item uni-column" v-for="(info, index) in hobbyList">
						<view class="m-2 font-md font-weight">{{ info.question }}</view>
						<view class="mt-4 ml-2">
							<view v-show="index == 4">
								<view v-for="dex in info.subTitle" class="input-wrapper">
									<label>{{ dex }}</label>
									<input type="text" class="uni-input input" maxlength="10" placeholder="请输入"
										database="database" :disabled="disableInput" />
								</view>
								<view>
									<u-checkbox-group :v-model="radioGroupValue">
										<view>
											<view>
												<u-checkbox v-for="item in info.choice"
													:customStyle="{ marginBottom: '8px' }" :name="item" :label="item"
													@change="updateInputStatus"></u-checkbox>
											</view>
										</view>
									</u-checkbox-group>
								</view>
							</view>
							<view v-show="index != 4">
								<u-radio-group :v-model="radioGroupValue">
									<view>
										<view>
											<u-radio v-for="item in info.choice" :customStyle="{ marginBottom: '8px' }"
												:name="item">{{ item }}</u-radio>
										</view>
									</view>
								</u-radio-group>
							</view>
							<!-- <doc-choice class="mt-4" :value="info.value" :cell-choice="info.options"></doc-choice> -->
						</view>
					</view>
				</view>
				<!-- <input-and-choice-form :cell ="hobbyList"></input-and-choice-form> -->
			</u-collapse-item>
		</u-collapse>
		<view>
			<u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
				<view class="m-5">
					<text>请检查填写格式是否有误</text>
				</view>
				<u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary" text="关闭"></u-button>
			</u-popup>
		</view>
		<u-button @click="show = true" type="primary" text="提交"></u-button>
	</view>
</template>

<script>
import inputAndChoiceForm from "../components/inputAndChoiceForm.vue";
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";
export default {
	data() {
		return {
			dex: false,
			sportDisableInput: Array(8).fill(false),
			inputValue: '',
			disableInput: false,
			radioGroupValue: true,
			show: false,
			habitAnswer: [],
			sportAnswer: [],
			hobbyAnswer: [],
			habitList: [
				{
					question: "每日进餐情况是否规律",
					choice: ["规律(每日进餐次数和时间基本一致)", "不规律(每日进餐次数，进餐时间等变化较大)"]
				},
				{
					question: "早餐情况",
					choice: ["每天都吃", "经常吃(5~6天/周)", "有时吃(3~4天/周)", "偶尔吃(1~2天/周)", "从来不吃"]
				},
				{
					question: "上午加餐情况",
					choice: ["每天都吃", "经常吃(5~6天/周)", "有时吃(3~4天/周)", "偶尔吃(1~2天/周)", "从来不吃"]
				},
				{
					question: "午餐情况",
					choice: ["每天都吃", "经常吃(5~6天/周)", "有时吃(3~4天/周)", "偶尔吃(1~2天/周)", "从来不吃"]
				},
				{
					question: "下午加餐情况",
					choice: ["每天都吃", "经常吃(5~6天/周)", "有时吃(3~4天/周)", "偶尔吃(1~2天/周)", "从来不吃"]
				},
				{
					question: "晚餐情况",
					choice: ["每天都吃", "经常吃(5~6天/周)", "有时吃(3~4天/周)", "偶尔吃(1~2天/周)", "从来不吃"]
				},
				{
					question: "夜宵情况",
					choice: ["每天都吃", "经常吃(5~6天/周)", "有时吃(3~4天/周)", "偶尔吃(1~2天/周)", "从来不吃"]
				},
				{
					question: "荤素搭配情况",
					choice: ["荤素各半", "肉食为主", "素食为主"]
				},
				{
					question: "饮食偏好",
					choice: ["偏油腻", "偏咸", "适中", "偏甜", "素食"]
				},
				{
					question: "特殊饮食",
					choice: ["糖尿病饮食", "低盐饮食", "低脂饮食", "其他特殊饮食", "无"]
				},
				{
					question: "你经常吃甜食么",
					choice: ["很少", "有时", "经常", "从不"]
				},
				{
					question: "你经常吃水果么",
					choice: ["很少", "有时", "经常", "从不"]
				},
				{
					question: "你经常喝含糖饮料吗",
					choice: ["很少", "有时", "经常", "从不"]
				},

			],
			sportLists: [
				{
					question: "最近7天，您是否做了剧烈体育活动？（提重物，挖掘，有氧运动，快速骑车）",
					subTitle: "每周运动天数 (天)",
					choice: ["无相关体育活动"]
				},
				{
					question: "在这其中一天您通常会花多少时间在剧烈的体育活动上",
					subTitle: "每周运动多久(分钟)",
					choice: ["不知道或不确定"]
				},
				{
					question: "最近七天内，您有几天做了适度的体育活动(提轻的物品、以平常的速度汽车或打双人网球等，不包括走路)",
					subTitle: "每周运动天数 (天)",
					choice: ["不知道或不确定"]
				},
				{
					question: "在这其中一天您通常会花多少时间在适度的体育活动上",
					subTitle: "每天运动多久(分钟)",
					choice: ["无适度体育活动"]
				},
				{
					question: "最近7天内你有几天是步行，且一次步行至少十分钟",
					subTitle: "每周运动天数 (天)",
					choice: ["不知道或不确定"]
				},
				{
					question: "在这其中一天你通常花多少时间在步行上",
					subTitle: "每天运动多久 (分钟)",
					choice: ["不知道或不确定"]
				},
				{
					question: "最近七天内，工作日您有多少时间是坐着的",
					subTitle: "有几天坐着 (天)",
					choice: ["不知道或不确定"]
				},
				{
					question: "在这其中一天您通常花多少时间坐着",
					subTitle: "每天静坐时间 (小时)",
					choice: ["不知道或不确定"]
				},
			],
			hobbyList: [
				{
					question: "您是否吸烟",
					choice: ["从不吸烟", "每天吸烟", "有时吸烟", "曾经吸烟"]
				},
				{
					question: "和你一起生活或工作的人中有人吸烟么",
					choice: ["是", "否"]
				},
				{
					question: "平均每周被动吸烟超过十五分钟的天数",
					choice: ["0", "1-2天", "3-5天", "几乎每天", "不清楚"]
				},
				{
					question: "您是否饮酒",
					choice: ["从不饮酒", "偶尔饮酒(<1次/月)", "有时饮酒(2~4次/月)", "经常饮酒(>1次/月)"]
				},
				{
					question: "饮酒(戒酒)年限",
					subTitle: ["饮酒(年)", "戒酒(年)"],
					choice: ["无"]
				},
			],
		}
	},
	components: {
		UButton,
		inputAndChoiceForm
	},
	methods: {
		handInput(event) {
			this.inputValue = event.target.value;
		},
		updateSportInputStatus(e) {
			this.sportDisableInput.splice(e, 1, !this.sportDisableInput[e]);


			console.log(this.sportDisableInput);
		},
		updateInputStatus() {
			this.disableInput = !this.disableInput;
			console.log(this.disableInput);

		},
		updateHabitAnswer(e){
			console.log(e);
		},
		updateSportAnswer(e) {
			if (this.sportDisableInput[e] == true) {
				this.sportAnswer[e] = 'false';
			} else {
				this.sportAnswer[e] = this.inputValue;
			}
		},
		open(e) {
			// console.log('open', e)
		},
		close(e) {
			this.show = false
		},
		change(e) {
			// console.log('change', e)
		}
	},
	watch: {
		
	}
}
</script>

<style>
.item {
	background-color: #ffffff;
}

.input-wrapper {
	display: flex;
	/* 将 div 容器设置为 flex 容器 */
	align-items: center;
	/* 将子元素垂直居中对齐 */
	width: 100%;
	height: 40px;
	margin-bottom: 10px;
}

label {
	display: inline-block;
	width: 80px;
	float: left;
	text-align: right;
	margin-right: 10px;

}

input {
	display: inline-block;
	width: calc(100% - 90px);
	float: left;
	box-sizing: border-box;
}
</style>
