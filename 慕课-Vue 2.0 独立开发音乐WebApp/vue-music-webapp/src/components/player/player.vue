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
                <!-- 7-22 add: 给 div.middle 添加三个触摸事件 -->
                <div class="middle"
                     @touchstart="middleTouchStart"
                     @touchmove.prevent="middleTouchMove"
                     @touchend="middleTouchEnd"
                >
                    <!-- 7-23 add: 歌词板块滑动出来，div.middle-l 渐隐，所以需要给当前元素添加 ref 以便引用 -->
                    <div class="middle-l" ref="middleL">
                        <!-- 7-7 add: 添加 ref="cdWrapper" 给 animations.runAnimation() 使用 -->
                        <div class="cd-wrapper" ref="cdWrapper">
                            <!-- 7-8 add:  :class="cdCls" -->
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>

                        <!-- 7-24 add: 在圆形logo下 添加显示一行歌词的 DOM -->
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                    </div>
                    <!-- 7-20 添加歌词的 DOM 结构 -->
                    <!-- 7-21 把歌词 DOM 外围的 div 更改为 Scroll 组件, 因为歌词需要向上滚动; 绑定 data 数据传给
                         scroll 组件(子组件在 props 中接收)，用于 scroll 组件调用 refresh()来刷新页面获取当前组件
                         的高度，这个在课程一开始就讲了，不过多解说。-->
                    <Scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <!-- 7-21 添加绑定歌词高亮的 class -->
                                <p class="text"
                                   ref="lyricLine"
                                   :class="{'current': currentLineNum === index}"
                                   v-for="(line, index) in currentLyric.lines">
                                    {{line.txt}}
                                </p>
                            </div>
                        </div>
                    </Scroll>
                </div>

                <!-- normal 播放器底部 -->
                <div class="bottom">

                    <!-- 7-22 add 左右滑动的圆点 -->
                    <div class="dot-wrapper">
                        <!-- 7-22 动态绑定的 active 是根据 data 中 currentShow 等于的值来判断的 -->
                        <span class="dot" :class="{'active': currentShow==='cd'}"></span>
                        <span class="dot" :class="{'active': currentShow==='lyric'}"></span>
                    </div>

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
    // 7-23
    const transitionDuration = prefixStyle("transitionDuration");

    // 7-12 add: 导入创建的 progress-bar.vue 基础组件
    import progressBar from "base/progress-bar/progress-bar";

    // 7-15 add:
    import progressCircle from "base/progress-circle/progress-circle";

    // 7-16 add
    import {playMode} from "assets/js/config";

    // 7-17 add
    import {shuffle} from "assets/js/util";

    // 7-20 add: 安装歌词解析插件: npm install lyric-parser --save
    import Lyric from "lyric-parser";

    // 7-21 add: 导入 Scroll 组件: 因为歌词需要滚动
    import Scroll from "base/scroll/scroll";


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
                // 7-20 add: 默认歌词为 null
                currentLyric: null,
                // 7-21 add: 当前歌词的行数
                currentLineNum: 0,
                // 7-22 add: 当前播放组件，页面中部靠下的 2 个圆点，左右滑动的交互展示
                currentShow: "cd",
                // 7-24 add: 上面 div.playing-lyric 使用
                playingLyric: "",
            }
        },

        components: {
            progressBar,
            progressCircle,
            // 7-21 add: Scroll 组件
            Scroll,
        },

        // 7-22 add: 我们在之前的 progress-bar.vue 中已经实现过元素的 touchstart/touchmove/touchend
        // 事件的效果，滑动展示 "播放器/歌词" 和之前的类似
        created() {
            // 添加一个 touch 属性，用来关联 touchstart/touchmove/touchend 事件
            this.touch = {}
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
                if (!this.songReady) return;

                // 调用上面 ...mapMutations({}) 中的 setPlayingState, 调度 mutations 中的方法
                this.setPlayingState(!this.playing);

                // 7-24 add: 因为我们在 7-20 ~~ 7-23 增加了歌词的滚动，所以我们在点击 播放/暂停 按钮
                // 时，歌词也要 滚动/暂停
                if (this.currentLyric) {
                    // this.currentLyric 在下面 getLyric 中已经被赋值，togglePlay() 是 Lyric 构造
                    // 函数内提供的内置方法
                    this.currentLyric.togglePlay();
                }
            },

            // 7-9 add
            next() {
                // 7-9 add: 这个 songReady 为 7-9 视频最后添加，目的时为了给快速切换上一曲/下一曲时
                // 判断当前歌曲是不是有加载完毕
                if(!this.songReady) {
                    return
                }
                // 7-24 add: 假如 playlist 只有一首歌的时候
                if (this.playlist.length === 1) {
                    this.loop();
                } else {
                    let index = this.currentIndex + 1;
                    console.log("next() -> index: ", index);
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
                }
            },
            prev() {
                if(!this.songReady) {
                    return
                }
                // 7-24 add:
                if (this.playlist.length === 1) {
                    this.loop();
                } else {
                    let index = this.currentIndex - 1;
                    if (index === -1) {
                        index = this.playlist.length -1;
                    }
                    this.setCurrentIndex(index);

                    if (!this.playing) {
                        this.togglePlaying();
                    }

                    this.songReady = false;
                }
            },

            // 7-9 add: 当前歌曲加载完毕，ready 执行，才会把 songReady 设置为 true, 这样就解决快速上下切换歌曲的问题
            // 那么这个 ready() 函数是怎么执行的？ A: audio 标签如果资源可以播放的话会自动触发其上的 canready 事件，
            // 所以 canready 事件执行时，我们当前设定 this.songReady = true 就会执行了
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
                console.log("audio.currentTime: ", this.$refs.audio.currentTime);
                const currentTime = this.currentSong.duration * percent;
                this.$refs.audio.currentTime = currentTime;
                // 拖动后如果当前状态是非播放状态，那么就让他播放
                if (!this.playing) {
                    this.togglePlaying();
                }

                // 7-24 add: 解决当我们拖动滚动条时歌词没有滚动到相应位置的问题。
                if (this.currentLyric) {
                    this.currentLyric.seek(currentTime * 1000);
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

                // 7-24 add: 播放音乐切换到展示歌词界面时，稍微听一会然后把歌曲播放模式切换到"单曲循环"，接着把
                // 进度调拉到末尾，重复播放歌曲时，发现歌词并没有从头开始滚动，这里就要解决这个问题
                if (this.currentLyric) {
                    // seek() 方法为 Lyric 插件提供的内置方法
                    this.currentLyric.seek(0);
                }
            },

            // 7-20 add: getLyric
            getLyric() {
                // output:  this.currentSong.__proto__: {constructor: ƒ, getLyric: ƒ}
                console.log("this.currentSong.__proto__: ", this.currentSong.__proto__);
                // ▲▲▲ Important notes:
                // (1).这个 this.currentSong 为什么会有 getLyric() 方法？ A: 因为 currentSong 是
                // assets/js/song.js 中 Song 类的一个实例，构造函数的实例当然可以调用构造函数的方法。
                // (2).currentSong 是 Song 构造函数的实例是怎么实现的？ A: 我们在 singer-detail.vue 中引入
                // assets/js/song.js，在 _normalizeSongs() 标准化方法中传入 createSong (即: song.js 中封
                // 装实例化 Song 的工厂方法), 过滤掉收费歌曲后把当前 singer.id 歌手相对应的歌曲放入到 ret 数组中，
                // (重点提示: 此时 ret 数组中存的每一项都已经是 Song 构造函数的实例, 输出测试见 singer-detail.vue
                // 组件)，接着我们把 ret 数组传入到 processSongsUrl() 方法中给每首歌曲添加 url, 然后通过
                // Promise.then() 把每一首歌曲组成的数组 songs 复制给 this.songs (即 data 下定义的 songs 方法)，
                // this.songs 得到当前 singer.id 的完整歌曲组成的歌曲数组，接着我们在 singer-detail.vue 中把 songs
                // 传给子组件 music-list.vue，子组件在 props 内接收，接着我们在 music-list.vue 中把歌曲循环出来，
                // 当我们点击当前歌曲时(tips: 点击事件封装在 music-list.vue 导入的子组件 song-list.vue 中)，
                // 我们调用 vuex 中 actions 内的 selectPlay() 封装调度方法，把 songs 和当前歌曲的 index 传给当前
                // 调度方法，因为在 vuex 中的 getters() 内 currentSong 是通过 state.playlist[state.currentIndex]
                // 计算取得的，此时 currentSong 代表的也即是 Songs 实例数组的哪一项而已。 这就是 currentSong 变成 Song
                // 构造函数的实例完整过程。
                this.currentSong.getLyric().then((lyric) => {

                    // 一个歌词组成的数组
                    //console.log("lyric: ", lyric);

                    // 7-20 add: 在上面 data 中添加 currentLyric; Lyric 构造函数去 github 熟悉一下。
                    // 7-21 add: 添加 在初始化 Lyric 时传入一个 this.handleLyric 回调函数
                    this.currentLyric = new Lyric(lyric, this.handleLyric);

                    // output: 输出一个 Lyric 对象 ; function Lyric {...}
                    // console.log("this.currentLyric: ", this.currentLyric);
                    // console.log("this.handleLyric: ", this.handleLyric);

                    // 7-21 add: 如果歌曲正在播放
                    if (this.playing) {
                        // 歌词也要执行
                        this.currentLyric.play();
                    }
                }).catch(() => {
                    // catch 为当我们获取不到歌词时，添加的判断
                    this.currentLyric = null;
                    this.playingLyric= "";
                    this.currentLineNum = 0;
                });
            },

            // 7-21: 当歌词每一行发生改变时，就回调一下, 回调包含了每一行的 lineNum 和 歌词的内容 text
            // 在 lyric-parser 插件中 this.handle({txt: xxx, lineNum: i}) 所以直接
            // handlerLyric({lineNum, txt}) 是可以的，
            handleLyric({lineNum, txt}) {
                this.currentLineNum = lineNum;
                // 歌词大于 5 行才执行滚动
                if (lineNum > 5) {
                    // 因为 $refs.lyricLine 是循环的 p 标签，所以那就是一组 p 标签
                    let lineEl = this.$refs.lyricLine[lineNum - 5];
                    this.$refs.lyricList.scrollToElement(lineEl, 1000);
                } else {
                    // 歌词小于 5 行，我们直接滚动到顶部
                    this.$refs.lyricList.scrollToElement(0 ,0);
                }

                // 7-24 add: div.playing-lyric 里面绑定值，把当前高亮的歌词显示
                this.playingLyric = txt;
            },

            // 7-22 add
            middleTouchStart(e) {
                // 这里和 progress.vue 中的写法一样，表示初始化完成
                this.touch.initial = true;
                // js高程-- touches: 表示当前跟踪的触摸操作的 Touch 对象的数组
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                console.log("touchStart.pageX: ", Math.floor(touch.pageX));
                this.touch.startY = touch.pageY;
            },
            middleTouchMove(e) {
                // console.log("this.i++: ", this.i++);

                if (!this.touch.initial) return;
                const touch = e.touches[0];
                const deltaX = touch.pageX - this.touch.startX;
                const deltaY = touch.pageY - this.touch.startY;
                // 这个判断是什么意思？ A: 因为"歌词"是可以上下滑动的，所以添加判断，如果检测到滑动的距离 Y 轴
                // 大于 X 轴，我们就判断为上下滑动的歌词，而不是左右滑动切换 "播放/歌词" 板块
                if (Math.abs(deltaY) > Math.abs(deltaX)) return;

                // 我们设置歌词板块(div.middle-r) left 距离的 2 种状态，如果当前 this.currentShow === "cd"
                // 那么设置 left 等于 0, 如果当前歌词板块显示就设置 left = -window.innerWidth;
                const left = this.currentShow === "cd" ? 0 : -window.innerWidth;

                // console.log("left: ", left);

                // 用 console 打印出来就很好看了
                // console.log("---start---");
                // console.log("touchMove.pageX: ", Math.floor(touch.pageX));
                // console.log("deltaX: ", Math.floor(deltaX));

                // console.log("left + deltaX: ", Math.floor(left + deltaX));
                // console.log("---end---");

                // 因为 Math.max() 中得到的值永远都是负的，所以我们用 Math.min(0 , 负数)，设置最大也不能大于 0.
                const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));


                // 7-23 取得滑动的百分比
                this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
                // 7-23
                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = 0;
                // 修改 div.middle-l 的渐隐渐显效果
                this.$refs.middleL.style.opacity = 1 - this.touch.percent;
                this.$refs.middleL.style[transitionDuration] = 0;
            },
            // 7-23
            middleTouchEnd(e) {
                let offsetWidth;

                let opacity;

                // 从右向左滑
                if (this.currentShow === "cd") {
                    //  0.1 既是滑动大于 10%
                    if (this.touch.percent > 0.1) {
                        offsetWidth = -window.innerWidth;
                        opacity = 0;
                        this.currentShow = "lyric"
                    } else {
                        offsetWidth = 0;
                        opacity= 1;
                    }
                }
                // 从左向右滑
                else {
                    //
                    if (this.touch.percent < 0.9) {
                        offsetWidth = 0;
                        this.currentShow = "cd";
                        opacity= 1;
                    } else {
                        offsetWidth = - window.innerWidth;
                        opacity= 0;
                    }
                }
                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
                // 给滑动添加更平滑的效果
                const time = 300;
                this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;

                this.$refs.middleL.style.opacity = opacity;
                this.$refs.middleL.style[transitionDuration] = `${time}ms`;
            },
        },

        watch: {
            // 监听上面 ...mapGetters() 内的 currentSong 的变化
            // 7-17 add: 参数 newSong, oldSong
            // important hint: (newSong, oldSong) 2 个参数，是 vue 里 watch 给回调函数默认提供的参数
            // links: https://cn.vuejs.org/v2/api/#watch
            currentSong(newSong, oldSong) {
                // tips: 上面 changeMode() 内通过 this.resetCurrentIndex() 重新设置了 currentIndex的，
                // 虽然解决了点击播放模式按钮切换歌曲时可以保持 currentSong 不变的问题，但不能解决当
                // 我们点击暂停按钮后再次切换播放模式时，音乐会自动播放的问题，那么为什么我们点击了暂停按钮，再次点击切换
                // 播放模式时音乐会自动播放呢？ 答: 因为我们在当前 watch 对象中监听了 currentSong, 只要 currentSong
                // 有变化就会触发 audio 的 play() 方法， 所以解决方法是利用 vue 给当前 currentSong() 函数内提供的
                // newSong 和 oldSong 参数来判断。
                // 如果歌曲 id 没有变，就直接返回不做操作
                // console.log("newSong.id: ", newSong.id);
                // console.log("oldSong.id: ", oldSong.id);
                // 7-24 add: 在做歌词滚动这块内容的时候，发现黄老师源码 master 中 if 判断有增加判断条件，所以更改。
                if ( !newSong.id || !newSong.url || newSong.id === oldSong.id) {
                    return;
                }

                // 添加 this.$nextTick() 延时的原因: 我们必须等上面 auto 标签，动态绑定 src 完成后才能播放
                // 7-24 add: 更改 this.$nextTick() 为 setTimeout() 原因是在微信端播放时，把微信放到手机后台时，
                // 虽然此时应用程序还在运行，但是 js 不会执行， 但是问题出在，微信处于后台状态，当前歌曲是可以播放
                // 完的，如果当前歌曲播放完，audio 上的 end 事件就会调用 next() 方法，
                // next 方法会首先判断 this.songReady 是不是为 true,
                this.$nextTick(() => {
                    // 当 currentSong 变化时调用 auto 的 play() 方法，即动态添加了 src 后
                    this.$refs.audio.play();

                    // 7-19 add: 取得歌词
                    this.getLyric();
                });

                // 7-24 add: 添加歌词展示后，歌词可以正常滚动了，但是此时我们执行切换下以首的操作(重复切换几次)，
                // 暂停后歌词的高亮会出现上下跳动的问题，那么这个问题出现在哪里？ A: 问题出在上面 methods 对象
                // 中 getLyric() 方法下 this.currentLyric = new Lyric(), 每个歌词加载实例化一次 Lyric
                // 构造函数，那么我们在切换下一曲切 + 切换下一曲时，就会生成很多个 Lyric 的实例，所以我们要停止
                // 当前实例的执行
                if (this.currentLyric) {
                    this.currentLyric.stop();

                    // 7-24 这里对比源码后，添加的更新
                    // 重置为 null
                    this.currentLyric = null;
                    this.currentTime = 0;
                    this.playingLyric = "";
                    this.currentLineNum = 0;
                }
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
