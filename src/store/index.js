import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const vuex = new Vuex.Store({
  //组件之间的共享状态
  state:{
    loadDone:false
  },
  //操作共享状态的方法
  mutations:{

  },
  //类似于computed
  getters:{

  },
  //异步操作
  actions:{

  },
  //定义模块
  modules:{

  }
})

export default vuex;