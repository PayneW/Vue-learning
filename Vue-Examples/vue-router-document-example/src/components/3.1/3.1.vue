<template>
    <div class="default">
        <h2>3.1 起步: 使用 Vue.js + Vue Router</h2>

        <p class="router-link-p">
            <!--(1) 在 template 模板中使用 router-link 组件来导航;
                 通过传入 `to` 属性指定链接;
                 <router-link> 默认会被渲染成一个 `<a>` 标签.-->
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
        </p>
        <p>
            <button @click="goBack">返回按钮</button>
        </p>

        <p>{{username}}</p>

        <!--(2) 路由出口: 路由匹配到的组件将渲染在这里.-->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Demo31',
    computed: {
        username() {
            // - 因为我们在项目主入口文件 main.js 中引入了 router 路由实例,
            //   所以可以在任何组件内通过 `this.$router`(使用见下面的 methods
            //   内 goBack 方法内) 访问到路由器;
            //   也可以通过 `this.$route` 访问到当前路由信息对象.(tip: Vue
            //   内部还是做了封装的, 具体实现以后看了源码便知.)
            console.log(this.$route);
            return null;
        }
    },
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        }
    }
}
</script>

<style lang="stylus" scoped>
    p button {
        padding: 6px 10px
        background: lightblue
        border-radiu: 4px
    }
</style>
