<template>
    <div class="default-div">
        <h2>3.1.4 多个元素的过渡</h2>
        <div id="demo">
            <button @click="changeFun">Change button</button>
            <br>
            <transition name="change-button">
                <button :key="change">
                    {{ change ? 'Edit' : 'Save' }}
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
                change: true,
            }
        },
        methods: {
            changeFun: function() {
                if (this.change === true) {
                    this.change = false;
                    return;
                }
                if (this.change === false) {
                    this.change = true;
                }
            }
        }
    }
</script>

<style scoped>
    /* - 可以设置不同的进入和离开动画 */
    /* - 设置持续时间和动画函数 */
    .change-button-enter-active, .change-button-leave-active {
        transition: all .6s linear;
    }
    .change-button-enter, .change-button-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
