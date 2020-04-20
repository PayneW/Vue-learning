<template>
    <div class="default-div">
        <h2>3.1.4 多个元素的过渡</h2>
        <div class="fade-btn-wrapper" @click="show = !show">
            <!-- in-out: 新元素先出现过渡, 完成后当前元素过渡离开. -->
            <transition name="fade" mode="in-out">
                <button :key="show">
                    {{ show ? 'Save' : 'Edit' }}
                </button>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo314',
        data() {
            return {
                show: true,
            }
        },
    }
</script>

<style scoped>
    /* - 可以设置不同的进入和离开动画 */
    /* - 设置持续时间和动画函数 */
    .fade-enter-active, .fade-leave-active {
        transition: all .5s linear;
    }
    .fade-leave-to {
        transform: translateX(-20px);
        opacity: 0;
    }
    .fade-enter {
        transform: translateX(20px);
        opacity: 0;
    }
    /* - 这个 fade-enter-to 样式可以不写, 因为设置了 fade-enter 样式后,
     *   Vue 会自动推测 fade-enter-to 即要转变到达后的样式效果,
     *   因为这些样式一般情况下都是两个值之间切换, 比如 opacity = 0 / 1,
     *   translateX(16px) 切换到 fade-enter-to 后一般是 translateX(0);
    */
    .fade-enter-to {
        transform: translateX(0);
        opacity: 1;
    }
    .fade-btn-wrapper {
        margin-left: 50px;
        position: relative;
        height: 26px; width: auto;
        /*background: lightblue;*/
    }
    .fade-btn-wrapper button {
        min-width: 0;
        font-size: 12px;
        border: 1px solid #eee;
        margin-top: 1px;
        margin-right: 2px;
        position: absolute;
    }
</style>
