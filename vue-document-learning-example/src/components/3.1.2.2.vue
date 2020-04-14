<template>
    <div class="default-div">
        <h2>3.1.2.2 CSS 过渡</h2>
        <div id="demo">
            <button @click="show = !show">Toggle render</button>
            <transition name="slide-fade">
                <p v-if="show">CSS transition(过渡)</p>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo3122',
        data() {
            return {
                show: true
            }
        }
    }
</script>

<style scoped>
    /* - 可以设置不同的进入和离开动画 */
    /* - 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .6s linear;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
