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

    /* - Added: 不知道有没有小伙伴跟我一样, 对 Vue 的这几个 enter / enter-active
     *   / leave-active / leave-active-to 内的样式写法很困惑, 如果没有当然更好,
     *  我在此处记录一下自己对这几个 class 内的样式的使用理解:
     *     + (1) .slide-fade-enter --> .slide-fade-enter-active 样式是这样的:
     *      ```css
     *          .slide-fade-enter {
     *              // - 这个 opacity 的值为 1, 是根据 data 中的 show = true 来确定的.
     *              opacity: 1;
     *              transform: translateX(0)
     *          }
     *          .slide-fade-enter-active {
     *              opacity: 0;
     *              transform: translateX(10px);
     *          }
     *      ```
     *     + (2) .slide-fade-leave-active --> .slide-fade-leave-to 样式的转换
     *          .slide-fade-leave-active {
     *              // - 即上面的 .slide-fade-enter-active 执行完转换(transform)后的样式
     *              opacity: 0;
     *              transform: translateX(10px)
     *          }
     *          .slide-fade-leave-to {
     *              opacity: 1;
     *              transform: translateX(0);
     *          }
     */
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
