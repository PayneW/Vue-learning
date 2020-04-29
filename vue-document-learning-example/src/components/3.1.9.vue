<template>
    <div class="default-div">
        <h2>3.1.9 动态过渡</h2>
        Fade In:
        <input type="range" v-model="fadeInDuration" min="0"
               :max="maxFadeDuration">
        <br>
        Fade Out:
        <input type="range" v-model="fadeOutDuration" min="0"
               :max="maxFadeDuration">
        <transition
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
        >
            <p v-if="show">Hello</p>
        </transition>
        <button
            v-if="stop"
            @click="stop = false; show = false"
        >Start animating</button>
        <button
            v-else
            @click="stop = true"
        >Sop it!</button>
    </div>
</template>

<script>
    import Velocity from 'velocity-animate';
    export default {
        name: 'Demo319',
        data() {
            return {
                show: true,
                fadeInDuration: 1000,
                fadeOutDuration: 1000,
                maxFadeDuration: 1500,
                stop: true
            }
        },
        mounted: function() {
            this.show = false;
        },
        methods: {
            beforeEnter: function(el) {
                el.style.opacity = 0;
            },
            enter: function(el, done) {
                const vm = this;
                Velocity(el,
                    {opacity: 1},
                    {
                        duration: this.fadeInDuration,
                        complete: function() {
                            done();
                            if (!vm.stop) {
                                return vm.show = false
                            }
                        }
                    }
                )
            },
            leave: function(el, done) {
               const vm = this;
               Velocity(el,
                   {opacity: 0},
                   {
                       duration: this.fadeOutDuration,
                       complete: function() {
                           done();
                           vm.show = true
                       }
                   }
               )
            }
        },
    }
</script>

<style scoped>
    .default-div {
        height: auto;
        min-height: 260px;
        overflow: auto;
    }
</style>
