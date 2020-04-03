<template>
    <div class="default-div">
        <h2>2.6.1.3 访问子组件实例或子元素</h2>
        {{ initInputValue }}
        <base-common-input
            v-model="initInputValue"
            placeholder="Enter your name"
            ref="usernameInput"
        ></base-common-input>
    </div>
</template>

<script>
    import BaseCommonInput from '../base-components/base-common-input';
    export default {
        name: 'Demo2613',
        data() {
            return {
                initInputValue: ''
            }
        },
        mounted: function() {
            this.$refs.usernameInput.$el.querySelector('input').focus();
        },
        components: {
            BaseCommonInput
        }
    }
</script>
