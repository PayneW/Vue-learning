<template>
    <div id="app11013" class="default-div">
        <h2>1.10.1.4: `v-model` 单选按钮(type="radio")</h2>
        <p>
            <!--
                - v-model 在内部为不同的输入元素使⽤不同的属性并抛出不同的事件:
                    + (1) text 和 textarea 元素使用 value 属性和 input 事件;
                    + (2) checkbox 和 radio 使用 checked 属性和 change 事件;
                    + (3) select 字段将 value 作为 prop 并将 change 作为事件.
             -->
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
