<template>
    <div id="app1810" class="default-div">
        <h2>1.8.10: 在组件上使用 `v-for` -- 简单的 Todo list 示例.</h2>
        <div id="todo-list-example">
            <form @submit.prevent="addNewTodo" class="add-todo-style">
                <label for="new-todo">Add a todo:</label>
                <input
                    v-model="newTodoText"
                    id="new-todo"
                    placeholder='E.g. Feed the cat'
                >
                <span>
                    <button>Add</button>
                </span>
            </form>
            <ul>
                <TodoItem
                    v-for="(todo, index) in todos"
                    :key="todo.id"
                    :todo="todo"
                    @remove="todos.splice(index, 1)"
                />
            </ul>
        </div>
    </div>
</template>

<script>
    import TodoItem from './todo-list-item';

    export default {
        name: 'Demo1810',
        data() {
            return {
                newTodoText: '',
                todos: [
                    {id:1, title: 'Do the dishes'},
                    {id:2, title: 'Take out the trash'},
                    {id:3, title: 'Mow the lawn'},
                ],
                nextTodoId: 4
            }
        },
        methods: {
            addNewTodo: function() {
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText
                });
                this.newTodoText = ''
            }
        },
        components: {
            TodoItem,
        }
    }
</script>

<style scoped>
    #app1810 {
        height: auto;
        min-height: 200px;
    }
    .add-todo-style {
        /*background: lightblue;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .add-todo-style label, input, span {
        /* 按照 1:1 的模式弹性增长 */
        flex-grow: 1;
    }
    .add-todo-style label {
        /*background: lightgoldenrodyellow;*/
    }
    .add-todo-style span {
        display: flex;
        justify-content: center;
        align-items: center;
        /*background: lightsalmon;*/
    }
    .add-todo-style span button {
        width: 60px;
        cursor: pointer;
        background: #fafafa;
        min-width: 0;
        padding: 0;
    }
</style>
