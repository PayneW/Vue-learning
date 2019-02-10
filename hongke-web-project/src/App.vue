<template>
    <div id="app">
        <!--头部-->
        <HomepageHeader v-show="headerShowGets"></HomepageHeader>

        <!--中部内容-->
        <router-view></router-view>

        <!-- 页脚-->
        <HomepageFooter v-show="footerShowGets"></HomepageFooter>
    </div>
</template>

<script>
    import HomepageHeader from "./components/web-front-end/pages/homepage/homepage-header/HeadWall";
    import HomepageContent from "./components/web-front-end/pages/homepage/homepage-content/ContentWall";
    import HomepageFooter from "./components/web-front-end/pages/homepage/homepage-footer/FooterWall";

    // 引入 store 中的 getters 方法
    import { mapGetters } from "vuex"

    export default {
        name: "homepage",
        components: {
            // 主页头部
            HomepageHeader,
            // 中部内容
            HomepageContent,
            // 主页页脚
            HomepageFooter
        },

        computed: mapGetters([
            "headerShowGets",
            "footerShowGets"
        ]),

        mounted() {
            let path = this.$route.path.substring(1);
            this.headerChange(path);
            this.footerChange(path);
        },
        watch: {
            $route(to) {
                let path = to.path.substring(1);
                this.headerChange(path);
                this.footerChange(path);
            }
        },

        methods: {
            headerChange(path) {
                console.log("path", path);
                if (path === "user-login" || path === "user-register") {
                    this.$store.dispatch("headerHiddenActs");
                } else {
                    this.$store.dispatch("headerShowActs");
                }
            },
            footerChange(path) {
                if (path === "user-login" || path === "user-register") {
                    this.$store.dispatch("footerHiddenActs");
                } else {
                    this.$store.dispatch("footerShowActs");
                }
            }
        }

    }
</script>

<style lang="scss">
    #app {;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        color: #2c3e50;
    }

</style>

