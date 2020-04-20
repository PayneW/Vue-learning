<template>
    <div class="default-div">
        <h2>3.1.6 多个组件的过渡</h2>
        <p>
            <span>
                <input type="radio" id="one" value="VA" v-model="view">
                <label for="one">A</label>
            </span>
            <span>
                <input type="radio" id="two" value="VB" v-model="view">
                <label for="two">B</label>
            </span>
        </p>
        <div class="fade-btn-wrapper">
            <transition name="component-fade" mode="out-in">
                <component v-bind:is="view"></component>
            </transition>
        </div>
    </div>
</template>
<script>
    import VA from './v-a';
    import VB from './v-b';
    export default {
        name: 'Demo316',
        data() {
            return {
                view: 'VA',
            }
        },
        components: {
            VA,
            VB,
        }
    }
</script>
<style scoped>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s linear;
    }
    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }
    .default-div p span{
        margin-right: 10px;
    }
    label {
        margin-left: 5px;
    }
</style>
