<template>
    <div class="default-div">
        <h2>5.1.2 Todo list 应用</h2>
        <!-- 搜索框 -->
        <input
            type="text"
            class="add-input"
            autofocus = "autofocus"
            placeholder = "接下来要做什么?"
            @keyup.enter = "addTodo"
        >

        <todo-items
            v-for="todo in filteredTodos"
            :todo="todo"
            :key="todo.id"
            @del="deleteTodo"
        />

        <todo-tabs
            :todos="todos"
            :filter="filter"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />
    </div>
</template>

<script>
    import TodoItems from './todo-items';
    import TodoTabs from './todo-tabs'

    let id = 0;
    export default {
        name: 'Demo512',
        data() {
            return {
                todos: [],
                // - filter 过渡器: 默认为页面中 all/active/completed 中的 all.
                filter: 'all'
            }
        },

        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                    return this.todos;
                }
                const completed = this.filter === 'completed';

                // - filter() 方法对数组中的每一项运行指定函数, 返回该函数会返回 true
                //   的项组成的数组.
                return this.todos.filter(function(todo) {
                    return completed === todo.completed;
                })
            }
        },

        methods: {
            addTodo(e) {
                // - unshift() 在数组前端添加任意个项并返回新数组的长度。
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                });
                e.target.value = '';
            },

            // @del 为监听 item.vue 子组件通过 $emit 回传的事件值
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },

            // - 同上监听 TodoTabs 子组件的 $emit 事件
            toggleFilter(state) {
                this.filter = state;
            },

            // - 同上监听 TodoTabs 子组件的 $emit 事件
            clearAllCompleted() {
                // - 过滤尚未完成的
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        },

        components: {
            TodoItems,
            TodoTabs
        }
    }
</script>

<style lang="stylus" scoped>
    .default-div {
        min-height 420px
        width 650px

        .add-input {
            position relative
            margin 0
            width 100%
            font-size 24px
            font-weight inherit
            line-height 1.4em
            boder none
            outline none
            color inherit
            box-sizing border-box
            font-smoothing antialiased
            padding 10px
            box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
        }
    }
</style>
