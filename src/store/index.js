import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

import getters from './getters'
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
// 活动策划相关单独作为一个模块
import plans from './modules/plans';
Vue.use(Vuex)

// vuex持久化
const vuexPersist = new VuexPersistence({
    key: "user",
    strictMode: true,
    storage: window.localStorage,
    reducer: (state) => ({
      volunteerToken: state.volunteerToken,
      userInfo: state.userInfo,
      platform: state.platform
    }),
  });
  

const store = new Vuex.Store({
    modules: {
      plans
    },
    state,
    actions,
    mutations,
    getters,
    plugins:[vuexPersist.plugin]
})

export default store;
