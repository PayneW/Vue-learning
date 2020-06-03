<template>
    <div class="default-div">
        <h2>3.1.2.7 JavaScript 钩子</h2>
        <div id="Demo3127">
            <button @click="show = !show">Toggle use Velocity.js</button>
            <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false"
            >
                <p v-if="show">
                   animation effects.
                </p>
            </transition>
        </div>
    </div>
</template>
<script>
    import Velocity from 'velocity-animate'
    export default {
        name: 'Demo3127',
        data() {
            return {
                show: false
            }
        },
        methods: {
            beforeEnter: function(el) {
                el.style.opacity = 0;
                el.style.transformOrigin = 'left';
            },
            enter: function(el, done) {
                Velocity(el, {opacity: 1, fontSize: '1.4em'}, {duration: 300});
                Velocity(el, {fontSize: '1em'}, {complete: done});
            },
            leave: function(el, done) {
                Velocity(el, {translateX: '15px', rotateZ: '50deg'}, {duration: 600});
                Velocity(el, {rotateZ: '100deg'}, {loop: 2});
                Velocity(el, {
                    rotateZ: '45deg',
                    translateY: '30px',
                    translateX: '30px',
                    opacity: 0
                }, {complete: done})
            }
        }
    }
</script>
<style scoped>
    #Demo3127 {
        height: 160px;
        width: 76%;
        margin: 0 auto;
        background: lightgray;
        border-radius: 4px;
        text-align: center;
        overflow: auto;
        position: relative;
    }
</style>
