<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus = "autofocus"
            placeholder="接下来要做什么？"
            @keyup.enter = "addTodo"
        >

        <!-- 此组件为父组件，item.vue 为子组件，父组件通过 props 向子组件传递数据(注: props 对象在子组件内添加)，
            子组件通过事件向父组件发送消息(注: 子组件 $emit 发送的事件在父组件内定义)。 -->
        <!-- 发送给子组件的数据, 在当前父组件就是用 v-bind:xxx="..." 正常绑定属性即可，跟平时的动态绑定没有区别。 -->
        <!-- <Item v-bind:todo="todo"/> -->
        <!-- v-for 循环的是计算属性中的 filteredTodos, 因为这里牵扯到点击 "Clear Completed" 按钮
            清除已经完成的项， -->
        <Item
            :todo="todo"
            v-for = "todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />

        <!-- 把 todos 列表传入到 tabs.vue 中，在 tabs.vue 内的 props 内接收-->
        <!-- Tabs 为中间板块最下面的一栏 -->
        <Tabs
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clearAllCompleted = "clearAllCompleted"
        />
    </section>

</template>

<script>
    import Item from "./item.vue";
    import Tabs from "./tabs.vue";
    let id = 0;
    export default {
        components: {
            Item,
            Tabs  
        },
        data() {
            return {
                // 这个todo数据会把作为父级属性(props)传到 item.vue 组件中，
                /*todo: {
                    id: 0,
                    content: 'this is todo list',
                    completed: false,
                },*/
                todos: [],
                // filter 过滤器: 默认为页面中 all/active/completed 中的 all, 并不是随便定义的
                filter: "all"
            }
        },
        computed: {
            filteredTodos() {
                if(this.filter === "all") {
                    return this.todos
                }
                // 得到一个 true/false 的值
                const completed = this.filter === "completed";
                // filter() 对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
                return this.todos.filter(todo => completed === todo.completed )
            }
        },

        methods: {
            addTodo(e) {
                // unshift() 在数组前端添加任意个项并返回新数组的长度。
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false,
                });
                e.target.value = "";
            },

            // @del 为监听item.vue 子组件通过 $emit 回传的事件值
            deleteTodo(id){
                // findIndex --> 《深入理解ES6》\10-chapter-改进后的数组功能\10th-改进后的数组功能.js
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },

            toggleFilter(state) {
                this.filter = state
            },

            clearAllCompleted() {
                // 还没有完成的即 completed = false 的我们 filter 出来
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app {
        width 96%
        margin 0 auto
        box-shadow 0 0 5px #666666

        .add-input {
            position realtive
            margin 0
            width 100%
            font-size 24px
            font-family inherit
            font-weight inherit
            line-height 1.4em
            border none
            outline none
            color inherit
            box-sizing border-box
            font-smoothing antialiased
            padding 16px 16px 16px 36px
            box-shadow inset 0 -2px 1px rgba(0,0,0,0.03)
        }
    }
</style>
