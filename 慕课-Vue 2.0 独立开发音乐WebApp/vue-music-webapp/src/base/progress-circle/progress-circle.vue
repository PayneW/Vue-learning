<!-- 7-15 create:  mini-player 内的 圆形进度条 . 父组件为 player.vue -->
<template>
    <div class="progress-circle">
        <!-- 7-15 更改 width 和 height 为动态绑定，传入值为父级 player.vue 传入 -->
        <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
            <!-- stroke-dasharray 表示描边, 圆环的进度使用的是 stroke-dashoffset 属性 -->
            <circle class="progress-bar" r="50" cx="50" cy="50"
                    fill="transparent"
                    :stroke-dasharray="dashArray"
                    :stroke-dashoffset="dashOffset"
            ></circle>
        </svg>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            radius: {
                type: Number,
                default: 32
            },
            percent: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                // 3.14 * 100 (2*PI*r)
                dashArray: Math.PI * 100
            }
        },
        computed: {
            dashOffset() {
                // 这个 dashOffset 值是从 314 逐渐变小的，因为 percent 从小变大，1 - slow max
                // 肯定值越来越小
                return (1 - this.percent) * this.dashArray;
            }
        }
    }
</script>

<style scoped lang="stylus" rel="styleSheet/stylus">
    @import "~assets/stylus/variable";
    .progress-circle {
        position: relative;
        circle {
            stroke-width: 8px;
            transform-origin: center;
            &.progress-background {
                transform: scale(0.9);
                stroke: $color-theme-d;
            }
            &.progress-bar {
                /* 这里为什么要 rotate(-90deg) 在浏览器控制台修改以下就能看出来了，如果不旋转，默认的起始点
                   在 "上/右/下/左" 四个方向的 "右" 边开始，所以逆时针旋转 90 度，刚好起始点是从 "上" 开始。 */
                transform: scale(0.9) rotate(-90deg);
                stroke: $color-theme;
            }
        }
    }
</style>
