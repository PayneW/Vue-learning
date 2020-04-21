<template>
    <div class="default-div">
        <h2>3.1.7.2 列表的排序过渡</h2>
        <!-- flip list demo 翻转列表示例-->
        <div id="flip-list-demo" class="demo">
            <button @click="shuffle">shuffle</button>
            <transition-group name="flip-list" tag="ul">
                <span v-for="item in items" :key="item" class="list-item">
                    {{ item }}
                </span>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import { shuffle } from "../assets/tools.js";
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
                this.items = shuffle(this.items);
            }
        },
    }
</script>

<style scoped>
    .flip-list-move {
        transition: transform 1s;
    }
</style>
