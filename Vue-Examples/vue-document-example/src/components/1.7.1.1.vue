<template>
    <div id="app1711" class="default-div">
        <h2>1.7.1.1: 在包裹元素上使用 v-if 条件渲染分组 </h2>
        <template v-if='ok'>
            <h3>Title: 我是 v-if 模板中的内容</h3>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
        </template>

        <template v-else>
            <h3>Title: 我是 v-else 模板中的内容</h3>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'Demo1711',
        data() {
            return {
                ok: true,
            }
        }
    }
</script>
