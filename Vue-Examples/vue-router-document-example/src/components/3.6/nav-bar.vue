<template>
    <div class="nav-bar">
        <ul>
            <li>Started</li>
            <li>Dynamic</li>
            <li>Nested</li>
            <li>Navigation</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
    }
</script>

<style lang="stylus">
    .nav-bar {
        width: 25%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        background: lightblue;

        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        li {
            display: flex;
            margin: 0;
        }
    }
</style>
