<template>
    <li :class="{completed: todo.done, editing: editing}">
        <p class="view">
            <input type="checkbox"
                   class="toggle"
                   :checked="todo.done"
                   @change="toggleTodo(todo)">
            <label @dbclick="editing = true">{{ todo.text }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
        </p>
        <input type="text"
               class="edit"
               v-show="editing"
               v-focus="editing"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit"
               @blur="doneEdit">
    </li>
</template>

<script>
    import { mapActions} from 'vuex';

    export default {
        name: 'Todo',
        props: ['todo'],
        data() {
            return {
                editing: false
            }
        },
        directives: {
            focus(el, { value }, { context }) {
                if (value) {
                    context.$nextTick(() => {
                        el.focus()
                    })
                }
            }
        },
        methods: {
            ...mapActions([
                'editTodo',
                'toggleTodo',
                'removeTodo'
            ]),
            doneEdit(e) {
                const value = e.target.value.trim();
                const { todo } = this;
                if (!value) {
                    this.removeTodo(todo)
                } else if (this.editing) {
                    this.editTodo({
                        todo,
                        value
                    })
                    this.editing = false
                }
            },
            cancelEdit(e) {
                e.target.value = this.todo.text;
                this.editing = false
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import '~assets/todos'
</style>
