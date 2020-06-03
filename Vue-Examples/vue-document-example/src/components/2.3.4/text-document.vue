<template>
    <div class="text-document">
        <h3>{{ title }}</h3>
        <p>{{ content }}</p>
        <button @click="updateTitle">更新文章标题</button>
    </div>
</template>
<script>
    export default {
        name: 'TextDocument',
        data() {
            return {
                newTitle: '佛说五王经: 人生八苦'
            }
        },
        props: {
            title: String,
            content: String,
        },
        methods: {
            updateTitle: function() {
                this.$emit('update:title', this.newTitle)
            }
        }
    }
</script>
