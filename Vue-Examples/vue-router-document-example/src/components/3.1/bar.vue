<template>
    <div class="bar-router">
        <p class="view-p">bar 我是 bar 组件</p>
    </div>
</template>

<script>
export default {
    name: 'Bar',
    created() {
        this.outputSomething()
    },
    methods: {
        outputSomething() {
             console.log("this.$options.", this.$options);
        }
    }
}
</script>
