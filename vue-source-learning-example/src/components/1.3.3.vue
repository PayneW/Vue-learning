<template>
    <div id="app-133" class="default-div">
        <h2>1.3.3: 实例生命周期钩子</h2>
    </div>
</template>

<script>
    export default {
        name: 'Demo133',
        data() {
            return {
                a: 1
            }
        },
        created() {
            // `this` 指向 vm 实例
            console.log('a is:' + this.a)   // "a is: 1"
        }
    }
</script>

<style>
    #app-133 {}
</style>
