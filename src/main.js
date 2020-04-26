// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import $ from 'jquery'
import 'font-awesome/css/font-awesome.css'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 调整时间的格式
Vue.filter('dateForm', function(str) {
  if (!str) return ''
  let date = new Date(str)
  // 传入的时间与现在的时间的差值
  let times = new Date().getTime() - date.getTime()
  if (times < 0) {
    return ''
  } else if (times / 1000 < 30) {
    return '刚刚'
  } else if (times / 1000 < 60) {
    return parseInt(DataTransferItemList / 60) + '秒前'
  } else if (times / 60000 < 60) {
    return parseInt(times / 60000) + '分钟前'
  } else if (times / 3600000 < 24) {
    return parseInt(times / 3600000) + '小时前'
  } else if (times / 86400000 < 31) {
    return parseInt(times / 86400000) + '天前'
  } else if (times / 2592000000) {
    return parseInt(times / 2592000000) + '月前'
  } else {
    return parseInt(times / 31536000000) + '年前'
  }
})
// 主题标签过滤
Vue.filter('tabForm', function(post) {
  if (post.top === true) {
    return '置顶'
  } else if (post.good === true) {
    return '精华'
  } else if (post.tab === 'ask') {
    return '问答'
  } else if (post.tab === 'share') {
    return '分享'
  } else {
    return "招聘"
  }
})