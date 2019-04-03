<!-- 7-12 add: 添加播放器 progress-bar 进度条基础组件  -->
<template>
    <!-- 7-14 add: @click="progressClick" -->
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <p class="progress" ref="progress"></p>
            <!-- 7-13 add: 添加三个 @xx 事件  -->
            <p class="progress-btn-wrapper"
               ref="progressBtnWrapper"
               @touchstart.prevent="progressTouchStart"
               @touchmove.prevent="progressTouchMove"
               @touchend="progressTouchEnd"
            >
                <span class="progress-btn"></span>
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    // 进度条上的按钮远点 div.progress-btn 的宽度
    const progressBtnWidth = 16;

    import {prefixStyle} from "assets/js/dom";
    const transform = prefixStyle("transform");

    export default {
        props: {
            // 从父级 player.vue 传入, 一个百分比，用来设置 p.progress 的进度
            percent: {
                type: Number,
                default: 0,
            }
        },


        created() {
            // 7-13 add: touch (触发) 属性的作用是为了下面 methods 中的 progressTouchStart/Move/End
            // 回调函数共享数据使用
            this.touch = {};
        },
        methods: {
            // 7-13 add
            progressTouchStart(e) {
                // initiate /ɪ'nɪʃɪeɪt/** v.发起，开始，开创
                // initial = true 表示初始化成功
                this.touch.initial = true;
                // touches[0].pageX : 手指触发屏幕的横向坐标 (x 轴)
                this.touch.startX = e.touches[0].pageX;
                console.log("e.touches[0].pageX: ", e.touches[0].pageX);
                // 记录 progress-btn-wrapper 按钮的偏移 (即: 当开始滑动按钮时我们记录按钮在屏幕上已经偏移了多少量，
                // 计算的依据就是 p.progress 当前的宽度(clientWidth), div.progress 进度条的宽度在上面的
                // watch{} 内的 percent(){} 中已经得到)
                this.touch.left = this.$refs.progress.clientWidth;
            },
            progressTouchMove(e) {
                // 如果没有经过 progressTouchStart 就直接进入到 progressTouchMove 就直接 return
                if (!this.touch.initial) return;
                // 得到 progressTouchStart 执行到当前 progressTouchMove 执行完毕，此段的偏移量 (即: 手指移动的偏移量)
                const deltaX = e.touches[0].pageX - this.touch.startX;
                // offsetWidth 偏移宽度: 首先我们通过 Math.max(0, this.touch.left + deltaX) 得到我们触发移动后
                // 的距离，因为我们触发移动的距离不能大于 progressBar - progressBtnWidth 的宽度，所以我们再用
                // Math.min() 取值
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX));
                this._offset(offsetWidth);
            },
            progressTouchEnd(e) {
                // 触摸事件完毕之后把 initial 再次设置为 false
                this.touch.initial = false;

                // 派发一个事件，当触发事件完成时，告诉父级 player.vue 我当前通过 touch 方法把 progress 和
                // progressBtnWrapper 拖动到哪里了，你在当前拖动到的时间接着播放音频
                this._triggerPercent();
            },

            _triggerPercent() {
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const percent = this.$refs.progress.clientWidth / barWidth;
                console.log("_triggerPercent percent: ", percent);
                // 通过 $emit 发射 percentChange 事件到父级 player.vue 值为当前进度条触发事件完毕时
                // 当前 p.progress 的进度百分比
                this.$emit("percentChange", percent);
            },

            // 封装复用代码
            _offset(offsetWidth) {
                // 进度条的进度
                this.$refs.progress.style.width = `${offsetWidth}px`;
                // 小球的偏移
                this.$refs.progressBtnWrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
            },

            // 7-14 add 点击 div.progress-bar 进度条可以播放
            progressClick(e) {
                //  7-14 add:  offsetX: 光标相对于目标元素(div.progress-bar)边界的 x 坐标
                // console.log("progress-bar.vue -> methods -> progressClick() -> e.offsetX: ", e.offsetX);

                // 7-18 add: 上面 7-14 写法当我们点击 progressBtn 的时候， e.offsetX 获取不对，现在更新获取方法
                // 《js高程》: getBoundingClientRect() 方法会返回一个矩形对象，包含 4 个属性: left、top、
                // right 和 bottom。这些属性给出了元素在页面中相对于视口(viewport)的位置。
                // 《js高程》- P370: 页面坐标位置 (pageX 和 pageY): 页面坐标通过事件对象的 pageX 和 pageY 属性，告诉你
                // 事件是在页面中的什么位置发生的。换句话说，这两个属性表示鼠标光标在页面中的位置，因此坐标是从页面本身而非适口
                // 的左边和顶边计算的。
                const rect = this.$refs.progressBar.getBoundingClientRect();
                console.log("progressBar.getBoundingClientRect(): ", rect);
                const offsetWidth = e.pageX - rect.left;
                console.log("当前点击对象的页面坐标位置 pageX: ", e.pageX);

                this._offset(offsetWidth);
                this._triggerPercent();
            }
        },

        watch: {
            // 监听 props 下的 percent
            percent(newPercent) {
                // 7-13 add:  && !this.touch.initial 添加这句判断的目的是当我们触发上面的 3 个 touch 事件完毕时，
                // 由于此 if 内又再次设置了 p.progress + progressBtnWrapper 的进度，所以会导致进度条和小圆点
                // 回跳的现象，我们通过 !this.touch.initial === false 时 if 内的判断就不再执行，即只执行 touch
                // 事件内的代码，只有当 !this.touch.initial === true 时才会执行此 if 内的判断
                if (newPercent >= 0 && !this.touch.initial) {
                    // 得到进度条的宽度，就是 div.progress-bar 的宽度减去 p.progress-btn-wrapper 进度条按钮(圆圈)的的宽度
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth ;
                    // 歌曲播放的比例 * (progressbar 的总宽度 - 圆点的宽度 )
                    const offsetWidth = newPercent * barWidth;
                    /* 7-13 封装复用代码
                    // 进度条的进度
                    this.$refs.progress.style.width = `${offsetWidth}px`;
                    // 小球的偏移
                    this.$refs.progressBtnWrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
                    */
                    this._offset(offsetWidth);
                }
            }
        },

    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import "~assets/stylus/variable";
    .progress-bar {
        height: 30px;
        .bar-inner {
            position: relative;
            top: 13px;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
            .progress {
                position: absolute;
                height: 100%;
                background: $color-theme;
            }
            .progress-btn-wrapper {
                position: absolute;
                left: -8px;
                top: -13px;
                width: 30px;
                height: 30px;
                .progress-btn {
                    position: relative;
                    display: block;
                    top: 7px;
                    left: 7px;
                    box-sizing: border-box;
                    width: 16px;
                    height: 16px;
                    border: 3px solid $color-text;
                    border-radius: 50%;
                    background: $color-theme;
                }
            }
        }
    }
</style>
