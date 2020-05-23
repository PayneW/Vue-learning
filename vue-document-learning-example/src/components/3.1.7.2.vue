<template>
    <div class="default-div">
        <h2>3.1.7.2 List Move Transitions Sudoku Example</h2>
        <div id="sudoku-demo" class="demo">
            <h1>Lazy Sudoku</h1>
            <p>Keep hitting the shuffle button util you win.</p>

            <button @click="shuffle">Shuffle</button>
            <transition-group name="cell" tag="div" class="container">
                <div class="cell" v-for="cell in cells" :key="cell.id">
                    {{ cell.number }}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    export default {
        name: 'Demo3171',
        data() {
            return {
               cells: Array.apply(null, {length: 81}).map(function(_, index) {
                   return {
                       id: index,
                       number: (index % 9) + 1
                   }
               }),
            }
        },
        methods: {
            shuffle: function() {
                this.cells = _.shuffle(this.cells);
            }
        },
    }
</script>

<style scoped>
    .default-div {
        height: auto;
        min-height: 560px;
        overflow: auto;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        width: 238px;
        margin-top: 10px;
    }
    .cell {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 25px;
        height: 25px;
        border: 1px solid #aaa;
        margin-right: -1px;
        margin-bottom: -1px;
    }
    .cell:nth-child(1) {
        background: #6be855;
    }
    .cell:nth-child(2) {
        background: #c6a933;
    }
    .cell:nth-child(3n) {
        margin-right: 0;
        background: lightcoral;
    }
    .cell:nth-child(4) {
        background: #b185ec;
    }
    .cell:nth-child(27n) {
        margin-bottom: 0;
        background: lightblue;
    }
    .cell-move {
        transition: transform 1s;
    }
</style>
