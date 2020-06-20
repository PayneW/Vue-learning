<template>
    <div class="foo-router">
        <p class='view-p'>foo 我是 foo 组件</p>
    </div>
</template>

<script>
    export default {
        name: 'Foo',
        created() {
        },
        beforeRouteEnter(to, from, next) {
            console.log("beforeRouterEnter 内 to:", to);
            next();
        }
    }
</script>

