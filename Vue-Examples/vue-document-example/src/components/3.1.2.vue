<template>
    <div class="default-div">
        <h2>3.1.2 单元素/组件的过渡</h2>
        <div id="demo">
            <button @click="show = !show">Toggle</button>
            <transition name="fade">
                <p v-if="show">Hello</p>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo312',
        data() {
            return {
                show: true
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
