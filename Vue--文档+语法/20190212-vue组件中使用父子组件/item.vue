<template>
    <!-- 动态绑定 class 中第一个为默认，第二个根据判断条件来添加 -->
    <!-- 动态绑定todo.completed的作用是给 label 标签添加样式用的。 -->
    <div :class="['todo-item', todo.completed ? 'completed': '']">
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
        props: {
            // props 验证: 验证传入的 props 参数的数据规格，如果不符号数据规格， Vue 会发出警告。
            todo: {
                type: Object,
                required: true,
            }
        },

        methods: {
            deleteTodo() {
                // 子组件通过事件($emit)向父组件发送消息
                this.$emit("del", this.todo.id);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-item {
        position: relative;
        background-color: #fff;
        font-size: 20px;
        border-bottom: 1px solid rgba(0,0,0,0.06);

        /* X 号触发机制是: 鼠标移动到当前整条 todo-item 上就显示  */
        &:hover {
            .destroy::after{
                content: "x";
            }
        }
        label {
            display: block;
            /*background: lightblue;*/
            margin-left: 45px;
            padding: 15px;
            white-space: pre-line;
            word-break: break-all;
            line-height: 1.2;
            transition: color 0.4s;
        }
        &.completed {
            label {
                color: #d9d9d9;
                text-decoration: line-through;
            }
        }
    }


    .toggle {
        text-align center
        width 40px
        height 30px
        position absolute
        top 0
        bottom 0
        margin auto 0
        border none
        appearance none
        outline none

        // css 的 content 属性用于在元素的 ::before 和 ::after 伪元素中插入内容。使用 content
        // 属性插入的内容都是匿名的 可替换元素。
        &:after {
            content url("../assets/images/unchecked.svg")
        }

        &:checked:after {
            content url("../assets/images/checked.svg")
        }
    }

    .destroy {
        position absolute
        top 0
        right 5px
        bottom 0
        width 40px
        height 40px
        margin auto 0
        font-size 30px
        color #cc9a9a
        margin-bottom 11px
        transition color .2s ease-out
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }


</style>