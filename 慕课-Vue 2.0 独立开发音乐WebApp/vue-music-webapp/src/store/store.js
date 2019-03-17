import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex);


/**
 * + 全局变量: store
 * + 共享数据: state
 * + 取数据的API即是获取数据: getters
 * + 存数据就是对数据库的修改: mutations (变化，突变)
 * + 数据存入到数据库中时一般情况下要处理成需要的形式，这个处理就是: actions (行动，活动)
 * */
import * as types from './mutation-types';
// 调试工具可以帮助我们检测对 state 的修改是不是通过 mutations 操作的
const debug = process.env.NODE_ENV !== "production";

// 7-1 add
import {playMode} from 'assets/js/config';

export default new Vuex.Store({
    // 开启严格模式，检测对 state 的修改是不是通过 mutations 操作的
    strict: debug,
    plugins: debug ? [createLogger()]: [],
    // state 放公共数据
    state: {
        singer: {},

        // 7-2 add: 播放器 Vuex 数据设计
        playing: false,     // 默认播放是 false
        fullScreen: false,   // 默认是否全屏
        playlist: [],       // 播放列表
        sequenceList: [],   // 顺序播放
        mode: playMode.sequence,    // 播放模式
        // 当前播放的索引
        currentIndex: -1
    },

    // 取数据的API即是获取数据: getters
    // getters 类似于 computed 方法，进行数据的计算
    getters: {
        singer: (state) => {
            return state.singer;
        },

        // 7-2 add
        playing: (state) => {
            return state.playing;
        },
        fullScreen: (state) => {
            return state.fullScreen;
        },
        playlist: (state) => {
            return state.playlist;
        },
        sequenceList: (state) => {
            return state.sequenceList;
        },
        mode: (state) => {
            return state.mode;
        },
        currentIndex: (state) => {
            return state.currentIndex
        },
        currentSong: (state) => {
            return state.playlist[state.currentIndex] || {};
        },
    },

    // Actions (调度一个"动作") [这个Actions(动作)不会直接改变tate(状态)]
    // 异步操作 或 对 mutation 做封装(批量处理同步操作) (简单情况可以跳过 action 直接到 mutations)
    // 两个参数: 上下文环境，参数 -- 使用 context.commit(xx, xx) 方法调用 mutations 里面的方法名。
    actions: {
        // 7-3 add
        // select play 选择播放
        selectPlay: function({commit, state}, {list, index}) {

        }
    },

    // mutations 放置用来改变数据的方法，更改 Vuex 的 store 中的状态的唯一方法时提交 mutation.
    // Vuex 中的 mutation 非常类似于事件: 每个 mutation 都是一个字符串的 "事件类型(type)" 和
    // 一个 "回调函数(handler)"。参数是 state
    mutations: {
        // SET_SINGER(state, singer) {}
        [types.SET_SINGER](state, singer) {
            state.singer = singer;
        },

        // 7-2 add
        [types.SET_PLAYING_STATE](state, flag) {
            // 默认播放
            state.playing = flag;
        },
        [types.SET_FULL_SCREEN](state, flag) {
            // 默认是否全屏
            state.fullScreen = flag;
        },
        [types.SET_PLAYLIST](state, list) {
            // 播放列表
            state.playlist = list;
        },
        [types.SET_SEQUENCE_LIST](state, list) {
            // 播放顺序
            state.sequenceList = list;
        },
        [types.SET_PLAY_MODE](state, mode) {
            // 播放模式
            state.mode = mode;
        },
        [types.SET_CURRENT_INDEX](state, index) {
            // 当前播放的索引
            state.currentIndex = index
        }
    },
})
