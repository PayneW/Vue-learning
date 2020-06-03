<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
        >
        <label>{{ todo.content }}</label>
        <button class="destroy" @click="deleteTodo"></button>
    </div>
</template>

<script>
    export default {
        name: 'TodItems',
        data() {
            return {}
        },
        props: {
            // - todo 为这样一个对象:
            //   {
            //       id: id++,
            //       content: e.target.value.trim(),
            //       completed: false
            //     }
            todo: {
                type: Object,
                required: true
            }
        },
        methods: {
            deleteTodo() {
                this.$emit('del', this.todo.id);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .todo-item {
        display flex
        justify-content flex-start
        align-items center
        background-color #fff
        font-size 20px
        min-height 40px
        border-bottom 1px solid rgba(0, 0, 0, 0.06)

        // - x 号触发机制: 鼠标移动到当前整条 todo-item 上就显示
        &:hover {
            .destroy:after {
                 content "x"
            }
        }

        input {
             flex 0 1 15%
             line-height inherit
             background lightgreen
        }

        label {
            flex 0 1 70%
            word-wrap break-word
            line-height 1.2
            transition color 0.4s
        }

        &.completed {
            label {
                color #d9d9d9
                text-decoration line-through
            }
        }

        .destroy {
            flex 0 1 15%
            font-size 30px
            color #cc9a9a
            transition color .2s ease-out
            background-color transparent
            cursor pointer
        }
    }
</style>
