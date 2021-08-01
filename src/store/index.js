import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

import getters from './getters'
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
Vue.use(Vuex)

// vuex持久化
const vuexPersist = new VuexPersistence({
    strictMode: true,
    storage: localStorage,
    reducer: (state) => ({
      volunteerToken: state.volunteerToken,
      userInfo: state.userInfo,
      platform: state.platform
    }),
  });
  

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    plugins:[vuexPersist.plugin]
})

export default store;
