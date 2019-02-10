<template>
    <!-- 轮播图 **slider /'slaɪdə/**  n.滑块，滑雪者，滑冰者 -->
    <!-- slider 最外层的容器 -->
    <div class="slider" ref="slider">
        <!-- 存放模块的包围容器 slider-group -->
        <div class="slider-group" ref="sliderGroup">
            <!-- 此插槽里的填充来自 recommend.vue 中的 <Slider>模板内的内容 -->
            <slot></slot>
        </div>

        <p class="dots">
            <span class="dot"
                :class="{active: currentPageIndex === index}"
                v-for="(item, index) in dots">
            </span>
        </p>
    </div>
</template>

<script>
    import BScroll from "better-scroll";
    import { addClass } from "assets/js/dom";

    export default {
        data() {
            return {
                //
                dots: [],
                currentPageIndex: 0,
            }
        },

        // slider 轮播的功能，定义 props 可以从外围控制这些属性
        props: {
            // 默认是否可以循环轮播
            loop: {
                type: Boolean,
                default: true,
            },
            // 自动轮播
            autoPlay: {
                type: Boolean,
                default: true,
            },
            // 轮播的间隔
            interval: {
                type: Number,
                default: 4000
            }
        },

        // 模板编译之后(mounted), 加载 better-scroll
        mounted() {
            // 为什么设置为 20ms ? 因为浏览器的刷新时间是 20ms
            setTimeout(() => {
                // 给 slider 轮播图设置宽度
                this._setSliderWidth();
                // 初始化 dots
                this._initDots();
                // 初始化轮播图
                this._initSlider();

                // 如果有 autoPlay = true, 就自动循环播放
                if (this.autoPlay) {
                    this._play();
                }
            }, 20);

            window.addEventListener("resize", ()=> {
                if (!this.slider) return;
                // 浏览器窗口调整大小后，重新计算宽度
                this._setSliderWidth(true);
                // 重新计算完宽度之后需要刷新页面, refresh 内置接口:
                // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
                this.slider.refresh();
            })
        },
        methods: {
            // 因为是横向滚动，所以需要设置 存放模块的包围容器 slider-group 的宽度
            _setSliderWidth(isResize) {
                // 取得滑动模块的所有子元素
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                // 取得 slider 最外层的容器的宽度
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i =0; i< this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, "slider-item");

                    child.style.width = sliderWidth + "px";
                    width += sliderWidth;
                }

                // 为了保存循环切换需要克隆 2 个 DOM
                // isResize 参数: 如果只是单纯的调整浏览器窗口大小(resize),并不需要克隆2个DOM
                // 所以这个里要增加判断
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width + "px";
            },

            // 初始化 slider
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                   // 允许横向滚动
                    scrollX: true,
                    scrollY: false,
                    // momentum /mə'mentəm/ n. 动力
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400,
                    },
                });

                // 给 slider 绑定一个事件，用来切换哪个 dot 处于 active 状态
                this.slider.on("scrollEnd", () => {
                    let pageIndex = this.slider.getCurrentPage().pageX;

                    /*if (this.loop) {
                        pageIndex -= 1;
                    }*/
                    this.currentPageIndex = pageIndex;

                    if (this.autoPlay) {
                        clearTimeout(this.timer);
                        this._play();
                    }
                })
            },

            // 初始化 dots
            _initDots() {
                // dots 就是一个长度为 5 的数组
                this.dots = new Array(this.children.length);
            },

            _play() {
                let pageIndex = null;
                if (this.loop) {
                    pageIndex = this.currentPageIndex + 1;
                }
                this.timer = setTimeout(() => {
                    // next(): 内置方法，滚动到下一个页面
                    this.slider.next();
                }, this.interval);
            }
        },

        destroyed() {
            // 清除超时调用 ID
            clearTimeout(this.timer);
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable";

    .slider {
        min-height: 1px;

        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;

            /* recommend.vue 中的 <Slider>模板内的代码放入到 slot 插槽内时，并没有定义
               slider-item 样式，此样式是在 this._initSliderWidth 中动态添加的 */
            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;

                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }

                img {
                    display: block;
                    width: 100%;
                }
            }
        }

        .dots {
            position: absolute;
            right: 0; left: 0;
            bottom: 12px;
            transform: translateZ(1px);
            text-align: center;
            font-size: 0;

            .dot {
                display: inline-block;
                margin: 0 4px;
                width:8px; height: 8px;
                border-radius: 50%;
                background: $color-text-l;

                &.active {
                    width: 20px;
                    border-radius: 5px;
                    background: $color-text-ll;
                }
            }
        }
    }
</style>
