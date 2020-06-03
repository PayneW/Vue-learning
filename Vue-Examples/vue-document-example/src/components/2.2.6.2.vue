<template>
    <div id="Demo2262" class="default-div">
        <h2>2.2.6.2: 禁用特性(attribute)继承</h2>
        <base-input
            label="姓名"
            class="username-input"
            v-model="username"
            placeholder="Enter your username"
            data-date-picker="activated"
        ></base-input>
        <p>你在 input 中输入的值为: {{ username }}</p>
    </div>
</template>
<script>
    import BaseInput from '../base-components/base-input';
    export default {
        name: 'Demo2262',
        data() {
            return {
                username: '',
            }
        },
        components: {
            BaseInput,
        }
    }
</script>
<style scoped>
    .username-input {
        background: #9cd5f1;
    }
</style>
