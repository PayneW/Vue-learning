<template>
    <div class="default-div">
        <h2>3.1.7.2 列表的排序过渡</h2>
        <!-- flip list demo 翻转列表示例 -->
        <div id="flip-list-demo" class="demo typo">
            <button @click="shuffle">shuffle</button>
            <transition-group name="flip-list" tag="ul">
                <li v-for="item in items" :key="item" class="list-item">
                    {{ item }}
                </li>
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
                items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                nextNum: 10
            }
        },
        methods: {
            shuffle: function() {
                this.items = _.shuffle(this.items);
            }
        },
    }
</script>

<style scoped>
    .default-div {
        height: auto;
        min-height: 200px;
        overflow: auto;
    }
    .flip-list-move {
        transition: transform 1s;
    }
</style>
