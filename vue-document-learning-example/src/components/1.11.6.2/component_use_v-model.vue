<template>
    <div id="custom-input">
        <p>当前为子组件 custom-input</p>
        <input
            :value="value"
            @input="$emit('input', $event.target.value)"
            placeholder="Write something"
        >
    </div>
</template>
<script>
    export default {
        name: 'CustomInput',
        props: ['value'],
    }
</script>
<style scoped>
    #custom-input {
        background: #9cd5f1;
        padding: 10px 0;
    }
</style>
