<template>
    <div class="bar-router">
        <p class="view-p">
           当前 route 的 params.id 为: {{ $route.params.id }}
        </p>
    </div>
</template>

<script>
export default {
    name: "User",
    watch: {
        $route(to, from) {
            // - 对路由变化作出响应

            // - to/from 输出的都是 this.$route(当前 router 对象信息)
            console.log('to: ', to);
            console.log('from: ', to)
        }
    }
}
</script>
