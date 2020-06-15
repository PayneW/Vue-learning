<template>
    <div>
        <p>Named Views</p>

        <ul>
            <li>
                <router-link to="/container/full-blank">/full-blank</router-link>
            </li>
            <li>
                <router-link to="/container/other">/other</router-link>
            </li>
        </ul>

        <div class="container">
            <router-view class="view"></router-view>
            <router-view class="view" name="NavBar"></router-view>
            <router-view class="view" name="TheMain"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Container',
}
</script>

<style lang="stylus" scoped>
</style>
