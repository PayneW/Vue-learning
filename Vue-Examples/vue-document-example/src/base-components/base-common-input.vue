<template>
    <div class="base-common-input">
        <h3>base-common-input</h3>
        <input
            type="text"
            :value="value"
            @input="$emit('input', $event.target.value)"
            :placeholder="placeholder"
        >
    </div>
</template>
<script>
    export default {
        name: 'BaseCommonInput',
        props: ['value', 'placeholder']
    }
</script>

<style scoped>
    .base-common-input {
        padding: 10px 0;
    }
</style>
