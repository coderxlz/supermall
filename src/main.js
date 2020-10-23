import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store";
import Toast from "./components/common/Toast";

Vue.config.productionTip = false
//默认情况下$bus为空,创建一个vew实例指向$bus,vue实例可以作为事件总线
Vue.prototype.$bus = new Vue();

//安装自定义插件Toast
Vue.use(Toast);

new Vue({
  render: function (h) { return h(App) },
  router,
  store
}).$mount('#app')
