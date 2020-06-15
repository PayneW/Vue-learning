<template>
    <div class="">
        <p>worker component</p>

        <span class="link-span"><router-link to="/worker/foo/profile">/user/foo/profile</router-link></span>
        <span class="link-span"><router-link to="/worker/foo/posts">/user/foo/posts</router-link></span>

        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'Worker'
    }
</script>

<style scoped>
    .link-span {
        padding: 3px;
        margin: 2px;
        background: #fafafa;
        border-radius: 2px;
    }
</style>
