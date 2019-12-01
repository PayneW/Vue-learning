<template>
    <div id="app">
        <!-- keep-alive 动态组建 -->
        <div class="keep-alive-wrapper">
            <div class="keep-alive-dynamic-component">
                <button
                    v-for="tab in tabs"
                    :key="tab"
                    :class='["tab-button", {active: currentTab === tab}]'
                    @click="currentTab = tab"
                >{{tab}}
                </button>

                <keep-alive>
                    <component :is="currentTabComponent" class="tab"></component>
                </keep-alive>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">

    // 引入 keep-alive 动态组建
    import TabArchive from "./components/keep-alive-tabs/tab-archive";
    import TabPosts from "./components/keep-alive-tabs/tab-posts";

    export default {
        data() {
            return {
                currentTab: "posts",
                tabs: ["posts", "archive"]
            }
        },

        computed: {
            currentTabComponent: function () {
                return "tab-" + this.currentTab.toLowerCase();
            },
        },

        components: {
            TabArchive,
            TabPosts
        }
    }
</script>

<style lang="stylus" scoped>
    *
        margin 0
        padidng 0
        list-style none

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        color: #2c3e50
        width: 80%;
        margin: 20px auto;
    }

    .tab-button {
        padding 6px 10px
        border-top-left-radius 3px
        border-top-right-radius 3px
        border 1px solid #cccc
        cursor pointer
        background #f0f0f0
        margin-right -1px
    }

    .tab-button:hover {
        background: #e0e0e0;
    }

    .tab-button:active {
        background: #e0e0e0;
    }

    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }

    .keep-alive-wrapper {
        margin-top: 40px;
    }
</style>
