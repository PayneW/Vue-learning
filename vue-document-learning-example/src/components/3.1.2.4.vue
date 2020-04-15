<template>
    <div class="default-div">
        <h2>3.1.2.4 自定义过渡的类名</h2>
        <div id="Demo3124">
            <button @click="show = !show">Toggle show</button>
            <transition
                name="custom-classes-transition"
                enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight"
                >
                <p v-if="show">
                    自定义过渡类名
                </p>
            </transition>
        </div>
    </div>
</template>
<script>
    import animate from 'animate.css'
    export default {
        name: 'Demo3124',
        data() {
            return {
                show: true
            }
        }
    }
</script>
