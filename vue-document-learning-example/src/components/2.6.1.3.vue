<template>
    <div class="default-div">
        <h2>2.6.1.3 访问子组件实例或子元素</h2>
        {{ initInputValue }}

        <base-input
            v-model="initInputValue"
            placeholder="Enter your name"
            ref="usernameInput"
        ></base-input>
    </div>
</template>

<script>
    import BaseInput from '../base-components/base-common-input';
    export default {
        name: 'Demo2613',
        data() {
            return {
                initInputValue: ''
            }
        },
        mounted: function() {
            console.log(this.$refs.usernameInput.$el.querySelector('input'));
            console.log(111111);
            this.$refs.usernameInput.$el.querySelector('input').focus();
        },
        components: {
            BaseInput
        }
    }
</script>
