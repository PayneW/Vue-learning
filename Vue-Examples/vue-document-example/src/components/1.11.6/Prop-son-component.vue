<template>
    <div class="blog-post default-div">
        <h3>{{ post.title }}</h3>
        <div class="button-wrapper">
            <button @click="$emit('enlarge-text')">Enlarge text</button>
            <button @click="$emit('dwindle-text')">Dwindle text</button>
        </div>
        <div v-html="post.content"></div>
    </div>
</template>

<script>
    export default {
        name: 'BlogPost',
        props: ['post'],
    }
</script>

<style scoped>
    .button-wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    button {
        background: #d4d4d4;
        flex: 0 1 auto;
    }
    .blog-post {
        background: #fafafa;
        width: 280px;
        margin-left: 10px;
        overflow: hidden;
        height: auto;
        padding-bottom: 10px;
    }
</style>
