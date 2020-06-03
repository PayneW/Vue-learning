<template>
    <div class="base-checkbox">
        <p>基础组件 base-checkbox</p>
        <input
            id="baseCheckbox"
            type="checkbox"
            :checked="checked"
            @change="$emit('change', $event.target.checked)"
        >
        <label for="baseCheckbox">基础复选框组件</label>
    </div>
</template>
<script>
    export default {
        name: 'BaseCheckbox',
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: Boolean
        },
    }
</script>
<style lang="stylus" scoped>
    @import './base-components-style.styl';
    .base-checkbox {
        background: #9cd5f1;
    }
</style>
