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

            console.log(this.$route.params);    // {id: bar}

            // - to/from 输出的都是 this.$route(当前 router 对象信息)
            // {
            //     fullpath: "/user/bar",
            //     hash: "",
            //     matched: [{}, {}],
            //     meta: {},
            //     name: undefined,
            //     params: {id: "bar"},
            //     path; "/user/bar",
            //     query: {}
            // }
            console.log('to: ', to);
            console.log('from: ', from);
        }
    }
}
</script>
