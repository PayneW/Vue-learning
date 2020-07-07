<template>
    <section class="todo-app">
        <h2>todos</h2>
        <div class="middle-box">
            <!-- header -->
            <p>{{ allChecked }}</p>
            <header class="header">
                <!-- 全部选中/反选 toggle-all -->
                <p class="toggle-all-wrap" v-show="todos.length">
                    <input type="checkbox"
                           class="toggle-all"
                           id="toggle-all"
                           :checked="allChecked"
                           @change="toggleAll(!allChecked)"
                    >
                    <label for="toggle-all"></label>
                </p>

                <input type="text"
                       class="new-todo"
                       autofocus
                       autocomplete="off"
                       placeholder="What needs to be done?"
                       @keyup.enter="addTodo">
            </header>

            <!-- main section -->
            <section class="main" v-show="todos.length">
                <ul class="todo-list">
                    <TodoItem
                            class="todo"
                            v-for="(todo, index) in todos"
                            :key="index"
                            :todo="todo"
                    />
                </ul>
            </section>

            <!-- footer -->
            <footer class="footer" v-show="todos.length">
                <span class="todo-count">
                    <!-- <strong>1</strong> item left -->
                    <strong>{{ remaining }}</strong>
                    {{ remaining | pluralize('item') }} left
                </span>
                <ul class="filters">
                    <!-- <li>
                        <a href="#/all" class="selected">All</a>
                        <a href="#/active">Active</a>
                        <a href="#/completed">Completed</a>
                     </li> -->
                    <li v-for="(val, key) in filters" :key="key">
                        <a href="'#/' + key"
                           :class="{ selected: visibility === key }"
                           @click="visibility = key">
                            {{ key | capitalize }}
                        </a>
                    </li>
                </ul>
                <p>
                    <button class="clear-completed"
                            v-show="todos.length > remaining"
                            @click="clearCompleted">
                        Clear completed
                    </button>
                </p>
            </footer>

        </div>
    </section>
</template>

<script>
    import TodoItem from '../components/todos/todo-items';
    import { mapActions } from 'vuex';

    export default {
        name: 'Todos',
        components: {
            TodoItem
        },
        data() {
            return {
                visibility: 'all',
                filters: {
                    // - all: 得到 todos 数组的所有项
                    all: function(todos) {
                        return todos
                    },
                    // - active: 得到 todos 数组中, 每项(对象)的 done 为 false
                    //   的项, 即当前激活的未完成的项.
                    active: function(todos) {
                        // - filter(): 对数组中的每一项运行给定函数, 返回该函数会返回 true 的项组成的数组.
                        return todos.filter(todo => !todo.done)
                    },
                    // - completed: 得到 todos 数组中, 每项(对象)的 done
                    //   属性为 true 的项, 即已经完成的项.
                    completed: function(todos) {
                        return todos.filter(todo => todo.done)
                    }
                }
            }
        },
        computed: {
            todos() {
                // - 这个 bug 又改了很久, 原因是我把当前 store 数据放在
                //   store/todos.js 模块中了, 引用 todos 数据的方式是: todos.todos
                console.log(this.$store.state.todos.todos);
                return this.$store.state.todos.todos;
            },
            // - 所有选中的
            allChecked() {
                // - every(): 对数组中的每一项运行给定函数, 如果该函数对每一项都返回
                //   true, 则返回 true.
                return this.todos.every(function(todo){
                    console.log(todo.done);
                    return todo.done;
                })
            },
            // - 过滤掉除选中的状态外的 todos
            filteredTodos() {
                return this.filters[this.visibility](this.todos)
            },
            // - 返回一个数字, 用于左下于显示剩余多少项未完成
            remaining() {
                return this.todos.filter(todo => !todo.done).length;
            }
        },
        methods: {
            ...mapActions([
                'toggleAll',
                'clearCompleted'
            ]),
            addTodo(e) {
                const text = e.target.value;
                if (text.trim()) {
                    this.$store.dispatch('addTodo', text)
                }
                e.target.value = ''
            }
        },
        // - 过滤器
        filters: {
            // - pluralize [ˈplʊrəˌlaɪz] --vt.使成复数; 以复数表示. --vi.成为复数
            pluralize: (n, w) => n === 1 ? w : (w + 's'),
            capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
        }
    };
</script>

<style lang="stylus" scoped>
    @import '~assets/todos'
</style>
