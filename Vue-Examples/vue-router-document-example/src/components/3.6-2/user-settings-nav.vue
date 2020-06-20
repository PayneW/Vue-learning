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
        flex-basis: 30%;
        display: flex;
        align-items: center;
    }
    .us_nav p {
        border-radius: 4px;
        padding: .1em .6em;
        margin: auto;
        background: #fafafa;
    }
</style>
