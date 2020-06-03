<template>
    <div class="default-div">
        <h2>3.1.7.1 列表的进入/离开过渡</h2>
        <div id="list-demo" class="demo">
            <button @click="add">Add</button>
            <button @click="remove">Remove</button>
            <transition-group name="list" tag="p">
                <span v-for="item in items" :key="item" class="list-item">
                    {{ item }}
                </span>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo3171',
        data() {
            return {
                items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                nextNum: 10
            }
        },
        methods: {
            randomIndex: function() {
                return Math.floor(Math.random() * this.items.length)
            },
            add: function() {
                this.items.splice(this.randomIndex(), 0, this.nextNum++)
            },
            remove: function() {
                this.items.splice(this.randomIndex(), 1)
            }
        },
    }
</script>

<style scoped>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
