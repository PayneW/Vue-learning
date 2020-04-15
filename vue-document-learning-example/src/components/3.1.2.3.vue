<template>
    <div class="default-div">
        <h2>3.1.2.3 CSS 动画</h2>
        <div id="demo">
            <button @click="show = !show">Toggle show</button>
            <transition name="bounce">
                <p v-if="show" class="text-center">
                    CSS animation(动画): <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elt.
                </p>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Demo3123',
        data() {
            return {
                show: true
            }
        }
    }
</script>
<style scoped>
    .text-center {
        text-align: center;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        /* - animation-direction 让动画按照指定顺序来播放 `@keyframes` 定义的关键帧.
         *   其值有:
         * - (1) `normal` 默认值.
         * - (2) `reverse` 表示动画反向播放.
         * - (3) `alternate` 表示正向和反向交叉进行.
         * - (4) `alternate-reverse` 表示反向和正向交叉进行. */
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% { transform: scale(0); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
</style>
