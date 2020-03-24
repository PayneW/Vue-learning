<template>
    <li>
        <span class="item">{{ todo.id }}. {{ todo.title }}</span>
        <span><button @click="$emit('remove')">Remove</button></span>
    </li>
</template>

<script>
    export default {
        name: 'TodoItem',
        props: ['todo'],
    }
</script>

<style scoped>
    li {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    li span {
        flex-grow: 1;
    }
    .item {
        flex-basis: 76%;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    button {
        background: #fafafa;
        width: 60px;
        min-width: 0;
        height: 26px;
        line-height:26px;
        padding: 0;
        margin-top: 1px;
        margin-bottom: 0;
    }
</style>
