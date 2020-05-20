<template>
    <div id="carousel" class="carousel-wrap">
        <!-- <p>Vue 轮播图组件</p>-->

        <!-- 轮播图列表 -->
        <transition-group tag="ul" class="slide-ul" name="list">
            <li
                v-for="(list, index) in slideList"
                :key="index"
                v-show="index===currentIndex"
                @mouseenter="stop"
                @mouseleave="go"
            >
                <a :href="list.clickUrl">
                    <img>
                </a>
            </li>
        </transition-group>

        <!-- 轮播图 -->
        <div class="carousel-items">
            <span
                v-for="(item, index) in slideList.length"
                :key="index"
                :class="{'active': index===currentIndex}"
                @mouseover="change(index)"
            ></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BaseCarousel',
        data() {
            return {
                slideList: [
                    {
                        "clickUrl": "#",
                    },
                    {
                        "clickUrl": "#",
                    },
                    {
                        "clickUrl": "#",
                    }
                ],
                currentIndex: 0,
                timer: '',
            }
        },
        methods: {
            go() {
                this.timer = setInterval(() => {
                    this.autoPlay()
                }, 4000)
            },
            stop() {
                clearInterval(this.timer)
                this.timer = null
            },
            change(index) {
                this.currentIndex = index
            },
            autoPlay() {
                this.currentIndex++
                if (this.currentIndex > this.slideList.length - 1) {
                    this.currentIndex = 0
                }
            }
        },
        // - created 实例已经创建, 属性已经绑定.
        created() {
            // - 在 DOM 加载完成后, 下个 tick 中开始轮播
            let that = this;
            this.$nextTick(() => {
                this.timer = setInterval(function() {
                    that.autoPlay();
                }, 4000);
            })
        },
    }
</script>

<style scoped lang="stylus">
    // - WARNING: 这个轮播图(carosul) 无法使用, 内部的 li 高和宽虽然设置了 100%
    //   但是无法全部铺满 carousel-wrap, 找不到什么原因.
    //   [原文章](https://segmentfault.com/a/1190000008828755)也有这个问题.
    //   第二: 当鼠标在三个 item 上切换时, 样式也会很乱, 自行试下便可以看出.
    // - tip: 这个示例等写完 vue 文档的笔记, 会使用 element-ul 重新写,
    //   并会给出 element-ul 的实现原理.
    .carousel-wrap {
        position: relative
        height: 453px
        width: 96%
        padding: 0
        margin: 10px auto
        overflow: hidden
        background-color: red
    }
    .slide-ul {
        li {
            position: absolute
            display: block
            width: 100%
            height: 100%
            padding: 0
            margin: 0
        }
        li:nth-child(1) {
            background-color: lightblue
        }
        li:nth-child(2) {
            background-color: lightgreen
        }
         li:nth-child(3) {
            background-color: gray
        }
    }
    .carousel-items {
        position: absolute
        z-index: 10
        top: 380px
        width: 100%
        margin: 0 auto
        text-align: center
        fon-size: 0
        span {
            display: inline-block
            height: 6px
            width: 30px
            margin: 0 30px
            background: #b2b2b2
            cursor: pointer
        }    
        .active {
            background-color: #66cc99
        }
    }
    // - 过渡类名
    .list-enter {
        transform: translateX(100%)
    }
    .list-enter-to {
        transition: all 3s linear
        transform: translateX(0)
    }
    .list-leave {
        transform: translateX(0)
    }
    .list-leave-active {
        transition: all 3s linear
        transform: translateX(-100%)
    }
</style>
