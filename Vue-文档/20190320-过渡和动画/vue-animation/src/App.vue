<template>
    <div id="app">
        <!-- # 单元素/组建的过渡 -->
        <div id="demo">
            <button @click="show = !show">
                Toggle
            </button>
            <transition name="fade">
                <p v-if="show">Hello</p>
            </transition>
        </div>

        <!-- # CSS 过渡 -->
        <div id="example-1">
            <button @click="showSlide = !showSlide">
                Toggle render
            </button>
            <transition name="slide-fade">
                <p v-if="showSlide">hello vue animation</p>
            </transition>
        </div>

        <!-- # CSS 动画: CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM
            后不会立即删除，而是在 animationend 事件触发时删除。 -->
        <div id="example-2">
            <button @click="showBounce = !showBounce">Toggle show</button>
            <transition name="bounce">
                <p v-if="showBounce">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
            </transition>
        </div>


        <!-- # 自定义过渡的类型:
             - Animate.css
                + 安装: npm install animate.css --save
                + 使用: 在 main.js 中 写入以下
                    - import animated from "animate.css";
                    - Vue.use(animated)
             - 我们可以通过以下特性来自定义过渡类名:
                + enter-class
                + enter-active-class
                + enter-to-class (2.1.8+)
                + leave-class
                + leave-active-class
                + leave-to-class (2.1.8+)
              他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合
              使用十分有用。
        -->
        <div id="example-3">
            <button @click="showCustom = !showCustom">
                Toggle Custom And Animate
            </button>
            <transition name="custom-classes-transition"
                        enter-active-class="animated tada"
                        leave-active-class="animated bounceOutRight"
            >
                <p v-if="showCustom"> 自定义过渡的类型 + animate.css </p>
            </transition>
        </div>

        <!-- # 同时使用过渡和动画 -->

        <!-- # 显性的过渡持续时间 -->

        <!-- # Javascript 钩子: 这些钩子函数可以结合 CSS transitions/animations 使用，
            也可以单独使用。
            ▲: 当只用 js 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们
            将被同步调用，过渡会立即完成。
            ▲: 推荐对于仅使用 js 过渡的元素添加 v-bind:css="false", Vue 会跳过 CSS 的检测。
            这也可以避免过渡过程中 CSS 的影响

             Velocity:
                - 安装 velocity.js: npm install velocity-animate --save
                - 使用: 在组建中引用 import Velocity from "velocity-animate"
            -->
        <!--<div id="hook">
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @enter-cancelled="enterCancelled"

                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
                @leave-cancelled="leaveCancelled"
            >
            </transition>
        </div>-->
        <!-- 一个使用 Velocity.js 的简单例子: -->
        <div id="example-4">
            <button @click="showVelocity = !showVelocity">
                Toggle Velocity effect
            </button>
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
                :css="false"
            >
                <p v-if="showVelocity">Velocity</p>
            </transition>
        </div>


        <!--多个组建的过渡 -->
        <div class="wrapper">
            <!-- 利用 v-model 把 当前 value = "VA" 的组建赋值给 view ,
                这样下面 component 下的 :is="view" 就会更新 -->
            <input type="radio" name="aa" value="VA" v-model="view">
            <label for="aa">A</label>
            <input type="radio" name="bb" value="VB" v-model="view">
            <label for="bb">B</label>
            <transition name="component-fade" mode="out-in">
                <component v-bind:is="view"></component>
            </transition>
        </div>


    </div>
</template>

<script type="text/javascript">

    import Velocity from "velocity-animate";

    import VA from "./components/v-a";
    console.log(VA);
    import VB from "./components/v-b";

    export default {
        data() {
            return {
                show: true,
                showSlide: true,
                showBounce: false,
                showCustom: false,
                showVelocity: false,

                view: VA,
            }
        },

        methods: {
            // ------
            // 进入中
            // ------
            /*beforeEnter: function(el) {},
            // 当与 CSS 结合使用时，回调函数 done 是可选的
            enter: function(el, done) {
                // ...
                done();
            },
            afterEnter: function(el) {
                // ...
            },
            enterCancelled: function(el) {
                // ...
            },*/

            // ------
            // 离开时
            // ------
            /*beforeLeave: function(el) {
                // ...
            },
            // 当与 CSS 结合使用时，回调函数 done 是可选的
            leave: function(el, done) {
                // ...
                done();
            },
            afterLeave: function(el) {
                // ...
            },
            // leaveCancelled 只用于 v-show 中
            leaveCancelled: function(el) {
                // ...
            }*/


            beforeEnter: function(el) {
                el.style.opacity = 0;
                el.style.transformOrigin  = "left";
            },
            enter: function(el, done) {
                Velocity(el, {opacity: 1, fontSize: "1.4em"}, {duration: 300});
                Velocity(el, {fontSize: "1em"}, {complete: done});
            },
            leave: function(el, done) {
                Velocity(el, {translateX: "15px", rotateZ: "50deg"}, {duration: 600});
                Velocity(el, {rotateZ: "100deg"}, {loop: 2});
                Velocity(el, {
                    rotateZ: "45deg",
                    translateY: "30px",
                    translateX: "30px",
                    opacity: 0
                }, {complete: done})
            }
        },

        components: {
            VA,
            VB
        }
    }
</script>

<style lang="stylus">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #app {
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50
        width 80%
        min-height 600px
        padding 20px
        margin 0 auto
        background lightblue
        border-radius 10px
        div {
            margin-bottom: 20px;
        }
    }

    button {
        width:200px;
        line-height: 34px;
        border: none;
        background: lightcoral;
        border-radius: 2px;
    }

    #demo {
        p {
            margin 10px
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    /* tips: 正常情况下点击 Toggle 按钮，包围 hello 的动画是先 调用 fade-leave-to
       让元素消失，然后再次点击始，添加 fade-enter 在 fade-enter-active 被添加时，
       经过 5s 的时间让元素再慢慢展示 */
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }


    /* # CSS 动画: CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM
       后不会立即删除，而是在 animationend 事件触发时删除。 */
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {transform: scale(0)}
        50% {transform: scale(1.5)}
        100% {transform: scale(1)}
    }
</style>
