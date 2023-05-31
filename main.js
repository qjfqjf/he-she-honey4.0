/*
 * @Author: August-Rushme
 * @Date: 2023-03-22 09:58:18
 * @LastEditors: August-Rushme 864011713@qq.com
 * @LastEditTime: 2023-03-22 10:04:26
 * @FilePath: \hbuilderWorkPlace\he-she-honey\main.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Vue from 'vue'
import App from './App'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
//数据管理中心
import store from '@/store'
// uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.prototype.$store = store
// 工具
import '@/plugins/utils.js'
//权限配置中心
import base from '@/config/baseUrl'
Vue.prototype.$base = base
//挂载全局http请求
import $http from '@/config/requestConfig'
Vue.prototype.$http = $http
// #ifdef MP-WEIXIN
//挂载全局微信分享
import { wxShare } from '@/config/utils'
Vue.prototype.wxShare = wxShare
// #endif
//判断是否登录
// import { judgeLogin } from '@/config/login'
// Vue.prototype.judgeLogin = judgeLogin
// Vue.config.productionTip = false
// #ifdef H5
//微信SDK
import '@/plugins/wxJsSDK.js'
// #endif
//全局组件
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
Vue.component('mescroll-body', MescrollBody)
App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
