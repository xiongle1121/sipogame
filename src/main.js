// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from './api/http.js';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; 

import "babel-polyfill"; //解决IE不支持ES6新API的问题

Vue.config.productionTip = false;
Vue.use(ElementUI)
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  render: h=>h(App)
})
