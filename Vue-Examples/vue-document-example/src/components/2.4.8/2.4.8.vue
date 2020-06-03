<template>
    <div id="Demo248" class="default-div">
        <h2>2.4.8 其它示例 -- TodoList</h2>
        <!-- v-bind:todos 我当前组件传给todo-list 的 prop -->
        <todo-list :todos="todos">
            <!-- v-slot:todo为接收子组件的插槽 prop -->
            <template v-slot:todo="{ todo }">
                <span v-if="todo.isComplete">✓</span>
                {{ todo.text }}
            </template>
        </todo-list>
    </div>
</template>
<script>
    import TodoList from "./todo-list";
    export default {
        name: 'Demo248',
        data() {
            return {
                todos: [
                    {id:1, text: 'Do the dishes', isComplete: true},
                    {id:2, text: 'Take out the trash', isComplete: true},
                    {id:3, text: 'Mow the lawn', isComplete: false},
                ],
            }
        },
        components: {
            TodoList
        }
    }
</script>
