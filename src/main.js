// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from './axios-conf';
import "./static/css/reset.css"

/*-----------------------------------Toast弹出层-----------------------------------*/
import toastRegistry from './components/toast'
// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)
/*-----------------------------------Toast弹出层-----------------------------------*/

Axios(Vue);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
