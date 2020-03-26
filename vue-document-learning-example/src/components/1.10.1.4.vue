<template>
    <div id="app11013" class="default-div">
        <h2>1.10.1.4: `v-model` 单选按钮(type="radio")</h2>
        <p>
            <input type="radio" id="one" value="One" v-model="picked">
            <label for="one">One</label>
            <input type="radio" id="two" value="Two" v-model="picked">
            <label for="two">Two</label>
        </p>
        <p class="result">
            <span>Picked: </span>
            <i>{{ picked }}</i>
        </p>
    </div>
</template>
<script>
    export default {
        name: 'Demo11013',
        data() {
            return {
                picked: ''
            }
        }
    }
</script>
<style scoped>
    input {
        margin-right: 5px;
    }
    label {
        margin-right: 20px;
    }
    .result{
        height: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .result span,i{
        flex-basis: 17%;
    }
    .result i {
        align-self: flex-start;
        height: 22px;
        line-height: 26px;
        overflow: hidden;
        padding-left: 5px;
        border-bottom: 1px solid #000;
    }
</style>
