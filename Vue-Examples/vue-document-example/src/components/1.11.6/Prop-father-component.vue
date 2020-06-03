<template>
    <div id="app1116" class="default-div">
        <h2>1.11.6: 监听子组件事件</h2>
        <div :style="{fontSize: postFontSize + 'em'}">
            <blog-post
                v-for="post in posts"
                :key="post.id"
                v-bind:post="post"
                @enlarge-text="postFontSize += 0.1"
                @dwindle-text="postFontSize -= 0.1"
            ></blog-post>
        </div>
    </div>
</template>

<script>
    import BlogPost from './Prop-son-component';

    export default {
        name: 'Demo1116',
        data() {
            return {
                posts: [
                    {
                        id: 0,
                        title: '我是博客的标题',
                        content: '我是博客内容, 测试利用 Prop 从父组件传值给子组件,' +
                            '子组件接受后, 再利用 $emit() 方法并传入事件名来触发一个回传事件,' +
                            '父组件接受该事件并做出相应的操作.'
                    }
                ],
                postFontSize: 1,
            }
        },
        components: {
            BlogPost,
        }
    }
</script>

<style scoped>
    #app1116 {
        height: auto;
        min-height: 260px;
    }
</style>
