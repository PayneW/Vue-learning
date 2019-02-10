<template>
    <ul class="us-nav">
        <li><router-link to="/settings/emails">邮件 Emails </router-link></li>
        <li><router-link to="/settings/profile">简介 Profile</router-link></li>
    </ul>
</template>

<script>
    export default {
        name: "userSettingsNav"
    }
</script>


<style scoped="scoped">
    .us-nav {
        border-radius: 4px;
        background: #C1D1DF;
        list-style: none;
        text-align: center;
        margin-bottom: 2rem;
    }
    .us-nav > li { line-height: 2rem; }
</style>