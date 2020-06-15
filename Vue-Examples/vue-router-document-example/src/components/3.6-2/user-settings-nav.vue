<template>
    <div class="us_nav">
        <p>
            <router-link to="/settings/emails">emails</router-link>
        </p>
        <p>
            <router-link to="/settings/profile">profile</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'UserSettingsNav'
}
</script>

<style scoped>
    .us_nav {
        flex-direction: column;
        flex-basis: 25%;
        display: flex;
    }
    .us_nav p {
        border-radius: 6px;
        margin-top: 20px;
        background: #fafafa;
    }
</style>
