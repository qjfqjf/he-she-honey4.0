<template>
	<view class="protocol_page">
		<z-nav-bar title="隐私政策"></z-nav-bar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view v-for="text in textList">
			<view class="textBox">
				<text class="fontStyle">{{text}}</text>
			</view>
		</view>
	

	</view>
</template>

<script>
export default {
	data() {
		return {
			type:1000,
			textList:[
				"用户协议与隐私政策",
				"“他她蜜”数字健康服务平台(简称“他她蜜”)是由他她蜜（海南）科技有限公司(简称他她蜜公司)自主研发并负责运营，包含电脑软件、手机应用平台、云端数据中心、配套运程智能监测设备等各组成部分。平台各项产品、服务的所有权、知识产权和运营权等全部权力归他她蜜公司所有。可实现用户自我身体指标监测、健康管理、医生远程慢病管理与健康指导，健康专业人员与大众用户即时沟通等功能。",
				"本协议是大众用户与“他她蜜”平台所有者“他她蜜公司”之间就“他她蜜”平台等产品、服务的相关事宜所签订的协议，点击同意协议并注册成功后，本协议即构成对双方有约束力的法律文件。",
				"一、注册和登录",
				"1.用户点击同意本协议的即视为用户确认自己具有享受“他她蜜平台服务、付费等相应的权利能力和行为能力能够独立承担法律责任。(18周岁以下及其他限制行为能力人，需在父母或监护人的监护参与下才能使用“他她蜜”平台)。 ",
				"2.用户同意注册协议条款、完成注册程序后，系统将为用户生成相应的“他她蜜”用户号码，成为平台的正式用户。用户应保证其提供的注册资料真实、准确、完整、合法有效，用户的 注册资料如发生变动，应及时更新。如果用户提供的注册资料不合法、不真实、不准确或者不详尽的用户需承担因此引起的相应责任及后果。“他她蜜”有权终止用户使用平台提供的各项服务。",
				"3.用户注册成功后，应妥善保存用户名、用户号码和密码等相关信息，若因用户自身的原因将用户名、用户号码和密码等相关信息丢失或者将相关信息转借他人使用由此造成的一切损失和后果，由用户自行承担。",
				"4.用户登录“他她蜜”平台享受服务，以下设备购置等相关费用需自行承担: ",
				"监测设备:包括血糖仪、血压计、智能腕表等; ",
				"上网设备:包括手机、电脑或其他上网终端、调制解调器及其他必备的上网装置; ",
				"上网开支:包括网络接入、上网设备租用、手机流量等费用。",
				"二、权利与义务",
				"1.用户可通过“他她蜜”平台浏览和管理自己包括监测数据在内的相关信息，所有监测数据会同步储存于“他她蜜”云端服务器中，用户可通过用户名和密码，适时调取。  ",
				"2.用户可浏览、学习“他她蜜”平台提供的各类健质资讯。",
				"3.用户可以与同为注册用户的人员互相加为好友，进行包括文字、图片、语音留言及直接的音频、视频等形式的IM即时交流。",
				"4.用户可以邀请同为注册用户的亲属等加入家庭组，获得相应授权后可以互相浏览对方监测数据等信息。",
				"5.用户可通过“他她蜜”平台参与各种线上咨询以及线下活动。可按有关活动规则获得相应的积分奖励。",
				"6.用户在“他她蜜”获得的积分可根据有关规则兑换为相应优惠。",
				"7.用户可通过“他她蜜”平台向在线的医务等专业人员等请求免费或收费的咨询、签约等服务。",
				"8.用户在使用收费的咨询、签约服务时，如果账户余额小于需要支付的咨询、签约费用时，需要充值后才可成功发起咨询、签约请求。用户的账户余额可按照“他她蜜”平台提供的方式进行充值或提现。",
				"9.用户自行选择“他她蜜”平台提供的服务类别、注册的医务等专业人员;平台注册的专业人员有权接受或拒绝相应请求;用户发起的服务请求被平台注册的专业人员接受时，应同时确认用户，专业人员、平台的三方协议，以明确各方的相应的权利和义务",
				"10.“他她蜜”有权通过邮件、在线留言、在线音视频、短信、电话等形式，向注册用户发送提醒信息、促销活动等告知信息的权利。他她蜜公司有权决定将本软件作商业用途，包括但不限于开发、使用本软件的部分服务为第三方作推广等。他她蜜公司承诺在推广过程中严格按照本协议约定保护用户的个人信息，用户可以根据系统设置选择屏蔽、拒绝接收相关推广信息。",
				"11.“他她蜜”在用户开启终端设备具有的定位功能并使用本软件上基于位置信息而提供的服务时，本软件将通过GPS等方式收集用户的地理位置信息。用户可以通过关闭定位功能等停止该项服务。",
				"12.他她蜜”平台对涉及用户实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的,将采用各种安全技术和程序予以保护，以免遭受未经授权的访问、使用或被露;除非得到用户的授权或法律另有规定，不会向外界披露用户隐私信息。",
				"13.“他她蜜”有权使用用户的注册信息、用户名、密码等信息，登陆进入用户的注册账户，进行证据保全等操作，包括但不限于公证、见证等。",
				"14.“他她蜜”保留在中华人民共和国大陆地区法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。“他她蜜”有权对用户的注册数据及咨询的行为等进行查阅，发现注册数据或咨询行为中存在任何问题或怀疑，均有权向用户发出询问及要求改正的通知或者直接作出删除等处理，并追究相关法律责任的权利。",
				"三、免责声明",
				"1.“他她蜜”确保提供的健康资讯来源于合法、正规的渠道，但不保证资讯的正确性、客观性和完整性，且不对因信息的不正确、不客观或遗漏所导致的任何损失或损害承担责任。“他她蜜”所提供的一切信息仅供参考，不作为个体诊断、用药和使用的根据，不能替代医生和其他专业人员的建议，如用户自行使用“他她蜜”平台提供的信息资料发生或造成任何损失或损害，他她蜜公司均不承担任何法律责任。",
				"2.《咨询医生》模块中的服务提供者均为提供了其系中华人民共和国医师、药师、护士、健康管理师、营养师等资格证书或学历证书的专业医务及健康管理相关人员。“他她蜜”平台对所有注册的、提供服务的医务及健康服务人员提供的资格证书、学历证书、机构供职信息等进行核实，但不保证这些资格证书、学历证书、机构任职信息等资料的真实性，不保证这些专业人员提供的服务是正确的、有效的。“他她蜜”平台上的专业人员相关评分、排名、推荐等信息亦仅供用户参考。对于服务评价较差的人员，“他她蜜”平台有权停止其注册资格。",
				"3．医生等专业人员在“他她蜜”平台提供的咨询、签约等服务均只限于根据用户的主观描述等信息，仅提供如何就医、保持或改善健康等方面的建议，不保证满足用户要求的诊断、治疗方面的建议一定能获得，且不对结果是否符合用户预期做出保证。医生等专业人员所提供的建议均是其个人意见，不得作为诊断、治疗的直接医疗处置依据，用户需知晓并同意诊断及治疗等处置均需前往医院。用户擅自将医生等专业人员的建议作为处方使用的，后果自负，与专业人员及“他她蜜”无关，专业人员、他她蜜公司均不承担可能产生的任何责任。",
				"4.用户使用付费咨询、签约服务后，无权因为对服务内容的不满意、不认可而要求退款。医生等专业人员在提供服务过程中遇有紧急事情需要处理时(医生等专业人员的职业要求)，有权暂停服务，可与用户自行协商安排重新服务的具体时间。",
				"5.用户在咨询、签约服务过程中与医生等专业人员发生纠纷，可向“他她蜜”平台的客服人员等申请协助调解，“他她蜜”客服人员在向涉事双方了解情况后可进行调解，但是不保证调解结果能达到用户期望。如调解不成，用户可向相应的行政管理机构或争端解决机构依照法定程序投诉、提起仲裁或诉讼，“他她蜜”会积极配合并提供有关资料。",
				"6.用户应尊重医生等相关专业人员。如有侮辱、诽谤、恶意中伤等行为，医生等专业人员有权立即中断服务，保留对该用户采取法律措施的权利。“他她蜜”有权暂停对该用户提供一切服务，由此造成的一切损失、损害或后果，均由用户承担。",
				"7.用户在使用咨询、签约等服务过程中使用、产生、上传的文字、图片、语音留言、音频、视频等资料均可能被保存和备份，用户要严格依法依规行事，如有违法违规的情形，一切后果由用户自行承担。",
				"8.“他她蜜”对于系统平台使用过程中收到的来自用户和医务人员等各方反馈的平台系统故障、优化建议等负有及时修复、升级、答复的义务，但对因不可抗力、计算机黑客攻击、系统故障、通讯故障、网络拥堵、供电系统故障、电脑病毒、恶意程序攻击及其他不可归属于“他她蜜”的情况，而导致的数据损坏、丢失、系统无法正常提供服务等情况会尽力采取预防和补救措施，但对因此而造成的一切损失、损害或后果他她蜜公司不承担任何责任。",
				"9.为了改善用户体验、完善服务内容，他她蜜公司将不断努力开发新的服务，并及时提供软件更新(这些更新可能会采取软件替换、修改、功能强化、版本升级等形式);为了保证本软件及服务的安全性和功能的一致性，他她蜜公司有权对软件进行不定期更新，或者对软件的部分功能效果进行改变或限制:软件新版本发布后，旧版本的软件可能无法使用。他她蜜公司不保证旧版本软件继续可用及相应的客户服务，请及时核对并下载最新版本。“他她蜜”不担保本平台所包含的或以其它方式通过本平台提供给您的全部信息、内容、材料、产品(包括软件)和服务、其服务器或从本平台发出的电子信件、信息没有病毒或其他有害成分。",
				"10.他她蜜公司有权根据实际情况自行决定单个用户在本软件及服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。用户可根据自己的需要自行备份本软件及服务中的相关数据。如果用户停止使用本软件及服务或服务被终止或取消，他她蜜公司可以从服务器上永久地删除用户的数据。服务停止、终止或取消后，他她蜜公司没有义务向用户返还任何数据。",
				"11.用户在使用本软件及服务时，须自行承担如下来自他她蜜公司不可掌控的风险内容，包括但不限于：不可抗拒因素可能引起的个人信息丢失、泄漏等风险；用户必须选择与所安装终端设备相匹配的软件版本，否则，由于软件与终端设备型号不相匹配所导致的任何问题或损害，均由用户自行承担；用户在使用本软件访问第三方网站时，因第三方网站及相关内容所可能导致的风险，由用户自行承担；用户发布的内容被他人转发、分享因此等传播可能带来的风险和责任；由于无线网络信号不稳定、无线网络带宽小等原因，所引起的他她蜜登录失败、资料同步不完整、页面打开速度慢等风险。",
				"12.第三方产品和服务用户在使用本软件第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。他她蜜公司和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。因用户使用本软件或要求他她蜜公司提供特定服务时，本软件可能会调用第三方系统或者通过第三方支持用户的使用或访问，使用或访问的结果由该第三方提供(包括但不限于第三方通过他她蜜公众帐号提供的服务，或通过开放平台接入的内容等)，他她蜜公司不保证通过第三方提供服务及内容的安全性、准确性、有效性及其他不确定的风险，由此若引发的任何争议及损害，与他她蜜公司无关，他她蜜公司不承担任何责任。",
				"13.本平台上的产品和服务价格、数量、能否提供等信息随时都有可能发生变动，本平台不作特别通知。本平台显示的信息可能会有一定的滞后性或差错，“他她蜜”平台欢迎用户提供建议、意见，并视建议、意见的效果对相关用户给予一定的奖励。",
				"14.本应用的数据与蓝牙设备测试结果仅供参考，进行任何医疗决定前，请咨询医疗机构的专业医生，“他她蜜”平台不对此承担任何法律责任。",
				"15.用户在平台填写的信息，用户自行决定与平台链接设备手机的信息，平台在经过模糊化处理之后，平台可以将该等信息进行分析、整理、归纳，然而进行研究和商业化。具体包括用户及其设备收集的身份信息、健康数据等。",
				"四、所有权及知识产权条款",
				"1.用户一旦接受本协议，即表明该用户主动将其在任何时间段在本平台发表的任何形式的信息内容(包括但不限于客户评价、客户咨询、各类话题文章等信息内容)的财产性权利等任何可转让的权利，如著作权财产权(包括并不限于:复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利)，全部独家且不可撤销地转让给“他她蜜”所有，用户同意“他她蜜”有权就第三方的任何侵权行为而单独提起诉讼。",
				"2.“他她蜜公司”是本平台的制作者，拥有包括“他她蜜”商标及号码等在内的此平台内容及资源的著作权(包括但不限于文字、图表、标识、按钮图标、图像、声音文件、数据和软件)等全部合法权利，有权对本协议及本平台的内容进行修改，并在本平台张贴，无须另行通知用户。除法律的禁止性规则之外，“他她蜜”对本协议及本平台内容拥有最终解释权。",
				"3.除法律另有强制性规定外，未经“他她蜜”特别书面许可，任何单位或个人不得以任何方式全部或部分复制、转载、引用、链接、抓取或以其他方式使用本平台的信息内容，否则，“他她蜜”有权追究其法律责任。",
				"五、用户的守法义务",
				"1.用户在使用“他她蜜”平台时应当遵守中华人民共和国的相关法律、法规、规章等法定的义务。",
				"2.用户不得在品牌发表辱骂他人、政治时间、国际关系、民族歧、性别歧视和其他不适当的内容。否则，他他蜜公司可以查封和冻结用户的账户，发生3次之后还不整改的，他她蜜公司可以收回用户的账户，账户的所有信息由他她蜜公司予以删除。",
				"六、协议更新及用户关注义务",
				"根据国家法律法规变化及网络运营需要，“他她蜜”有权对本协议的全部或部分条款进行不定期修改。用户可随时登陆平台查阅最新协议:用户应及时关注并阅读最新版的协议及平台公告。如用户不同意变更后的协议，应立即通知“他她蜜”，双方协商解决原协议的是否继续履行的问题。如用户继续使用本平台提供的服务，即视为同意变更后的协议。",
				"七、协议的效力",
				"本协议中任何部分被视为废止、无效或因任何理由不可执行，该部分应视为可拆分的，并不影响任何其余条款的有效性和可执行性。",
				"八、法律管辖和适用",
				"本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律(但不包括其冲突法规则)。如发生本协议与适用之法律的强制性规定相抵触时，则这些条款将视为无效其它条款继续有效。",
				"九、争端解决",
				"如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决;协商不成时，任何一方均可向有管辖权的法院提起诉讼。  因为解决争议而需要向法院、律师事务所所和其他机构支付诉讼费、律师费、保全费、担保费、鉴定费和其他合理的费用，全部违约方承担。",
				"十、定义",
				"1.疾病管理:是一种国际通行的医疗干预和沟通辅助系统，通过改善医生和患者之间的关系，建立详细的医疗保健计划，以循证医学方法为基础，对于疾病相关服务(含诊疗)提出各种针对性的建议、策略来改善病情或预防病情加重，并在临床和经济结果评价的基础上力争达到不断改善目标人群健康的目的。",
				"2.健康管理: 是以现代健康概念和中医“治未病”思想为指导。运用医学、管理学等相关学科的理论、技术和方法，对个体或群体健康状况及影响健康的危险因素进行全面连续的检测、评估和干预，实现以促进人人健康为目标的新型医学服务过程。",
			]
		};
	},
	//第一次加载
	onLoad(e) {
		if(e.type){
			this.type = parseInt(e.type);
			let title;
			switch (this.type) {
				case 1000:
					title = "登录注册用户协议";
					break;
			}
			this.title = title;
		}
		this.pageData();
	},
	//页面显示
	onShow() {},
	//方法
	methods: {
		pageData() {
			this.$http
				.get('api/common/v1/protocol', {
					type: this.type
				})
				.then(res => {
					this.$refs.article.setContent(res);
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
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.protocol_page {
	background-color: #fff;
	padding: 30upx;


}

.textBox{
	margin-bottom: 24rpx;
}
.fontStyle{
	font-size: 28rpx;
}
</style>
