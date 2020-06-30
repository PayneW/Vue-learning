<template>
  <div class="count">
    <h1>Vuex 计数应用</h1>
    <p>{{count}}</p>
    <p>
        <button @click="add">+</button>
        <button @click="subtract">-</button>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'count',
    computed: {
        // count() {
        //     return this.$store.state.count.count;
        // },

        // - 使用 ES6 的对象展开运算符(`...`) 把 mapState 对象内的属性,
        //   合并到当前 computed 对象中.
        // - 这里是使用了模块(module)分隔 store 后的写法.
        ...mapState({
            count: function(state) {
                return state.count.count
            }
        })
    },
    methods: {
        // - (1) 正常调用 vuex 中 mutation 的方式: this.$store.commit() 
        // increment() {
        //     this.$store.commit('increment')
        // },
        // decrement() {
        //     this.$store.commit('decrement');
        // }

        // - (2) 我们还可以使用 Vuex 提供的 mapMutations 辅助函数, 把上面 2
        //   个方法简写为:
        // - Tip: `...mapMutations` 是使用了 ES6 的展开运算符(`...`),
        //   它可以去除数组的中括号或对象的大括号, 这样 store/index.js 中
        //   mutations 对象内的属性便可以和当前 methods 中的对象合并了.
        // - Hint: mapMutations 参数为一个数组, 数组的 2 项对应上面 (1)
        //   中的 2 个方法.
        // ...mapMutations(
        //     ['increment', 'decrement']
        // ),

        // - Hint: mapMutations 参数也接收一个对象, 例如下面这样:
        ...mapMutations({
            add: 'increment',
            subtract: 'decrement'
        })
    }
}
</script>

<style lang="stylus" scoped>
    p button {
        border-radius:4px;
        margin-left: 10px;
        border: none;
        padding: .3em .8em;
        background-color: #66cc99;
        cursor: pointer;
    }
    .count {
        width: 90% 
        margin: 10px auto
        background: #ececec
        min-height: 50vh
        overflow: hidden
    }
</style>