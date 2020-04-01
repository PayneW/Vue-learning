<template>
    <div id="Demo233" class="default-div">
        <h2>2.3.3 将原生事件绑定到组件</h2>
        <base-input
            label="姓名"
            v-model="inputValue"
            v-on="$listeners"
            placeholder="Enter your name"
        ></base-input>
        <span>您的姓名为:  {{ inputValue }}</span>
    </div>
</template>

<script>
    import BaseInput from '../base-components/base-input';
    export default {
        name: 'Demo233',
        data() {
            return {
                inputValue: ''
            }
        },
        components: {
            BaseInput
        }
    }
</script>
