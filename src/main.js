// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './permission.js';
import router from './router'
import axios from 'axios'
import store from './store/index'
import '@/styles/index.css'//全局css
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import globaljs from './utils/global.js';
import api from '@/api'
import Qs from 'qs'
Vue.use(ElementUI);
Vue.use(globaljs);
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;
Vue.prototype.$api=api;
Vue.prototype.$qs=Qs;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
