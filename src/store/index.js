import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const vuex = new Vuex.Store({
  //组件之间的共享状态
  state:{
    carItems:[]
  },
  //操作共享状态的方法，要改变state，一定要通过mutations
  mutations: mutations,
  //类似于computed
  getters:getters,
  //异步操作
  actions:actions,
  //定义模块
  modules:{

  }
})

export default vuex;