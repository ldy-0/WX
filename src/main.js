// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import "@/css/banner_style.css"
import "@/css/magic.min.css"
import "@/css/pageSwitch.min.css"
import "@/css/public.css"
import "@/css/reset.css"
import "@/css/stytle.css"
import "@/css/hbs.styl"
Vue.config.productionTip = false
Vue.prototype.http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
