<template>
    <div class="loading-box">
        {{ msg }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "Loading... ^_^"
            }
        }
    }
</script>

<style>
    .loading-box {
        color: lightcoral;
        font-weight: bold;
        font-size: 36px;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }
</style>