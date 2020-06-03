<template>
    <div class="default-div">
        <h2>3.2.3 把过渡放到组件里</h2>
        <div>
            <input type="number" v-model.number="firstNumber" step="20"> +
            <input type="number" v-model.number="secondNumber" step="20"> =
            {{ result }}
        </div>

        <p>
            <!-- 把 animated-integer 组件复用 3 次, 每一个组件都利用 props
                传值 -->
            <animated-integer v-bind:value="firstNumber"></animated-integer> +
            <animated-integer v-bind:value="secondNumber"></animated-integer> =
            <animated-integer v-bind:value="result"></animated-integer>
        </p>
    </div>
</template>

<script>
    import AnimatedInteger from '../base-components/base-animated-integer';
    export default {
        name: 'Demo323',
        data() {
            return {
                firstNumber: 20,
                secondNumber: 40
            }
        },
        computed: {
            result: function() {
                return this.firstNumber + this.secondNumber;
            }
        },

        components: {
            AnimatedInteger,
        }
    }
</script>

<style scoped>
    input {
        width: 90px;
        height: auto;
        display: inline;
    }
</style>
