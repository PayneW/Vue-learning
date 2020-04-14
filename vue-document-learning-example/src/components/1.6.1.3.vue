<template>
    <div id="app1613" class="default-div">
        <h2>1.6.1.3: v-bind:class 用在组件上</h2>
        <p class="font-size" :class="[customBg, customColor]">
            .another-bg-color 样式是在 App.vue 中导入组件时添加到根组件上的,
            当然使用 v-bind: 动态绑定 class/style 也是可以的.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Demo1613',
        data(){
            return {
                customBg: 'custom-bg',
                customColor: 'custom-color'
            }
        }
    }
</script>

<style scoped>
    .font-size {
        font-size: 15px;
    }
    .custom-bg {
        background: none;
    }
    .custom-color {
        color: #f0ad4e;
    }
    .another-bg-color {
        background: #bcffe1;
    }
</style>
