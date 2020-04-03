import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

/* console.log("Vuex: ", Vuex); */

/**
 * + 全局变量: store
 * + 共享数据: state
 * + 取数据的API即是获取数据: getters
 * + 存数据就是对数据库的修改: mutations (变化，突变)
 * + 数据存入到数据库中时一般情况下要处理成需要的形式，这个处理就是: actions (行动，活动)
 * */
import * as types from './mutation-types';

// 7-2 播放器 Vuex 数据设计 add
import { playMode } from 'assets/js/config';

// 7-18 导入 util.js 中的 shuffle 洗牌函数
import { shuffle } from "assets/js/util";

// 10-12 add: loadSearch, saveSearch
// 10-15 add: deleteSearch, clearSearch
// 11-13 add: savePLay, loadPlay 保存播放历史
import { loadSearch, saveSearch, deleteSearch, clearSearch, savePlay, loadPlay } from "assets/js/cache";

Vue.use(Vuex);
// 调试工具可以帮助我们检测对 state 的修改是不是通过 mutations 操作的
const debug = process.env.NODE_ENV !== "production";

// 7-18 add: 找到我们 "顺序播放的列表" 对应 "随机播放列表" 中的哪一首,
// 10-6 add explain: 插入歌曲也要用到这个方法，用来判断，插入的歌曲是否已经存在了播放列表中
function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    })
}

export default new Vuex.Store({
    // 开启严格模式，检测对 state 的修改是不是通过 mutations 操作的
    strict: debug,
    plugins: debug ? [createLogger()] : [],
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
        // playlist 第一次被赋值是在 singer-detail.vue -> music-list.vue 内封装的
        // vuex 的 mapActions 内的 this.selectPlay()
        playlist: [],

        // 顺序播放
        sequenceList: [],
        // 播放模式
        mode: playMode.sequence,
        // 当前播放的索引
        currentIndex: -1,

        // 8-1 add: 用来保存歌单详情的对象
        disc: {},

        // 9-3 add: 榜单详情页的歌曲列表
        topList: [],

        // 10-11 add: 添加保存搜索历史需要的属性
        searchHistory: loadSearch(),

        // 11-13 add: 播放历史
        playHistory: loadPlay()
    },

    // 取数据的 API 即是获取数据: getters
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

        // 8-1 add 保存点击的 歌单详情
        disc: (state) => {
            return state.disc;
        },

        // 9-3 add: 返回保存的排行榜帮点击跳转后的榜单列表
        topList: (state) => {
            return state.topList;
        },

        // 10-11
        searchHistory: (state) => {
            return state.searchHistory;
        },

        // 11-13 add: add-song.vue 中点击 "最近播放" 就可以查看最近的播放历史，我们点击歌手详情
        // 中的歌曲或者点击搜索的的歌曲，都是最近播放的歌曲，各个组件共享的数据，放在 vuex 中。
        // tips: 接下来我们就要到 player.vue  的 ready() 方法中把当前可以正常可以播放的歌曲保存
        // 到 playHistory 中 ---> 穿梭到 player.vue
        playHistory: (state) => {
            return state.playHistory;
        }
    },

    // Actions (调度一个"动作") [这个Actions(动作)不会直接改变 state (状态)]
    // 异步操作 或 对 mutation 做封装(批量处理同步操作) (简单情况可以跳过 action 直接到 mutations)
    // 两个参数: 上下文环境，参数 -- 使用 context.commit(xx, xx) 方法调用 mutations 里面的方法名。
    actions: {
        // 7-3 add
        // select play 选择播放
        // 次方法在 music-list.vue 中调用
        selectPlay: function({ commit, state }, { list, index }) {
            /* 下面的 commit 调度是对 mutation 的封装 */
            // 调度 播放状态
            commit(types.SET_PLAYING_STATE, true);
            // 调度 是否全屏
            commit(types.SET_FULL_SCREEN, true);

            // 7-18 add: Q.此处添加判断的原因是什么？ A: 当我们点击歌手详情(singer-detail.vue) 中
            // 歌曲列表(music-list.vue) 中的歌曲，打开 player.vue 播放组件，等歌曲播放几秒后暂停歌曲，
            // 把歌曲播放模式切换为 "随机播放", 然后点击左上角的 back 按钮显示出 歌手详情 组件，
            // 在当前窗口再次点击一首歌曲，然后就发现播放的歌曲不是当前点击的歌曲，这个问题是因为在 music.list
            // 中我们默认调用的 actions 封装是当前 selectPlay，但是当前 selectPlay 中的 播放模式(mode)
            // 我们都是按照 sequence 顺序播放列表来的，所以我们在此处增加判断，判断当前是"顺序播放"还是"随机播放"
            if (state.mode === playMode.random) {
                let randomList = shuffle(list);
                // 提交 commit SET_PLAYLIST 为 randomList
                commit(types.SET_PLAYLIST, randomList);
                // 找到我们顺序播放的歌曲，对应到 randomList 列表中的那一首
                index = findIndex(randomList, list[index]);
            } else {
                // 调度 播放列表
                commit(types.SET_PLAYLIST, list);
            }
            // 调度 播放顺序
            commit(types.SET_SEQUENCE_LIST, list);
            // 调度 当前播放的索引
            commit(types.SET_CURRENT_INDEX, index);
        },

        // 7-18 添加 music-list.vue 中点击 "随机播放" 按钮所需要的封装事件 randomPlay
        // index 参数不需要，因为随机播放不牵扯到当前播放项。
        randomPlay: function({ commit }, { list }) {
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
        },

        // 10-6: 封装 "搜索歌曲" 点击歌曲把其插入到播放列表的 action
        // 🔺🔺🔺 这个真的好难啊
        insertSong: function({ commit, state }, song) {
            // 获取 播放列表(playlist), 循环列表(sequenceList) 和 当前播放歌曲的index(currentIndex)
            let playlist = state.playlist.slice();
            let sequenceList = state.sequenceList.slice();
            let currentIndex = state.currentIndex;

            // 第一次默认为 -1
            // console.log("insertSong currentIndex: ", currentIndex);

            // 记录当前歌曲
            let currentSong = playlist[currentIndex];
            // 查找当前列表中是否有待插入的歌曲并返回其索引
            let fpIndex = findIndex(playlist, song);
            // 因为插入歌曲，所以索引 + 1
            currentIndex++;
            // 插入这首歌到当前索引位置
            playlist.splice(currentIndex, 0, song);
            // 如果已经包含了这首歌
            if (fpIndex > -1) {
                // 如果当前插入的序号大于列表中的序号
                if (currentIndex > fpIndex) {
                    playlist.splice(fpIndex, 1);
                    currentIndex--;
                } else {
                    playlist.splice(fpIndex + 1, 1);
                }
            }

            // 当前待插入的歌曲 要插入到 sequenceList 的位置
            let currentSIndex = findIndex(sequenceList, currentSong) + 1;
            // 插入 sequenceList 是否包含要插入的歌曲
            let fsIndex = findIndex(sequenceList, song);

            sequenceList.splice(currentSIndex, 0, song);
            if (fsIndex > -1) {
                if (currentSIndex > fsIndex) {
                    sequenceList.splice(fsIndex, 1);
                } else {
                    sequenceList.splice(fsIndex + 1, 1);
                }
            }

            commit(types.SET_PLAYLIST, playlist);
            commit(types.SET_SEQUENCE_LIST, sequenceList);
            commit(types.SET_CURRENT_INDEX, currentIndex);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYING_STATE, true);
        },

        // 10-11 add: 保存搜索结果. 因为我们的搜索结果是可以保存到本地缓存，而且在组件其他部分也是可以共用的
        // 所以我们首先在 vuex 中封装一个 action. query 是保存搜索结果。接着在 assets/js/ 下创建 cache.js
        saveSearchHistory: function({ commit }, query) {
            commit(types.SET_SEARCH_HISTORY, saveSearch(query));
        },

        // 10-15 add: 删除搜索历史列表
        deleteSearchHistory: function({ commit }, query) {
            commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
        },

        // 10-15 add: 删除整个搜索历史列表
        clearSearchHistory: function({ commit }) {
            commit(types.SET_SEARCH_HISTORY, clearSearch());
        },

        // 11-5 点击 playlist.vue 中每首歌后面的叉号删除歌曲，参数 song 就是要删除的歌曲
        deleteSong: function({ commit, state }, song) {
            // 这三个和 insertSong 中的获取是一样，分别是 播放列表(playlist), 循环列表(sequenceList)
            // 和 当前播放歌曲的索引(currentIndex)
            let playlist = state.playlist.slice();
            let sequenceList = state.sequenceList.slice();
            let currentIndex = state.currentIndex;

            // 找到当前要删除的歌曲在 playlist 中的索引
            let pIndex = findIndex(playlist, song);
            // 然后从 playlist 中删除当前这首歌
            playlist.splice(pIndex, 1);

            // 找到当前要删除的歌曲在 sequenceList 中的索引，然后删除
            let sIndex = findIndex(sequenceList, song);
            sequenceList.splice(sIndex, 1);

            // 1、删除完之后，我们要判断当前播放的歌曲是不是大于 pIndex, 如果大于的话我们要把 currentIndex--,
            // 为什么要 -- 呢?  A: currentIndex > pIndex 就是代表当前播放的歌曲在要删除的歌曲之后;
            // 试想如果播放列表一共有 10 首歌，我们突然把第 3 首删除，当前播放的是第 7 首，删除一首后播放列表
            // 还有 9 首歌，那么此时播放的歌曲就应该变成第 6 首了，要不然我们播放第 10 首时哪还有歌曲。
            // 2、另外一种情况是我们删除歌曲后，当前 currentIndex 等于 10 (playlist.length) 也就是说，
            // 我们删除歌曲后当前播放的歌曲成了最后一首了，那么 currentIndex 也要 减减(--), 当前歌曲从 10
            // 首变成 9 首了，我们当前播放的索引肯定要减一啊，道理和第一种情况一样。
            if (currentIndex > pIndex || currentIndex === playlist.length) {
                currentIndex--;
            }

            commit(types.SET_PLAYLIST, playlist);
            commit(types.SET_SEQUENCE_LIST, sequenceList);
            commit(types.SET_CURRENT_INDEX, currentIndex);

            // 如果我们删除了当前播放列表的所有歌曲，播放的操作要暂停
            if (!playlist.length) {
                commit(types.SET_PLAYING_STATE, false);
            } else {
                // 11-6 add: 当我们点击删除的时候，播放状态是暂停态，但是删除之后播放列表仍然还有歌曲，
                // 这时就要把播放状态从新设置为开始
                commit(types.SET_PLAYING_STATE, true);
            }

            // 上面的 if/else 可以写成这种简写形式
            // let playingState = playlist.length > 0;
            // commit(types.SET_PLAYING_STATE, playingState);
        },

        // 11-7 add
        deleteSongList: function({ commit }) {
            // 即把这些值设置为初始值
            commit(types.SET_PLAYLIST, []);
            commit(types.SET_SEQUENCE_LIST, []);
            commit(types.SET_CURRENT_INDEX, -1);
            commit(types.SET_PLAYING_STATE, false);
        },

        // 11-13 add: 保存播放历史
        savePlayHistory: function({ commit }, song) {
            // 接下来的操作到 cache.js 中添加 savePlay / loadPlay 然后再上面导入
            commit(types.SET_PLAY_HISTORY, savePlay(song));
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
        },

        // 8-1 add
        [types.SET_DISC](state, disc) {
            state.disc = disc;
        },

        // 9-3 add: 排行榜榜单点击进入后的歌曲排行列表
        [types.SET_TOP_LIST](state, topList) {
            state.topList = topList
        },

        // 10-11 add: 搜索历史
        [types.SET_SEARCH_HISTORY](state, history) {
            state.searchHistory = history;
        },

        // 11-13 最近播放
        [types.SET_PLAY_HISTORY](state, history) {
            state.playHistory = history;
        }
    }
})
