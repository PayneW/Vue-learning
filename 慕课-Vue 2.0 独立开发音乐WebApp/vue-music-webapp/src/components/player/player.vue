<!-- create 7-3  -->
<!-- 7-3: 此组件直接在 App.vue 中导入，因为不牵扯到路由 -->
<template>
    <!-- 7-3 playlist.length 来自于: ...mapGetters() 中引入的 Vuex 中的 playlist,
         但是这个 playlist 在哪里给 vuex 中的 state.playlist 赋值的呢？ 答: 在
         music-list.vue 中的 this.selectPlay() 方法 (即: vuex 的 actions) 中赋值的。 -->
    <div class="player" v-show="playlist.length > 0">
        <!-- 7-5 add: transition
            7-6 add: vue.js 提供的 javascript 事件钩子  -->
        <transition
            name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
        >
            <!-- div.normal-player 为展开的大播放器 -->
            <div class="normal-player" v-show="fullScreen">
                <!-- 7-4 add -->
                <div class="background">
                    <!-- tips: currentSong 来自于下面 ...mapGetters() 中导入的 vuex 数据 -->
                    <img width="100%" height="100%" :src="currentSong.image">
                </div>

                <!-- normal 播放器头部 -->
                <div class="top">
                    <!-- 7-4 add: @back -->
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <!-- 7-4 add: -->
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>

                <!-- normal 播放器中部 -->
                <div class="middle">
                    <div class="middle-l">
                        <!-- 7-7 add: 添加 ref="cdWrapper" 给 animations.runAnimation() 使用 -->
                        <div class="cd-wrapper" ref="cdWrapper">
                            <!-- 7-8 add:  :class="cdCls" -->
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- normal 播放器底部 -->
                <div class="bottom">
                    <!-- 7-11 add: 歌曲播放进度条+时间 -->
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <!-- 7-12 add: 加载基础的进度条组件 :percent="percent" 动态绑定的属性 percent 在子组件
                                (progress-bar) 的 props 对象中接收，但是我们在子组件的 watch 对象中可以看到
                                percent(newPercent) 是接收一个值的，也就是说父组件通过 v-bind 传值给子组件的时候可以不写
                                参数。实际上也可以看出来子组件接收的 newPercent 参数就是当前组件内 computed 下的 percent
                                方法的 return 返回值。▲▲▲▲▲▲▲ -->
                            <!-- 7-13 add: @percentChange 接受子组件 progress-bar.vue 中 $emit 发送的
                                percentChange 事件，值为一个 p.progress 进度条的百分比 -->
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>

                    <div class="operators">
                        <!-- 7-16 添加点击事件 @click="changeMode" -->
                        <div class="icon i-left" @click="changeMode">
                            <!-- 7-16 更改默认 class 为 动态绑定 :class 因为播放模式切换对应的字体图标也要更改 -->
                            <i :class="iconMode"></i>
                        </div>
                        <!-- 7-10 add: :class="disableCls" 计算属性 -->
                        <div class="icon i-left" :class="disableCls">
                            <!-- 7-9 add: @click="prev" -->
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <!-- 7-8 add: togglePlaying  :class="playIcon"  -->
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <!-- 7-9 add: @click="next" -->
                            <i @click="next" class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- div.mini-player 为缩小的播放器 -->
        <transition name="mini">
            <!-- 7-4 add @click="open" -->
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                   <div class="img-wrapper" ref="miniWrapper">
                       <!-- 7-8 add:  :class="cdCls" -->
                       <img width="40" height="40" :src="currentSong.image" :class="cdCls">
                   </div>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc"  v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <!-- 7-15 add: 引入 progress-circle 组件 -->
                    <!-- 通过 props 把 :radius 和 :percent 传入到子组件 progress-circle.vue 中 -->
                    <progress-circle :radius="radius" :percent="percent">
                        <!-- 7-8 add --- 7-15 edit: 把此 i 标签移入到 progress-circle 组件内 -->
                        <!-- 当前组件内的 <i></i> 标签会替换掉子组件 progress-circle.vue 中的 slot 插槽 -->
                        <!-- 7-15 add: class="icon-mini" -->
                        <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </progress-circle>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>

        <!-- 7-8 add: 播放音频是通过 H5 的 audio 标签实现的 -->
        <!-- 7-9 add: @canplay @error 控制快速切换上一曲/下一曲的操作 -->
        <!-- 7-11 add: @timeupdate 更新已经播放的时间， audio 标签默认提供的事件 timeupdate -->
        <!-- 7-18 add: @ended 事件，audio 标签原生事件 -->
        <audio ref="audio"
               :src="currentSong.url"
               @canplay="ready"
               @error="error"
               @timeupdate="updateTime"
               @ended = "end"
        ></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    // 7-6 add
    // 安装 npm install create-keyframe-animation --save
    import animations from "create-keyframe-animation";

    // 7-7 add
    import {prefixStyle} from "assets/js/dom";
    const transform = prefixStyle("transform");

    // 7-12 add: 导入创建的 progress-bar.vue 基础组件
    import progressBar from "base/progress-bar/progress-bar";

    // 7-15 add:
    import progressCircle from "base/progress-circle/progress-circle";

    // 7-16 add
    import {playMode} from "assets/js/config";

    // 7-17 add
    import {shuffle} from "assets/js/util";

    export default {

        // 7-9 add
        data() {
            return {
                // 7-9 add: 添加一个歌曲的 songReady 状态，只有当 songReady 为 true 时才可以切换歌曲
                songReady: false,
                // 7-11 add: 当前时间
                currentTime: 0,
                // 7-15 add: 在当前组件设置进度条圆环的 radius
                radius: 32,
            }
        },

        components: {
            progressBar,
            progressCircle,
        },

        computed: {
            // 7-3 add
            ...mapGetters([
                "fullScreen",
                "playlist",
                // 7-4 add: currentSong 在 getters 中的定义为 state.playlist[state.currentIndex]
                // playlist 在 music-list.vue 中通过 vuex 的 mapActions 已经设值
                "currentSong",
                // 7-8 add: 映射到 store --> getters 内的 playing: false(默认)
                "playing",
                // 7-9 add: 映射 getters 中的 currentIndex
                "currentIndex",
                // 7-16 add: 播放模式，映射到 getters 中的 mode (tips: 在 vuex 中我们
                // 默认引入 assets/js/config 中配置的 playMode 的 sequence )
                "mode",
                // 7-17 add: 渠道 getters 中的 sequenceList
                "sequenceList",
            ]),

            // 7-8 add: 改变歌曲 播放/暂停 的按钮图标
            playIcon() {
                return this.playing ? "icon-pause": "icon-play"
            },
            miniIcon() {
                return this.playing ? "icon-pause-mini" : "icon-play-mini";
            },

            // 7-8 给 div.cd 添加旋转的 class
            cdCls() {
                return this.playing ? "play": "play pause";
            },

            // 7-10 如果在切换 上一曲/下一曲 当前 url 未被完全加载时，就给 div.i-left, div.i-right
            // 添加 disableCls 禁止点击
            disableCls() {
                return this.songReady ? "" : "disable"
            },

            // 7-12: 当前歌曲播放的比例
            percent() {
                // 当前播放的时间 除以 歌曲的总时间
                return this.currentTime / this.currentSong.duration;
            },

            // 7-16: 播放模式图标更改
            iconMode() {
                // this.mode 即为上面 ...mapGetters() 内引入的
                // playMode 为上面 import 引入 assets/js/config
                // 因为有 3 种播放模式，下面为 2 个三目运算符来解决: 如果当前的 this.mode 等于 playMode.sequence
                // 那么就添加 "icon-sequence" class, 否则就执行第二种情况，第二种情况又是一个判断，如果 this.mode 等于
                // playMode.loop 那么就添加 "icon-loop", 否则就添加 "icon-random"
                return this.mode === playMode.sequence ? "icon-sequence" :
                    this.mode === playMode.loop ? "icon-loop" : "icon-random";
            }

        },

        methods: {
            // 7-4 add
            back() {
                this.setFullScreen(false);
            },
            open() {
                this.setFullScreen(true);
            },
            ...mapMutations({
                setFullScreen: "SET_FULL_SCREEN",

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


            // 7-6 add: Vue 提供的 js 动画钩子函数
            // tips: 这里 vue 提供的 el 参数老师并没有用到，vue 官网文档里 transition 封装组件内就一个要添加动画的元素，
            // 所以 vue 会直接把此元素通过 el.style.xx 来添加动画，但是现在的播放器动画内嵌套的层级较多，老师是直接通过
            // this.$refs.cdWrapper 来访问的
            enter(el, done) {
                // 使用下面 _getPosAndScale() 返回的对象值
                const {scale, x, y} = this._getPosAndScale();

                // 定义 div.cd-wrapper 的运动轨迹
                let animation = {
                    0: {
                        // css3 animation 动画定义了不同时间的位置，作用在 cdWrapper 上，
                        // 0% 时要把它偏移到左下方并且缩小，
                        // 60% 的时候偏移到要到达的位置，并且把 scale 扩大到 1.1
                        // 100% 的时候恢复 scale 为默认值
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    },
                    60: { transform: `translate3d(0, 0, 0) scale(1.1)` },
                    100: { transform: `translate3d(0, 0, 0) scale(1)` }
                };

                // 7-7 add: 使用上面导入的 create-keyframe-animation, 首先注册 animation
                animations.registerAnimation({
                    name: "move",
                    animation,
                    presets: {
                        duration: 400,
                        easing: "linear"
                    }
                });
                // 接着运行上面注册的 animation
                animations.runAnimation(this.$refs.cdWrapper, "move", done);

            },
            afterEnter() {
                // 上面 enter() 函数重的回调函数 done 执行完毕之后就会接着运行当前的 afterEnter
                animations.unregisterAnimation("move");
                this.$refs.cdWrapper.style.animation = "";
            },
            leave(el, done) {
                // 7-7 add:
                // 20190401: 重新观看老师的视频，发现我这里的 leave 和 afterLeave 效果并没有执行，没找到哪里的问题。
                this.$refs.cdWrapper.style.transition = "all 0.4s";
                const {scale, x, y} = this._getPosAndScale();
                this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}, 0) scale(${scale})`;

                // Remind: 这里要添加 400ms 的超时调用，原因是我们在下面添加 transitionend 事件时，目前 cdWrapper
                // 上所执行的 css 动画并没有执行完毕，但是此时 done 函数被执行导致 vue 通过 done 添加的
                // display: none 没有被添加成功
                const timer = setTimeout(done, 400);
                this.$refs.cdWrapper.addEventListener("transitionend", () => {
                    clearTimeout(timer);
                    done();
                });
            },
            afterLeave() {
                this.$refs.cdWrapper.style.transition = "";
                this.$refs.cdWrapper.style[transform] = ""
            },
            // 7-6 add 钩子函数内调用的封装，即是唱片的动画和缩放
            _getPosAndScale() {
                const targetWidth = 40;
                const paddingLeft = 40;
                const paddingBottom = 30;
                const paddingTop = 80;
                const cdWidth = window.innerWidth * 0.8;
                const scale = targetWidth / cdWidth;

                // 为什么这个 x 为负值? 答: translate(x, y) 相对于当前位置向水平(x) + 垂直(y) 方向移动，
                // 在浏览器中的移动规则 '正值向"右下", 负值向"左上"'。默认中心就是当前盒子模型的中心点。
                // 接下来的解释见: 上面调用函数 enter() 下的 animation 内的 0: {} 里的注释
                const x = -(window.innerWidth / 2 - paddingLeft);
                // 因为 cd 的 width = height 所以减去 width/2 = height/2
                const y = window.innerHeight - paddingTop - cdWidth / 2 - paddingBottom;

                // ES6 属性初始值的简写: {scale, x, y} === {scale: scale, x: x, y: y};
                // JS-book-learning\《深入理解ES6》\4th chapter--扩展对象的功能性\4th-扩展对象的功能性.js
                return {scale, x, y}
            },

            // 7-8 add: 添加点击播放/暂停事件
             togglePlaying() {
                // 调用上面 ...mapMutations({}) 中的 setPlayingState, 调度 mutations 中的方法
                this.setPlayingState(!this.playing);
            },

            // 7-9 add
            next() {
                // 7-9 add: 这个 songReady 为 7-9 视频最后添加，目的时为了给快速切换上一曲/下一曲时
                // 判断当前歌曲是不是有加载完毕
                if(!this.songReady) {
                    return
                }
                let index = this.currentIndex + 1;
                // playlist
                console.log("player.vue -> methods -> next() -> index: ", index);
                // 到最后一首歌时，把 index 置为 0
                if (index === this.playlist.length) {
                    index = 0;
                }
                // 调用 mapMutations 中的 setCurrentIndex()
                this.setCurrentIndex(index);
                // 如果当前是暂停状态，那么切换到下一首时应该播放
                if (!this.playing) {
                    this.togglePlaying();
                }
                // 只有当 this.ready() 执行时才会把值设置为 true,
                this.songReady = false;
            },
            prev() {
                if(!this.songReady) {
                    return
                }
                let index = this.currentIndex - 1;
                if (index === -1) {
                    index = this.playlist.length -1;
                }
                this.setCurrentIndex(index);

                if (!this.playing) {
                    this.togglePlaying();
                }

                this.songReady = false;
            },

            // 7-9 add: 中有当前歌曲加载完毕，ready 执行，才会把 songReady 设置为 true, 这样就解决快速上下切换歌曲的问题
            ready() {
                this.songReady = true;
            },

            // 7-10 add: error 事件是为防止网络突然有问题时添加的判断
            error() {
                this.songReady = true;
            },

            // 7-11 add:
            updateTime(e) {
                this.currentTime = e.target.currentTime;
            },
            // 格式化时间: 更详细的示例见: js-sundry-goods\20190328-H5 audio\audio.html
            format(interval) {
                interval = interval | 0;
                const minute = interval / 60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            // 由于播放时间小于 10 秒时我们希望的样式时 : 0.09 这样，所以我们就需要补齐这个 0
            _pad(num, n=2) {
                let len = num.toString().length;
                while(len < n) {
                    num = "0" + num;
                    len++;
                }
                return num;
            },

            // 7-13 add
            onProgressBarChange(percent) {
                // audio 的 currentTime 是可读写可设置的属性
                console.log("player.vue -> methods -> onProgressBarChange() -> this.$refs.audio.currentTime: ", this.$refs.audio.currentTime);
                this.$refs.audio.currentTime = this.currentSong.duration * percent;
                // 拖动后如果当前状态是非播放状态，那么就让他播放
                if (!this.playing) {
                    this.togglePlaying();
                }
            },

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

            // 7-18 add: 监听播放完的事件
            end() {
                // 首先判断当前的播放模式
                // if 为单曲循环
                if (this.mode === playMode.loop) {
                    this.loop();
                } else {
                    // "顺序播放/随机播放" 时切换到下一首
                    this.next();
                }
            },
            // 循环播放
            loop() {
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
            },

        },

        watch: {
            // 监听上面 ...mapGetters() 内的 currentSong 的变化
            // 7-17 add: 参数 newSong, oldSong
            // important hint: (newSong, oldSong) 2 个参数，是 vue 里 watch 给回调函数默认提供的参数
            // links: https://cn.vuejs.org/v2/api/#watch
            currentSong(newSong, oldSong) {
                // tips: 上面 changeMode() 内通过 this.resetCurrentIndex() 重新设置了 currentIndex的，
                // 虽然解决了点击切换播放模式按钮切换歌曲时可以保持 currentSong 不变的问题，但不能解决当
                // 我们点击暂停按钮后再次切换播放模式时，音乐会自动播放的问题，那么为什么我们点击了暂停按钮，再次点击切换
                // 播放模式时音乐会自动播放呢？ 答: 因为我们在下面 watch 对象中监听了 currentSong, 只要 currentSong
                // 有变化就会触发 audio 的 play() 方法， 所以解决方法是在下面 currentSong() 函数内添加 newSong 和
                // oldSong 来判断
                // 加入 id 没有变 我们就不做操作
                console.log("player.vue -> watch -> currentSong() -> newSong.id: ", newSong.id);
                console.log("player.vue -> watch -> currentSong() -> oldSong.id: ", oldSong.id);
                if (newSong.id === oldSong.id) return;

                // 添加 this.$nextTick() 延时的原因: 我们必须等上面 auto 标签，动态绑定 src 完成后才能播放
                this.$nextTick(() => {
                    // 当 currentSong 变化时调用 play() 方法，实际上即动态添加了 src 时
                    this.$refs.audio.play();
                })
            },

            // 观察 ...mapGetters() 内的 playing 变化 true/false
            playing(newPlaying) {
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    newPlaying ? audio.play(): audio.pause();
                })
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .player {
        .normal-player {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 150;
            background: $color-background;
            .background {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: .6;
                filter: blur(20px)
            }
            .top {
                position: relative;
                margin-bottom: 25px;
                .back {
                    position: absolute;
                    top: 0;
                    left: 6px;
                    z-index: 50
                    .icon-back {
                        display: block;
                        padding: 9px;
                        font-size: $font-size-large-x;
                        color: $color-theme;
                        transform: rotate(-90deg);
                    }
                }
                .title {
                    width: 70%;
                    margin: 0 auto;
                    line-height: 40px;
                    text-align: center;
                    no-wrap();
                    font-size: $font-size-large;
                    color: $color-text;
                }
                .subtitle {
                    line-height: 20px;
                    text-align: center;
                    font-size: $font-size-medium;
                    color: $color-text;
                }
            }
            .middle {
                position: fixed;
                top: 80px;
                width: 100%;
                bottom: 170px;
                white-space: nowrap;
                font-size: 0;
                .middle-l {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 80%;
                    .cd-wrapper {
                        position: absolute;
                        left: 10%;
                        top: 0;
                        width: 80%;
                        box-sizing: border-box;
                        height: 100%;
                        .cd {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            &.play {
                                animation: rotate 20s linear infinite;
                            }
                            &.pause {
                                animation-play-state: paused;
                            }
                            .image {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                box-sizing: border-box;
                                border-radius: 50%;
                                border: 10px solid rgba(255, 255, 255, 0.1);
                            }
                        }
                    }
                    .playing-lyric-wrapper {
                        width: 80%;
                        margin: 30px auto; 0 auto;
                        overflow: hidden;
                        text-align: center;
                        .playing-lyric {
                            height: 20px;
                            line-height: 20px;
                            font-size: $font-size-medium;
                            color: $color-text-l;
                        }
                    }
                }
                .middle-r {
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    .lyric-wrapper {
                        width: 80%;
                        margin: 0 auto;
                        overflow: hidden;
                        text-align: center;
                        .text {
                            line-height: 32px;
                            color: $color-text-l;
                            font-size: $font-size-medium;
                            &.current {
                                color: $color-text;
                            }
                        }
                        .pure-music {
                            padding-top: 50%;
                            line-height: 32px;
                            color: $color-text-l;
                            font-size: $font-size-medium;
                        }
                    }
                }
            }
            .bottom {
                position: absolute;
                bottom: 50px;
                width: 100%;
                .dot-wrapper {
                    text-align: center;
                    font-size: 0;
                    .dot {
                        display: inline-block;
                        vertical-align: middle;
                        margin: 0 4px;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: $color-text-l;
                        &.active {
                            width: 20px;
                            border-radius: 5px;
                            background: $color-text-ll
                        }
                    }
                }
                .progress-wrapper {
                    display: flex;
                    algin-items: center;
                    width: 80%;
                    margin: 0 auto;
                    padding: 10px 0;
                    .time {
                        color: $color-text;
                        font-size: $font-size-small;
                        flex: 0 0 30px;
                        line-height: 30px;
                        width: 30px;
                        &.time-l {
                            text-align: left;
                        }
                        &.time-r {
                            text-align: right;
                        }
                    }
                    .progress-bar-wrapper {
                        flex: 1;
                    }
                }
                .operators {
                    display: flex;
                    align-items: center;
                    .icon {
                        flex: 1;
                        color: $color-theme;
                        &.disable {
                            color: $color-theme-d;
                        }
                        i {
                            font-size: 30px;
                        }
                    }
                    .i-left {
                        text-align: right;
                    }
                    .i-center {
                        padding: 0 20px;
                        text-align: center;
                        i {
                            font-size: 40px;
                        }
                    }
                    .i-right {
                        text-align: left;
                    }
                    .icon-favorite {
                        color: $color-sub-theme;
                    }
                }
            }

            &.normal-enter-active, &.normal-leave-active {
                transition: all .4s;
                .top, .bottom {
                    transition: all .4s cubic-bezier(.86, .18, .82, 1.32);
                }
            }
            &.normal-enter, &.normal-leave-to {
                opacity: 0;
                .top {
                    transform: translate3d(0, -100px, 0);
                }
                .bottom {
                    transform: translate3d(0, 100px, 0);
                }
            }
        }

        .mini-player {
            display: flex;
            align-items: center;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 180;
            width: 100%;
            height: 60px;
            background: $color-highlight-background;
            &.mini-enter, &.mini-leave-to {
                opacity: 0;
            }
            &.mini-enter-active, &.mini-leave-active {
                transition: all .4s;
            }

            .icon {
                flex: 0 0 40px;
                width: 40px;
                height: 40px;
                padding: 0 10px 0 20px;
                .img-wrapper {
                    height: 100%;
                    width: 100%;
                    img {
                        border-radius: 50%;
                        &.play {
                            animation: rotate 10s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                        }
                    }
                }
            }
            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                .name {
                    margin-bottom: 2px;
                    no-wrap();
                    font-size: $font-size-medium;
                    color: $color-text;
                }
                .desc {
                    no-wrap();
                    font-size: $font-size-small;
                    color: $color-text-d;
                }
            }
            .control {
                flex: 0 0 30px;
                width: 30px;
                padding: 0 10px;
                .icon-play-mini, .icon-pause-mini, .icon-playlist {
                    font-size: 30px;
                    color: $color-theme-d;
                }
                .icon-mini {
                    font-size: 32px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }

    @keyframes rotate {
        0% {transform: rotate(0)}
        100% {transform: rotate(360deg)}
    }
</style>
