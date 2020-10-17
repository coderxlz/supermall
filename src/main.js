import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store";

Vue.config.productionTip = false
//默认情况下$bus为空,创建一个vew实例指向$bus,vue实例可以作为事件总线
Vue.prototype.$bus = new Vue();


new Vue({
  render: function (h) { return h(App) },
  router,
  store
}).$mount('#app')
