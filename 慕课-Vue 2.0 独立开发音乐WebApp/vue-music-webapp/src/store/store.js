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

// 7-2 播放器 Vuex 数据设计 add
import {playMode} from 'assets/js/config';

// 7-18 导入 util.js 中的 shuffle 洗牌函数
import {shuffle} from "assets/js/util";

// 7-18 add
function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    })
}

export default new Vuex.Store({
    // 开启严格模式，检测对 state 的修改是不是通过 mutations 操作的
    strict: debug,
    plugins: debug ? [createLogger()]: [],
    // state 放公共数据
    state: {
        // 当前歌手
        singer: {},

        // 7-2 add: 播放器 Vuex 数据设计
        // 默认播放是 false
        playing: false,
        // 默认是否全屏
        fullScreen: false,
        // 播放列表: 即 singer-detail.vue 中得到的当前歌手的歌曲列表 (songs list)
        playlist: [],
        // 顺序播放
        sequenceList: [],
        // 播放模式
        mode: playMode.sequence,
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

    // Actions (调度一个"动作") [这个Actions(动作)不会直接改变 state (状态)]
    // 异步操作 或 对 mutation 做封装(批量处理同步操作) (简单情况可以跳过 action 直接到 mutations)
    // 两个参数: 上下文环境，参数 -- 使用 context.commit(xx, xx) 方法调用 mutations 里面的方法名。
    actions: {
        // 7-3 add
        // select play 选择播放
        // 次方法在 music-list.vue 中调用
        selectPlay: function({commit, state}, {list, index}) {
            /* 下面的 commit 调度是对 mutation 的封装 */
            // 调度 播放状态
            commit(types.SET_PLAYING_STATE, true);
            // 调度 是否全屏
            commit(types.SET_FULL_SCREEN, true);

            // 7-18 add: Q.此处添加判断的原因是什么？ A: 当我们点击 singer-detail.vue 中的
            // music-list.vue 歌曲列表打开 player.vue 播放组件，然后在当前组件内把歌曲播放模式切换为
            // "随机播放"
            if (state.mode === playMode.random) {
                let randomList = shuffle(list);
                commit(types.SET_PLAYLIST, randomList);
                index = findIndex(randomList, list[index]);
            }

            // 调度 播放列表
            commit(types.SET_PLAYLIST, list);
            // 调度 播放顺序
            commit(types.SET_SEQUENCE_LIST, list);
            // 调度 当前播放的索引
            commit(types.SET_CURRENT_INDEX, index);
        },

        // 7-18 添加 music-list.vue 中点击 "随机播放" 按钮所需要的封装事件 randomPlay
        // index 参数不需要，因为随机播放不牵扯到当前播放项。
        randomPlay: function({commit}, {list}) {
            // 设置播放模式: 直接设置上面导入的 playMode 对象中的 random
            commit(types.SET_PLAY_MODE, playMode.random);
            // 设置顺序播放列表
            commit(types.SET_SEQUENCE_LIST, list);
            // 把歌曲顺序列表洗牌
            let randomList = shuffle(list);
            // 然后设置播放里列表
            commit(types.SET_PLAYLIST, randomList);
            // 全屏 + 播放状态 都为 true 和上面一样
            commit(types.SET_PLAYING_STATE, true);
            commit(types.SET_FULL_SCREEN, true);
        }
    },

    // mutations 放置用来改变数据的方法，更改 Vuex 的 store 中的状态的唯一方法时提交 mutation.
    // Vuex 中的 mutation 非常类似于事件: 每个 mutation 都是一个字符串的 "事件类型(type)" 和
    // 一个 "回调函数(handler)"。参数是 state
    mutations: {
        // SET_SINGER(stat, singer) : 设置歌手，在 singer.vue 中的 selectSinger() 中设置的
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
