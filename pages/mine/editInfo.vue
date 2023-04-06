<template>
	<view>
		<z-nav-bar title="个人信息" bgColor="#ffffff"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-cell-group :border="false" class="message">
			<u-cell title="基本信息" titleStyle="font-weight: bold; font-size: 16px" :border="false"></u-cell>
			<u-cell size="large" title="头像" titleStyle="font-size: 14px">
				<u-avatar 
					slot="value"
					:src="avatar"
				></u-avatar >
			</u-cell>
			<u-cell @click="showNameModal" titleStyle="font-size: 14px" size="large" title="姓名" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ name }}</text>
			</u-cell>
			<u-cell @click="showGenderModal" size="large" titleStyle="font-size: 14px" title="姓别" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ gender }}</text>
			</u-cell>
			<u-cell @click="showBirthModal" class="message" titleStyle="font-size: 14px" size="large" title="出生日期" :value="birth" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ birth }}</text>
			</u-cell>
		</u-cell-group>
		<u-gap
			height="10"
		></u-gap>
		<u-cell-group :border="false" class="message">
			<u-cell size="large" title="身份信息" titleStyle="font-weight: bold;" :border="false"></u-cell>
			<u-cell @click="showIdCardNumberModel" size="large" title="身份证号" titleStyle="font-size: 14px" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ idCardNumber }}</text>
			</u-cell>
			<u-cell size="large" title="亲属关系" titleStyle="font-size: 14px" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>本人</text>
			</u-cell>
			<u-cell @click="showTelModel" size="large" title="手机号" titleStyle="font-size: 14px" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ tel }}</text>
			</u-cell>
		</u-cell-group>	
		<u-gap
			height="10"
		></u-gap>
		<u-cell-group :border="false" class="message">	
			<u-cell size="large" title="身体信息" titleStyle="font-weight: bold;" :border="false"></u-cell>
			<u-cell @click="showHeightModel" size="large" title="身高(cm)" titleStyle="font-size: 14px" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ height }}</text>
			</u-cell>
			<u-cell @click="showWeightModel" size="large" title="体重(kg)" titleStyle="font-size: 14px" :isLink="true">
				<text
					slot="value"
					class="u-slot-value"
				>{{ weight }}</text>
			</u-cell>
		</u-cell-group>
			<u-gap
				height="40"
			></u-gap>
			<view class="d-flex j-center">
				<u-button
					text="保存"
					size="large"
					type="success"
					shape="circle"
					color="rgb(10, 185, 156)"
					style="width: 660rpx; height: 110rpx;"
				></u-button>
			</view>
		
		<u-modal
			title="姓名"
			:show="showName"
			showCancelButton
			closeOnClickOverlay
			confirmColor="rgb(10, 185, 156)"
			@confirm="confirmName"
			@cancel="() => showName = false"
			@close="() => showName = false"
		>
		 <u--input
		    placeholder="请输入姓名"
		    border="surround"
		    v-model="nameValue"
		  ></u--input>
		</u-modal>
		<u-action-sheet
			:show="showGender"
			:actions="actions"
			title="请选择性别"
			@close="showGender = false"
			@select="genderSelect"
		>
		</u-action-sheet>
		<u-datetime-picker
			:show="showBirth"
			v-model="chooseDate"
			:min-date="new Date('1930/01/01').getTime()"
			:max-date="new Date('2070/12/31').getTime()"
			mode="date"
			closeOnClickOverlay
			@confirm="confirmBirth"
			@cancel=""
			@close="() => showBirth = false"
		></u-datetime-picker>
		<u-modal
			title="身份证"
			:show="showIdCardNumber"
			showCancelButton
			closeOnClickOverlay
			confirmColor="rgb(10, 185, 156)"
			@confirm="confirmIdCardNumber"
			@cancel="() => showIdCardNumber = false"
			@close="() => showIdCardNumber = false"
		>
		 <u--input
		    placeholder="请输入身份证号"
		    border="surround"
		    v-model="idCardNumberValue"
		  ></u--input>
		</u-modal>
		<u-modal
			title="电话号"
			:show="showTel"
			showCancelButton
			closeOnClickOverlay
			confirmColor="rgb(10, 185, 156)"
			@confirm="confirmTel"
			@cancel="() => showTel = false"
			@close="() => showTel = false"
		>
		 <u--input
		    placeholder="请输入手机号"
		    border="surround"
		    v-model="telValue"
		  ></u--input>
		</u-modal>
		<u-modal
			title="身高"
			:show="showHeight"
			showCancelButton
			closeOnClickOverlay
			confirmColor="rgb(10, 185, 156)"
			@confirm="confirmHeight"
			@cancel="() => showHeight = false"
			@close="() => showHeight = false"
		>
		 <u--input
		    border="surround"
		    v-model="heightValue"
		  ></u--input>
		</u-modal>
		<u-modal
			title="体重"
			:show="showWeight"
			showCancelButton
			closeOnClickOverlay
			confirmColor="rgb(10, 185, 156)"
			@confirm="confirmWeight"
			@cancel="() => showWeight = false"
			@close="() => showWeight = false"
		>
		 <u--input
		    border="surround"
		    v-model="weightValue"
		  ></u--input>
		</u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				nameValue: '',
				idCardNumberValue:'',
				telValue: '',
				heightValue: '',
				weightValue: '',
				chooseDate: Number(new Date()),
				showName: false,
				showGender: false,
				showBirth: false,
				showIdCardNumber: false,
				showTel: false,
				showHeight: false,
				showWeight: false,
				popupOptions: {
					placeholder: ''
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
				],
				rules: {
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				avatar: 'https://cdn.uviewui.com/uview/album/3.jpg',
				gender: '请选择您的性别',
				name: '请输入您的真实姓名',
				phone: "请输入您的电话号码",
				birth: '请选择您的出生日期',
				idCardNumber: '请输入您的身份证号',
				relationShip: '请选择亲属关系',
				tel: '请输入您的电话号码',
				height: '请输入您的身高',
				weight: '请输入您的体重',
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		//第一次加载
		onLoad(e) {
			this.avatar = this.userInfo.avatar || "";
			this.nickname = this.userInfo.nickname || "";
			this.phone = this.userInfo.phone || "";
		},
		//页面显示
		onShow() {},
		//方法
		methods: {
			showNameModal() {
				this.showName = true;
			},
			showGenderModal() {
				this.showGender = true; 
			},
			showBirthModal() {
				this.showBirth = true;
			},
			showIdCardNumberModel() {
				this.showIdCardNumber = true;
			},
			showTelModel() {
				this.showTel = true;
			},
			showHeightModel() {
				this.showHeight = true;
			},
			showWeightModel() {
				this.showWeight = true;
			},
			confirmName() {	
				const reg = /^[\u4E00-\u9FA5]{2,5}$/;
				if (!reg.test(this.nameValue)) {
				  // 如果名字长度不符合要求，则给出提示
				  uni.showToast({
					title: '姓名格式不对',
					icon: 'none',
				  });
				  return;
				}
				this.name = this.nameValue;
				this.showName = false;
			},
			confirmBirth() {
				const timestamp = this.chooseDate;
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // 注意月份从 0 开始计数，需要加 1，并且需要补齐位数
				const day = String(date.getDate()).padStart(2, '0'); // 注意日期需要补齐位数
				this.birth = `${year}-${month}-${day}`;
				this.showBirth = false;
			},
			genderSelect(e) {
				this.gender = e.name
			},
			confirmIdCardNumber() {
				console.log(this.idCardNumberValue,11111)
				const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!reg.test(this.idCardNumberValue)) {
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none',
					});
					return;
				}
				// 校验身份证号码的前两位是否为有效的省份代码
				var provinceCode = this.idCardNumberValue.substring(0, 2);
				if (!this.isValidProvinceCode(provinceCode)) {
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none',
					});
					return;
				}
				// 校验身份证号码出生日期是否合法
				  var birthday = getBirthdayFromIdCardNumber(this.idCardNumberValue);
				  if (!isValidBirthday(birthday)) {
				    uni.showToast({
				    	title: '请输入正确的身份证号',
				    	icon: 'none',
				    });
				    return;
				  }
				this.idCardNumber = this.idCardNumberValue;
				this.showIdCardNumber = false;
			},
			confirmTel() {
				const reg = /^1[3-9]\d{9}$/;
				if (!reg.test(this.telValue)) {
				  // 如果名字长度不符合要求，则给出提示
				  uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none',
				  });
				  return;
				}
				this.tel = this.telValue;
				this.showTel = false;
			},
			confirmHeight() {
				// 将输入转为数值
				const inputHeightNum = Number(this.heightValue)
				// 判断是否为空
				if (this.inputHeight === '') {
					uni.showToast({
						title: '请输入身高',
						icon: 'none',
					});
					return
				}
				// 判断是否为数字
				if (isNaN(inputHeightNum)) {
					uni.showToast({
						title: '身高必须为数字',
						icon: 'none',
					});
					return
				}
				// 判断范围是否合法
				if (inputHeightNum < 50 || inputHeightNum > 250) {
					uni.showToast({
						title: '请输入50-250之间的数字',
						icon: 'none',
					});
					return
				}
				this.height = this.heightValue;
				this.showHeight = false;
			},
			confirmWeight() {
				// 将输入转为数值
				const inputWeightNum = Number(this.weightValue)
				// 判断是否为数字
				if (isNaN(inputWeightNum)) {
					uni.showToast({
						title: '身高必须为数字',
						icon: 'none',
					});
					return
				}
				this.weight = this.weightValue;
				this.showWeight = false;
			},
			// 校验身份证号码的前两位是否为有效的省份代码
			isValidProvinceCode(provinceCode) {
			  var provinces = [
			    '11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36',
			    '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62',
			    '63', '64', '65', '71', '81', '82'
			  ];
			  return provinces.indexOf(provinceCode) !== -1;
			},
			// 校验身份证号码出生日期是否合法
			isValidBirthday(birthday) {
			  return (birthday !== null && birthday <= new Date());
			},
			
			// 根据身份证号码获取出生日期
			getBirthdayFromIdCardNumber(idCardNumber) {
			  var birthday = null;
			  if (idCardNumber.length === 15) {
			    birthday = new Date(idCardNumber.substring(6, 8), idCardNumber.substring(8, 10) - 1, idCardNumber.substring(10, 12));
			  } else if (idCardNumber.length === 18) {
			    birthday = new Date(idCardNumber.substring(6, 10), idCardNumber.substring(10, 12) - 1, idCardNumber.substring(12, 14));
			  }
			  return birthday;
			},
			onSubmit() {
				if (this.avatar == '') {
					uni.showToast({
						title: '请上传头像',
						icon: 'none'
					});
					return;
				}
				if (this.nickname == '') {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					});
					return;
				}
				let httpData = {
					nickname: this.nickname,
					avatar: this.avatar
				};
				if(this.phone){
					if (!this.$base.phoneRegular.test(this.phone)) {
						uni.showToast({
							title: '请输入正确的手机号',
							icon: 'none'
						});
						return;
					}
					if(this.phone != this.userInfo.phone){
						httpData.phone = this.phone;
					}
				}
				this.$http
					.post('api/common/v1/edit_user_info', httpData)
					.then(res => {
						this.setUserInfo({
							nickname: this.nickname,
							avatar: this.avatar,
							phone: this.phone || this.userInfo.phone
						});
						uni.showToast({
							title: '修改成功！'
						});
					});
			}
		},
		//页面隐藏
		onHide() {},
		//页面卸载
		onUnload() {},
		//页面下来刷新
		onPullDownRefresh() {},
		//页面上拉触底
		onReachBottom() {},
		//用户点击分享
		onShareAppMessage(e) {
			return this.wxShare();
		}
	};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.message{
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
</style>
