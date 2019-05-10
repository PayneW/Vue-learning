// 7-25 Created:

// mixin 的目的是当播放器底部有 "mini播放器/功能按钮栏" 时，我们给 Scroll 组件的包围 div
// 添加一个 bottom = 60px 的样式，

// tips: music-list.vue / singer.vue / recommend.vue 都需要引入这个 mixin

import {mapGetters, mapMutations, mapActions} from "vuex";
export const playlistMixin = {
    computed: {
        ...mapGetters([
            "playlist"
        ])
    },

    // 组件 DOM ready 时会触发 mounted
    mounted() {
        this.handlePlaylist(this.playlist);
    },

    // keep-alive 组件被触发的时候，会调用 activated 方法
    activated() {
        this.handlePlaylist(this.playlist);
    },

    // watch 上面 computed 中的 playlist
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal);
        }
    },

    methods: {
        // 在钩子函数中调用，处理 playlist
        // handlePlaylist 在各个具体的组件内实现(即在组件的 methods 对象中定义此方法)，如果
        // 具体的组件内部没有声明，那么这里就抛出错误
        handlePlaylist(){
            throw new Error("component must implement handlePlaylist method.")
        }
    }
};



// 11-8
import {playMode} from "assets/js/config";
import {shuffle} from "assets/js/util";
// 11-8 add: playlist.vue / player.vue 中公用的功能，添加此 mixin
export const playerMixin = {
    computed: {
        // 11-8  把 player.vue 中的 iconMode 粘过来
        // 7-16: 播放模式图标更改
        iconMode() {
            // this.mode 即为上面 ...mapGetters() 内引入的
            // playMode 为上面 import 引入 assets/js/config
            // 因为有 3 种播放模式，下面为 2 个三目运算符来解决: 如果当前的 this.mode 等于 playMode.sequence
            // 那么就添加 "icon-sequence" class, 否则就执行第二种情况，第二种情况又是一个判断，如果 this.mode 等于
            // playMode.loop 那么就添加 "icon-loop", 否则就添加 "icon-random"
            return this.mode === playMode.sequence ? "icon-sequence" :
                this.mode === playMode.loop ? "icon-loop" : "icon-random";
        },

        ...mapGetters([
            // 取得播放列表
            "sequenceList",
            "currentSong",
            "playlist",

            // 11-5 add: 但是这个应该在 11-4 视频内就使用到的
            "mode",
        ])
    },
    methods: {
        // 7-16 点击改变播放模式
        changeMode() {
            console.log("this.mode: ", this.mode);
            // 每点一次按钮的时候我们都要改变一次 mode, 这里的 this.mode 在 config.js 中配置的 0/1/2 三种状态
            // 所以 this.mode + 1 最大等于 3. 因为我们又是通过 % 求余数，所以余数就是 0/1/2 中其一
            const mode = (this.mode + 1) % 3;
            console.log("changeMode mode: ", mode);
            // 这个 mode 通过 vuex 的 mutation 设置到 state 上
            this.setPlayMode(mode);

            // 7-17 add
            let list = null;
            if (mode === playMode.random) {
                // 把数组重新洗牌
                list = shuffle(this.sequenceList);
            } else {
                // 如果是顺序播放就正常赋值
                list = this.sequenceList;
            }

            // 7-17 add annotation: 在 store.js 中 currentSong 是根据 state.playlist 和 state.currentIndex 计算而来
            // 但是当我们切换播放按钮的图标设置 随机播放/顺序播放/单曲循环 时，由于我们利用 shuffle() 方法打乱了
            // 播放列表，那么 playlist 被打乱后，当前 currentSong 势必也会更改，所以我们需要在 player.vue 中
            // 通过 changMode() 改变播放列表后，再次设置当前 currentIndex
            // tips: 接下来要解决的问题，见 watch 对象下的 currentSong() 函数
            this.resetCurrentIndex(list);

            // 接着我们调用上面的 ...mapMutations 下映射的 setPlaylist 来修改当前播放列表
            this.setPlaylist(list);
        },

        resetCurrentIndex(list) {
            // ES6 语法 findIndex() 方法返回查找到的值的索引。
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id;
            });
            // 调用 mutations 的 setCurrentIndex;
            this.setCurrentIndex(index);
        },

        ...mapMutations({

            // 7-8 add: 设置播放器的播放状态 true/false, 映射到 mutation-types.js 中的 SET_PLAYING_STATE
            setPlayingState: "SET_PLAYING_STATE",

            // 7-9 add: 映射到 mutation-types.js 中的 SET_CURRENT_INDEX
            setCurrentIndex: "SET_CURRENT_INDEX",

            // 7-16 add: 映射到 mutation-types.js 中的 SET_PLAY_MODE
            // 通过提交 mutation 来修改 playMode
            setPlayMode: "SET_PLAY_MODE",

            // 7-17 add: 我们在下面 changeMode() 中设置了是播放列表是"顺序播放"还是"随机播放"
            // 但是我们真正的修改 playlist 还是要通过 vuex 中 mutations 中的 types.SET_PLAYLIST
            // 方法来实现，所以此时我们设置映射 mutation-types.js 中的 SET_PLAYLIST
            setPlaylist: "SET_PLAYLIST",
        }),
    }
};

// 11-11 添加搜索相关的 mixin
export const searchMixin = {
    data() {
      return {
          query: "",
      }
    },

    // 首先把 search.vue 中的 mapGetters 拿过来，内为搜索历史相关
    // 10-14 add: mapGetters 因为我们要使用 state.searchHistory;
    computed: {
        ...mapGetters([
            "searchHistory",
        ]),
    },

    methods: {
        // 把点击的热门搜索的值添加点到 搜索框中 (即传入到: search-box.vue 中的 input 内)
        // 此处定义了 addQuery， 在 search-box.vue 中添加一个接受的 setQuery, 接着就在
        // 当前组建内调用子组件的方法
        addQuery(query) {
            this.$refs.searchBox.setQuery(query);
        },

        // 10-4
        onQueryChange(query) {
            this.query = query;
        },

        // 10-10: 这个回调函数经过了 2 层传递。(1)首先 scroll.vue 中 this.$emit("beforeScroll")
        // (2)接着 suggest.vue 中在 listenScroll 回调中又 this.$emit("listenScroll");
        // (3)当前 blurInput 要做的就调用 search-box.vue 中的 input 失去焦点事件
        blurInput() {
            this.$refs.searchBox.blur();
        },

        // 10-11 add: 保存搜索结果. 因为我们的搜索结果是可以保存到本地缓存，而且在组件其他部分也是可以共用的
        // 所以我们首先在 vuex 中封装一个 action
        saveSearch() {
            this.saveSearchHistory(this.query);
        },

        ...mapActions([
            "saveSearchHistory",
            "deleteSearchHistory",
        ]),
    },

};

