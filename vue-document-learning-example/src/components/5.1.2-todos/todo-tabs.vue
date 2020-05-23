<template>
    <div class="helper">
        <span class="left">{{ unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <span
               v-for="state in states"
               :key="state"
               :class="[state, filter === state ? 'actived' : '']"
               @click="toggleFilter(state)" 
            >
                {{ state }}
            </span>
        </span>

        <span class="clear" @click="clearAllCompleted">Clear Completed</span>
    </div>
</template>

<script>
    export default {
        name: 'TodTabs',
        data() {
            return {
                states: ['all', 'active', 'completed']
            }
        },
        props: {
            filter: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true
            }
        },
        // - 计算属性是用来计算点击删除按钮后, 剩余的待做列表
        computed: {
            unFinishedTodoLength() {
                return this.todos.filter(todo => !todo.completed).length;
            }
        },
        methods: {
            toggleFilter(state) {
                // - 利用 $emit 绑定一个 toggle 事件, 传出去的值就是当前每一项的值
                //   "all/active/completed"
                this.$emit('toggle', state)
            },
            clearAllCompleted() {
                this.$emit('clearAllCompleted')
            }
        },
    }
</script>

<style scoped lang="stylus">
    .helper {
        display flex
        justify-content space-between
        padding 5px 0
        font-weight 100
        font-size 14px
        /*line-height 30px*/
        background-color #fff
    }
    .left, .clear, .tabs {
        padding 0 10px
    }
    .left {
        text-align center
    }
    .clear {
        text-align right
        cursor pointer
    }
    .tabs {
        display flex
        line-height 20px
        /*width 160px*/
        justify-content space-between
        span {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.actived {
                border-color rgba(175, 47, 47, 0.4)
                border-radius 5px
            }
        }
    }
</style>