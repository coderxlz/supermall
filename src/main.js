import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store";
import Toast from "./components/common/Toast";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

//将fastclick绑定到body之中
FastClick.attach(document.body);

Vue.config.productionTip = false
//默认情况下$bus为空,创建一个vew实例指向$bus,vue实例可以作为事件总线
Vue.prototype.$bus = new Vue();


//安装自定义插件Toast
Vue.use(Toast);
Vue.use(VueLazyload,{
  // loading参数指定默认占位图片
  loading:require('./assets/img/common/placeholder.png')
});

new Vue({
  render: function (h) { return h(App) },
  router,
  store
}).$mount('#app')
