// 7-25 Created:

// mixin 的目的是当播放器底部有 "mini播放器/功能按钮栏" 时，我们给 Scroll 组件的包围 div
// 添加一个 bottom = 60px 的样式，

// tips: music-list.vue / singer.vue / recommend.vue 都需要引入这个 mixin

import {mapGetters} from "vuex";
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
