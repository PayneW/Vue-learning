<template>
    <div id="app1614" class="default-div">
        <h2>1.6.1.4: v-bind:class + methods </h2>
        <p :class="{'zero-style': zeroStyle,
            'greater-zero-style': greaterZeroStyle}">
            {{ num }}
        </p>
        <button @click="changeNum()">改变数字大小和样式</button>
    </div>
</template>

<script>
    export default {
        name: 'Demo1614',
        data(){
            return {
                num: 0,
                zeroStyle: true,
                greaterZeroStyle: false,
            }
        },
        methods: {
            changeNum: function() {
                if (this.num === 0) {
                    this.num = 10;
                }
                else {
                    this.num = 0;
                }
                this.zeroStyle = !this.zeroStyle;
                this.greaterZeroStyle = !this.greaterZeroStyle
            }
        }
    }
</script>

<style scoped>
    .zero-style {
        font-weight: bold;
        font-size: 16px;
        text-align: center;
    }
    .greater-zero-style {
        font-size: 24px;
        color: #e96900;
        font-weight: bold;
        text-align: center;
    }
</style>
