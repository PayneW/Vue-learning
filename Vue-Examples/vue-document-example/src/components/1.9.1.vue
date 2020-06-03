<template>
    <div id="app191" class="default-div">
        <h2>1.9.1: 监听事件</h2>
        <div id="example-1">
            <button @click="counter += 1">Add 1</button>
            <p>The button above has been clicked {{ counter }} times.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo191',
        data() {
            return {
                counter: 0
            }
        }
    }
</script>
