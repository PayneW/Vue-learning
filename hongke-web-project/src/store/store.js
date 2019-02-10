import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as types  from "./type";

export default new Vuex.Store({
    state: {
        headerShow: true,
        footerShow: true,
    },
    getters: {
        headerShowGets(state) {
            // console.log("state.headerShow: " + state.headerShow);
            return state.headerShow;
        },
        footerShowGets(state) {
            // console.log("state.footerShow: " + state.footerShow);
            return state.footerShow;
        }
    },
    mutations: {
        // 首页 header
        [types.HEADER_SHOW](state) {
            state.headerShow = true;
        },
        [types.HEADER_HIDDEN](state) {
            state.headerShow = false;
        },

        // 首页 footer
        [types.FOOTER_SHOW](state) {
            state.footerShow = true;
        },
        [types.FOOTER_HIDDEN](state) {
            state.footerShow = false;
        },

    },
    actions: {
        // 首页头部
        headerShowActs: ({commit}) => {
            commit(types.HEADER_SHOW);
        },
        headerHiddenActs: ({commit}) => {
            commit(types.HEADER_HIDDEN);
        },
        footerShowActs: ({commit}) => {
            commit(types.FOOTER_SHOW);
        },
        footerHiddenActs: ({commit}) => {
            commit(types.FOOTER_HIDDEN);
        },
    }
})
