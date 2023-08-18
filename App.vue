<script>
	import store from '@/store/index.js'
	import socket from '@/config/socket'
	// import { TUIChatKit, genTestUserSig } from "./TUIKit";
	// import { vueVersion } from "./TUIKit/adapter-vue";
	// import { TUILogin } from "@tencentcloud/tui-core";
	// 必填信息
	// const config = {
	//   userID: "1", //User ID
	//   SDKAppID: 1400826524, // Your SDKAppID
	//   secretKey: "bc152e50fe312f78834bb49939c7e8021826cbcba34d78f1ac4adb3d3247d511", // Your secretKey
	// };
	// const userSig = genTestUserSig(config).userSig;
	// uni.$chat_SDKAppID = config.SDKAppID;
	// uni.$chat_userID = config.userID;
	// uni.$chat_userSig = userSig;
	
	// TUIChatKit 初始化
	// TUIChatKit.init();
	// #ifdef H5
	//import { h5Login } from '@/config/html5Utils'
	// #endif
	// #ifdef APP-PLUS
	// import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate'
	// #endif
	export default {
		onLaunch: function(e) {
			// TUICore login
			    // TUILogin.login({
			    //   SDKAppID: uni.$chat_SDKAppID,
			    //   userID: uni.$chat_userID,
			    //   // UserSig 是用户登录即时通信 IM 的密码，其本质是对 UserID 等信息加密后得到的密文。
			    //   // 该方法仅适合本地跑通 Demo 和功能调试，详情请参见 https://cloud.tencent.com/document/product/269/32688     
			    //   userSig: uni.$chat_userSig, 
			    //   // 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true
			    //   useUploadPlugin: true,
			    //   // 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航
			    //   // 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139
			    //   // 如果您已购买内容审核服务，开启此功能请设置为 true
			    //   useProfanityFilterPlugin: false,
			    //   framework: `vue${vueVersion}` // 当前开发使用框架 vue2 / vue3
			    // });
			//取出缓存数据 
			store.commit('setCacheData')
			// #ifdef MP-WEIXIN
			if (store.state.userInfo.token) {
				socket.init()
			}
			// #endif
			// #ifdef H5
			if (store.state.userInfo.token) {
				socket.init()
			} else {
				// h5Login('force', () => {
				//   socket.init()
				// })
			}
			// #endif
			// #ifdef APP-PLUS
			if (store.state.userInfo.token) {
				socket.init()
			}
			// APPUpdate()
			// #endif
		},
		onShow: function(e) {
			// #ifdef MP-WEIXIN
			//获取二维码携带的参数
			let scene = decodeURIComponent(e.query.scene)
			scene = scene.split('&')
			let data = {
				//场景值
				scene: e.scene,
			}
			scene.forEach((item) => {
				let arr = item.split('=')
				if (arr.length == 2) {
					data[arr[0]] = arr[1]
				}
			})
			store.commit('setChatScenesInfo', Object.assign(e.query, data))
			//小程序更新
			// if (uni.getUpdateManager) {
			//   const updateManager = uni.getUpdateManager()
			//   updateManager.onCheckForUpdate(function (res) {
			//     // 请求完新版本信息的回调
			//     // console.log(res.hasUpdate);
			//   })
			//   updateManager.onUpdateReady(function (res) {
			//     uni.showModal({
			//       title: '更新提示',
			//       content: '新版本已经准备好，是否重启应用？',
			//       success(res) {
			//         if (res.confirm) {
			//           // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			//           updateManager.applyUpdate()
			//         }
			//       },
			//     })
			//   })
			//   updateManager.onUpdateFailed(function (res) {
			//     // 新的版本下载失败
			//     uni.showModal({
			//       title: '已经有新版本了哟~',
			//       content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
			//       showCancel: false,
			//     })
			//   })
			// }
			// #endif
		},
		onHide: function() {},
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	@import '@/uni_modules/uview-ui/index.scss';
	@import './style/common.scss';
	@import './style/input.scss';
	@import './style/table.scss';

	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	/* #endif */

	/* #ifdef H5 */
	//修复H5底部导航挡住内容bug
	uni-app {
		height: auto;
	}

	//修复H5输入框上下不居中bug
	.uni-input-form {
		height: 100%;
	}

	//去除地图上高德地图标识符
	.amap-copyright {
		display: none !important;
	}

	.amap-logo {
		display: none !important;
	}

	.amap-ui-control-zoom {
		width: 60upx !important;
	}

	.amap-ui-control-zoom>* {
		width: 60upx !important;
		height: 60upx !important;
		line-height: 60upx !important;
	}

	.amap-ui-control-theme-dark {
		display: none !important;
	}

	/* #endif */
</style>