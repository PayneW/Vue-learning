<template>
    <div id="todo-list">
        <ul>
            <li v-for="todo in filteredTodos" v-bind:key="todo.id">
                <!-- 我们为每个todo准备了一个插槽, 将todo对象作为一个插槽 prop 传入. -->
                <!-- 绑定在 `slot` 元素上的特性被称为插槽 prop -->
                <slot name="todo" :todo="todo">
                    <!-- 后备内容 -->
                    {{ todo.text }}
                </slot>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'TodoList',
        props: {
            todos: {
                type: Array,
                required: true
            }
        },
        computed: {
            filteredTodos: function() {
                return this.todos.filter(function(item) {
                    return item.isComplete
                });
            }
        }

    }
</script>
