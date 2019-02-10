import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as types from "./type";

export default new Vuex.Store({
  state: {
    header: true,
    footer: true,
    loading: false,
  },

  getters: {
    headerShowGets(state) {
      // console.log("state.headerShow: " + state.headerShow);
      return state.header;
    },
    footerShowGets(state) {
      // console.log("state.footerShow: " + state.footerShow);
      return state.footer;
    }
  },
  mutations: {
    // 首页 header
    [types.HEADER_SHOW](state) {
      state.header = true;
    },
    [types.HEADER_HIDDEN](state) {
      state.header = false;
    },

    // 首页 footer
    [types.FOOTER_SHOW](state) {
      state.footer = true;
    },
    [types.FOOTER_HIDDEN](state) {
      state.footer = false;
    },

    // loading 效果
    [types.LOADING_SHOW](state) {
      state.loading = true;
    },
    [types.LOADING_HIDE](state) {
      state.loading = false;
    }

  },
  actions: {
    // 首页头部
    headerShowActs: ({commit}) => {
      commit(types.HEADER_SHOW);
    },
    headerHiddenActs: ({commit}) => {
      commit(types.HEADER_HIDDEN);
    },

    // footer
    footerShowActs: ({commit}) => {
      commit(types.FOOTER_SHOW);
    },
    footerHiddenActs: ({commit}) => {
      commit(types.FOOTER_HIDDEN);
    },

    // loading
    loadingShowActs: ({commit}) => {
      commit(types.LOADING_SHOW);
    },
    loadingHiddenActs: ({commit}) => {
      commit(types.LOADING_HIDE);
    },

  }
})
