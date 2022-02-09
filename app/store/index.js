// import dependency to handle HTTP request to our back end
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

// load Vuex
Vue.use(Vuex);

// to handle state
const state = {
  performanceData: [],
};

// to handle state
const getters = {};

// to handle actions
const actions = {
  getPerformanceData({ commit }) {
    axios.get('https://fe-task.getsandbox.com/performance')
      .then(response => {
        commit('SET_PerformanceData', response.data);
      });
  },
};

// to handle mutations
const mutations = {
  // eslint-disable-next-line no-shadow
  SET_PerformanceData(state, data) {
    state.performanceData = data;
  },
};

// export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
