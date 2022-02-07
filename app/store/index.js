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
  getPosts({ commit }) {
    axios.get('https://fe-task.getsandbox.com/performance')
      .then(response => {
        commit('SET_POSTS', response.data);
        console.log(response);
      });
  },
};

// to handle mutations
const mutations = {
  // eslint-disable-next-line no-shadow
  SET_POSTS(state, data) {
    state.performanceData = data;
    console.log(data);
  },
};

// export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
