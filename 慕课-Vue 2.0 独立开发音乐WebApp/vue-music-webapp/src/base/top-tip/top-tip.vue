<!-- 11-16 created: add-song.vue 中点击 "最近播放/搜索历史" 到播放列表时
    顶部弹出提示添加成功 -->
<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "top-tip",

        // 11-16

        data() {
            return {
                showFlag: false,
            }
        },

        methods: {
            show() {
                this.showFlag = true;
                clearTimeout(this.timer);
                // 这里的 timer 是添加到 Vue 的实例上的，但没有在上面 data() 中声明，所以不是响应式的，
                // 但是在此处只是一个超时的句柄所以并不需要响应
                console.log("this is : ", this);
                this.timer = setTimeout(() => {
                    this.hide();
                }, 2000)
            },
            hide() {
                this.showFlag = false;
            },
        }
    }
</script>

<style scoped lang="stylus">
    @import "~assets/stylus/variable";
    .top-tip {
        position: fixed;
        top: 0;
        width: 100%;
        z--index: 500;
        background: $color-dialog-background;
        &.drop-enter-active, &.drop-leave-active {
            transition: all .3s;
        }
        &.drop-enter, &.drop-leave-to {
            transform: translated3d(0, -100%, 0);
        }
    }
</style>
